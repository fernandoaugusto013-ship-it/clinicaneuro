# Neuro Imagem — o que falta e o que foi revisado

Todos os pontos em aberto aparecem no site como etiquetas amarelas **[PREENCHER]** ou **[CONFIRMAR]**. Ao substituir, apague a etiqueta inteira (`<span class="fill">…</span>`).

## 1. O que a clínica precisa enviar

### Contato e operação (bloqueiam a publicação)
- [ ] **Número de WhatsApp** de agendamento (55 + DDD + número). Vai num só lugar: `js/config.js` → `whatsapp`.
- [ ] **Horário de funcionamento** de cada uma das 3 unidades (dias da semana, sábado, almoço).
- [ ] **Telefone de Pesqueira**: confirmar se é (87) 3321-1111 ou (87) 3835-2848.
- [ ] **E-mail** e **Instagram (@)**.
- [ ] **O que é feito em cada unidade de Arcoverde** (115 matriz × 108 Centro de Diagnóstico): quais exames e consultas em cada endereço.
- [ ] Confirmar se 115 e 108 ficam em lados opostos da avenida (o esquema do site supõe isso).

### Links dos portais (copiar do site atual)
- [ ] URL do portal de **Resultados de exames** e quais dados o paciente usa para entrar (protocolo, senha, CPF?).
- [ ] URL do **Portal do Médico**.
- [ ] URL do **Portal do Dentista**.
- [ ] Arquivo **PDF da requisição de exame** → salvar como `docs/requisicao-de-exame.pdf`.
- Busca: substituir `https://PREENCHER-URL-PORTAL-DE-RESULTADOS`, `…PORTAL-DO-MEDICO` e `…PORTAL-DO-DENTISTA` em todos os arquivos .html.

### Fotos (reais, nada de banco de imagens)
O site está no ar com **ilustrações provisórias** (sala de ressonância, fachadas e avatares da equipe). Trocar pelas fotos abaixo assim que chegarem: basta substituir os arquivos em `img/` (ou o `src` das imagens) mantendo as proporções.
- [ ] Fachada da matriz (Av. Capitão Arlindo Pacheco, 115), de dia, de frente, letreiro legível, sem carros. Mínimo 1600 px de largura.
- [ ] Aparelho de ressonância com um técnico da equipe (com termo de autorização de imagem).
- [ ] Fachadas da unidade 108 e de Pesqueira (opcional nos cartões).
- [ ] Imagem de compartilhamento 1200×630 px (`img/og-neuroimagem.jpg`).
- [ ] Logo oficial em SVG.
- [ ] Fotos do corpo clínico (opcional): quadradas, fundo neutro, mesmo enquadramento.

### Corpo clínico (exigência do CFM)
- [ ] **Responsável técnico**: nome, CRM-PE e RQE (aparece na seção e no rodapé de todas as páginas).
- [ ] Para cada profissional: nome, especialidade, CRM-PE e RQE (nutricionista: CRN-6).
- [ ] Médico do trabalho responsável (página de Medicina do Trabalho).

### Preparo dos exames (um texto por exame)
- [ ] Ressonância · Tomografia · Mamografia · Ultrassom (por tipo) · Contrastados (quais são feitos) · Raio X · Densitometria · Odontológica (quais tipos) · Eletroencefalograma · Punção/Biópsia.
- Para cada um: jejum, medicamentos, roupas/metais, contraste, acompanhante, tempo de exame, prazo do resultado.

### Perguntas frequentes
- [ ] Consulta precisa de encaminhamento (SUS/convênio)?
- [ ] Como funciona a marcação pelo SUS e o que é coberto.
- [ ] Prazo de entrega dos resultados e onde retirar o laudo impresso.
- [ ] Ressonância: acompanhante na sala? Aparelho aberto ou fechado? Faz com sedação?
- [ ] Protocolo para marca-passo e implantes.
- [ ] Lista do que levar no dia (o texto atual é uma sugestão a confirmar).

### História
- [ ] Ano de abertura do centro de ressonância (parceria com o Dr. Boris Berenstein).
- [ ] Ano de abertura da unidade de Pesqueira.

