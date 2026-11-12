(function () {
  "use strict";
  var CFG = window.NEURO_CONFIG || { whatsapp: "", convenios: [] };

  function waUrl(msg) {
    var base = "https://wa.me/" + (CFG.whatsapp || "");
    return base + "?text=" + encodeURIComponent(msg || "Olá!");
  }

  /* ---------- Links de WhatsApp ---------- */
  document.querySelectorAll(".js-wa").forEach(function (a) {
    a.href = waUrl(a.getAttribute("data-msg"));
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Filtro de exames ---------- */
  var filterBtns = document.querySelectorAll("[data-filter]");
  var exams = document.querySelectorAll("#exam-list .exam");
  var status = document.getElementById("filter-status");
  var labels = { todas: "nas duas cidades", arcoverde: "em Arcoverde", pesqueira: "em Pesqueira" };
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      var n = 0;
      exams.forEach(function (li) {
        var show = f === "todas" || li.getAttribute("data-units").split(" ").indexOf(f) > -1;
        li.hidden = !show;
        li.querySelectorAll(".exam-units span").forEach(function (s) { s.hidden = f !== "todas"; });
        if (show) n++;
      });
      if (status) status.textContent = n + " exames " + labels[f] + ".";
    });
  });

  /* ---------- Busca de convênio ---------- */
  function norm(s) {
    return (s || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }
  var input = document.getElementById("plan-input");
  var result = document.getElementById("plan-result");
  var listItems = document.querySelectorAll("#plan-list li");
  if (input && result) {
    var initial = result.innerHTML;
    var esc = function (s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    var run = function () {
      var q = norm(input.value);
      listItems.forEach(function (li) { li.style.background = ""; });
      if (q.length < 2) {
        result.className = "plan-result";
        result.innerHTML = initial;
        return;
      }
      var hit = null;
      CFG.convenios.some(function (c) {
        var keys = [norm(c.nome)].concat(c.aliases.map(norm));
        var ok = keys.some(function (k) { return k.indexOf(q) === 0 || q.indexOf(k) === 0 || (q.length >= 4 && k.indexOf(q) > -1); });
        if (ok) hit = c;
        return ok;
      });
      if (hit) {
        result.className = "plan-result is-ok";
        result.innerHTML = "<strong>Sim, atendemos " + esc(hit.nome) + ".</strong>" +
          "<p>A cobertura de cada exame depende do seu plano. Para confirmar o seu, mande a foto do pedido e da carteirinha pelo WhatsApp.</p>";
        listItems.forEach(function (li) { if (norm(li.textContent) === norm(hit.nome)) li.style.background = "#E3EFE6"; });
      } else {
        result.className = "plan-result is-miss";
        result.innerHTML = "<strong>Não encontramos “" + esc(input.value.trim()) + "” na nossa lista.</strong>" +
          "<p>O nome pode estar diferente. Pergunte pelo WhatsApp ou ligue para <a href=\"tel:+558733211111\">(87) 3321-1111</a>.</p>";
      }
    };
    input.addEventListener("input", run);
  }

  /* ---------- Formulário → WhatsApp ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.nome, whats = form.whatsapp, ok = true;
      var setErr = function (el, id, msg) {
        document.getElementById(id).textContent = msg;
        el.setAttribute("aria-invalid", msg ? "true" : "false");
        if (msg && ok) { el.focus(); ok = false; }
      };
      setErr(nome, "e-nome", nome.value.trim().length < 2 ? "Escreva seu nome." : "");
      var digits = whats.value.replace(/\D/g, "");
      setErr(whats, "e-whats", digits.length < 10 || digits.length > 13 ? "Escreva o número com DDD. Ex.: (87) 9 0000-0000" : "");
      if (!ok) return;
      var msg = "Olá, meu nome é " + nome.value.trim() + ". Meu WhatsApp é " + whats.value.trim() + ". " +
        "Gostaria de agendar: " + (form.exame.value || "ainda não sei") +
        (form.unidade.value ? ", na unidade de " + form.unidade.value : "") + ".";
      document.getElementById("form-status").textContent = "Abrindo o WhatsApp com a sua mensagem…";
      window.open(waUrl(msg), "_blank", "noopener");
    });
  }

  /* ---------- Cookies ---------- */
  var KEY = "ni_cookies_v1";
  var banner = document.getElementById("cookie");
  var store = {
    get: function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set: function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  };
  function showBanner() {
    if (!banner) return;
    banner.hidden = false;
    document.body.classList.add("has-cookie");
    document.documentElement.style.setProperty("--cookie-h", banner.offsetHeight + "px");
  }
  function hideBanner() {
    if (!banner) return;
    banner.hidden = true;
    document.body.classList.remove("has-cookie");
  }
  function applyConsent(v) {
    if (v === "all") {
      /* [PREENCHER] Carregar aqui a ferramenta de medição (ex.: Google Analytics),
         somente depois do consentimento. */
    }
  }
  var saved = store.get();
  if (saved) applyConsent(saved); else showBanner();
  if (banner) {
    banner.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cookie]");
      if (!b) return;
      var v = b.getAttribute("data-cookie");
      store.set(v);
      applyConsent(v);
      hideBanner();
    });
  }
  document.querySelectorAll(".js-cookie-open").forEach(function (b) {
    b.addEventListener("click", function () { showBanner(); var f = banner.querySelector("button"); if (f) f.focus(); });
  });

  /* ---------- Animações ao rolar ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal, .reveal-stagger, .timeline");
  document.querySelectorAll(".reveal-stagger").forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--i", Math.min(i, 10)); });
  });
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (t) { t.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var t = e.target;
          t.classList.add("is-in");
          io.unobserve(t);
          setTimeout(function () { t.classList.add("settled"); }, 1600);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });

    var hero = document.querySelector(".hero");
    if (hero) {
      var ticking = false;
      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = Math.min(window.scrollY, 900);
          hero.style.setProperty("--parallax", (y * 0.18).toFixed(1) + "px");
          ticking = false;
        });
      }, { passive: true });
    }
  }
  /* Itens que o filtro mostra de novo continuam visíveis */
  document.querySelectorAll("[data-filter]").forEach(function (b) {
    b.addEventListener("click", function () { var l = document.getElementById("exam-list"); if (l) l.classList.add("is-in"); });
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
