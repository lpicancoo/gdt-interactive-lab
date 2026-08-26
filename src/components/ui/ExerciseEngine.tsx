import React, { useState } from 'react';
import { useGdtStore } from '../../store/useGdtStore';
import { CheckCircle2, ChevronRight, Calculator, Crosshair, BoxSelect, Cpu, Play } from 'lucide-react';
import OnboardingTour from './OnboardingTour';

const EXERCISES_MOD_5 = [
  { id: 1, title: 'Identificação DRF', icon: BoxSelect },
  { id: 2, title: 'Cálculo de Bônus', icon: Calculator },
  { id: 3, title: 'Limites 3D', icon: Crosshair },
  { id: 4, title: 'Análise CMM', icon: Cpu },
  { id: 5, title: 'Calibrador Funcional', icon: CheckCircle2 },
];

const ExerciseEngine: React.FC = () => {
  const { 
    activeModule, activeExercise, setActiveExercise, 
    exerciseProgress, setExerciseProgress,
    setHoleDiameter, setDeviationX, setDeviationY,
    setGaugeAnimationActive
  } = useGdtStore();

  const [ex2Input, setEx2Input] = useState('');
  const [ex4State, setEx4State] = useState([null, null, null]);

  if (activeModule === 0) {
    return <OnboardingTour />;
  }

  if (activeModule !== 5) {
    return (
      <div className="text-center p-6 text-slate-500">
        <p>Exercícios para o módulo {activeModule} não estão disponíveis no MVP.</p>
        <button onClick={() => useGdtStore.getState().setActiveModule(5)} className="mt-4 text-blue-600 font-medium hover:underline">
          Ir para Módulo 5 (Posição Real)
        </button>
      </div>
    );
  }

  const renderActiveExerciseUI = (id: number) => {
    switch(id) {
      case 1:
        return (
          <div className="mt-3 p-3 bg-white rounded border border-slate-200 text-sm">
            <p className="mb-2 text-slate-600"><strong>Tarefa:</strong> Clique na caixa do Datum A no FCF à direita.</p>
            {exerciseProgress[1] ? (
              <div className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 size={16} /> Correto!
              </div>
            ) : (
              <div className="text-amber-600 font-bold">Aguardando clique...</div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="mt-3 p-3 bg-white rounded border border-slate-200 text-sm">
            <p className="mb-2 text-slate-600">
              Se o furo foi usinado a <strong>10.32mm</strong>, qual a tolerância total sabendo que a base é 0.20mm e MMC é 10.00mm?
            </p>
            <div className="flex gap-2">
              <input 
                type="number" step="0.01" value={ex2Input} onChange={e => setEx2Input(e.target.value)}
                className="border border-slate-300 rounded px-2 w-24" placeholder="0.00"
              />
              <button 
                onClick={() => setExerciseProgress(2, parseFloat(ex2Input) === 0.52)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Verificar
              </button>
            </div>
            {exerciseProgress[2] === true && <div className="text-emerald-600 font-bold mt-2 flex items-center gap-1"><CheckCircle2 size={16} /> Correto! (0.52)</div>}
            {exerciseProgress[2] === false && <div className="text-rose-600 font-bold mt-2">Incorreto. Tente novamente.</div>}
          </div>
        );
      case 3:
        return (
          <div className="mt-3 p-3 bg-white rounded border border-slate-200 text-sm">
            <p className="mb-2 text-slate-600">Mova os sliders de Desvio X e Y até o limite exato onde a peça reprova (0.10mm radial).</p>
            <button 
              onClick={() => { setHoleDiameter(10.0); setDeviationX(0); setDeviationY(0); }}
              className="bg-slate-800 text-white px-3 py-1.5 rounded text-xs w-full mb-2"
            >
              Travar em 10.00mm (MMC)
            </button>
            <button 
              onClick={() => setExerciseProgress(3, true)}
              className="bg-emerald-600 text-white px-3 py-1.5 rounded text-xs w-full"
            >
              Marcar como Concluído
            </button>
          </div>
        );
      case 4:
        return (
          <div className="mt-3 bg-white rounded border border-slate-200 text-xs overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr><th className="p-1.5">Furo</th><th className="p-1.5">X, Y</th><th className="p-1.5">Ação</th></tr>
              </thead>
              <tbody>
                {[
                  {d: 10.10, x: 0.05, y: 0.05, ans: true},
                  {d: 10.00, x: 0.15, y: 0.00, ans: false},
                  {d: 10.50, x: 0.25, y: 0.25, ans: true}
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="p-1.5">{row.d}</td>
                    <td className="p-1.5">{row.x}, {row.y}</td>
                    <td className="p-1.5 flex gap-1">
                      <button 
                        onClick={() => {
                          const newSt = [...ex4State];
                          newSt[i] = true;
                          setEx4State(newSt);
                          if (newSt.every((v, idx) => v === [true, false, true][idx])) setExerciseProgress(4, true);
                        }}
                        className={`px-2 py-0.5 rounded ${ex4State[i] === true ? 'bg-emerald-500 text-white' : 'bg-slate-200'}`}
                      >P</button>
                      <button 
                        onClick={() => {
                          const newSt = [...ex4State];
                          newSt[i] = false;
                          setEx4State(newSt);
                          if (newSt.every((v, idx) => v === [true, false, true][idx])) setExerciseProgress(4, true);
                        }}
                        className={`px-2 py-0.5 rounded ${ex4State[i] === false ? 'bg-rose-500 text-white' : 'bg-slate-200'}`}
                      >F</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {exerciseProgress[4] && <div className="p-2 text-emerald-600 font-bold text-center">Tabela Correta!</div>}
          </div>
        );
      case 5:
        return (
          <div className="mt-3 p-3 bg-white rounded border border-slate-200 text-sm text-center">
            <button 
              onClick={() => setGaugeAnimationActive(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold w-full flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <Play size={16} /> Simular Inserção do Calibrador
            </button>
            <p className="mt-2 text-xs text-slate-500">Pinos virtuais (9.80mm) descerão no 3D.</p>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-slate-800 mb-2">Trilha Prática (Posição)</h3>
      {EXERCISES_MOD_5.map((ex) => {
        const isActive = activeExercise === ex.id;
        const isPast = activeExercise > ex.id || exerciseProgress[ex.id];
        
        return (
          <div key={ex.id} className="flex flex-col">
            <div 
              onClick={() => setActiveExercise(ex.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 items-center
                ${isActive ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}
              `}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                ${isActive ? 'bg-blue-600 text-white' : isPast ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}
              `}>
                {isPast ? <CheckCircle2 size={16} /> : <ex.icon size={16} />}
              </div>
              
              <div className="flex-1">
                <h4 className={`text-sm font-semibold ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>{ex.title}</h4>
              </div>
              
              {isActive && <ChevronRight size={18} className="text-blue-600 shrink-0" />}
            </div>
            
            {isActive && renderActiveExerciseUI(ex.id)}
          </div>
        );
      })}
    </div>
  );
};

export default ExerciseEngine;
