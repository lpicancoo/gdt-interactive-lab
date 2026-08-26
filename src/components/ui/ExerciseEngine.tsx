import React, { useState } from 'react';
import { useGdtStore } from '../../store/useGdtStore';
import { CheckCircle2, ChevronRight, Calculator, Crosshair, BoxSelect, Cpu, Target, ShieldAlert, Award } from 'lucide-react';
import OnboardingTour from './OnboardingTour';

interface Mod1Step {
  id: number;
  title: string;
  level: string;
  type: 'interactive' | 'quiz';
  icon: any;
  // Interactive properties
  text?: string;
  // Quiz properties
  scenario?: string;
  options?: string[];
  correctIndex?: number;
  comment?: string;
}

const EXERCISES_MOD_1_DATA: Mod1Step[] = [
  {
    id: 1,
    title: '1. A Armadilha do 2D',
    level: 'Prática 3D',
    type: 'interactive',
    icon: BoxSelect,
    text: 'Selecione "Retilineidade (2D)" no painel direito. Ajuste a "Torção da Face" para o máximo (0.10 mm). Note que a peça torce nos cantos, mas a fatia central continua reta. O sistema APROVA a peça.'
  },
  {
    id: 2,
    title: '2. A Verificação 3D',
    level: 'Prática 3D',
    type: 'interactive',
    icon: Crosshair,
    text: 'Agora, sem mexer na torção, mude a chave para "Planeza (3D)". O envelope verde cobre toda a peça e cruza a malha torcida. A peça REPROVA imediatamente. Isso prova que uma peça reta em uma direção pode não ser plana!'
  },
  {
    id: 3,
    title: '3. O Erro do Estagiário',
    level: 'Quiz',
    type: 'quiz',
    icon: Target,
    scenario: 'Um desenhista alterou a Planeza para [ ⏥ | 0.05 | A ]. Pelas normas, isso está correto?',
    options: ['Sim', 'Não, está errado'],
    correctIndex: 1,
    comment: 'Correto! Tolerâncias de forma avaliam elementos isolados. Elas medem a superfície contra ela mesma, nunca utilizando Datums de referência.'
  },
  {
    id: 4,
    title: '4. A Busca pelo Bônus (A Pegadinha)',
    level: 'Quiz',
    type: 'quiz',
    icon: Calculator,
    scenario: 'Você aprendeu sobre o MMC (Ⓜ) no Módulo 0. Podemos colocar um Ⓜ na Planeza [ ⏥ | 0.05 Ⓜ ] para tentar ganhar tolerância bônus na face?',
    options: ['Sim, é permitido', 'Não, é proibido'],
    correctIndex: 1,
    comment: 'Excelente! Modificadores MMC geram Bônus apenas para "Elementos de Tamanho" (como furos e eixos). Uma superfície plana isolada não tem diâmetro controlável, logo, é proibido usar o Ⓜ.'
  },
  {
    id: 5,
    title: '5. Salvando o Lote',
    level: 'Quiz',
    type: 'quiz',
    icon: Award,
    scenario: 'A placa empenou (0.07 mm do pico ao vale). A Planeza exigida é 0.05 mm. Qual a forma mais inteligente de salvar a peça?',
    options: ['Usinar a face toda', 'Dar um passe leve nos picos'],
    correctIndex: 1,
    comment: 'Resposta de Especialista! A Planeza controla apenas a variação da forma. Rebaixando levemente apenas os picos mais altos, a diferença para o vale cai para dentro dos 0.05 mm, salvando a peça rapidamente.'
  }
];

