# DESIGN.md — Neuro Imagem Arcoverde

> Direção definida a partir do briefing, da cor atual da marca (#242F62) e do raciocínio das referências citadas (One Medical, Tia, Doctolib, Cleveland Clinic, Mayo Clinic). A biblioteca UXKIN não estava conectada; nenhum site foi copiado.

## Ideia central

**"Laudo bem diagramado, com sotaque do Sertão."**
O site deve parecer um documento clínico claro e organizado (régua, numeração, tabelas limpas), aquecido pela paleta da terra: areia no fundo, terracota nos pontos de ação. Sem gradientes, sem blobs, sem ícones em círculos.

Princípios:
1. **Respostas antes de apresentação.** As três dúvidas (faz meu exame? aceita meu convênio? como agendo?) são resolvidas na primeira tela e na barra de acesso rápido.
2. **Legível para quem tem 70 anos.** Corpo de 18px no celular, alvos de toque de 48px, contraste AA em tudo.
3. **Editorial, não modular.** Listas e tabelas quando a informação é lista; cartões só para as unidades (que são coisas físicas e distintas).

## Cor

| Token | Valor | Papel |
|---|---|---|
| `--navy` | `#242F62` | Cor da marca. Títulos, header, rodapé, links, botão secundário. |
| `--navy-900` | `#171E40` | Texto principal (contraste 14,5:1 no fundo). |
| `--navy-100` | `#E4E6EF` | Fundo de destaque frio (filtro ativo, linhas de tabela). |
| `--terra` | `#A84A27` | Acento único (terracota). Botão principal, marcadores de seção, foco. Usar com parcimônia. 5,1:1 sobre `--sand-50`; texto branco sobre ela: 5,7:1. |
| `--terra-700` | `#8A3A1C` | Hover/pressionado do botão principal. |
| `--sand-50` | `#F7F2EA` | Fundo da página (off-white quente). |
| `--sand-100` | `#EFE6D8` | Faixas alternadas entre seções. (A barra de acesso rápido usa fundo `--navy`.) |
| `--sand-300` | `#D8CBB6` | Bordas e linhas divisórias. |
| `--paper` | `#FFFCF7` | Superfície de cartões e campos. |
| `--muted` | `#4F5470` | Texto secundário (6,6:1 sobre `--sand-50`). |
| `--ok` | `#1E6B45` | Convênio aceito, mensagens de sucesso. Também o botão flutuante de WhatsApp (verde reconhecível, escurecido para contraste AA com texto branco). |
| `--warn` | `#8A5A00` | Convênio não encontrado / "confirme por telefone". |
| `--error` | `#A3261C` | Erros de formulário. |

Regras: terracota nunca em grandes áreas; no máximo um botão terracota por bloco. Sem modo escuro (público idoso, foco em simplicidade); o site respeita o tema claro.

## Tipografia

- **Títulos: Literata** (serifada de leitura, com personalidade; pesos 500 e 700). Dá o tom editorial e humano, longe do "sans genérico de startup".
- **Corpo e interface: Atkinson Hyperlegible Next** (criada pelo Braille Institute para leitores com baixa visão; pesos 400 e 700). Escolha direta pelo público idoso.
- Algarismos tabulares nos telefones e CRMs.

Escala (mobile → desktop, `clamp`):

| Token | Tamanho | Altura de linha | Uso |
|---|---|---|---|
| `--fs-xs` | 15px | 1.45 | Rótulos, legendas, rodapé |
| `--fs-sm` | 16px | 1.5 | Metadados, CRM |
| `--fs-base` | 18px → 19px | 1.6 | Corpo |
| `--fs-lg` | 21px → 23px | 1.45 | Lead, subtítulos |
| `--fs-xl` | 26px → 32px | 1.25 | H3 |
| `--fs-2xl` | 32px → 44px | 1.15 | H2 |
| `--fs-3xl` | 38px → 64px | 1.05 | H1 do hero |

Linhas de texto com no máximo ~68 caracteres (`--measure: 38rem`).

## Espaçamento

Escala de 8px: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 (`--s-1` … `--s-10`).
Seções: 64px no celular, 112px no desktop. Largura máxima do conteúdo: 1200px; texto corrido 38rem.

## Forma e profundidade

- Raio: `--r-sm 4px` (campos, chips), `--r-md 8px` (botões, cartões). Nada de pílulas por padrão.
- Bordas de 1px `--sand-300` em vez de sombras.
- Uma única sombra (`--shadow`) para o header fixo e o botão flutuante.

## Elemento gráfico próprio: "cortes e curvas de nível"

Linhas finas concêntricas e irregulares, que leem ao mesmo tempo como **curvas de nível do relevo do Sertão** e como **cortes de uma ressonância**. Arquivo `img/curvas.svg`, aplicado como fundo via CSS, traço de 1px em `--navy` com 12–18% de opacidade.
Uso: canto do hero, fundo da faixa "Sobre" e cabeçalho do rodapé. Nunca atrás de texto pequeno.

Complemento: **régua de corte** — numeração de seção no formato `01 / Exames` com um fio horizontal com marcações (ticks), como o indicador de posição de corte de um exame. Substitui os "eyebrows" genéricos.

## Componentes

- **Botão principal** (terracota, texto branco, 48px de altura mínima, ícone do WhatsApp à esquerda). Hover: `--terra-700`. Foco: anel de 3px `--navy` com 2px de afastamento.
- **Botão secundário** (contorno navy 2px, texto navy, fundo transparente). Hover: fundo `--navy-100`.
- **Link discreto** (navy, sublinhado com 2px de offset; hover terracota).
- **Desabilitado:** opacidade 0.5 e `cursor:not-allowed` (só no envio do formulário).
- **Campos:** fundo `--paper`, borda 1.5px `--sand-300`, 52px de altura, rótulo sempre visível acima (nunca só placeholder). Foco: borda navy + anel.
- **Filtro segmentado** (Todas · Arcoverde · Pesqueira): botões com `aria-pressed`.
- **Lista de exames:** linhas de tabela editorial, não cartões. Nome em Literata, uma frase simples, unidades como etiquetas de texto, "Como me preparar?" abre acordeão (`<details>`).
- **Cartão de unidade:** único lugar com cartão. Número da avenida em destaque tipográfico (115 / 108) para mostrar que são vizinhas.
- **Navegação:** header fixo de 64px, logo à esquerda, 4 links, "Resultados" (secundário) e "Agendar pelo WhatsApp" (principal). No celular, menu em gaveta + o botão de agendar sempre visível.
- **Rodapé:** fundo navy, texto `--sand-50`, responsável técnico com CRM em destaque.

## Imagens e ícones

- Destino final: fotos reais da clínica.
- Até lá, **ilustrações provisórias próprias** (SVG em `img/ilustracao-*.svg` e `img/avatar-*.svg`), no estilo flat da paleta: sala de ressonância com janela para o Sertão (mandacarus), fachadas das 3 unidades com o número em destaque, avatares de jaleco. São obviamente ilustrações. Nada de foto realista inventada da clínica ou de médicos, que poderia enganar o paciente e fere as regras de publicidade do CFM.
- Ícones: traço de 1.75px, 24px, desenhados à mão em SVG inline, sem círculos de fundo. Usados só onde ajudam (WhatsApp, telefone, mapa, documento, resultado).
- Imagens em WebP/AVIF com `loading="lazy"`, `width`/`height` definidos.

## Movimento

- Microinterações: 150–250ms em cor, borda e elevação (cartões de unidade sobem 4px e a ilustração aproxima 3% no hover).
- **Entrada do hero:** título, texto, botões e nota sobem em sequência (0 / 120 / 220 / 320ms); a ilustração desliza da direita.
- **Ao rolar** (IntersectionObserver, dispara uma vez): cabeçalhos de seção sobem 28px com fade; listas (exames, convênios, unidades, especialidades, equipe, portais) entram item a item com 70ms de intervalo; a régua de corte "se desenha" da esquerda para a direita; a linha do tempo cresce de cima para baixo; formulário entra pela direita.
- **Parallax** leve das curvas de nível do hero (18% da rolagem) e anel tracejado da ressonância girando devagar (24s por volta).
- Curva padrão `cubic-bezier(.2,.7,.2,1)`, 600–900ms.
- Sem JS, tudo aparece normalmente. Com `prefers-reduced-motion: reduce`, nada se move: conteúdo já visível, sem parallax, sem giro, sem rolagem suave.

## Voz

Português do Brasil, "você", frases curtas, nomes de exames como o paciente fala ("ressonância", não "RM"). Sem superlativos, sem preço, sem promessa de resultado (regras do CFM).
