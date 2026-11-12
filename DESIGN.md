# DESIGN.md — Neuro Imagem Arcoverde

> **Referência visual:** "Free Medical Landing Page Design" (Figma Community, por Manjurul.co, licença CC BY 4.0), escolhida pelo cliente.
> Adotamos dela: paleta azul, tipografia IBM Plex Sans, botões em pílula, cantos de 20px, hero com foto recortada sobre semicírculo, faixa azul de números, cartões com ícone em círculo, bloco imagem + checklist, bloco azul arredondado e rodapé azul.
> **Adaptado às regras do projeto:** sem números inventados (a faixa mostra só fatos da clínica), sem depoimentos inventados (o espaço virou a busca de convênio), sem foto de "médico" fictício, texto em 18px para idosos.

## Cor

| Token | Valor | Papel |
|---|---|---|
| `--blue` | `#0360D9` | Primária. Botões, destaques em títulos, faixa de números, bloco de contato, rodapé. Branco sobre ela: 5,7:1. |
| `--blue-700` | `#024BA8` | Hover dos botões. |
| `--blue-50` | `#E1EEFF` | Fundo do hero, faixas alternadas, círculos de ícone. Azul sobre ela: 4,9:1. |
| `--blue-100` | `#CFE2FF` | Semicírculo do hero, linha do tempo. |
| `--ink` | `#021526` | Títulos e nome da marca ("Neuro" em ink, "Imagem" em azul). |
| `--text` | `#163048` | Texto corrido (11,5:1 sobre `--blue-50`). |
| `--muted` | `#4A5B70` | Texto secundário (5,9:1 sobre `--blue-50`). |
| `--line` | `#D3DCE8` | Divisórias e bordas leves. |
| `--card-line` | `#021526` | Borda de 1px dos cartões (como na referência). |
| `--ok` | `#157347` | Convênio aceito; botão flutuante de WhatsApp. |
| `--warn` | `#8A5A00` | Convênio não encontrado; etiquetas [PREENCHER]. |
| `--error` | `#B42318` | Erros de formulário. |

## Tipografia

- **IBM Plex Sans** (a mesma da referência), hospedada no próprio site (`fonts/plex.woff2`), pesos 400/600/700.
- Escala: H1 40→64px (700) · H2 32→48px (700) · H3 24→28px · lead 20→24px · **corpo 18px** (a referência usa 16px; subimos por causa do público idoso) · pequeno 15–16px.
- Títulos em duas cores: parte em `--ink`, palavra-chave em `--blue`. No H1, a palavra-chave ganha um traço desenhado embaixo (como "Favourite" na referência).

## Forma

- Raio: 10px (pequenos), **20px** (cartões, fotos, painéis), **pílula** (botões, campos, busca).
- Cartões: borda 1px `--ink`, fundo branco. No hover/foco o cartão fica **azul com texto branco** (como o cartão destacado da referência) e sobe 4px.
- Sombra única: `0 10px 30px -12px rgba(2,21,38,.25)` (busca do hero, hover, cookies).

## Componentes

- **Header:** fundo `--blue-50` (vira branco ao rolar), logo em duas cores, links com sublinhado azul animado, "Resultados" (pílula contornada) + "Agendar" (pílula azul).
- **Hero:** título + texto + **barra de busca em pílula** (Qual exame? · Cidade · botão redondo azul), que filtra e leva ao exame escolhido. À direita, foto da ressonância recortada sobre semicírculo `--blue-100`.
- **Faixa azul de números:** 2004 · 2 cidades · 10 exames · SUS + 13 convênios (contam ao aparecer).
- **Exames:** grade de cartões com ícone em círculo, filtro por cidade em pílulas, "Como me preparar?" em acordeão.
- **Por que fazer aqui:** foto (20px) + checklist com ✓ azul + link com seta.
- **Convênios:** faixa `--blue-50`, título à esquerda com "selos" circulares dos planos; painel branco à direita com a busca.
- **Contato:** bloco azul arredondado (layout da newsletter), campos em pílula branca, botão branco.
- **Rodapé:** azul, 3 colunas, responsável técnico centralizado.

## Imagens

- Fotos **geradas por IA no Figma** (arquivo "Neuro Imagem — imagens do site"): aparelho de ressonância (hero, fundo removido), sala de ultrassom e recepção.
- Sem pessoas, para não sugerir que são médicos ou pacientes da clínica. As fotos de ambientes levam a etiqueta "Imagem ilustrativa".
- Trocar por fotos reais da clínica quando chegarem (mesmas proporções).
- Ícones: traço próprio em SVG, azul, dentro de círculos `--blue-50`.

## Movimento

- Entrada do hero: título, texto, busca e botões sobem em sequência; o semicírculo cresce; a foto sobe; o traço sob "aqui no Sertão" se desenha.
- Ao rolar: títulos sobem com fade; cartões, convênios, unidades, especialidades e equipe entram um por vez (70ms); fotos entram pelas laterais; bloco azul aproxima; números contam.
- Hover: cartões ficam azuis e sobem; fotos aproximam 2%; setas andam 4px.
- Com `prefers-reduced-motion: reduce`, nada se move. Sem JavaScript, tudo aparece.