const EXERCISES_MOD_2_DATA: Mod1Step[] = [
  {
    id: 1,
    title: '1. O Cone Perfeito',
    level: 'Prática 3D',
    type: 'interactive',
    icon: BoxSelect,
    text: 'Ative a chave "Circularidade (2D)". Aumente o slider "Erro de Conicidade" ao máximo, mantendo a ovalização em zero.'
  },
  {
    id: 2,
    title: '2. O Custo do 3D',
    level: 'Prática 3D',
    type: 'interactive',
    icon: Crosshair,
    text: 'Sem alterar os sliders, mude a chave para "Cilindricidade (3D)".'
  },
  {
    id: 3,
    title: '3. Uso de Datums',
    level: 'Quiz',
    type: 'quiz',
    icon: Target,
    scenario: 'Para inspecionar um eixo longo, um metrologista quer adicionar o centro da peça como Datum A no FCF de Cilindricidade. Isso é correto segundo as normas?',
    options: ['Sim', 'Não'],
    correctIndex: 1,
    comment: 'Correto! Por serem controles de forma, Circularidade e Cilindricidade medem a superfície contra ela mesma. NUNCA utilizamos Datums nessas tolerâncias.'
  },
  {
    id: 4,
    title: '4. O Desafio da Vedação',
    level: 'Quiz',
    type: 'quiz',
    icon: Calculator,
    scenario: 'Um pino precisa deslizar perfeitamente dentro de uma bucha hidráulica de alta precisão, sem vazar óleo por nenhuma parte do seu comprimento longo. Qual controle você especifica?',
    options: ['Circularidade (◯)', 'Cilindricidade (⌭)'],
    correctIndex: 1,
    comment: 'Exato! Como o óleo não pode vazar por toda a extensão da peça, precisamos do controle de superfície total (3D) que a Cilindricidade garante.'
  },
  {
    id: 5,
    title: '5. MMC em Eixos',
    level: 'Quiz',
    type: 'quiz',
    icon: Award,
    scenario: 'O eixo tem um diâmetro de 50 mm. O projetista sugeriu colocar um modificador Ⓜ [ ⌭ | 0.05 Ⓜ ] para dar bônus à manufatura. É permitido?',
    options: ['Permitido', 'Proibido'],
    correctIndex: 1,
    comment: 'Perfeito! Mesmo o eixo sendo um elemento de tamanho, a norma proíbe aplicar modificadores de material (MMC/LMC) em tolerâncias de forma. A tolerância de 0.05 mm permanece fixa, não importa o diâmetro da peça.'
  }
];

const EXERCISES_MOD_3_DATA: Mod1Step[] = [
  {
    id: 1,
    title: '1. Inclinando a Peça',
    level: 'Prática 3D',
    type: 'interactive',
    icon: BoxSelect,
    text: 'Ajuste o slider de "Inclinação da Face" para 0.08 mm. Observe a face superior da malha 3D atravessar os planos verdes paralelos. O sistema deve acusar a reprovação.'
  },
  {
    id: 2,
    title: '2. A Necessidade do Datum',
    level: 'Quiz',
    type: 'quiz',
    icon: Target,
    scenario: 'Um colega desenhista enviou para a fábrica um desenho com o quadro [ // | 0.05 ] (sem a letra A no final). A fábrica pode produzir a peça?',
    options: ['Sim, a fábrica assume a base', 'Não, falta o referencial'],
    correctIndex: 1,
    comment: 'Correto! É impossível inspecionar paralelismo sem saber paralelo a quê. Se o Datum for omitido, a peça fica solta no espaço, impossibilitando qualquer medição confiável.'
  },
  {
    id: 3,
    title: '3. Forma vs Orientação',
    level: 'Quiz',
    type: 'quiz',
    icon: Crosshair,
    scenario: 'Nossa especificação é [ // | 0.05 | A ]. Se a peça for fresada perfeitamente paralela à base, mas a face superior estiver curvada/empenada com 0.08 mm de profundidade, ela é aprovada?',
    options: ['Sim', 'Não'],
    correctIndex: 1,
    comment: 'Exato! Uma tolerância de orientação também controla a forma da superfície. Para a face caber dentro da zona de 0.05 mm, o empenamento (forma) dela não pode passar de 0.05 mm de jeito nenhum!'
  },
  {
    id: 4,
    title: '4. Configuração de Medição',
    level: 'Quiz',
    type: 'quiz',
    icon: Cpu,
    scenario: 'Como um inspetor de qualidade faria essa medição na prática em uma bancada tradicional?',
    options: ['Paquímetro nas duas pontas', 'Apoiar a base na Mesa de Desempeno e usar Relógio Comparador em cima'],
    correctIndex: 1,
    comment: 'Resposta de Especialista! O paquímetro mede tamanho, não orientação. A mesa de desempeno atua fisicamente como o Simulador do Datum A, restringindo os graus de liberdade para que o relógio varra a superfície e capture a inclinação real.'
  },
  {
    id: 5,
    title: '5. Modificador de Material',
    level: 'Quiz',
    type: 'quiz',
    icon: Award,
    scenario: 'A superfície superior que estamos controlando pode receber o modificador de Máximo Material (Ⓜ) logo após o valor de tolerância? Ex: [ // | 0.05 Ⓜ | A ].',
    options: ['Sim', 'Não'],
    correctIndex: 1,
    comment: 'Perfeito! A face de um bloco não é um "Elemento de Tamanho" (Feature of Size). Como não é um furo ou eixo com diâmetro, não existe condição de máximo material, proibindo o uso do modificador Ⓜ nesta superfície.'
  }
];

