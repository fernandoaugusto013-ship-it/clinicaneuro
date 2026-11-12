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
  var exams = document.querySelectorAll("#exam-list .card");
  var status = document.getElementById("filter-status");
  var labels = { todas: "nas duas cidades", arcoverde: "em Arcoverde", pesqueira: "em Pesqueira" };
  function applyFilter(f) {
    var btn = document.querySelector('[data-filter="' + f + '"]');
    if (btn) btn.click();
  }
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      var n = 0;
      exams.forEach(function (li) {
        var show = f === "todas" || li.getAttribute("data-units").split(" ").indexOf(f) > -1;
        li.hidden = !show;
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
      listItems.forEach(function (li) { li.classList.remove("is-hit"); });
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
        listItems.forEach(function (li) { if (norm(li.textContent) === norm(hit.nome)) li.classList.add("is-hit"); });
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
  var targets = document.querySelectorAll(".reveal, .reveal-stagger, .timeline, .rating-card");
  document.querySelectorAll(".reveal-stagger").forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--i", Math.min(i, 10)); });
  });
  if (!("IntersectionObserver" in window)) {
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

  }
  /* Itens que o filtro mostra de novo continuam visíveis */
  document.querySelectorAll("[data-filter]").forEach(function (b) {
    b.addEventListener("click", function () { var l = document.getElementById("exam-list"); if (l) l.classList.add("is-in"); });
  });

  /* ---------- Busca do hero: filtra e leva ao exame ---------- */
  var finder = document.getElementById("finder");
  if (finder) {
    finder.addEventListener("submit", function (e) {
      e.preventDefault();
      var exam = document.getElementById("finder-exam").value;
      var city = document.getElementById("finder-city").value;
      applyFilter(city);
      var list = document.getElementById("exam-list");
      if (list) list.classList.add("is-in", "settled");
      var target = exam ? document.getElementById("ex-" + exam) : document.getElementById("exames");
      if (exam && target && target.hidden) {
        applyFilter("todas");
        var st = document.getElementById("filter-status");
        if (st) st.textContent = "Este exame não é feito em " + (city === "pesqueira" ? "Pesqueira" : "Arcoverde") + ". Veja onde ele é feito.";
      }
      if (target) {
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: exam ? "center" : "start" });
        if (exam) {
          var sum = target.querySelector("summary");
          setTimeout(function () { (sum || target).focus({ preventScroll: true }); }, reduce ? 0 : 600);
        }
      }
    });
  }

  /* ---------- Barra de progresso e parallax do hero ---------- */
  var heroMedia = document.querySelector(".hero-media");
  var ticking2 = false;
  var onFrame = function () {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    h.style.setProperty("--progress", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
    if (heroMedia && !reduce && window.innerWidth >= 960 && window.scrollY < 1200) {
      heroMedia.style.setProperty("--hero-y", (window.scrollY * 0.22).toFixed(1) + "px");
    }
    ticking2 = false;
  };
  window.addEventListener("scroll", function () {
    if (!ticking2) { ticking2 = true; requestAnimationFrame(onFrame); }
  }, { passive: true });
  onFrame();

  /* ---------- Header muda ao rolar ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 10); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Números da faixa azul contam ao aparecer ---------- */
  var counters = document.querySelectorAll("[data-count], [data-count-dec]");
  if (!reduce && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, dec = el.hasAttribute("data-count-dec");
        var end = dec ? parseFloat(el.getAttribute("data-count-dec")) : parseInt(el.getAttribute("data-count"), 10);
        var start = el.hasAttribute("data-plain") ? end - 22 : 0, t0 = null, dur = 1600;
        var plain = el.hasAttribute("data-plain");
        var fmt = function (v) { return dec ? v.toFixed(1).replace(".", ",") : plain ? String(Math.round(v)) : Math.round(v).toLocaleString("pt-BR"); };
        var step = function (t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(start + (end - start) * eased);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
