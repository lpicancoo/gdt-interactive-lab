import React from 'react';
import FeatureControlFrame from '../ui/FeatureControlFrame';
import MetrologyPanel from '../ui/MetrologyPanel';
import ExerciseEngine from '../ui/ExerciseEngine';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useGdtStore } from '../../store/useGdtStore';

const Column3: React.FC = () => {
  const { 
    holeDiameter, deviationX, deviationY,
    activeModule, warpConcave, warpTwist, formType,
    cylinderFormType, errorOvality, errorTaper,
    tiltZ, warpForm, angularError,
    eccentricity, circularityError,
    peakDeviation, valleySink,
    lengthHousing, lengthShaft, lengthWasher
  } = useGdtStore();

  const isModule1 = activeModule === 1;
  const isModule2 = activeModule === 2;
  const isModule3 = activeModule === 3;
  const isModule4 = activeModule === 4;
  const isModule6 = activeModule === 6;
  const isModule7 = activeModule === 7;
  const isModule8 = activeModule === 8;

  const isStraightness1D = isModule1 && formType === 'retilineidade';
  const isCirc2D = isModule2 && cylinderFormType === 'circularidade';

  const measuredGap = lengthHousing - (lengthShaft + lengthWasher);

  const measuredDeviation = isModule1 
    ? (isStraightness1D ? warpConcave : Math.max(warpConcave, warpTwist))
    : isModule2 
      ? (isCirc2D ? errorOvality : Math.max(errorOvality, errorTaper))
      : isModule3
        ? (tiltZ + warpForm)
        : isModule4
          ? (Math.abs(angularError) + warpForm)
          : isModule6
            ? (eccentricity * 2 + circularityError)
            : isModule7
              ? (Math.abs(peakDeviation) + Math.abs(valleySink))
              : isModule8
                ? measuredGap
                : 2 * Math.sqrt(deviationX ** 2 + deviationY ** 2);

  const bonus = (isModule1 || isModule2 || isModule3 || isModule4 || isModule6 || isModule7 || isModule8) ? 0 : Math.max(0, holeDiameter - 10.00);
  const totalTol = isModule7 ? 0.200 : (isModule1 || isModule2 || isModule3 || isModule4 || isModule6) ? 0.050 : 0.200 + bonus;
  const isPass = isModule8 ? (measuredGap >= 0.15 && measuredGap <= 0.85) : (measuredDeviation <= totalTol);

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
          <h3 className="text-sm font-bold text-slate-800 mb-3 border-b pb-1">
            {activeModule === 9 ? 'Seção 2: Orientação do Simulado' : 'Seção 2: Simulação da Peça Fabricada'}
          </h3>
          <MetrologyPanel />
        </div>

        {/* Section 3 / Quiz Engine */}
        {activeModule === 9 ? (
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 border-b pb-1">Seção 3: Quiz de Avaliação</h3>
            <ExerciseEngine />
          </div>
        ) : (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm flex flex-col gap-2">
          {isModule1 ? (
            <>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Tolerância ({isStraightness1D ? 'Retilineidade 2D' : 'Planeza 3D'})
                </span>
                <span className="font-medium font-mono">0.050 mm</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Datums / Referenciais</span>
                <span className="font-semibold text-slate-400 italic">NENHUM (Elemento Isolado)</span>
              </div>
              <div className="h-px bg-slate-200 my-1"></div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Zona de Tolerância Permitida</span>
                <span className="font-mono">0.050 mm</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span className="text-slate-600">
                  {isStraightness1D ? 'Desvio Medido (Fatia Central Z=0)' : 'Desvio Medido (Pico ao Vale)'}
                </span>
                <span className={`font-mono ${isPass ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {measuredDeviation.toFixed(3)} mm
                </span>
              </div>
            </>
          ) : isModule2 ? (
            <>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Tolerância ({isCirc2D ? 'Circularidade 2D' : 'Cilindricidade 3D'})
                </span>
                <span className="font-medium font-mono">0.050 mm</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Datums / Referenciais</span>
                <span className="font-semibold text-slate-400 italic">NENHUM (Elemento Isolado)</span>
              </div>
              <div className="h-px bg-slate-200 my-1"></div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Zona de Tolerância Permitida</span>
                <span className="font-mono">0.050 mm</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span className="text-slate-600">
                  {isCirc2D ? 'Desvio Medido (Fatia Circular 2D)' : 'Desvio Medido (Superfície 3D Total)'}
                </span>
                <span className={`font-mono ${isPass ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {measuredDeviation.toFixed(3)} mm
                </span>
              </div>
            </>
          ) : isModule3 ? (
            <>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Tolerância (Paralelismo //)
                </span>
                <span className="font-medium font-mono">0.050 mm</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Datum Primário</span>
                <span className="font-semibold text-blue-600">Datum A (Mesa de Desempeno)</span>
              </div>
              <div className="h-px bg-slate-200 my-1"></div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Zona de Tolerância Permitida</span>
                <span className="font-mono">0.050 mm</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span className="text-slate-600">
                  Desvio Medido (Inclinação + Forma)
                </span>
                <span className={`font-mono ${isPass ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {measuredDeviation.toFixed(3)} mm
                </span>
              </div>
            </>
          ) : isModule4 ? (
            <>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Tolerância (Perpendicularidade ⟂)
                </span>
                <span className="font-medium font-mono">0.050 mm</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Datum Primário</span>
                <span className="font-semibold text-blue-600">Datum A (Base de Apoio)</span>
              </div>
              <div className="h-px bg-slate-200 my-1"></div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Zona de Tolerância Permitida</span>
                <span className="font-mono">0.050 mm</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span className="text-slate-600">
                  Desvio Medido (Erro Angular + Forma)
                </span>
                <span className={`font-mono ${isPass ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {measuredDeviation.toFixed(3)} mm
                </span>
              </div>
            </>
          ) : isModule6 ? (
            <>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Tipo de Controle</span>
                <span className="font-semibold text-slate-700">Batimento Circular (2D / Fator Composto)</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Eixo de Referência</span>
                <span className="font-semibold text-blue-600">Datum A-B (Eixo Comum)</span>
              </div>
              <div className="h-px bg-slate-200 my-1"></div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Zona de Tolerância Permitida (FIM)</span>
                <span className="font-mono">0.050 mm</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span className="text-slate-600">
                  Oscilação Total Medida (FIM)
                </span>
                <span className={`font-mono ${isPass ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {measuredDeviation.toFixed(3)} mm
                </span>
              </div>
            </>
          ) : isModule7 ? (
            <>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Tipo de Controle</span>
                <span className="font-semibold text-slate-700">Perfil de Superfície (3D Bilateral)</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Sistema de Referência</span>
                <span className="font-semibold text-blue-600">Datums A e B</span>
              </div>
              <div className="h-px bg-slate-200 my-1"></div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Envelope de Tolerância Total</span>
                <span className="font-mono">0.200 mm (±0.100)</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span className="text-slate-600">
                  Desvio Total Medido (|Pico| + |Vale|)
                </span>
                <span className={`font-mono ${isPass ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {measuredDeviation.toFixed(3)} mm
                </span>
              </div>
            </>
          ) : isModule8 ? (
            <>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Método de Análise</span>
                <span className="font-semibold text-slate-700">Stack-Up 1D (Worst-Case)</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>Fórmula da Cadeia</span>
                <span className="font-mono text-blue-600">Gap = L1 - (L2 + L3)</span>
              </div>
              <div className="h-px bg-slate-200 my-1"></div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Folga Nominal do Projeto</span>
                <span className="font-mono">0.500 mm</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span className="text-slate-600">
                  Gap Real Resultante
                </span>
                <span className={`font-mono ${isPass ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {measuredGap.toFixed(2)} mm
                </span>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default Column3;