const EXERCISES_MOD_4_DATA: Mod1Step[] = [
  {
    id: 1,
    title: '1. Inclinando o Suporte',
    level: 'Prática 3D',
    type: 'interactive',
    icon: BoxSelect,
    text: 'Ajuste o slider de "Erro Angular da Face" para +0.06 mm. A face vertical vai se inclinar e romper os planos verdes de 90°.'
  },
  {
    id: 2,
    title: '2. Tolerância Angular Convencional',
    level: 'Quiz',
    type: 'quiz',
    icon: Target,
    scenario: 'Um torneiro mecânico perguntou por que você não colocou 90° ± 0.5° no desenho ao invés do quadro de Perpendicularidade [ ⟂ | 0.05 | A ]. Qual é o problema do ângulo ±?',
    options: ['A zona de erro em graus aumenta em formato de leque', 'O símbolo de graus é obsoleto na ISO'],
    correctIndex: 0,
    comment: 'Correto! Uma tolerância de ± 0.5° cria uma zona em forma de leque (cone): quanto mais alta for a peça, maior será a folga no topo, gerando montagens imprevisíveis. A zona de GD&T usa planos paralelos, garantindo o mesmo erro máximo independentemente da altura.'
  },
  {
    id: 3,
    title: '3. Forma vs Orientação',
    level: 'Quiz',
    type: 'quiz',
    icon: Crosshair,
    scenario: 'O suporte não está inclinado (0 graus de erro), mas a aba vertical torceu no forno e ganhou uma "barriga" de 0.08 mm. O desenho pede [ ⟂ | 0.05 | A ]. Ele aprova?',
    options: ['Sim, pois o ângulo é 90°', 'Não, a barriga reprova a peça'],
    correctIndex: 1,
    comment: 'Exato! Toda tolerância de orientação também controla a forma indiretamente. Se a "barriga" (falta de planeza) tem 0.08 mm, é fisicamente impossível a face inteira caber dentro de uma zona vertical de 0.05 mm.'
  },
  {
    id: 4,
    title: '4. Eixos e Pinos',
    level: 'Quiz',
    type: 'quiz',
    icon: Cpu,
    scenario: 'Se, ao invés de uma face plana, estivéssemos controlando um pino cilíndrico perpendicular a uma base, o quadro deveria mudar?',
    options: ['Sim, adicionando o símbolo de diâmetro ⌀', 'Não, continua igual'],
    correctIndex: 0,
    comment: 'Resposta perfeita! Se a característica fosse um pino (um eixo de revolução), a zona de tolerância deixaria de ser formada por dois planos paralelos e passaria a ser um Cilindro perfeito a 90°. O FCF ficaria [ ⟂ | ⌀ 0.05 | A ].'
  },
  {
    id: 5,
    title: '5. Chão de Fábrica (Metrologia)',
    level: 'Quiz',
    type: 'quiz',
    icon: Award,
    scenario: 'Como o inspetor deve posicionar a peça no laboratório de controle de qualidade para testar o Referencial A?',
    options: ['Apoiar a base na mesa de desempeno', 'Prender a aba em uma morsa'],
    correctIndex: 0,
    comment: 'Excelente! O Datum Primário "A" exige que a base da peça (superfície imperfeita) seja estabilizada sobre o simulador de Datum (a mesa de desempeno perfeita) com no mínimo 3 pontos de contato antes de iniciarmos a varredura da face vertical.'
  }
];

