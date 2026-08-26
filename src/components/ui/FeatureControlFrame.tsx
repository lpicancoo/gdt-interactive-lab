import React, { useEffect } from 'react';
import { useGdtStore } from '../../store/useGdtStore';

const FeatureControlFrame: React.FC = () => {
  const { 
    selectedDatumInFCF, setSelectedDatumInFCF,
    activeTooltip, setActiveTooltip,
    activeExercise, setExerciseProgress,
    activeModule, onboardingStep
  } = useGdtStore();

  const handleDatumClick = (datum: string) => {
    setSelectedDatumInFCF(selectedDatumInFCF === datum ? null : datum);
    
    // Exercise 1 logic: Click Datum A
    if (activeExercise === 1 && datum === 'A') {
      setExerciseProgress(1, true);
    }
  };

  const handleSymbolClick = (tooltip: string) => {
    setActiveTooltip(activeTooltip === tooltip ? null : tooltip);
  };

  const datumClass = (datum: string) => 
    `px-3 py-1 font-bold transition-colors hover:bg-slate-100 cursor-pointer ${selectedDatumInFCF === datum ? 'bg-blue-100 text-blue-800' : ''}`;

  return (
    <div className="relative inline-flex flex-col">
      <div className="inline-flex border-2 border-slate-800 rounded text-slate-800 font-mono text-lg divide-x-2 divide-slate-800 bg-white shadow-sm overflow-hidden items-center select-none">
        
        {/* Symbol */}
        <div 
          className={`px-2 py-1 flex items-center justify-center transition-opacity ${activeModule === 0 && onboardingStep < 2 ? 'opacity-20 pointer-events-none' : 'hover:bg-slate-100 cursor-pointer'}`}
          onClick={() => handleSymbolClick('Tolerância de Posição Real')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
        </div>
        
        {/* Tolerance */}
        <div 
          className={`px-2 py-1 flex items-center gap-1 transition-opacity ${activeModule === 0 && onboardingStep < 3 ? 'opacity-20 pointer-events-none' : 'hover:bg-slate-100 cursor-pointer'}`}
          onClick={() => handleSymbolClick('Tolerância base. O modificador M permite Bônus se o furo for maior que 10.00mm')}
        >
          <span>⌀</span>
          <span>0.20</span>
          <span className="inline-flex items-center justify-center border border-slate-800 rounded-full w-5 h-5 text-sm">M</span>
        </div>

        {/* Datum Primary */}
        <div 
          className={`px-3 py-1 font-bold transition-all ${activeModule === 0 && onboardingStep < 4 ? 'opacity-20 pointer-events-none' : datumClass('A')}`} 
          onClick={() => handleDatumClick('A')}
        >A</div>

        {/* Datum Secondary */}
        <div 
          className={`px-2 py-1 flex items-center gap-1 transition-all ${activeModule === 0 ? 'hidden' : `hover:bg-slate-100 cursor-pointer ${selectedDatumInFCF === 'B' ? 'bg-blue-100 text-blue-800' : ''}`}`} 
          onClick={() => handleDatumClick('B')}
        >
          <span className="font-bold">B</span>
          <span className="inline-flex items-center justify-center border border-slate-800 rounded-full w-5 h-5 text-sm">M</span>
        </div>

        {/* Datum Tertiary */}
        <div 
          className={`px-3 py-1 font-bold transition-all ${activeModule === 0 ? 'hidden' : datumClass('C')}`} 
          onClick={() => handleDatumClick('C')}
        >C</div>
      </div>

      {activeTooltip && (
        <div className="absolute top-full mt-2 left-0 w-64 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-50">
          {activeTooltip}
        </div>
      )}
    </div>
  );
};

export default FeatureControlFrame;
