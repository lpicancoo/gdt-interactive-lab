import { BookOpen, Target } from 'lucide-react';
import { useGdtStore } from '../../store/useGdtStore';
import ExerciseEngine from '../ui/ExerciseEngine';

const MODULES = [
  'Onboarding e Fundamentos', // Módulo 0
  'Forma (Retitude, Planeza)',
  'Forma (Circularidade, Cilindricidade)',
  'Orientação (Paralelismo)',
  'Orientação (Perpendicularidade)',
  'Posição Real',
  'Batimento Circular',
  'Batimento Total',
  'Perfil de Superfície',
];

const Column1: React.FC = () => {
  const { activeModule, setActiveModule, activeTab, setActiveTab } = useGdtStore();

  return (
    <div className="flex flex-col h-full text-sm">
      {/* Header / Module Selector */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50">
        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Módulo Atual</label>
        <select 
          className="w-full bg-white border border-slate-300 text-slate-800 rounded-md py-1.5 px-2 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={activeModule}
          onChange={(e) => setActiveModule(Number(e.target.value))}
        >
          {MODULES.map((mod, idx) => (
            <option key={idx} value={idx}>
              Módulo {idx}: {mod}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-medium transition-colors ${activeTab === 'teoria' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-500 hover:bg-slate-50'}`}
          onClick={() => setActiveTab('teoria')}
        >
          <BookOpen size={16} /> Fundamentação
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-medium transition-colors ${activeTab === 'exercicios' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-500 hover:bg-slate-50'}`}
          onClick={() => setActiveTab('exercicios')}
        >
          <Target size={16} /> Exercícios
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'teoria' ? (
          activeModule === 1 ? (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">Planeza vs. Retilineidade</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Ambas são tolerâncias de forma e não utilizam Datums. A diferença fundamental está na forma como o inspetor (ou a máquina CMM) varre a peça.
              </p>

              {/* Planeza 3D */}
              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200 space-y-2.5">
                <h4 className="font-bold text-blue-900 text-sm flex items-center gap-1.5 border-b border-blue-200 pb-1">
                  <span>⏥</span> Planeza (Controle de Superfície 3D)
                </h4>
                
                <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Inspeção:</strong>
                    <span>A superfície inteira é avaliada simultaneamente.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Zona:</strong>
                    <span>Dois planos paralelos no espaço.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Aplicação:</strong>
                    <span>Faces de blocos de motor, tampas de vedação e cárteres onde não pode haver vazamento.</span>
                  </li>
                </ul>
              </div>

              {/* Retilineidade 2D */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-200 pb-1">
                  <span>⏤</span> Retilineidade (Controle de Seção 2D)
                </h4>
                
                <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-slate-800 shrink-0">• Inspeção:</strong>
                    <span>Apenas uma linha ou seção transversal é avaliada por vez (geralmente arrastando um relógio comparador em uma direção).</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-slate-800 shrink-0">• Zona:</strong>
                    <span>Duas linhas paralelas.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-slate-800 shrink-0">• Aplicação:</strong>
                    <span>Barramentos de guias lineares ou para garantir que um eixo cilíndrico não sofra flexão excessiva.</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : activeModule === 2 ? (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">Circularidade vs Cilindricidade</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Peças cilíndricas, como pistões de motor e eixos de transmissão, sofrem desgaste na usinagem que causam ovalização ou formato de cone. As tolerâncias de forma cilíndrica não usam referências (Datums).
              </p>

              {/* Circularidade 2D */}
              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200 space-y-2.5">
                <h4 className="font-bold text-blue-900 text-sm flex items-center gap-1.5 border-b border-blue-200 pb-1">
                  <span>◯</span> Circularidade (Controle 2D)
                </h4>
                
                <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Inspeção:</strong>
                    <span>Avalia-se apenas uma "fatia" (seção transversal) da peça por vez.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Característica:</strong>
                    <span>Um eixo pode ser cônico ou curvado como uma banana, mas se cada fatia individual for perfeitamente redonda, ele é aprovado em circularidade.</span>
                  </li>
                </ul>
              </div>

              {/* Cilindricidade 3D */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-200 pb-1">
                  <span>⌭</span> Cilindricidade (Controle 3D)
                </h4>
                
                <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-slate-800 shrink-0">• Inspeção:</strong>
                    <span>Avalia a superfície total simultaneamente.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-slate-800 shrink-0">• Característica:</strong>
                    <span>Restringe erros de ovalização, retilineidade e conicidade de uma só vez, sendo uma tolerância muito mais cara e rigorosa para se fabricar.</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : activeModule === 3 ? (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">Módulo 3: Tolerâncias de Orientação</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Entramos na família da Orientação (Paralelismo, Perpendicularidade e Angularidade). A regra de ouro aqui é: <strong className="font-bold text-slate-900">Toda tolerância de orientação EXIGE pelo menos um Datum.</strong>
              </p>

              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200 space-y-2.5">
                <h4 className="font-bold text-blue-900 text-sm border-b border-blue-200 pb-1">
                  Por que usamos Datums aqui?
                </h4>
                
                <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• O Princípio:</strong>
                    <span>Diferente da tolerância de Forma (que mede a superfície contra ela mesma), a Orientação é um controle de <strong className="font-bold text-slate-900">relação</strong>. Você não pode ser paralelo ao "nada".</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• A Âncora:</strong>
                    <span>A restrição ordenada é obtida por meio do Sistema de Referência de Datums (DRF). O Datum atua como uma âncora matemática, travando os graus de liberdade da peça no espaço tridimensional para que a medição seja confiável e repetível.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Na Prática:</strong>
                    <span>O Datum A é a base da peça encostada na mesa de medição. A zona de tolerância verde é criada perfeitamente paralela a esta mesa.</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : activeModule === 4 ? (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">Perpendicularidade e o Ângulo de 90°</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                A Perpendicularidade é um controle de Orientação. Sua função é garantir que uma superfície, eixo ou plano médio esteja a exatos 90° em relação a um Datum.
              </p>

              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200 space-y-2.5">
                <h4 className="font-bold text-blue-900 text-sm border-b border-blue-200 pb-1">
                  A Regra da Dimensão Básica
                </h4>
                
                <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• O Fim do Mais ou Menos:</strong>
                    <span>No GD&T, não usamos tolerâncias como 90° ± 1°. O ângulo de 90° é uma "Dimensão Básica" (teoricamente exata, mostrada num retângulo no desenho).</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• A Zona de Tolerância:</strong>
                    <span>O que controla o erro não é um transferidor medindo graus, mas sim dois planos paralelos virtuais (separados pela tolerância do FCF) travados a 90° do Datum. A face da peça deve caber dentro desse "sanduíche" vertical.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Forma Inclusa:</strong>
                    <span>Para a face caber dentro dessa zona reta e vertical, o controle de Perpendicularidade acaba controlando indiretamente a Planeza da superfície!</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : activeModule === 5 ? (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">Módulo 5: Posição Real (True Position)</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                A Posição Real define uma zona exata no espaço onde o centro de uma característica de tamanho (FOS), como um furo ou um pino, deve estar localizado.
              </p>

              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200 space-y-2.5">
                <h4 className="font-bold text-blue-900 text-sm border-b border-blue-200 pb-1">
                  Por que abandonar o Mais ou Menos (±)?
                </h4>
                
                <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Dimensões Básicas:</strong>
                    <span>Na posição real, as distâncias entre os furos são teóricas e exatas (TEDs), representadas por cotas dentro de retângulos. Elas não têm tolerância de erro.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Zonas Cilíndricas:</strong>
                    <span>O toleranciamento tradicional (±) cria zonas de erro quadradas. A Posição Real cria cilindros perfeitos (⌀ 0.20), oferecendo 57% a mais de área de aprovação para peças funcionais.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Tolerância Bônus (Ⓜ):</strong>
                    <span>O modificador de Máximo Material salva lotes de produção. Se a broca fizer o furo maior (afastando-se do MMC), o pino de montagem terá mais folga para entrar. A norma permite que você converta essa folga extra em um aumento dinâmico do seu cilindro de tolerância!</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : activeModule === 6 ? (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">Módulo 6: Batimento Circular</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                O Batimento (Runout) controla o quanto uma superfície cilíndrica oscila quando a peça gira em torno de um eixo de referência (Datum Axis).
              </p>

              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200 space-y-2.5">
                <h4 className="font-bold text-blue-900 text-sm border-b border-blue-200 pb-1">
                  Um Controle Composto
                </h4>
                
                <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Excentricidade + Forma:</strong>
                    <span>O Batimento é implacável. Se a peça for perfeitamente redonda, mas estiver montada fora de centro, o relógio comparador vai oscilar. Se estiver no centro perfeito, mas for oval, o relógio também vai oscilar.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• FIM (Full Indicator Movement):</strong>
                    <span>A tolerância de 0.05 mm significa que, durante uma volta completa (360°), a diferença entre a leitura máxima e a mínima do relógio não pode passar de 0.05 mm.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• O Eixo Comum (A-B):</strong>
                    <span>É muito comum que eixos sejam apoiados em dois rolamentos. Usamos as duas superfícies simultaneamente (A-B) para estabelecer a linha central de rotação.</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">Módulo 7: Perfil de Superfície</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Como controlar uma peça que não é um plano nem um cilindro perfeito? As cotas tradicionais de raio e ângulo falham em superfícies curvas. O Perfil de Superfície é a solução universal.
              </p>

              <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200 space-y-2.5">
                <h4 className="font-bold text-blue-900 text-sm border-b border-blue-200 pb-1">
                  A Zona de Offset Tridimensional
                </h4>
                
                <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• O Modelo CAD é a Verdade:</strong>
                    <span>Na tolerância de perfil, toda a geometria da peça é definida por "Dimensões Básicas" implícitas que vêm diretamente do arquivo matemático CAD 3D (MBD - Model Based Definition).</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• O Envelope Uniforme:</strong>
                    <span>A tolerância [ ⌓ | 0.20 ] cria duas cascas paralelas imaginárias afastadas 0.10 mm para fora e 0.10 mm para dentro do CAD nominal. Nenhum ponto escaneado da peça física pode escapar dessa faixa.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <strong className="font-bold text-blue-900 shrink-0">• Com ou Sem Datums:</strong>
                    <span>Se o perfil não tiver Datums, ele controla apenas a forma da curva. Quando adicionamos Datums (A e B), ele passa a controlar simultaneamente a forma, a orientação e a localização da curva no conjunto!</span>
                  </li>
                </ul>
              </div>
            </div>
          )
        ) : (
          <ExerciseEngine />
        )}
      </div>
    </div>
  );
};

export default Column1;