const EXERCISES_MOD_5_DATA: Mod1Step[] = [
  {
    id: 1,
    title: '1. A Regra do 3-2-1',
    level: 'Prática 3D',
    type: 'interactive',
    icon: BoxSelect,
    text: 'Antes de medir os furos da flange, precisamos travá-la no espaço 3D. Clique na célula do FCF que restringe a transição Z e as rotações u, v (O Datum Primário).'
  },
  {
    id: 2,
    title: '2. A Mágica do Bônus',
    level: 'Prática 3D',
    type: 'interactive',
    icon: Calculator,
    text: 'Mova o slider "Diâmetro Usinado" para 10.35 mm. Observe o cilindro verde crescer na tela e preencha a calculadora abaixo com a nova Tolerância Total permitida.',
    comment: 'Correto! Como o furo ficou 0.35 mm maior que o MMC (10.00 mm), esse valor é somado aos 0.20 mm originais, resultando em 0.55 mm de margem de erro posicional.'
  },
  {
    id: 3,
    title: '3. Fuga do Eixo',
    level: 'Prática 3D',
    type: 'interactive',
    icon: Crosshair,
    text: 'Agora, sem mexer no diâmetro (mantenha em 10.35 mm), mova os sliders de desvio X e Y simulando que a ferramenta "escorregou" durante a furação. Veja até onde você consegue ir antes da peça reprovar.'
  },
  {
    id: 4,
    title: '4. O Calibrador Funcional (Go/No-Go)',
    level: 'Quiz',
    type: 'quiz',
    icon: Cpu,
    scenario: 'Para evitar medir furo por furo com a máquina CMM, o operador de qualidade quer fabricar uma base com 4 pinos fixos. Se a flange encaixar nesses 4 pinos de uma vez, ela está aprovada. Qual deve ser o diâmetro de cada pino calibrador?',
    options: ['10.20 mm', '9.80 mm'],
    correctIndex: 1,
    comment: 'Excelente! O calibrador é usinado na Condição Virtual (Virtual Condition). É o pior cenário possível de montagem: O menor furo permitido (MMC = 10.00) menos a tolerância posicional (0.20), resultando em pinos exatos de 9.80 mm de diâmetro.'
  },
  {
    id: 5,
    title: '5. Modificador no Referencial',
    level: 'Quiz',
    type: 'quiz',
    icon: Award,
    scenario: 'O referencial Secundário no quadro é B Ⓜ. Este furo piloto central também recebeu um modificador de material. O que acontece se o furo central for usinado com um diâmetro maior?',
    options: ['O padrão de 4 furos pode "escorregar" como um todo', 'A tolerância dos 4 furos aumenta individualmente'],
    correctIndex: 0,
    comment: 'Resposta de Especialista! O modificador MMB (Maximum Material Boundary) aplicado ao Datum B cria uma folga entre a peça e o pino centralizador do dispositivo de medição. Isso permite que a peça inteira sofra um deslocamento global (shift), salvando peças que estariam reprovadas em um alinhamento rígido.'
  }
];

const EXERCISES_MOD_6_DATA: Mod1Step[] = [
  {
    id: 1,
    title: '1. O Efeito da Excentricidade',
    level: 'Prática 3D',
    type: 'interactive',
    icon: BoxSelect,
    text: 'Aumente o slider "Erro de Excentricidade" para 0.03 mm. Observe no 3D como a superfície central começa a oscilar "mancando", empurrando o relógio comparador para cima e para baixo.'
  },
  {
    id: 2,
    title: '2. O Que Causa a Oscilação?',
    level: 'Quiz',
    type: 'quiz',
    icon: Target,
    scenario: 'O eixo foi usinado sem nenhuma excentricidade (centro perfeito), mas a ferramenta desgastada deixou a peça ovalada em 0.06 mm. O Batimento Circular aprova essa peça?',
    options: ['Sim, pois está centralizada', 'Não, a ovalização reprova'],
    correctIndex: 1,
    comment: 'Correto! O Batimento é um controle duplo. O relógio comparador sobe e desce tanto por erros de centro (excentricidade) quanto por erros de forma (circularidade). Uma ovalização de 0.06 mm gerará uma oscilação de 0.06 mm, reprovando o limite de 0.05 mm.'
  },
  {
    id: 3,
    title: '3. Batimento Circular vs Total',
    level: 'Quiz',
    type: 'quiz',
    icon: Crosshair,
    scenario: 'Se usássemos o símbolo de Batimento Total [ ⌰ ] ao invés do Circular [ ↗ ], qual seria a diferença na medição?',
    options: ['Nenhuma, medem a mesma coisa', 'O relógio varre todo o comprimento do cilindro'],
    correctIndex: 1,
    comment: 'Resposta de Especialista! O Batimento Circular avalia apenas fatias individuais 2D (seções transversais). O Batimento Total exige que o relógio comparador deslize por toda a extensão do cilindro 3D simultaneamente, controlando também a cilindricidade e a conicidade.'
  },
  {
    id: 4,
    title: '4. O Eixo de Referência A-B',
    level: 'Quiz',
    type: 'quiz',
    icon: Cpu,
    scenario: 'Por que usamos um Datum composto "A-B" em vez de apenas "A"?',
    options: ['Para alinhar a peça por dois mancais', 'Para dar bônus de material'],
    correctIndex: 0,
    comment: 'Exato! Um eixo de transmissão longo balançaria se fosse referenciado por apenas uma ponta. Apoiar nos dois mancais (A e B) ao mesmo tempo simula perfeitamente como o eixo vai girar na máquina real.'
  },
  {
    id: 5,
    title: '5. MMC em Batimento',
    level: 'Quiz',
    type: 'quiz',
    icon: Award,
    scenario: 'Você precisa que o eixo passe na inspeção a todo custo. É permitido aplicar o modificador de Máximo Material Ⓜ na tolerância de batimento? Ex: [ ↗ | 0.05 Ⓜ | A-B ].',
    options: ['Sim, se for FOS', 'Não, é proibido'],
    correctIndex: 1,
    comment: 'Perfeito! A norma ASME e a ISO GPS proíbem o uso de modificadores de estado de material (MMC/LMC) em tolerâncias de batimento (Runout). A tolerância deve ser aplicada sempre na condição independente do tamanho (RFS).'
  }
];

