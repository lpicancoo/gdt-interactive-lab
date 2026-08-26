import React from 'react';
import { useGdtStore } from '../../store/useGdtStore';

const MetrologyPanel: React.FC = () => {
  const { 
    holeDiameter, setHoleDiameter, 
    deviationX, setDeviationX, 
    deviationY, setDeviationY,
    activeModule,
    warpConcave, setWarpConcave,
    warpTwist, setWarpTwist,
    errorOvality, setErrorOvality,
    errorTaper, setErrorTaper,
    tiltZ, setTiltZ,
    warpForm, setWarpForm,
    angularError, setAngularError,
    eccentricity, setEccentricity,
    circularityError, setCircularityError,
    peakDeviation, setPeakDeviation,
    valleySink, setValleySink,
    lengthHousing, setLengthHousing,
    lengthShaft, setLengthShaft,
    lengthWasher, setLengthWasher
  } = useGdtStore();

  if (activeModule === 1) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 mb-4 italic leading-relaxed">
            Simule os erros de fresamento. Estes valores representam o empenamento real da face metálica.
          </p>

          <div className="flex flex-col gap-5">
            {/* Slider 1: Empenamento Côncavo / Convexo */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Empenamento Côncavo/Convexo
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {warpConcave.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.100" step="0.005" 
                value={warpConcave}
                onChange={(e) => setWarpConcave(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (Perfeito)</span>
                <span>0.050 (Limite)</span>
                <span>0.100 mm</span>
              </div>
            </div>

            {/* Slider 2: Torção da Face */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Torção da Face
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {warpTwist.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.100" step="0.005" 
                value={warpTwist}
                onChange={(e) => setWarpTwist(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (Perfeito)</span>
                <span>0.050 (Limite)</span>
                <span>0.100 mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === 2) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 mb-4 italic leading-relaxed">
            Simule os erros de torno / retífica. Estes valores representam as imperfeições no eixo cilíndrico.
          </p>

          <div className="flex flex-col gap-5">
            {/* Slider 1: Erro de Ovalização */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Erro de Ovalização
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {errorOvality.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.100" step="0.005" 
                value={errorOvality}
                onChange={(e) => setErrorOvality(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (Perfeito)</span>
                <span>0.050 (Limite)</span>
                <span>0.100 mm</span>
              </div>
            </div>

            {/* Slider 2: Erro de Conicidade */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Erro de Conicidade
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {errorTaper.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.100" step="0.005" 
                value={errorTaper}
                onChange={(e) => setErrorTaper(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (Perfeito)</span>
                <span>0.050 (Limite)</span>
                <span>0.100 mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === 3) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 mb-4 italic leading-relaxed">
            Simule os desvios de orientação e forma no bloco guia em relação ao Datum A.
          </p>

          <div className="flex flex-col gap-5">
            {/* Slider 1: Inclinação da Face (Tilt) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Inclinação da Face (Tilt)
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {tiltZ.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.100" step="0.005" 
                value={tiltZ}
                onChange={(e) => setTiltZ(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (Perfeito)</span>
                <span>0.050 (Limite)</span>
                <span>0.100 mm</span>
              </div>
            </div>

            {/* Slider 2: Empenamento de Forma */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Empenamento de Forma
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {warpForm.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.050" step="0.005" 
                value={warpForm}
                onChange={(e) => setWarpForm(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (Perfeito)</span>
                <span>0.025 (Metade)</span>
                <span>0.050 mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === 4) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 mb-4 italic leading-relaxed">
            Simule os desvios angulares e de forma na aba vertical do suporte em L em relação ao Datum A.
          </p>

          <div className="flex flex-col gap-5">
            {/* Slider 1: Erro Angular da Face (-0.100 a +0.100 mm) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Erro Angular da Face
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {angularError > 0 ? '+' : ''}{angularError.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="-0.100" max="0.100" step="0.005" 
                value={angularError}
                onChange={(e) => setAngularError(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>-0.100 mm</span>
                <span>0.000 (90° Exato)</span>
                <span>+0.100 mm</span>
              </div>
            </div>

            {/* Slider 2: Empenamento da Face (Forma) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Empenamento da Face (Forma)
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {warpForm.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.050" step="0.005" 
                value={warpForm}
                onChange={(e) => setWarpForm(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (Perfeito)</span>
                <span>0.025 (Metade)</span>
                <span>0.050 mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === 6) {
    return (
      <div className="flex flex-col gap-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 mb-4 italic">
            Ajuste os sliders para simular excentricidade e ovalização no cilindro central.
          </p>

          <div className="flex flex-col gap-5">
            {/* Slider 1: Erro de Excentricidade */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Erro de Excentricidade
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {eccentricity.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.050" step="0.002" 
                value={eccentricity}
                onChange={(e) => setEccentricity(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (Perfeito)</span>
                <span>0.025 (Metade)</span>
                <span>0.050 mm</span>
              </div>
            </div>

            {/* Slider 2: Erro de Circularidade */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Erro de Circularidade
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {circularityError.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.050" step="0.002" 
                value={circularityError}
                onChange={(e) => setCircularityError(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (Perfeito)</span>
                <span>0.025 (Metade)</span>
                <span>0.050 mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === 7) {
    return (
      <div className="flex flex-col gap-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 mb-4 italic">
            Simule distorções na superfície curva. A malha mudará de cor no mapa de calor (Verde = Ok, Vermelho = Pico alto, Azul = Vale profundo).
          </p>

          <div className="flex flex-col gap-5">
            {/* Slider 1: Desvio Máximo de Pico (Ondulação) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Desvio Máximo de Pico (Ondulação)
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  +{peakDeviation.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.250" step="0.005" 
                value={peakDeviation}
                onChange={(e) => setPeakDeviation(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (CAD)</span>
                <span>+0.100 (Limite)</span>
                <span>+0.250 mm</span>
              </div>
            </div>

            {/* Slider 2: Afundamento da Malha (Vale) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Afundamento da Malha (Vale)
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  -{valleySink.toFixed(3)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="0.000" max="0.250" step="0.005" 
                value={valleySink}
                onChange={(e) => setValleySink(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.000 (CAD)</span>
                <span>-0.100 (Limite)</span>
                <span>-0.250 mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === 8) {
    return (
      <div className="flex flex-col gap-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 mb-4 italic">
            Altere as dimensões reais usinadas em fábrica para cada componente da montagem e veja o efeito na folga (Gap) em tempo real.
          </p>

          <div className="flex flex-col gap-5">
            {/* Slider 1: L1 Rasgo da Carcaça */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  L1: Rasgo da Carcaça
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {lengthHousing.toFixed(2)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="49.80" max="50.20" step="0.01" 
                value={lengthHousing}
                onChange={(e) => setLengthHousing(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>49.80 (Mín)</span>
                <span>50.00 (Nom)</span>
                <span>50.20 mm (Máx)</span>
              </div>
            </div>

            {/* Slider 2: L2 Comprimento do Eixo */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  L2: Comprimento do Eixo
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {lengthShaft.toFixed(2)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="44.90" max="45.10" step="0.01" 
                value={lengthShaft}
                onChange={(e) => setLengthShaft(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>44.90 (Mín)</span>
                <span>45.00 (Nom)</span>
                <span>45.10 mm (Máx)</span>
              </div>
            </div>

            {/* Slider 3: L3 Espessura da Arruela */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  L3: Espessura da Arruela
                </label>
                <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {lengthWasher.toFixed(2)} mm
                </span>
              </div>
              <input 
                type="range" 
                min="4.45" max="4.55" step="0.01" 
                value={lengthWasher}
                onChange={(e) => setLengthWasher(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>4.45 (Mín)</span>
                <span>4.50 (Nom)</span>
                <span>4.55 mm (Máx)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
