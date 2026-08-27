import React from 'react';
import { useGdtStore } from '../../store/useGdtStore';
import { ShieldCheck, ShieldAlert, Sparkles, Sliders, Thermometer, Ruler, FileText } from 'lucide-react';

export const Chapter2MetrologyPanel: React.FC = () => {
  const { sliderValues, setSliderValue } = useGdtStore();

  const temp = sliderValues.temperature ?? 20;
  const l20 = sliderValues.machinedTolerance ?? 100.000;

  // Steel coefficient of thermal expansion (α = 11.5 µm/m°C)
  const alpha = 0.0000115;
  const deltaT = temp - 20;
  const deltaL = l20 * alpha * deltaT;
  const lAmbiente = l20 + deltaL;

  // Limits
  const minLimit = 99.980;
  const maxLimit = 100.020;

  const isPass20C = l20 >= (minLimit - 0.0001) && l20 <= (maxLimit + 0.0001);
  const isExpandedApparentFail = lAmbiente > maxLimit && isPass20C;
  const isContractedApparentFail = lAmbiente < minLimit && isPass20C;

  return (
    <div className="flex flex-col gap-5 text-sm">
      {/* Seção 1: Especificação Dimensional e Regras de Notação */}
      <div className="space-y-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex items-center gap-1.5">
          <FileText size={14} className="text-blue-600" />
          Seção 1: Especificação Dimensional e Regras de Notação
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {/* Card 1: Dimensão de Projeto */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Especificação de Projeto
            </span>
            <div className="font-mono text-xs font-bold text-slate-800">
              100.000 ± 0.020 mm
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Material: Aço Carbono (α = 11.5 µm/m°C)
            </p>
          </div>

          {/* Card 2: Limites Absolutos */}
          <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
              Limites Absolutos (ASME)
            </span>
            <div className="font-mono text-[11px] font-bold text-blue-900 leading-tight">
              Máx (MMC): 100.020 mm<br />
              Mín (LMC): 99.980 mm
            </div>
            <p className="text-[10px] text-blue-700 leading-tight">
              Sem arredondamento (Regra 100.0200...)
            </p>
          </div>
        </div>
      </div>

      {/* Seção 2: Simulação de Medição em Chão de Fábrica (Regra 7 - Efeito Térmico) */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
          <Sliders size={15} className="text-blue-600" />
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Seção 2: Simulação de Medição (Regra nº 7 - 20°C / 68°F)
          </h3>
        </div>

        {/* Slider 1: Temperatura Ambiente */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Thermometer size={14} className="text-amber-500" /> Temperatura da Sala / Fábrica (T)
            </label>
            <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
              temp === 20 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {temp}°C {temp === 20 ? '(Padrão ASME)' : ''}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            step="1"
            value={temp}
            onChange={(e) => setSliderValue('temperature', parseInt(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>10°C (Frio)</span>
            <span className="text-emerald-600 font-bold">20°C (Padrão ASME)</span>
            <span>40°C (Quente)</span>
          </div>
        </div>

        {/* Slider 2: Dimensão Usinada a 20°C */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Ruler size={14} className="text-blue-600" /> Dimensão Usinada Real (a 20°C)
            </label>
            <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {l20.toFixed(3)} mm
            </span>
          </div>
          <input
            type="range"
            min="99.950"
            max="100.050"
            step="0.005"
            value={l20}
            onChange={(e) => setSliderValue('machinedTolerance', parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>99.950 mm</span>
            <span className="text-slate-500">100.000 mm</span>
            <span>100.050 mm</span>
          </div>
        </div>
      </div>

      {/* Seção 3: Calculadora Metrológica em Tempo Real */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
          Seção 3: Calculadora Metrológica e Compensação Térmica
        </h3>

        {/* Dynamic Informative Note when apparent thermal fail occurs */}
        {(isExpandedApparentFail || isContractedApparentFail) && (
          <div className="bg-amber-500 text-slate-950 p-3 rounded-xl font-bold text-xs shadow-md border border-amber-400 flex items-center gap-2 animate-bounce">
            <Sparkles size={18} className="shrink-0 text-slate-950" />
            <span>
              {isExpandedApparentFail 
                ? `Atenção: Peça expandida pelo calor da fábrica (medida a ${temp}°C = ${lAmbiente.toFixed(3)} mm). Aprovada após correção térmica conforme Regra nº 7!`
                : `Atenção: Peça contraída pelo frio da fábrica (medida a ${temp}°C = ${lAmbiente.toFixed(3)} mm). Aprovada após correção térmica conforme Regra nº 7!`}
            </span>
          </div>
        )}

        <div className="space-y-2">
          {/* Valor Medido no Ambiente de Fábrica */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
            <span className="text-slate-600 font-medium">
              Valor Medido no Ambiente ({temp}°C):
            </span>
            <span className="font-mono font-bold text-slate-800 text-sm">
              {lAmbiente.toFixed(3)} mm
            </span>
          </div>

          {/* Valor Corrigido para 20°C conforme Regra #7 */}
          <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200 flex justify-between items-center text-xs">
            <span className="text-blue-900 font-bold">
              Valor Corrigido para 20°C (Regra nº 7):
            </span>
            <span className="font-mono font-extrabold text-blue-900 text-sm">
              {l20.toFixed(3)} mm
            </span>
          </div>

          {/* Final Status Badge */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm transition-all ${
            isPass20C 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
              : 'bg-rose-50/70 border-rose-200 text-rose-900'
          }`}>
            <div className="space-y-0.5">
              <span className="font-bold text-xs block">Veredito Final de Conformidade</span>
              <p className="text-[11px] opacity-80 font-mono">
                Especificação: 99.980 mm a 100.020 mm (a 20°C)
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-extrabold text-xs">
              {isPass20C ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
              <span>{isPass20C ? 'APROVADO' : 'REPROVADO'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter2MetrologyPanel;
