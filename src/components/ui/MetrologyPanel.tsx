import React from 'react';
import { useGdtStore } from '../../store/useGdtStore';
import { CURRICULUM_MODULES } from '../../data/curriculumData';
import { Sliders } from 'lucide-react';

const MetrologyPanel: React.FC = () => {
  const { 
    activeModule,
    sliderValues,
    setSliderValue
  } = useGdtStore();

  const currentModule = CURRICULUM_MODULES[activeModule] || CURRICULUM_MODULES[0];
  const sliders = currentModule.sliderConfig;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <Sliders size={16} className="text-blue-600" />
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Controles Metrológicos e Parâmetros de Usinagem
          </h4>
        </div>

        {sliders.length === 0 ? (
          <p className="text-xs text-slate-500 italic">
            Este módulo não possui sliders de variação dimensional.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {sliders.map((slider) => {
              const val = sliderValues[slider.key] ?? slider.defaultValue;
              const formattedVal = slider.step < 0.01 ? val.toFixed(3) : val.toFixed(2);

              return (
                <div key={slider.key} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700">
                      {slider.label}
                    </label>
                    <span className="font-mono font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {formattedVal} {slider.unit}
                    </span>
                  </div>

                  <input 
                    type="range" 
                    min={slider.min} 
                    max={slider.max} 
                    step={slider.step} 
                    value={val}
                    onChange={(e) => setSliderValue(slider.key, parseFloat(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Mín: {slider.min} {slider.unit}</span>
                    <span className="text-slate-500 font-sans">{slider.description}</span>
                    <span>Máx: {slider.max} {slider.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetrologyPanel;