const EXERCISES_MOD_7_DATA: Mod1Step[] = [
  {
    id: 1,
    title: '1. Deformando a Superfície',
    level: 'Prática 3D',
    type: 'interactive',
    icon: BoxSelect,
    text: 'Ajuste o slider "Desvio Máximo de Pico" para +0.15 mm. Observe no 3D o mapa de calor mudar para vermelho onde a malha ultrapassa o envelope verde superior.'
  },
  {
    id: 2,
    title: '2. Perfil de Linha vs Perfil de Superfície',
    level: 'Quiz',
    type: 'quiz',
    icon: Target,
    scenario: 'Se trocássemos o símbolo de Perfil de Superfície [ ⌓ ] pelo símbolo de Perfil de Linha [ ⌒ ], como seria a inspeção por scanner ou CMM?',
    options: ['Apenas em fatias 2D individuais da curva', 'A superfície 3D inteira continuaria sendo measured'],
    correctIndex: 0,
    comment: 'Correto! O Perfil de Linha (⌒) atua em cortes transversais 2D individuais (como passar um gabarito de chapa em uma seção). O Perfil de Superfície (⌓) engloba todos os pontos tridimensionais da face curva simultaneamente.'
  },
  {
    id: 3,
    title: '3. Perfil Sem Datums',
    level: 'Quiz',
    type: 'quiz',
    icon: Crosshair,
    scenario: 'Um desenho de um molde de plástico exibe [ ⌓ | 0.20 ] sem nenhum Datum. O que esse quadro está controlando?',
    options: ['Apenas a forma/ondulação da curva', 'A posição da curva em relação à base'],
    correctIndex: 0,
    comment: 'Exato! Sem Datums, a zona de tolerância pode flutuar e girar livremente no espaço para se ajustar à peça, controlando unicamente a suavidade e a forma da superfície (atua como uma \'Planeza para superfícies curvas\').'
  },
  {
    id: 4,
    title: '4. Zonas Unilaterais (Modificador Ⓤ)',
    level: 'Quiz',
    type: 'quiz',
    icon: Cpu,
    scenario: 'Na norma ASME Y14.5, um engenheiro adicionou o modificador Ⓤ no perfil: [ ⌓ | 0.20 Ⓤ 0.20 | A ]. O que isso significa para a usinagem?',
    options: ['Toda a tolerância de 0.20 mm está para FORA do material', 'A tolerância foi dividida igualmente ±0.10 mm'],
    correctIndex: 0,
    comment: 'Resposta de Especialista! O modificador Ⓤ (Unequally Disposed Profile) permite deslocar a zona. O valor após o Ⓤ indica quanto da tolerância está direcionado para fora da peça (adicionando material), crucial para operações de fundição que ainda serão usinadas.'
  },
  {
    id: 5,
    title: '5. Comparação com CMM / Escaneamento 3D',
    level: 'Quiz',
    type: 'quiz',
    icon: Award,
    scenario: 'Como a metrologia moderna normalmente inspeciona uma tolerância de Perfil de Superfície em peças automotivas ou aeroespaciais?',
    options: ['Paquímetro e goniômetro', 'Escaneamento a Laser 3D comparando a nuvem de pontos com o CAD'],
    correctIndex: 1,
    comment: 'Perfeito! O software de escaneamento 3D alinha a nuvem de pontos capturada com o modelo CAD teórico (usando os Datums A e B) e gera um mapa de cores idêntico ao que você manipulou no nosso laboratório.'
  }
];

