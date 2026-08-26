import React from 'react';
import { useGdtStore } from '../../store/useGdtStore';
import { MousePointer2, Settings, Target, Anchor, CheckCircle2 } from 'lucide-react';

const OnboardingTour: React.FC = () => {
  const { onboardingStep, setOnboardingStep, hasInteractedWithCamera, showFabricationErrors, setShowFabricationErrors } = useGdtStore();

  const steps = [
    {
      id: 1,
      title: 'Navegação 3D (Câmera)',
      icon: MousePointer2,
      desc: 'Gire, dê zoom e rotacione o bloco no centro da tela para se acostumar com o visualizador 3D.',
      action: () => (
        <div className="mt-2 text-xs">
          {hasInteractedWithCamera ? (
            <button onClick={() => setOnboardingStep(2)} className="bg-emerald-600 text-white px-3 py-1.5 rounded w-full font-bold">Continuar</button>
          ) : (
            <div className="text-amber-600 font-bold animate-pulse">Aguardando iteração na câmera...</div>
          )}
        </div>
      )
    },
    {
      id: 2,
      title: 'Símbolo de Geometria',
      icon: Settings,
      desc: 'No painel direito, exiba um FCF progressivo. Este é o símbolo da característica. Clique nele para descobrir o que vamos controlar (Posição).',
      action: () => (
        <button onClick={() => setOnboardingStep(3)} className="mt-2 bg-blue-600 text-white px-3 py-1.5 rounded w-full font-bold text-xs">Avançar</button>
      )
    },
    {
      id: 3,
      title: 'Zona de Tolerância',
      icon: Target,
      desc: 'Este é o tamanho da sua zona de tolerância. É o espaço máximo onde o centro do furo pode variar.',
      action: () => (
        <button onClick={() => setOnboardingStep(4)} className="mt-2 bg-blue-600 text-white px-3 py-1.5 rounded w-full font-bold text-xs">Revelar Referencial</button>
      )
    },
    {
      id: 4,
      title: 'O Referencial (Datum)',
      icon: Anchor,
      desc: 'Este é o seu Datum, a sua âncora. No 3D, simulamos a Mesa de Desempeno (Datum Simulator) onde a peça física é encostada.',
      action: () => (
        <div className="mt-2 flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 p-2 rounded cursor-pointer border border-slate-200">
            <input 
              type="checkbox" 
              checked={showFabricationErrors}
              onChange={(e) => setShowFabricationErrors(e.target.checked)}
              className="accent-blue-600"
            />
            Exibir Erros de Fabricação
          </label>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-slate-800 mb-2">Tour de Onboarding</h3>
      {steps.map((step) => {
        const isActive = onboardingStep === step.id;
        const isPast = onboardingStep > step.id;
        if (!isActive && !isPast) return null; // Only show active and past steps

        return (
          <div key={step.id} className="flex flex-col">
            <div className={`p-3 rounded-xl border transition-all flex gap-3 items-start
              ${isActive ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-200 bg-white opacity-60'}
            `}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5
                ${isActive ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'}
              `}>
                {isPast ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
              </div>
              
              <div className="flex-1">
                <h4 className={`text-sm font-semibold ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>{step.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                {isActive && step.action()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingTour;