### LGPD
- [ ] Nome e e-mail do **encarregado de dados (DPO)**.
- [ ] Fornecedor do sistema de laudos/resultados.
- [ ] Prazo de guarda dos dados do formulário.
- [ ] Ferramenta de medição (Google Analytics etc.), ou remover a menção se não houver. Se houver, carregar em `js/main.js` → `applyConsent`, só após o aceite.
- [ ] Data da última atualização da política.
- [ ] Medidas de segurança adotadas (confirmar o texto).

### Medicina do Trabalho
- [ ] Serviços oferecidos (ASO admissional/periódico/demissional, PCMSO etc.), exames complementares, como a empresa contrata, prazo do ASO.

## 2. Revisão final (web-review + anti-slop) — o que foi corrigido

Testado no navegador em 375 px, 390 px, 768 px, 820 px e 1440 px, só com teclado e com as interações reais (filtro, busca de convênio, formulário, menu, cookies). O site não tem modo escuro (decisão do DESIGN.md).

**Corrigido**
1. **Rolagem lateral no celular de 375 px** (o header passava 7 px da tela). Ajustei o tamanho da marca e dos botões abaixo de 400 px.
2. **Ícone do botão "Menu" sumia** no celular (o ícone encolhia até largura zero). Corrigido.
3. **O aviso de cookies cobria o botão "Agendar" do hero** no desktop. Virou uma barra fina no rodapé da tela, e os elementos focados pelo teclado não ficam mais escondidos atrás dela (WCAG 2.4.11).
4. **O aviso de cookies ocupava metade da tela do celular.** Agora é compacto e tem os botões lado a lado.
5. **O filtro de cidade quebrava em duas linhas** na coluna lateral. Agora ocupa uma linha só.
6. **Botões do hero no celular** passaram a ocupar a largura toda, e o espaçamento do topo diminuiu para o botão principal aparecer mais cedo.
7. **Anti-slop:** removi o desfoque (glassmorphism) do header. Agora o fundo é sólido.
8. **Texto de consultas** dizia "médicos de dez especialidades e nutricionista", mas são 9 especialidades médicas + nutrição. Corrigido para "dez áreas".
9. **Busca de convênio:** removi apelidos que poderiam dar falso "aceito" (NotreDame/GNDI para Hapvida; "Caixa" para CAPESAÚDE).
10. **Estilos soltos no HTML** viraram classes do CSS.
11. **Contraste:** todas as combinações de cor medidas passam AA. A menor é 4,97:1 (etiqueta de aviso).

**Verificado e aprovado**
- Hero diz o que é, onde fica e como agir; 1 ação principal (WhatsApp) + 1 secundária (resultado).
- Sem gradientes, blobs, ícones em círculos, emojis ou cartões repetidos. Só as 3 unidades usam cartão.
- Teclado: "Pular para o conteúdo" é o 1º foco; ordem lógica; foco visível em tudo; Esc fecha o menu.
- Formulário: rótulos visíveis, mensagens de erro em texto, foco vai para o 1º campo com erro.
- Títulos em ordem (h1 → h2 → h3), landmarks (header, nav, main, footer), `lang="pt-BR"`.
- Fontes hospedadas no próprio site: carregam mais rápido e não enviam o IP do visitante ao Google (bom para a LGPD).
- SEO: title e description com Arcoverde e Pesqueira; schema.org MedicalClinic + DiagnosticLab para as 3 unidades; Open Graph; telefones com `tel:`.
- Ortografia revisada ("Privacidade", "procedimento").
- Sem preços, sem "o melhor", sem promessa de resultado.

**Fica para a clínica decidir**
- A fonte do corpo (Atkinson Hyperlegible Next) mostra o zero cortado (Ø). É de propósito: ajuda pessoas com baixa visão a não confundir 0 com O. Se incomodar em CNPJ e anos, dá para trocar por outra fonte legível.
- O formulário não guarda dados em servidor: ele abre o WhatsApp com a mensagem pronta. Se quiserem receber por e-mail, é preciso ligar um serviço de formulários.
