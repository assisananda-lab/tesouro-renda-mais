# Ideias de Design — Tesouro Renda+

## Contexto
Página de consultoria de investimentos para apresentar o Tesouro Renda+ a um cliente. Deve transmitir autoridade, confiança e sofisticação financeira, ao mesmo tempo que torna dados complexos acessíveis e visualmente atraentes.

---

<response>
<probability>0.07</probability>
<text>

## Ideia A — "Wealth Cartography" (Cartografia da Riqueza)

**Design Movement:** Art Deco Financeiro + Minimalismo Suíço

**Core Principles:**
1. Autoridade através de espaço negativo generoso — o silêncio comunica confiança
2. Dados como arte — gráficos tratados como elementos gráficos, não apenas informativos
3. Hierarquia tipográfica agressiva — títulos monumentais vs. corpo delicado
4. Paleta de ouro e marfim sobre fundo escuro profundo

**Color Philosophy:**
Fundo: `#0D1117` (azul-preto profundo) — transmite solidez e noite estrelada
Acento primário: `#C9A84C` (ouro envelhecido) — riqueza, tradição, confiança
Acento secundário: `#4ECDC4` (turquesa) — modernidade, dados, tecnologia
Texto: `#F5F0E8` (marfim) — elegância, não brancura fria

**Layout Paradigm:**
Assimétrico com seções de largura total alternadas. Hero com texto à esquerda e gráfico à direita. Cards com bordas douradas finas. Divisores diagonais entre seções.

**Signature Elements:**
- Linhas douradas finas como divisores e molduras de cards
- Números grandes e dourados como elementos decorativos (ex: "7%" em destaque)
- Textura sutil de papel envelhecido no fundo

**Interaction Philosophy:**
Scroll revelador — elementos entram com fade+slide suave. Hover em cards levanta com sombra dourada.

**Animation:**
- Entrada de seções: fade-in + translateY(20px) com ease-out 0.6s
- Contadores numéricos animados ao entrar na viewport
- Gráficos com animação de desenho progressivo

**Typography System:**
- Display: `Playfair Display` (serif, bold) — autoridade clássica
- Body: `Source Serif 4` (serif, regular) — leitura confortável
- Dados: `JetBrains Mono` (monospace) — precisão técnica

</text>
</response>

<response>
<probability>0.08</probability>
<text>

## Ideia B — "Blueprint Finance" (Projeto Financeiro) ← ESCOLHIDA

**Design Movement:** Modernismo Técnico + Editorial Financeiro

**Core Principles:**
1. Clareza técnica — cada elemento tem propósito, nada é decorativo por acaso
2. Dados em primeiro plano — visualizações são o coração, não suporte
3. Contraste dramático — fundo escuro profundo, elementos em azul-ciano e verde-esmeralda
4. Sensação de "sala de operações" — como um terminal Bloomberg sofisticado

**Color Philosophy:**
Fundo: `#0A0F1E` (azul-marinho profundo) — profissionalismo, noite, foco
Primário: `#00B4D8` (azul-ciano) — tecnologia, clareza, confiança moderna
Secundário: `#06D6A0` (verde-esmeralda) — crescimento, retorno positivo, prosperidade
Alerta: `#EF476F` (vermelho-coral) — risco, atenção, perdas
Texto: `#E2E8F0` (cinza-azulado claro) — legibilidade sem dureza

**Layout Paradigm:**
Grid assimétrico de 12 colunas. Hero com gradiente diagonal. Seções alternando entre layout de 2/3 + 1/3 e 1/2 + 1/2. Cards com bordas sutis e glassmorphism leve.

**Signature Elements:**
- Linhas de grid sutis no fundo (como papel milimetrado) — referência a gráficos financeiros
- Badges e indicadores de status (taxa atual, variação) em estilo "ticker"
- Divisores com gradiente de cor

**Interaction Philosophy:**
Interatividade nos gráficos (hover para detalhes), sliders para simulações em tempo real, tabs para alternar entre cenários.

**Animation:**
- Entrada de seções: stagger de cards com delay de 0.1s cada
- Números: contagem animada de 0 até o valor final
- Gráficos: animação de preenchimento da esquerda para a direita
- Hover em cards: border-color transition + subtle glow

**Typography System:**
- Display: `Space Grotesk` (sans-serif, bold 700) — moderno, técnico, forte
- Body: `DM Sans` (sans-serif, regular 400/500) — legível, contemporâneo
- Dados/Números: `Space Mono` (monospace) — precisão, terminal

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## Ideia C — "Sunlit Wealth" (Riqueza Iluminada)

**Design Movement:** Modernismo Escandinavo + Fintech Contemporâneo

**Core Principles:**
1. Leveza e otimismo — fundo claro, espaço generoso, cores quentes
2. Confiança através da simplicidade — menos é mais
3. Dados humanizados — gráficos com formas orgânicas, não apenas retas
4. Sensação de crescimento e prosperidade

**Color Philosophy:**
Fundo: `#FAFAF8` (off-white quente) — limpeza, clareza, confiança
Primário: `#1B4332` (verde-floresta) — crescimento, estabilidade, natureza
Secundário: `#D4A017` (âmbar dourado) — riqueza, otimismo, calor
Destaque: `#2D6A4F` (verde-médio) — dados positivos, retorno
Texto: `#1A1A2E` (quase preto) — legibilidade máxima

**Layout Paradigm:**
Colunas assimétricas com muito espaço branco. Hero minimalista com uma única estatística impactante. Cards com sombras suaves e bordas arredondadas grandes.

**Signature Elements:**
- Formas orgânicas e blobs como elementos decorativos de fundo
- Ícones lineares finos e elegantes
- Citações em destaque com tipografia grande

**Interaction Philosophy:**
Transições suaves e orgânicas. Hover com elevação gentil. Scroll com parallax sutil.

**Animation:**
- Entrada: fade-in suave com scale de 0.98 para 1
- Gráficos: animação de crescimento orgânico
- Hover: sombra que cresce suavemente

**Typography System:**
- Display: `Cormorant Garamond` (serif, light/bold) — elegância, sofisticação
- Body: `Nunito` (sans-serif, regular) — amigável, acessível
- Dados: `Roboto Mono` (monospace) — precisão

</text>
</response>

---

## Decisão Final: Ideia B — "Blueprint Finance"

Escolhi a abordagem **Blueprint Finance** por combinar autoridade técnica com modernidade visual. O fundo escuro profundo e os acentos em azul-ciano e verde-esmeralda criam uma experiência semelhante a um terminal financeiro sofisticado, transmitindo ao cliente a seriedade e a precisão que se espera de uma consultoria de investimentos de alto nível. Os gráficos interativos em Recharts serão o coração da experiência, com animações que revelam dados progressivamente e simuladores que permitem ao cliente explorar diferentes cenários.
