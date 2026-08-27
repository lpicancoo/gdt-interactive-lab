import React from 'react';
import { useGdtStore } from '../../store/useGdtStore';
import { CURRICULUM_MODULES } from '../../data/curriculumData';

const FeatureControlFrame: React.FC = () => {
  const { 
    selectedDatumInFCF, setSelectedDatumInFCF,
    activeTooltip, setActiveTooltip,
    activeModule
  } = useGdtStore();

  const currentModule = CURRICULUM_MODULES[activeModule] || CURRICULUM_MODULES[0];
  const fcf = currentModule.fcfSpecification;

  if (!fcf) return null;

  const handleDatumClick = (datum: string) => {
    setSelectedDatumInFCF(selectedDatumInFCF === datum ? null : datum);
  };

  const handleSymbolClick = (tooltip: string) => {
    setActiveTooltip(activeTooltip === tooltip ? null : tooltip);
  };

  const datumClass = (datum: string) => 
    `px-3 py-1.5 font-bold transition-colors hover:bg-blue-50 cursor-pointer ${
      selectedDatumInFCF === datum ? 'bg-blue-100 text-blue-900 border-b-2 border-blue-600' : ''
    }`;

  return (
    <div className="flex flex-col gap-2 items-start select-none">
      <div className="relative inline-flex flex-col">
        {/* FCF Frame */}
        <div className="inline-flex border-2 border-slate-900 rounded text-slate-900 font-mono text-base divide-x-2 divide-slate-900 bg-white shadow-md overflow-hidden items-center">
          
          {/* Símbolo Característico */}
          <div 
            className="px-3.5 py-1.5 flex items-center justify-center font-bold text-lg hover:bg-blue-50 cursor-pointer transition-colors"
            onClick={() => handleSymbolClick(`Característica Controlada: Símbolo ${fcf.symbol} (${currentModule.title})`)}
            title="Símbolo Geométrico de Controle"
          >
            <span>{fcf.symbol}</span>
          </div>

          {/* Valor da Tolerância */}
          <div 
            className="px-4 py-1.5 flex items-center gap-1 hover:bg-blue-50 cursor-pointer transition-colors font-bold text-base"
            onClick={() => handleSymbolClick(`Zona de Tolerância Especificada: ${fcf.toleranceValue} ${fcf.materialModifier || ''}`)}
            title="Valor da Tolerância Geométrica"
          >
            <span>{fcf.toleranceValue}</span>
            {fcf.materialModifier && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-slate-900 text-xs font-bold bg-slate-100">
                {fcf.materialModifier}
              </span>
            )}
          </div>

          {/* Datum Primário */}
          {fcf.primaryDatum && (
            <div 
              className={datumClass(fcf.primaryDatum)}
              onClick={() => handleDatumClick(fcf.primaryDatum!)}
              title={`Datum Primário (${fcf.primaryDatum})`}
            >
              <span>{fcf.primaryDatum}</span>
              {fcf.primaryModifier && (
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full border border-slate-900 text-[10px] font-bold">
                  {fcf.primaryModifier}
                </span>
              )}
            </div>
          )}

          {/* Datum Secundário */}
          {fcf.secondaryDatum && (
            <div 
              className={datumClass(fcf.secondaryDatum)}
              onClick={() => handleDatumClick(fcf.secondaryDatum!)}
              title={`Datum Secundário (${fcf.secondaryDatum})`}
            >
              <span>{fcf.secondaryDatum}</span>
              {fcf.secondaryModifier && (
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full border border-slate-900 text-[10px] font-bold">
                  {fcf.secondaryModifier}
                </span>
              )}
            </div>
          )}

          {/* Datum Terciário */}
          {fcf.tertiaryDatum && (
            <div 
              className={datumClass(fcf.tertiaryDatum)}
              onClick={() => handleDatumClick(fcf.tertiaryDatum!)}
              title={`Datum Terciário (${fcf.tertiaryDatum})`}
            >
              <span>{fcf.tertiaryDatum}</span>
              {fcf.tertiaryModifier && (
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full border border-slate-900 text-[10px] font-bold">
                  {fcf.tertiaryModifier}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tooltip Overlay */}
        {activeTooltip && (
          <div className="absolute top-full mt-2 left-0 w-80 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-2xl z-50 leading-relaxed border border-slate-700 animate-fadeIn">
            {activeTooltip}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureControlFrame;
