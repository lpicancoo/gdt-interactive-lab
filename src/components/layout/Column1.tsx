import React from 'react';
import { BookOpen, Target, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useGdtStore } from '../../store/useGdtStore';
import ExerciseEngine from '../ui/ExerciseEngine';

const MODULES = [
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
            <option key={idx + 1} value={idx + 1}>
              Módulo {idx + 1}: {mod}
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
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-lg">Posição Real (ASME Y14.5 vs ISO GPS)</h3>
            <p className="text-slate-600 leading-relaxed text-justify">
              A tolerância de posição define uma zona dentro da qual o eixo ou plano central de uma feature of size (FOS) deve estar contida.
            </p>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-700 mb-1">ASME Y14.5-2018</h4>
              <p className="text-slate-600 text-xs">Foca intensamente no conceito de Envelope de Taylor (Rule #1) e Condição Virtual para garantir montagem.</p>
            </div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-700 mb-1">ISO 1101:2017</h4>
              <p className="text-slate-600 text-xs">Requer o modificador (E) para aplicar o requerimento de envelope. Posição é tratada independentemente do tamanho local, a não ser que (M) ou (L) sejam aplicados.</p>
            </div>
          </div>
        ) : (
          <ExerciseEngine />
        )}
      </div>
    </div>
  );
};

export default Column1;
