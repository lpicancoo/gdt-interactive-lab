import React from 'react';
import { useGdtStore } from '../../store/useGdtStore';
import { MousePointer2, FileText, Target, Anchor, Sliders, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';

const OnboardingTour: React.FC = () => {
  const { 
    onboardingStep, 
    setOnboardingStep, 
    hasInteractedWithCamera
  } = useGdtStore();

  const steps = [
    {
      id: 1,
      title: '1. Explorando a Peça',
      icon: MousePointer2,
      text: (
        <>
          Bem-vindo ao laboratório! Use o mouse para girar, dar zoom e arrastar o bloco 3D no centro da tela. Entender a peça por todos os ângulos é o primeiro passo de um bom projetista.
        </>
      ),
      action: () => (
        <div className="mt-3 flex flex-col gap-2">
          {hasInteractedWithCamera ? (
            <button 
              onClick={() => setOnboardingStep(2)} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg w-full font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              Continuar <ChevronRight size={14} />
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="text-amber-600 font-semibold text-xs animate-pulse bg-amber-50 p-2 rounded border border-amber-200 text-center">
                Interaja com a câmera 3D no centro da tela...
              </div>
              <button 
                onClick={() => setOnboardingStep(2)} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg w-full font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
              >
                Avançar mesmo assim <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      )
    },
    {
      id: 2,
      title: '2. A Especificação do Projeto',
      icon: FileText,
      text: (
        <>
          Olhe para o painel à direita, na "Seção 1". Aquele é o Quadro de Controle de Características (FCF). Ele é a regra de ouro do desenho técnico, ditando exatamente qual é o limite de erro que a peça pode ter para ser aprovada.
        </>
      ),
      action: () => (
        <button 
          onClick={() => setOnboardingStep(3)} 
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          Próximo Passo <ChevronRight size={14} />
        </button>
      )
    },
    {
      id: 3,
      title: '3. Símbolo e Tolerância',
      icon: Target,
      text: (
        <>
          No FCF à direita, o primeiro símbolo (⌖) indica que estamos controlando a <strong className="font-bold text-slate-900">Posição</strong> do furo. O valor (⌀ 0.20) é o tamanho da Zona de Tolerância. Repare no cilindro verde no 3D: o centro do furo real não pode sair de dentro dele!
        </>
      ),
      action: () => (
        <button 
          onClick={() => setOnboardingStep(4)} 
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          Próximo Passo <ChevronRight size={14} />
        </button>
      )
    },
    {
      id: 4,
      title: '4. O Referencial (Datum)',
      icon: Anchor,
      text: (
        <>
          A letra 'A' no final do FCF é o nosso Datum. Ele é a referência perfeita usada para medir a peça. No 3D, representamos o Datum A como um plano azul perfeito (como uma mesa de desempeno), onde a base imperfeita da peça está apoiada.
        </>
      ),
      action: () => (
        <button 
          onClick={() => setOnboardingStep(5)} 
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          Próximo Passo <ChevronRight size={14} />
        </button>
      )
    },
    {
      id: 5,
      title: '5. O Modificador Ⓜ (MMC)',
      icon: Sliders,
      text: (
        <>
          Repare no 'M' circulado no quadro. Ele significa Condição de Máximo Material (MMC). Em um furo, o "máximo de material" da peça acontece quando o furo está no seu menor tamanho permitido. A mágica do GD&T é: se a máquina fizer o furo um pouco maior, a norma te dá um "Bônus" de tolerância geométrica, facilitando a aprovação da peça!
        </>
      ),
      action: () => (
        <button 
          onClick={() => setOnboardingStep(6)} 
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          Próximo Passo <ChevronRight size={14} />
        </button>
      )
    },
    {
      id: 6,
      title: '6. Fabricando a Peça',
      icon: Sliders,
      text: (
        <>
          Agora olhe para a "Seção 2" no painel direito. Aqui você simula o chão de fábrica. Nenhuma máquina é perfeita. Mova os sliders de "Desvios do Eixo" (X e Y) e veja a linha vermelha se mover no 3D. Você está literalmente "errando" a usinagem do furo.
        </>
      ),
      action: () => (
        <button 
          onClick={() => setOnboardingStep(7)} 
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          Próximo Passo <ChevronRight size={14} />
        </button>
      )
    },
    {
      id: 7,
      title: '7. O Veredito Metrológico',
      icon: CheckCircle2,
      text: (
        <>
          Conforme você move os sliders, a calculadora embaixo faz a matemática em tempo real. Se o desvio que você causou sair de dentro do cilindro verde (Tolerância Total), a peça é sumariamente <strong className="font-bold text-rose-600">REPROVADA</strong>. Tente reprovar a peça agora!
        </>
      ),
      action: () => (
        <div className="mt-3 flex flex-col gap-2">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-2.5 rounded-lg font-medium text-center">
            🎉 Onboarding concluído! Experimente os sliders no painel à direita.
          </div>
          <button 
            onClick={() => setOnboardingStep(1)} 
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg w-full font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-300"
          >
            <RotateCcw size={14} /> Reiniciar Tour
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-slate-800 text-base">Tour de Onboarding</h3>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          Passo {onboardingStep} de 7
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step) => {
          const isActive = onboardingStep === step.id;
          const isPast = onboardingStep > step.id;

          return (
            <div 
              key={step.id} 
              className={`p-3.5 rounded-xl border transition-all ${
                isActive 
                  ? 'border-blue-500 bg-blue-50/40 shadow-sm ring-1 ring-blue-400/30' 
                  : isPast 
                    ? 'border-slate-200 bg-white hover:bg-slate-50 cursor-pointer' 
                    : 'border-slate-100 bg-slate-50/50 opacity-60'
              }`}
              onClick={() => {
                if (isPast) setOnboardingStep(step.id);
              }}
            >
              <div className="flex gap-3 items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : isPast 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-200 text-slate-500'
                }`}>
                  {isPast ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
                </div>

                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${
                    isActive ? 'text-blue-900' : isPast ? 'text-slate-800' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </h4>

                  {(isActive || isPast) && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {step.text}
                    </p>
                  )}

                  {isActive && step.action()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingTour;