const ExerciseEngine: React.FC = () => {
  const { 
    activeModule, activeExercise, setActiveExercise, 
    exerciseProgress, setExerciseProgress,
    holeDiameter, deviationX, deviationY,
    warpTwist, formType,
    cylinderFormType, errorTaper,
    tiltZ, warpForm,
    angularError, selectedDatumInFCF,
    eccentricity, circularityError,
    peakDeviation, valleySink
  } = useGdtStore();

  const [ex2Input, setEx2Input] = useState('');
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  if (activeModule === 0) {
    return <OnboardingTour />;
  }

  // Helper renderer for hybrid steps (Modules 1, 2, 3, 4, 5, 6 and 7)
  const renderHybridModule = (title: string, data: Mod1Step[], modId: number) => {
    const handleSelectOption = (exId: number, optIdx: number, correctIdx: number) => {
      setUserAnswers((prev) => ({ ...prev, [exId]: optIdx }));
      const isCorrect = optIdx === correctIdx;
      setExerciseProgress(exId, isCorrect);
    };

    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-slate-800 text-base">{title}</h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Passo {activeExercise} de 5
          </span>
        </div>

        {data.map((ex) => {
          const isActive = activeExercise === ex.id;
          const isPast = activeExercise > ex.id || exerciseProgress[ex.id] !== undefined;
          const selectedAnswer = userAnswers[ex.id];
          const hasAnswered = selectedAnswer !== undefined;

          return (
            <div key={ex.id} className="flex flex-col">
              {/* Header / Stepper Accordion */}
              <div 
                onClick={() => {
                  if (isPast || isActive || ex.id <= activeExercise) {
                    setActiveExercise(ex.id);
                  }
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                  isActive ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  exerciseProgress[ex.id] === true 
                    ? 'bg-emerald-500 text-white' 
                    : exerciseProgress[ex.id] === false 
                      ? 'bg-rose-500 text-white' 
                      : isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 text-slate-400'
                }`}>
                  {exerciseProgress[ex.id] === true ? (
                    <CheckCircle2 size={16} />
                  ) : exerciseProgress[ex.id] === false ? (
                    <ShieldAlert size={16} />
                  ) : (
                    <ex.icon size={16} />
                  )}
                </div>

                <div className="flex-1 flex justify-between items-center">
                  <h4 className={`text-sm font-semibold ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>
                    {ex.title}
                  </h4>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    ex.type === 'interactive' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {ex.level}
                  </span>
                </div>

                {isActive && <ChevronRight size={18} className="text-blue-600 shrink-0" />}
              </div>

              {/* Active Exercise UI */}
              {isActive && (
                <div className="mt-2 p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-3.5 shadow-sm">
                  {/* Step 1, 2 & 3: Interactive 3D Challenges */}
                  {ex.type === 'interactive' && (
                    <>
                      <p className="text-slate-700 leading-relaxed text-sm font-medium">
                        {ex.text}
                      </p>

                      {/* Custom Input for Module 5 Step 2 */}
                      {modId === 5 && ex.id === 2 && (
                        <div className="space-y-3 pt-1">
                          {!exerciseProgress[2] && (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                step="0.01"
                                placeholder="Ex: 0.55"
                                value={ex2Input}
                                onChange={(e) => setEx2Input(e.target.value)}
                                className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              />
                              <button
                                onClick={() => {
                                  const val = parseFloat(ex2Input);
                                  if (val === 0.55 || val === 0.550) {
                                    setExerciseProgress(2, true);
                                  } else {
                                    setExerciseProgress(2, false);
                                  }
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm"
                              >
                                Verificar
                              </button>
                            </div>
                          )}

                          {exerciseProgress[2] === false && (
                            <p className="text-xs text-rose-600 font-bold">
                              Incorreto. Tente novamente! Dica: Base (0.20) + Bônus (10.35 - 10.00 = 0.35) = 0.55 mm.
                            </p>
                          )}
                        </div>
                      )}

                      {exerciseProgress[ex.id] ? (
                        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 space-y-2">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-700 text-xs">
                            <CheckCircle2 size={16} /> Interatividade Concluída com Sucesso!
                          </div>
                          <p className="text-xs text-emerald-900 font-normal">
                            {modId === 1 
                              ? (ex.id === 1 
                                  ? 'A fatia central Z=0 permaneceu dentro da zona, aprovando a peça na Retilineidade.'
                                  : 'O envelope tridimensional detectou a torção dos cantos e reprovou a peça na Planeza.')
                              : modId === 2
                                ? (ex.id === 1
                                    ? 'A conicidade vira um cone, mas cada fatia circular 2D permanece aprovada.'
                                    : 'O envelope 3D de Cilindricidade detectou a conicidade e reprovou a peça!')
                                : modId === 3
                                  ? 'A inclinação fez a face cruzar a zona verde paralela ao Datum A, acusando a reprovação com sucesso!'
                                  : modId === 4
                                    ? 'A inclinação angular fez a aba vertical cruzar os planos de 90°, acusando a reprovação com sucesso!'
                                    : modId === 5
                                      ? (ex.id === 1
                                          ? 'Excelente! Você selecionou o Datum A, travando o referencial primário.'
                                          : ex.id === 2
                                            ? 'Cálculo Perfeito! A tolerância total saltou para 0.55 mm graças ao bônus.'
                                            : 'A peça reprovou! O desvio posicional radial ultrapassou a zona bônus de 0.55 mm.')
                                      : modId === 6
                                        ? 'A excentricidade deslocou o centro de rotação, fazendo o relógio comparador oscilar além do limite de 0.05 mm!'
                                        : 'O pico ultrapassou a casca verde de 0.20 mm, ativando o mapa de calor vermelho e reprovando a peça!'
                            }
                          </p>

                          {/* Correção Comentada for Module 5 Step 2 */}
                          {modId === 5 && ex.id === 2 && (
                            <div className="mt-2 p-3 bg-slate-100 rounded-lg text-xs border-l-4 border-blue-500 space-y-1">
                              <div className="font-bold text-blue-900 flex items-center gap-1.5 text-xs">
                                <span>💡</span> Correção Comentada:
                              </div>
                              <p className="text-slate-700 leading-relaxed font-normal">
                                {ex.comment}
                              </p>
                            </div>
                          )}

                          <button
                            onClick={() => setActiveExercise(ex.id + 1)}
                            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                          >
                            Avançar para o próximo desafio <ChevronRight size={14} />
                          </button>
                        </div>
                      ) : (
                        ex.id !== 2 && (
                          <div className="p-3 bg-amber-50 text-amber-700 font-medium rounded-lg border border-amber-200 animate-pulse text-center text-xs">
                            {modId === 1 
                              ? (ex.id === 1 
                                  ? 'Aguardando: Selecione "Retilineidade (2D)" e aumente a Torção da Face (>= 0.08mm)...'
                                  : 'Aguardando: Alterne para "Planeza (3D)" no topo da Seção 1 à direita...')
                              : modId === 2
                                ? (ex.id === 1
                                    ? 'Aguardando: Ative "Circularidade (2D)" e aumente o Erro de Conicidade (>= 0.08mm)...'
                                    : 'Aguardando: Alterne para "Cilindricidade (3D)" no topo da Seção 1 à direita...')
                                : modId === 3
                                  ? 'Aguardando: Ajuste o slider "Inclinação da Face" para >= 0.08 mm...'
                                  : modId === 4
                                    ? 'Aguardando: Ajuste o slider "Erro Angular da Face" para +0.06 mm ou mais...'
                                    : modId === 5
                                      ? (ex.id === 1
                                          ? 'Aguardando: Clique na célula [ A ] do Feature Control Frame no painel à direita...'
                                          : 'Aguardando: Mova os sliders de desvio X e Y até a badge mudar para REPROVADO...')
                                      : modId === 6
                                        ? 'Aguardando: Ajuste o slider "Erro de Excentricidade" para 0.03 mm ou mais...'
                                        : 'Aguardando: Ajuste o slider "Desvio Máximo de Pico" para +0.15 mm ou mais...'
                            }
                          </div>
                        )
                      )}
                    </>
                  )}

                  {/* Step 4 & 5: Quizzes with Commented Feedback */}
                  {ex.type === 'quiz' && (
                    <>
                      <p className="text-slate-700 leading-relaxed text-sm font-medium">
                        {ex.scenario}
                      </p>

                      {/* Option Buttons */}
                      <div className="flex flex-col gap-2 pt-1">
                        {ex.options?.map((optText, optIdx) => {
                          const isSelected = selectedAnswer === optIdx;
                          const isCorrect = optIdx === ex.correctIndex;

                          let btnStyle = "bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/40";
                          if (hasAnswered) {
                            if (isSelected) {
                              btnStyle = isCorrect 
                                ? "bg-emerald-600 text-white border-emerald-700 font-bold shadow-sm" 
                                : "bg-rose-600 text-white border-rose-700 font-bold shadow-sm";
                            } else if (isCorrect) {
                              btnStyle = "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold";
                            } else {
                              btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-50 cursor-not-allowed";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={hasAnswered}
                              onClick={() => handleSelectOption(ex.id, optIdx, ex.correctIndex!)}
                              className={`w-full py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all text-left flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{optText}</span>
                              {hasAnswered && isSelected && (
                                <span className="text-[11px] uppercase tracking-wider font-bold">
                                  {isCorrect ? '✓ Correto' : '✕ Errado'}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Correção Comentada */}
                      {hasAnswered && (
                        <div className="mt-4 p-3 bg-slate-100 rounded-lg text-xs border-l-4 border-blue-500 space-y-1 animate-fadeIn">
                          <div className="font-bold text-blue-900 flex items-center gap-1.5 text-xs">
                            <span>💡</span> Correção Comentada:
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            {ex.comment}
                          </p>
                        </div>
                      )}

                      {/* Advance Button */}
                      {hasAnswered && (
                        <div className="pt-2">
                          {ex.id < 5 ? (
                            <button
                              onClick={() => {
                                setActiveExercise(ex.id + 1);
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                            >
                              Avançar para o próximo desafio <ChevronRight size={14} />
                            </button>
                          ) : (
                            <div className="p-3 bg-emerald-50 text-emerald-800 font-bold rounded-lg border border-emerald-200 text-center text-xs flex items-center justify-center gap-2">
                              <CheckCircle2 size={16} /> Parabéns! Você concluiu todos os exercícios do Módulo {modId}!
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Module 1 Hybrid Pipeline Implementation
  if (activeModule === 1) {
    const isStep1Done = formType === 'retilineidade' && warpTwist >= 0.08;
    if (activeExercise === 1 && isStep1Done && !exerciseProgress[1]) {
      setExerciseProgress(1, true);
    }

    const isStep2Done = formType === 'planeza' && warpTwist >= 0.08;
    if (activeExercise === 2 && isStep2Done && !exerciseProgress[2]) {
      setExerciseProgress(2, true);
    }

    return renderHybridModule('Exercícios: Módulo 1 (Planeza / Retilineidade)', EXERCISES_MOD_1_DATA, 1);
  }

  // Module 2 Hybrid Pipeline Implementation (Circularidade / Cilindricidade)
  if (activeModule === 2) {
    const isMod2Step1Done = cylinderFormType === 'circularidade' && errorTaper >= 0.08;
    if (activeExercise === 1 && isMod2Step1Done && !exerciseProgress[1]) {
      setExerciseProgress(1, true);
    }

    const isMod2Step2Done = cylinderFormType === 'cilindricidade' && errorTaper >= 0.08;
    if (activeExercise === 2 && isMod2Step2Done && !exerciseProgress[2]) {
      setExerciseProgress(2, true);
    }

    return renderHybridModule('Exercícios: Módulo 2 (Circularidade / Cilindricidade)', EXERCISES_MOD_2_DATA, 2);
  }

  // Module 3 Hybrid Pipeline Implementation (Paralelismo)
  if (activeModule === 3) {
    const isMod3Step1Done = tiltZ >= 0.08 && (tiltZ + warpForm) > 0.05;
    if (activeExercise === 1 && isMod3Step1Done && !exerciseProgress[1]) {
      setExerciseProgress(1, true);
    }

    return renderHybridModule('Exercícios: Módulo 3 (Paralelismo)', EXERCISES_MOD_3_DATA, 3);
  }

  // Module 4 Hybrid Pipeline Implementation (Perpendicularidade)
  if (activeModule === 4) {
    const isMod4Step1Done = Math.abs(angularError) >= 0.06 && (Math.abs(angularError) + warpForm) > 0.05;
    if (activeExercise === 1 && isMod4Step1Done && !exerciseProgress[1]) {
      setExerciseProgress(1, true);
    }

    return renderHybridModule('Exercícios: Módulo 4 (Perpendicularidade)', EXERCISES_MOD_4_DATA, 4);
  }

  // Module 5 Hybrid Pipeline Implementation (Posição Real)
  if (activeModule === 5) {
    // Step 1: User clicked Datum A cell in FCF
    if (activeExercise === 1 && selectedDatumInFCF === 'A' && !exerciseProgress[1]) {
      setExerciseProgress(1, true);
    }

    // Step 3: User moved X/Y sliders until piece fails (REPROVADO)
    const measuredDev = 2 * Math.sqrt(deviationX ** 2 + deviationY ** 2);
    const bonus = Math.max(0, holeDiameter - 10.00);
    const totalTol = 0.200 + bonus;
    if (activeExercise === 3 && measuredDev > totalTol && !exerciseProgress[3]) {
      setExerciseProgress(3, true);
    }

    return renderHybridModule('Exercícios: Módulo 5 (Posição Real)', EXERCISES_MOD_5_DATA, 5);
  }

  // Module 6 Hybrid Pipeline Implementation (Batimento Circular)
  if (activeModule === 6) {
    const runoutDev = (eccentricity * 2) + circularityError;
    const isMod6Step1Done = eccentricity >= 0.03 && runoutDev > 0.05;
    if (activeExercise === 1 && isMod6Step1Done && !exerciseProgress[1]) {
      setExerciseProgress(1, true);
    }

    return renderHybridModule('Exercícios: Módulo 6 (Batimento Circular)', EXERCISES_MOD_6_DATA, 6);
  }

  // Module 7 Hybrid Pipeline Implementation (Perfil de Superfície)
  if (activeModule === 7) {
    const profileDev = Math.abs(peakDeviation) + Math.abs(valleySink);
    const isMod7Step1Done = peakDeviation >= 0.15 && profileDev > 0.20;
    if (activeExercise === 1 && isMod7Step1Done && !exerciseProgress[1]) {
      setExerciseProgress(1, true);
    }

    return renderHybridModule('Exercícios: Módulo 7 (Perfil de Superfície)', EXERCISES_MOD_7_DATA, 7);
  }

  return null;
};

export default ExerciseEngine;
