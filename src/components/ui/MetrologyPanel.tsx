import React from 'react';
import { useGdtStore } from '../../store/useGdtStore';

const MetrologyPanel: React.FC = () => {
  const { 
    holeDiameter, setHoleDiameter, 
    deviationX, setDeviationX, 
    deviationY, setDeviationY 
  } = useGdtStore();

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <p className="text-xs text-slate-500 mb-4 italic">
          Simule os erros de usinagem na máquina. Estes valores não mudam o projeto, apenas a peça física.
        </p>

        <div className="flex flex-col gap-5">
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Diâmetro Usinado do Furo
              </label>
              <span className="font-mono font-bold text-slate-800">{holeDiameter.toFixed(2)} mm</span>
            </div>
            <input 
              type="range" 
              min="10.00" max="10.50" step="0.01" 
              value={holeDiameter}
              onChange={(e) => setHoleDiameter(parseFloat(e.target.value))}
              className="w-full accent-slate-800"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>10.00 (MMC)</span>
              <span>10.50 (LMC)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Desvios do Eixo de Centro (X, Y)
              </label>
            </div>
            
            <div className="flex flex-col gap-3 bg-white p-3 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <span className="font-bold text-rose-600 text-sm">X:</span>
                <input 
                  type="range" 
                  min="-0.25" max="0.25" step="0.01" 
                  value={deviationX}
                  onChange={(e) => setDeviationX(parseFloat(e.target.value))}
                  className="flex-1 accent-rose-600"
                />
                <span className="font-mono text-xs w-12 text-right">{deviationX > 0 ? '+' : ''}{deviationX.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="font-bold text-rose-600 text-sm">Y:</span>
                <input 
                  type="range" 
                  min="-0.25" max="0.25" step="0.01" 
                  value={deviationY}
                  onChange={(e) => setDeviationY(parseFloat(e.target.value))}
                  className="flex-1 accent-rose-600"
                />
                <span className="font-mono text-xs w-12 text-right">{deviationY > 0 ? '+' : ''}{deviationY.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetrologyPanel;
