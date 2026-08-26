import React from 'react';
import FeatureControlFrame from '../ui/FeatureControlFrame';
import MetrologyPanel from '../ui/MetrologyPanel';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useGdtStore } from '../../store/useGdtStore';

const Column3: React.FC = () => {
  const { holeDiameter, deviationX, deviationY } = useGdtStore();

  const MMC = 10.00;
  const tolPositionMMC = 0.20;
  const bonus = Math.max(0, holeDiameter - MMC);
  const totalTol = tolPositionMMC + bonus;
  const measuredDeviation = 2 * Math.sqrt(deviationX ** 2 + deviationY ** 2);
  const isPass = measuredDeviation <= totalTol;

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
        <h2 className="font-bold text-slate-800">Inspeção CMM</h2>
        <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1
          ${isPass ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-rose-100 text-rose-700 border border-rose-200'}
        `}>
          {isPass ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
          {isPass ? 'APROVADO' : 'REPROVADO'}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
        
        {/* Section 1: Especificação do Projeto */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3 border-b pb-1">Seção 1: Especificação do Projeto</h3>
          <FeatureControlFrame />
        </div>

        {/* Section 2: Simulação da Peça Fabricada */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3 border-b pb-1">Seção 2: Simulação da Peça Fabricada</h3>
          <MetrologyPanel />
        </div>

        {/* Calculator */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Tolerância (MMC)</span>
            <span className="font-medium mono-nums">0.200</span>
          </div>
          <div className="flex justify-between text-amber-600 font-medium">
            <span>Tolerância Bônus Ⓜ</span>
            <span className="mono-nums">+{bonus.toFixed(3)}</span>
          </div>
          <div className="h-px bg-slate-200 my-1"></div>
          <div className="flex justify-between font-bold text-slate-800">
            <span>Tolerância Total (Zona)</span>
            <span className="mono-nums">{totalTol.toFixed(3)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span className="text-slate-600">Desvio Medido (2 x radial)</span>
            <span className={`mono-nums ${isPass ? 'text-emerald-600' : 'text-rose-600'}`}>{measuredDeviation.toFixed(3)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column3;
