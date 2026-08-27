import { ModuleData } from '../types/curriculum';

export const CURRICULUM_MODULES: ModuleData[] = [
  // MÓDULO 1: INTRODUÇÃO E VANTAGENS DO GD&T (Capítulo 1 - Cogorno)
  {
    id: 'mod-1-intro',
    chapterNumber: 1,
    title: 'Módulo 1: Introdução ao GD&T',
    subtitle: 'Vantagens do Toleranciamento Geométrico sobre o Sistema Coordenado (±)',
    category: 'fundamentals',
    fcfSpecification: {
      symbol: '⌖',
      toleranceValue: '⌀ 0.014',
      primaryDatum: 'A',
      secondaryDatum: 'B',
      tertiaryDatum: 'C'
    },
    theoryContent: {
      title: 'Por Que o GD&T Foi Criado?',
      introduction: 'Durante a Segunda Guerra Mundial, peças sobressalentes eram fabricadas rigorosamente dentro das cotas de tolerância ±, mas não montavam em campo. O GD&T nasceu para eliminar ambiguidades, garantir 100% de intercambiabilidade funcional e reduzir custos industriais.',
      keyPoints: [
        {
          topic: '1. Zona Cilíndrica vs Quadrada (57% mais área)',
          description: 'O toleranciamento linear (±0.005) gera uma zona quadrada de 0.010 x 0.010. Na diagonal, a distância atinge 0.014. O GD&T substitui o quadrado por uma zona cilíndrica de ⌀ 0.014, concedendo 57% mais área útil de aprovação sem alterar o tamanho do parafuso de montagem.'
        },
        {
          topic: '2. A Falha da Zona Coordenada (Cantos Diagonais)',
          description: 'Quando a ferramenta desvia para os cantos diagonais (ex: X = +0.006, Y = +0.006), o sistema tradicional ± reprova a peça (0.006 > 0.005). Porém, a peça montaria perfeitamente porque a distância radial (0.0136) cabe dentro do círculo ⌀ 0.014. Peças boas eram descartadas!'
        },
        {
          topic: '3. Datums Implícitos vs Explícitos',
          description: 'Cotagens em coordenadas possuem "Datums implícitos", forçando o operador e o inspetor a adivinhar qual face apoiar primeiro na mesa de medição. O GD&T exige a declaração exata da ordem de contato (Primário, Secundário, Terciário).'
        }
      ],
      engineeringFormulas: [
        {
          name: 'Área da Zona Cilíndrica vs Quadrada',
          formula: 'A_{cilindro} = \\frac{\\pi \\cdot (\\sqrt{2} \\cdot T)^2}{4} \\approx 1.57 \\cdot A_{quadrado}',
          explanation: 'Para uma tolerância de ±0.005 (quadrado de 0.010 de lado), o diâmetro circunscrito é 0.01414, resultando em um ganho de 57% na área permissível de fabricação.'
        },
        {
          name: 'Distância Radial Total de Posição',
          formula: 'D_{radial} = 2 \\cdot \\sqrt{\\Delta X^2 + \\Delta Y^2}',
          explanation: 'Se D_radial ≤ 0.014 in, o furo atende à especificação de posição do GD&T.'
        }
      ],
      inspectionMethod: 'A peça é avaliada comparando o veredito do sistema linear (quadrado de 0.010) contra a zona cilíndrica ⌀ 0.014 no comparador de metrologia.'
    },
    model3DConfig: {
      modelType: 'block_single_hole',
      baseDimensions: { width: 150, length: 100, height: 40 },
      defaultFeatures: { holeDiameter: 3.000, basicX: 50.0, basicY: 50.0 },
      toleranceZoneType: 'cylindrical'
    },
    sliderConfig: [
      {
        key: 'deviationX',
        label: 'Desvio no Eixo X (ΔX)',
        unit: 'in',
        min: -0.008,
        max: 0.008,
        step: 0.001,
        defaultValue: 0.000,
        description: 'Deslocamento da ferramenta no eixo horizontal'
      },
      {
        key: 'deviationY',
        label: 'Desvio no Eixo Y (ΔY)',
        unit: 'in',
        min: -0.008,
        max: 0.008,
        step: 0.001,
        defaultValue: 0.000,
        description: 'Deslocamento da ferramenta no eixo vertical'
      }
    ],
    exercises: [
      {
        id: 'ex-1-1',
        stepNumber: 1,
        type: 'quiz_conceptual',
        title: '1. A Diagonal da Zona Quadrada',
        difficulty: 'Fácil',
        instruction: 'Uma cota linear define a posição de um furo como 2.000 ± 0.005 em X e 2.000 ± 0.005 em Y. Qual é a distância máxima do centro teórico até os cantos da zona de tolerância quadrada?',
        options: ['0.005 in', '0.0071 in (√(0.005² + 0.005²))', '0.010 in', '0.014 in'],
        correctOptionIndex: 1,
        commentedSolution: 'Correto! Pelo teorema de Pitágoras, a diagonal de meia zona (0.005 x 0.005) é √(0.005² + 0.005²) ≈ 0.0071 in. Isso significa que o conjunto mecânico já aceita até 0.0071 in de erro quando a ferramenta se desloca em diagonal.'
      },
      {
        id: 'ex-1-2',
        stepNumber: 2,
        type: 'interactive_3d',
        title: '2. Salvando a Peça na Diagonal',
        difficulty: 'Intermediário',
        instruction: 'Mova os sliders no painel direito para ΔX = +0.006 in e ΔY = +0.006 in. Observe o veredito duplo na tela.',
        interactiveAction: {
          requiredSliderKey: 'deviationX',
          targetValueMin: 0.0055,
          targetValueMax: 0.0065,
          triggerStatus: 'APROVADO'
        },
        commentedSolution: 'Perfeito! O desvio linear em X (0.006) ultrapassou o limite de ±0.005, reprovando no sistema tradicional. Porém, a distância radial total é 2 × √(0.006² + 0.006²) = 0.0136 in, que cabe com folga dentro da zona cilíndrica de ⌀ 0.014 in!'
      },
      {
        id: 'ex-1-3',
        stepNumber: 3,
        type: 'quiz_conceptual',
        title: '3. O Ganho de 57% de Área',
        difficulty: 'Intermediário',
        instruction: 'A área da zona quadrada é (0.010 × 0.010) = 0.000100 in². A área da zona circular circunscrita (⌀ 0.01414) é (π × 0.01414²) / 4 ≈ 0.000157 in². Qual é a porcentagem exata de tolerância extra que a fábrica ganha sem alterar os parafusos?',
        options: ['14%', '25%', '57%', '100%'],
        correctOptionIndex: 2,
        commentedSolution: 'Excelente! A zona circular oferece 57% a mais de área de usinagem permissível. Isso reduz drasticamente o refugo na linha de produção sem comprometer a montabilidade.'
      },
      {
        id: 'ex-1-4',
        stepNumber: 4,
        type: 'quiz_conceptual',
        title: '4. O Problema dos Datums Implícitos',
        difficulty: 'Difícil',
        instruction: "Em um desenho com cotas apenas em mais ou menos (±), o que significa dizer que os referenciais são 'Datums Implícitos'?",
        options: [
          'Que os Datums são calculados por computador automaticamente.',
          'Que o desenho não define qual face apoiar primeiro na mesa, deixando a ordem de medição a critério do operador.',
          'Que a peça não possui faces planas.',
          'Que a peça tem tolerância zero.'
        ],
        correctOptionIndex: 1,
        commentedSolution: 'Exato! Datums implícitos não possuem ordem de precedência declarada. Se o operador apoiar a peça pela base e o inspetor apoiar pela lateral, uma peça usinada perfeitamente pode ser reprovada na inspeção por conflito de orientação.'
      },
      {
        id: 'ex-1-5',
        stepNumber: 5,
        type: 'quiz_conceptual',
        title: '5. Por Que o GD&T Surgiu?',
        difficulty: 'Especialista',
        instruction: 'Qual foi o evento histórico e a necessidade industrial que motivaram o comitê que deu origem às normas ANSI/ASME Y14.5?',
        options: [
          'A criação dos computadores e dos softwares CAD 3D na década de 1980.',
          'A Segunda Guerra Mundial, onde peças sobressalentes feitas por fornecedores diferentes atendiam às cotas ± mas não montavam em campo.',
          'A substituição obrigatória do sistema métrico pelo sistema em polegadas.',
          'A invenção das máquinas de medição por coordenadas (CMM).'
        ],
        correctOptionIndex: 1,
        commentedSolution: 'Resposta de Especialista! O livro de Gene R. Cogorno relata que durante a Segunda Guerra Mundial peças eram fabricadas rigorosamente dentro das cotas lineares, mas não intercambiavam. O GD&T foi criado para garantir montagem 100% confiável e padronizar a interpretação técnica mundial.'
      }
    ]
  },

  // MÓDULO 2: FUNDAMENTOS DE COTAGEM E REGRAS DE DESENHO (Capítulo 2 - Cogorno)
  {
    id: 'mod-2-fundamentals',
    chapterNumber: 2,
    title: 'Módulo 2: Fundamentos de Cotagem',
    subtitle: 'As 10 Regras Fundamentais do Desenho Técnico e Padronização de Limites (ASME Y14.5)',
    category: 'fundamentals',
    fcfSpecification: null,
    theoryContent: {
      title: 'As 10 Regras Fundamentais da Norma ASME Y14.5',
      introduction: 'Para que um desenho técnico tenha validade jurídica e técnica sem ambiguidades de interpretação entre projeto, usinagem e inspeção, a norma ASME Y14.5 estabelece 10 regras mandatórias que regem toda a engenharia mecânica.',
      keyPoints: [
        {
          topic: 'Regra 1: Toda Dimensão Deve Ter Tolerância',
          description: 'Cada dimensão no desenho DEVE ter uma tolerância associada (direta na cota ou via legenda geral), exceto dimensões expressamente identificadas como Referência (entre parênteses), Básico (em caixa retangular), Mínimo, Máximo ou Estoque (Stock).'
        },
        {
          topic: 'Regra 2: Descrição Completa e Sem Redundâncias',
          description: 'Cada elemento deve ser completamente dimensionado e toleranciado para permitir sua fabricação sem que o operador precise deduzir ou calcular distâncias. Cotas de referência devem ser mantidas no mínimo estritamente necessário.'
        },
        {
          topic: 'Regra 3: Função e Intercambiabilidade',
          description: 'As dimensões devem ser selecionadas e organizadas para refletir a montagem e a função real da peça, não podendo estar sujeitas a mais de uma interpretação geométrica.'
        },
        {
          topic: 'Regra 4: Independência do Processo de Fabricação',
          description: 'O desenho de engenharia deve definir o produto final acabado (geometria e tolerância) SEM ditar o método de fabricação (não deve exigir se a peça será fresada, torneada ou retificada, salvo exigência funcional de processo).'
        },
        {
          topic: 'Regra 5: Ângulo de 90° Implícito',
          description: 'Aplica-se um ângulo de 90° implícito quando linhas de centro e superfícies são representadas visualmente em ângulo reto no desenho e nenhum valor angular for especificado. A tolerância aplicada é a tolerância angular geral da legenda.'
        },
        {
          topic: 'Regra 6: Ângulo Básico de 90° Implícito',
          description: 'Aplica-se um ângulo Básico de 90° (teoricamente exato, sem tolerância na cota) quando linhas de centro de elementos em um padrão ou superfícies a 90° forem localizadas ou definidas por dimensões básicas.'
        },
        {
          topic: 'Regra 7: Temperatura Padrão de Referência (20°C / 68°F)',
          description: 'Salvo indicação em contrário, todas as dimensões e tolerâncias aplicam-se à temperatura padrão internacional de 68°F (20°C). Medições efetuadas em outras temperaturas devem ser matematicamente compensadas pela dilatação térmica.'
        },
        {
          topic: 'Regra 8: Condição de Estado Livre (Free-State)',
          description: 'Todas as dimensões aplicam-se na condição de estado livre (sem forças ou restrições externas), exceto para peças flexíveis/não-rígidas devidamente identificadas.'
        },
        {
          topic: 'Regra 9: Abrangência Espacial da Tolerância',
          description: 'Salvo indicação em contrário, todas as tolerâncias geométricas aplicam-se à profundidade total, comprimento total e largura total do elemento inspecionado.'
        },
        {
          topic: 'Regra 10: Nível de Aplicação do Desenho',
          description: 'Dimensões e tolerâncias aplicam-se estritamente ao nível do desenho onde são especificadas. Uma cota definida no detalhamento de uma peça individual não se estende automaticamente ao desenho de conjunto montado.'
        }
      ],
      engineeringFormulas: [
        {
          name: 'Compensação Térmica de Medição (Regra 7)',
          formula: '\\Delta L = L_{nominal} \\cdot \\alpha \\cdot (T_{medida} - 20^{\\circ}\\text{C})',
          explanation: 'Onde α é o coeficiente de dilatação térmica do material. Se uma peça de aço (α = 11.5 µm/m°C) for medida a 35°C, seu tamanho real medido deve ser corrigido para 20°C antes de laudar a aprovação.'
        },
        {
          name: 'Interpretação de Limites Dimensionais Absolutos',
          formula: '4.000\\text{ in} \\equiv 4.000000...0\\text{ in}',
          explanation: 'Limites dimensionais não aceitam arredondamento. 4.250 in significa 4.250000... in.'
        }
      ],
      inspectionMethod: 'Aferição dimensional em laboratório climatizado a 20°C com padrões rastreáveis e aplicação das regras de algarismos significativos.'
    },
    model3DConfig: {
      modelType: 'stepped_shaft',
      baseDimensions: { diameter1: 25, length1: 50, diameter2: 40, length2: 60 },
      defaultFeatures: { material: 'Aço Carbono (α = 11.5 µm/m°C)', nominalLength: 100.000 },
      toleranceZoneType: 'cylindrical'
    },
    sliderConfig: [
      {
        key: 'temperature',
        label: 'Temperatura da Sala de Medição',
        unit: '°C',
        min: 10,
        max: 40,
        step: 1,
        defaultValue: 20,
        description: 'Padrão ASME/ISO: 20°C (68°F)'
      },
      {
        key: 'machinedTolerance',
        label: 'Dimensão Usinada a 20°C',
        unit: 'mm',
        min: 99.950,
        max: 100.050,
        step: 0.005,
        defaultValue: 100.000,
        description: 'Especificação: 100.000 ± 0.020 mm'
      }
    ],
    exercises: [
      {
        id: 'ex-2-1',
        stepNumber: 1,
        type: 'quiz_conceptual',
        title: '1. As 10 Regras: Temperatura Padrão',
        difficulty: 'Fácil',
        instruction: 'De acordo com a Regra Fundamental nº 7 da ASME Y14.5, qual é a temperatura oficial de referência em que todas as dimensões de um projeto mecânico devem ser inspecionadas?',
        options: ['0°C (32°F)', '20°C (68°F)', '25°C (77°F)', 'Qualquer temperatura ambiente da fábrica'],
        correctOptionIndex: 1,
        commentedSolution: 'Correto! A Regra Fundamental nº 7 estabelece 68°F (20°C) como a temperatura de referência universal. Medições efetuadas em outras temperaturas devem ser matematicamente corrigidas pela dilatação térmica do material.'
      },
      {
        id: 'ex-2-2',
        stepNumber: 2,
        type: 'quiz_conceptual',
        title: '2. Regra 1: Dimensões Sem Tolerância',
        difficulty: 'Fácil',
        instruction: 'Qual dos seguintes tipos de cotas é uma EXCEÇÃO à Regra nº 1 e NÃO deve receber tolerância dimensional direta nem seguir a legenda geral?',
        options: [
          'Dimensão Básica (enquadrada em caixa retangular) ou Dimensão de Referência (entre parênteses).',
          'Diâmetro externo usinado em torno CNC.',
          'Espessura de uma chapa de aço usinada.',
          'Profundidade de um furo roscado.'
        ],
        correctOptionIndex: 0,
        commentedSolution: 'Exato! A Regra nº 1 estabelece que todas as cotas devem ter tolerância, EXCETO cotas de Referência (que são informativas), Básicas (teoricamente exatas, cuja tolerância vem no FCF), Mínimas, Máximas ou de Estoque.'
      },
      {
        id: 'ex-2-3',
        stepNumber: 3,
        type: 'calculation',
        title: '3. Dilatação Térmica na Metrologia',
        difficulty: 'Intermediário',
        instruction: 'Um eixo de aço de 100.000 mm (α = 0.000012 mm/mm°C) com tolerância de 100.000 ± 0.020 mm foi medido no chão de fábrica a 35°C acusando 100.025 mm. Qual é o comprimento real da peça quando corrigido para 20°C?',
        numericTolerance: 0.002,
        correctAnswerNumeric: 100.007,
        commentedSolution: 'Perfeito! ΔL = 100 × 0.000012 × (35 - 20) = +0.018 mm de expansão térmica. Subtraindo esse valor da medição a quente: 100.025 - 0.018 = 100.007 mm. A peça estava parecendo reprovada no calor da fábrica, mas a 20°C ela é perfeitamente APROVADA!'
      },
      {
        id: 'ex-2-4',
        stepNumber: 4,
        type: 'quiz_conceptual',
        title: '4. Regras de Notação: Polegadas vs Milímetros',
        difficulty: 'Intermediário',
        instruction: 'De acordo com as regras de padronização da ASME, qual das opções abaixo apresenta a formatação de cotas rigorosamente CORRETA?',
        options: [
          'Em polegadas: 0.50 in | Em milímetros: 12.500 mm',
          'Em polegadas: .500 in (sem zero antes do ponto) | Em milímetros: 12.5 mm (sem zeros desnecessários)',
          'Em polegadas: ,50 in | Em milímetros: 012.5 mm',
          'Ambos os sistemas devem usar sempre 3 casas decimais com zero à esquerda.'
        ],
        correctOptionIndex: 1,
        commentedSolution: 'Correto! Em polegadas nunca se usa zero à esquerda do ponto decimal (.500 in) e as casas decimais devem coincidir com a tolerância. Em milímetros usa-se zero à esquerda (0.5 mm) e não se adicionam zeros desnecessários (12.5 mm).'
      },
      {
        id: 'ex-2-5',
        stepNumber: 5,
        type: 'quiz_conceptual',
        title: '5. Regra 4: Métodos de Fabricação no Desenho',
        difficulty: 'Difícil',
        instruction: 'Um desenhista colocou a seguinte anotação em um desenho de produção: "FRESAR FACE SUPERIOR COM FRESA DE TOPO Ø50". Por que essa prática viola a Regra nº 4 da ASME Y14.5?',
        options: [
          'Porque fresas de topo são proibidas em normas internacionais.',
          'Porque o desenho de engenharia deve especificar o estado geométrico final da peça, e não ditar os métodos ou ferramentas de fabricação.',
          'Porque a face deveria ser torneada.',
          'Porque faltou especificar o avanço e a rotação da máquina.'
        ],
        correctOptionIndex: 1,
        commentedSolution: 'Resposta de Especialista! A Regra Fundamental nº 4 afirma que o desenho deve definir a peça acabada sem especificar um processo de usinagem particular. O método de fabricação é responsabilidade da engenharia de processos/manufatura, não do desenho de produto.'
      }
    ]
  },

  // MÓDULO 3: SÍMBOLOS, TERMOS, REGRAS E A REGRA #1 (Capítulo 3 - Cogorno)
  {
    id: 'mod-3-symbols-rules',
    chapterNumber: 3,
    title: 'Módulo 3: Símbolos, Termos e Regras',
    subtitle: 'A Regra #1 (Princípio do Envelope), Regra #2 e a Sintaxe do FCF',
    category: 'fundamentals',
    fcfSpecification: {
      symbol: '⏥',
      toleranceValue: '0.005',
      materialModifier: ''
    },
    theoryContent: {
      title: 'A Gramática do GD&T e as 4 Regras Fundamentais',
      introduction: 'O Feature Control Frame (FCF) é a "sentença" da linguagem GD&T. Para interpretar corretamente essa linguagem, o profissional deve dominar a Regra #1 e a Regra #2 da ASME Y14.5.',
      keyPoints: [
        {
          topic: '1. A Regra #1 (Princípio do Envelope)',
          description: 'Onde apenas uma tolerância de tamanho é especificada, os limites de tamanho controlam a variação da forma do elemento. NENHUM elemento de uma peça pode ultrapassar a fronteira de forma perfeita na sua Condição de Máximo Material (MMC). Se um pino de ⌀ 1.000-1.020 for usinado com ⌀ 1.020, ele deve ser perfeitamente reto e cilíndrico.'
        },
        {
          topic: '2. A Regra #2 (RFS Automático)',
          description: 'Se nenhum modificador de material for indicado no FCF para a tolerância ou para o Datum de tamanho, a condição RFS (Regardless of Feature Size) aplica-se automaticamente. Nenhum bônus é permitido.'
        },
        {
          topic: '3. Envelope Real de Acoplamento (AME - Actual Mating Envelope)',
          description: 'Para eixos: é a menor bucha perfeita que envolve a peça tocando seus pontos mais altos. Para furos: é o maior pino perfeito que entra no furo tocando seus pontos mais altos.'
        },
        {
          topic: '4. Condição Virtual vs Resultante',
          description: 'Condição Virtual (VC) é a fronteira constante de pior caso no limite MMC (para furos: MMC - Tolerância; para eixos: MMC + Tolerância). Condição Resultante (RC) é a fronteira variável no limite LMC.'
        }
      ],
      engineeringFormulas: [
        {
          name: 'Condição Virtual de Eixo (Pino)',
          formula: 'VC_{eixo} = MMC_{eixo} + \\text{Tolerância Geométrica em MMC}',
          explanation: 'Representa o envelope máximo ocupado pelo pino considerando seu diâmetro máximo e seu desvio angular máximo.'
        },
        {
          name: 'Condição Virtual de Furo',
          formula: 'VC_{furo} = MMC_{furo} - \\text{Tolerância Geométrica em MMC}',
          explanation: 'Representa a passagem livre mínima garantida através do furo.'
        }
      ],
      inspectionMethod: 'Inspeção do envelope perfeito em MMC utilizando anéis calibradores e blocos padrão, e verificação dos pontos medianos derivados.'
    },
    model3DConfig: {
      modelType: 'stepped_shaft',
      baseDimensions: { diameter1: 1.020, length1: 100 },
      defaultFeatures: { minSize: 1.000, maxSize: 1.020 },
      toleranceZoneType: 'cylindrical'
    },
    sliderConfig: [
      {
        key: 'shaftDiameter',
        label: 'Diâmetro Local Usinado do Pino',
        unit: 'in',
        min: 1.000,
        max: 1.020,
        step: 0.002,
        defaultValue: 1.020,
        description: 'MMC = 1.020 in | LMC = 1.000 in'
      },
      {
        key: 'bendingBowing',
        label: 'Empenamento / Flexão da Haste',
        unit: 'in',
        min: 0.000,
        max: 0.025,
        step: 0.002,
        defaultValue: 0.000,
        description: 'Curvatura do eixo no espaço'
      }
    ],
    exercises: [
      {
        id: 'ex-3-1',
        stepNumber: 1,
        type: 'quiz_conceptual',
        title: '1. O Princípio do Envelope (Regra #1)',
        difficulty: 'Fácil',
        instruction: 'Um pino é fabricado com seu diâmetro máximo permitido de 1.020 in (MMC). De acordo com a Regra #1 da ASME Y14.5, qual é a quantidade máxima de empenamento/curvatura que ele pode apresentar?',
        options: ['0.000 in (Deve ter retitude perfeita)', '0.010 in', '0.020 in', 'A tolerância da legenda'],
        correctOptionIndex: 0,
        commentedSolution: 'Correto! A Regra #1 afirma que na Condição de Máximo Material (MMC), a peça exige forma perfeita. Se o pino tem 1.020 in e a bucha tem 1.020 in, qualquer curvatura impediria o encaixe.'
      },
      {
        id: 'ex-3-2',
        stepNumber: 2,
        type: 'interactive_3d',
        title: '2. Flexão Permitida no Limite LMC',
        difficulty: 'Intermediário',
        instruction: 'Reduza o diâmetro do pino para 1.000 in (LMC). Em seguida, aumente a flexão do eixo até 0.020 in. Note que o pino agora PODE curvar-se e continuar APROVADO porque não viola o envelope de 1.020 in!',
        interactiveAction: {
          requiredSliderKey: 'shaftDiameter',
          targetValueMin: 1.000,
          targetValueMax: 1.002,
          triggerStatus: 'APROVADO'
        },
        commentedSolution: 'Excelente! No limite LMC (1.000 in), a peça ganha automaticamente até 0.020 in de tolerância de forma (retilineidade) permitida pela variação dimensional da Regra #1.'
      },
      {
        id: 'ex-3-3',
        stepNumber: 3,
        type: 'calculation',
        title: '3. Cálculo de Condição Virtual (Furo)',
        difficulty: 'Intermediário',
        instruction: 'Um furo com diâmetro ⌀ 1.010 - 1.025 in possui a especificação de posição [ ⌖ | ⌀ 0.010 Ⓜ | A ]. Qual é o diâmetro da sua Condição Virtual (VC)?',
        numericTolerance: 0.001,
        correctAnswerNumeric: 1.000,
        commentedSolution: 'Perfeito! A Condição Virtual de um furo em MMC é: MMC (1.010) - Tolerância Geométrica (0.010) = 1.000 in. Esse é o diâmetro exato do pino do calibre funcional.'
      },
      {
        id: 'ex-3-4',
        stepNumber: 4,
        type: 'quiz_conceptual',
        title: '4. Regra #2: Modificador Padrão',
        difficulty: 'Difícil',
        instruction: 'Se um Feature Control Frame para um furo for escrito como [ ⌖ | ⌀ 0.015 | A | B ], sem nenhum símbolo de círculo M ou L, como a tolerância deve ser interpretada?',
        options: [
          'Aplica-se automaticamente em MMC (Máximo Material).',
          'Aplica-se automaticamente em RFS (Regardless of Feature Size - sem bônus).',
          'O desenho é considerado inválido e deve ser rejeitado.',
          'Aplica-se em LMC se a peça for fundida.'
        ],
        correctOptionIndex: 1,
        commentedSolution: 'Correto! A Regra #2 estabelece que RFS é a condição padrão para todas as tolerâncias e referências de tamanho quando nenhum modificador é especificado.'
      },
      {
        id: 'ex-3-5',
        stepNumber: 5,
        type: 'quiz_conceptual',
        title: '5. A Regra do Passo da Rosca (Pitch Diameter)',
        difficulty: 'Especialista',
        instruction: 'Quando uma tolerância geométrica de posição é aplicada a um furo roscado (ex: 1/2-13 UNC), a que eixo a zona de tolerância se aplica por regra padrão?',
        options: [
          'Ao diâmetro maior (crista da rosca).',
          'Ao diâmetro menor (furo de broca).',
          'Ao eixo derivado do Diâmetro Primitivo da rosca (Pitch Diameter).',
          'À face chanfrada da entrada do parafuso.'
        ],
        correctOptionIndex: 2,
        commentedSolution: 'Resposta de Especialista! A Pitch Diameter Rule dita que todas as tolerâncias de posição e orientação em roscas aplicam-se ao eixo do diâmetro primitivo, a menos que uma nota como "MAJOR DIA" ou "MINOR DIA" seja adicionada.'
      }
    ]
  },

  // MÓDULO 4: DATUMS E O SISTEMA DE REFERÊNCIA 3-2-1 (Capítulo 4 - Cogorno)
  {
    id: 'mod-4-datums',
    chapterNumber: 4,
    title: 'Módulo 4: Sistema de Datums (DRF)',
    subtitle: 'Imobilização dos 6 Graus de Liberdade, Alvos de Datum e Tolerância Shift',
    category: 'fundamentals',
    fcfSpecification: {
      symbol: '⌖',
      toleranceValue: '⌀ 0.010',
      materialModifier: 'Ⓜ',
      primaryDatum: 'A',
      secondaryDatum: 'B',
      secondaryModifier: 'Ⓜ',
      tertiaryDatum: 'C'
    },
    theoryContent: {
      title: 'O Sistema de Referência de Datums (DRF 3-2-1)',
      introduction: 'Qualquer corpo livre no espaço possui 6 graus de liberdade (3 translações X, Y, Z e 3 rotações u, v, w). O DRF utiliza o método 3-2-1 para travar a peça de forma estável e repetível.',
      keyPoints: [
        {
          topic: '1. O Método 3-2-1 de Imobilização',
          description: 'Datum Primário (A): encosta com no mínimo 3 pontos de contato não colineares (trava 1 translação e 2 rotações - 3 graus). Datum Secundário (B): encosta com 2 pontos de contato (trava 1 translação e 1 rotação - 2 graus). Datum Terciário (C): encosta com 1 ponto de contato (trava o último grau de translação restante).'
        },
        {
          topic: '2. Datum Feature (Real) vs Datum Simulator (Perfeito)',
          description: 'A superfície usinada física da peça é imperfeita e cheia de rugosidade (Datum Feature). O Datum real é o plano geométrico perfeito da mesa de desempeno ou morsa de precisão (Datum Feature Simulator).'
        },
        {
          topic: '3. Alvos de Datum (Datum Targets)',
          description: 'Em peças fundidas, forjadas ou soldadas que possuem superfícies muito irregulares, planos inteiros geram instabilidade (bamboleio). Usa-se Alvos de Datum: Pinos de contato esférico (Pontos X), Facas retificadas (Linhas) ou Apoios circulares usinados (Áreas hachuradas).'
        },
        {
          topic: '4. Datum de Tamanho em MMC e Tolerância Shift',
          description: 'Quando um furo piloto ou eixo é usado como Datum Secundário com modificador Ⓜ (ex: B Ⓜ), o afastamento do Datum em relação ao MMC não gera bônus individual, mas concede uma folga de deslocamento global (Shift) para o padrão de furos como um grupo.'
        }
      ],
      engineeringFormulas: [
        {
          name: 'Equação de Graus de Liberdade Restritos',
          formula: '\\text{DOFs Restritos} = 3\\text{ (Primário)} + 2\\text{ (Secundário)} + 1\\text{ (Terciário)} = 6\\text{ DOFs}',
          explanation: 'Garante que a peça seja imobilizada univocamente no espaço cartesiano tridimensional.'
        },
        {
          name: 'Tolerância Shift de Datum',
          formula: '\\text{Shift} = \\text{Tamanho Real do Datum B} - \\text{Condição Virtual do Datum B}',
          explanation: 'Permite que o padrão inteiro de furos deslize sobre a mesa de medição.'
        }
      ],
      inspectionMethod: 'Acomodação da peça na mesa de desempeno e encosto contra esquadros de 90° para posicionamento do apalpador CMM.'
    },
    model3DConfig: {
      modelType: 'datum_targets_plate',
      baseDimensions: { width: 140, length: 90, height: 35 },
      defaultFeatures: { targetsA: 3, targetsB: 2, targetC: 1 },
      toleranceZoneType: 'parallel_planes'
    },
    sliderConfig: [
      {
        key: 'datumSurfaceError',
        label: 'Imperfeição da Face A (Ondulação)',
        unit: 'mm',
        min: 0.000,
        max: 0.100,
        step: 0.005,
        defaultValue: 0.020,
        description: 'Rugosidade / não-planeza da face de apoio física'
      },
      {
        key: 'shiftMovement',
        label: 'Deslocamento Global (Shift no Datum B)',
        unit: 'mm',
        min: 0.000,
        max: 0.050,
        step: 0.005,
        defaultValue: 0.000,
        description: 'Mobilidade permitida pelo modificador MMB'
      }
    ],
    exercises: [
      {
        id: 'ex-4-1',
        stepNumber: 1,
        type: 'quiz_conceptual',
        title: '1. Graus de Liberdade do Datum Primário',
        difficulty: 'Fácil',
        instruction: 'Ao apoiar uma placa plana sobre a mesa de desempeno (Datum Primário A) com 3 pontos de contato, quantos graus de liberdade (de um total de 6) são travados?',
        options: ['1 Grau (apenas altura)', '3 Graus (1 translação e 2 rotações)', '5 Graus', 'Todos os 6 graus'],
        correctOptionIndex: 1,
        commentedSolution: 'Correto! O Datum Primário plano elimina a transição linear vertical (Z) e as rotações em torno dos eixos X e Y (Pitch e Roll), totalizando 3 graus de liberdade restritos.'
      },
      {
        id: 'ex-4-2',
        stepNumber: 2,
        type: 'quiz_conceptual',
        title: '2. Identificação de Símbolos de Datum',
        difficulty: 'Fácil',
        instruction: 'Em um desenho técnico de fabricação, em qual dos seguintes locais é TOTALMENTE PROIBIDO fixar o símbolo de Datum Feature?',
        options: [
          'Na linha de extensão de uma face usinada.',
          'No quadro de controle de características (FCF) de um furo.',
          'Diretamente sobre uma linha de centro ou eixo imaginário.',
          'Na linha de cota de um elemento de tamanho.'
        ],
        correctOptionIndex: 2,
        commentedSolution: 'Exato! A norma ASME Y14.5 proíbe fixar símbolos de Datum em linhas de centro ou eixos imaginários, pois eles são abstratos. O símbolo deve ser sempre fixado na superfície física real da peça.'
      },
      {
        id: 'ex-4-3',
        stepNumber: 3,
        type: 'quiz_conceptual',
        title: '3. Alvos de Datum (Datum Targets)',
        difficulty: 'Intermediário',
        instruction: 'Por que engenheiros utilizam Alvos de Datum (Datum Target Points A1, A2, A3) em vez de faces completas em peças fundidas ou forjadas?',
        options: [
          'Porque peças fundidas não aceitam medição por máquinas CMM.',
          'Para evitar que superfícies rugosas e irregulares fiquem bambeando e criem medições não repetíveis.',
          'Porque alvos de datum eliminam a necessidade de usinagem.',
          'Para reduzir o número de graus de liberdade da peça.'
        ],
        correctOptionIndex: 1,
        commentedSolution: 'Perfeito! Peças fundidas brutas possuem superfícies onduladas. Três pinos esféricos de alvo (Datum Targets) garantem contato estável e repetível na fixação de usinagem.'
      },
      {
        id: 'ex-4-4',
        stepNumber: 4,
        type: 'quiz_conceptual',
        title: '4. A Regra do Datum de Condição Virtual',
        difficulty: 'Difícil',
        instruction: 'Um furo de centragem central é o Datum Secundário B com modificador Ⓜ em um padrão de furos. Se o furo central for usinado maior que seu MMC, como isso ajuda a peça?',
        options: [
          'Cada furo do padrão ganha tolerância bônus individual.',
          'O padrão inteiro de furos ganha a permissão de sofrer um deslocamento (Shift) como um conjunto rígido.',
          'A rugosidade exigida para a peça diminui.',
          'A tolerância de batimento é cancelada.'
        ],
        correctOptionIndex: 1,
        commentedSolution: 'Correto! O modificador de material em um Datum de tamanho gera tolerância de Shift (deslocamento). O padrão de furos pode mover-se em conjunto sobre o pino centralizador da montagem.'
      },
      {
        id: 'ex-4-5',
        stepNumber: 5,
        type: 'quiz_conceptual',
        title: '5. Datums Compostos (A-B)',
        difficulty: 'Especialista',
        instruction: 'Quando encontramos a indicação [ ⌰ | 0.002 | A-B ] no controle de um eixo, o que a notação "A-B" representa?',
        options: [
          'O Datum A é o primário e o Datum B é o secundário em ordem alfabética.',
          'A medição deve subtrair a tolerância de B da tolerância de A.',
          'Um único eixo de rotação comum estabelecido simultaneamente pelos diâmetros A e B apoiados juntos.',
          'A peça deve ser medida duas vezes em tempos separados.'
        ],
        correctOptionIndex: 2,
        commentedSolution: 'Resposta de Especialista! O traço de união "A-B" estabelece um Datum Composto de igual precedência (dois apoios de mancal simultâneos que formam uma única linha de centro de rotação).'
      }
    ]
  }
];
