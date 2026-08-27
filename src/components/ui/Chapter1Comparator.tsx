import React from 'react';
import { useGdtStore } from '../../store/useGdtStore';
import { ShieldCheck, ShieldAlert, Sparkles, Sliders, ArrowRightLeft } from 'lucide-react';

export const Chapter1Comparator: React.FC = () => {
  const { sliderValues, setSliderValue } = useGdtStore();

  const devX = sliderValues.deviationX ?? 0.000;
  const devY = sliderValues.deviationY ?? 0.000;

  const absX = Math.abs(devX);
  const absY = Math.abs(devY);

  // Linear ± System verdict (Square zone: max dev 0.005)
  const isLinearPass = absX <= 0.005001 && absY <= 0.005001;

  // GD&T ⌀ System verdict (Cylindrical zone: 2 * radial <= 0.014)
  const radialDist = 2 * Math.sqrt(devX * devX + devY * devY);
  const isGdtPass = radialDist <= 0.014001;

  const isSavedByGdt = !isLinearPass && isGdtPass;

  return (
    <div className="flex flex-col gap-5 text-sm">
      {/* Seção 1: Especificação Comparativa */}
      <div className="space-y-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex items-center gap-1.5">
          <ArrowRightLeft size={14} className="text-blue-600" />
          Seção 1: Especificação Comparativa
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {/* Card 1: Sistema Coordenado Linear */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Sistema Coordenado (±)
            </span>
            <div className="font-mono text-xs font-bold text-slate-800">
              2.000 ± 0.005
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Zona Quadrada 0.010 × 0.010 in
            </p>
          </div>

          {/* Card 2: Sistema GD&T */}
          <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
              Sistema GD&T (⌀)
            </span>
            <div className="font-mono text-xs font-bold text-blue-900 flex items-center gap-1">
              <span>⌖</span> ⌀ 0.014 in
            </div>
            <p className="text-[10px] text-blue-700 leading-tight">
              Zona Cilíndrica ⌀ 0.014 in (+57% área)
            </p>
          </div>
        </div>
      </div>

      {/* Seção 2: Posição Real da Ferramenta de Furação */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
          <Sliders size={15} className="text-blue-600" />
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Seção 2: Posição Real da Ferramenta de Furação
          </h3>
        </div>

        {/* Slider 1: Desvio X */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-700">
              Desvio no Eixo X (ΔX)
            </label>
            <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {devX >= 0 ? `+${devX.toFixed(3)}` : devX.toFixed(3)} in
            </span>
          </div>
          <input
            type="range"
            min="-0.008"
            max="0.008"
            step="0.001"
            value={devX}
            onChange={(e) => setSliderValue('deviationX', parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>-0.008 in</span>
            <span>0.000 (Ideal)</span>
            <span>+0.008 in</span>
          </div>
        </div>

        {/* Slider 2: Desvio Y */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-700">
              Desvio no Eixo Y (ΔY)
            </label>
            <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {devY >= 0 ? `+${devY.toFixed(3)}` : devY.toFixed(3)} in
            </span>
          </div>
          <input
            type="range"
            min="-0.008"
            max="0.008"
            step="0.001"
            value={devY}
            onChange={(e) => setSliderValue('deviationY', parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>-0.008 in</span>
            <span>0.000 (Ideal)</span>
            <span>+0.008 in</span>
          </div>
        </div>
      </div>

      {/* Seção 3: Veredito Duplo em Tempo Real */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
          Seção 3: Veredito Duplo em Tempo Real
        </h3>

        {/* Dynamic Badge when saved by GD&T (e.g. X=0.006, Y=0.006) */}
        {isSavedByGdt && (
          <div className="bg-amber-500 text-slate-950 p-3 rounded-xl font-bold text-xs shadow-md border border-amber-400 flex items-center gap-2 animate-bounce">
            <Sparkles size={18} className="shrink-0 text-slate-950" />
            <span>
              Peça Salva pelo GD&T! Reprovada no ±, mas Aprovada no GD&T.
            </span>
          </div>
        )}

        <div className="space-y-2">
          {/* Status 1: Sistema Coordenado ± */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm transition-all ${
            isLinearPass 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
              : 'bg-rose-50/70 border-rose-200 text-rose-900'
          }`}>
            <div className="space-y-0.5">
              <span className="font-bold text-xs block">Status Sistema Coordenado (±)</span>
              <p className="text-[11px] opacity-80">
                Limites: |X| ≤ 0.005 e |Y| ≤ 0.005 in
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-extrabold text-xs">
              {isLinearPass ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
              <span>{isLinearPass ? 'APROVADO' : 'REPROVADO'}</span>
            </div>
          </div>

          {/* Status 2: Sistema GD&T ⌀ */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm transition-all ${
            isGdtPass 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
              : 'bg-rose-50/70 border-rose-200 text-rose-900'
          }`}>
            <div className="space-y-0.5">
              <span className="font-bold text-xs block">Status Sistema GD&T (⌀)</span>
              <p className="text-[11px] opacity-80 font-mono">
                Dist. Radial: {radialDist.toFixed(4)} in (Limite: ≤ 0.014 in)
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-extrabold text-xs">
              {isGdtPass ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
              <span>{isGdtPass ? 'APROVADO' : 'REPROVADO'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter1Comparator;
