import React from 'react';
import { useGdtStore } from '../../store/useGdtStore';

const FeatureControlFrame: React.FC = () => {
  const { 
    selectedDatumInFCF, setSelectedDatumInFCF,
    activeTooltip, setActiveTooltip,
    activeExercise, setExerciseProgress,
    activeModule, onboardingStep,
    formType, setFormType,
    cylinderFormType, setCylinderFormType
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
    if (activeModule === 1 && activeExercise === 1) {
      setExerciseProgress(1, true);
    }
  };

  const datumClass = (datum: string) => 
    `px-3 py-1 font-bold transition-colors hover:bg-slate-100 cursor-pointer ${selectedDatumInFCF === datum ? 'bg-blue-100 text-blue-800' : ''}`;

  if (activeModule === 1) {
    const isStraightness = formType === 'retilineidade';

    return (
      <div className="flex flex-col gap-3 items-start">
        {/* Toggle Controls: Planeza (3D) vs Retilineidade (2D) */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
          <button 
            onClick={() => setFormType('planeza')}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
              !isStraightness 
                ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>⏥</span> Planeza (3D)
          </button>

          <button 
            onClick={() => setFormType('retilineidade')}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
              isStraightness 
                ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>⏤</span> Retilineidade (2D)
          </button>
        </div>

        {/* Feature Control Frame */}
        <div className="relative inline-flex flex-col">
          <div className="inline-flex border-2 border-slate-800 rounded text-slate-800 font-mono text-lg divide-x-2 divide-slate-800 bg-white shadow-sm overflow-hidden items-center select-none">
            {/* Symbol Cell */}
            <div 
              className="px-3.5 py-1.5 flex items-center justify-center hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => handleSymbolClick(
                isStraightness 
                  ? "Retilineidade: Avalia apenas o desvio em uma seção transversal ou linha."
                  : "Planeza: Controla o quão plana é uma superfície isolada, independentemente de qualquer referencial."
              )}
              title={isStraightness ? "Símbolo de Retilineidade" : "Símbolo de Planeza"}
            >
              {isStraightness ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  {/* Horizontal Line for Straightness */}
                  <line x1="3" y1="12" x2="21" y2="12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Parallelogram for Flatness */}
                  <polygon points="7 19 3 5 17 5 21 19" />
                </svg>
              )}
            </div>

            {/* Tolerance Value Cell */}
            <div 
              className="px-4 py-1.5 flex items-center hover:bg-blue-50 cursor-pointer transition-colors font-bold text-base"
              onClick={() => handleSymbolClick(
                isStraightness 
                  ? "A linha de perfil deve estar contida entre duas linhas paralelas separadas por 0.05 mm."
                  : "A superfície inteira deve estar contida entre dois planos paralelos separados por 0.05 mm."
              )}
              title="Valor da Tolerância"
            >
              <span>0.05</span>
            </div>
          </div>

          {activeTooltip && (
            <div className="absolute top-full mt-2 left-0 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl z-50 leading-relaxed border border-slate-700">
              {activeTooltip}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeModule === 2) {
    const isCirc2D = cylinderFormType === 'circularidade';

    return (
      <div className="flex flex-col gap-3 items-start">
        {/* Toggle Controls: Circularidade (2D) vs Cilindricidade (3D) */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
          <button 
            onClick={() => setCylinderFormType('circularidade')}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
              isCirc2D 
                ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>◯</span> Circularidade (2D)
          </button>

          <button 
            onClick={() => setCylinderFormType('cilindricidade')}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
              !isCirc2D 
                ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>⌭</span> Cilindricidade (3D)
          </button>
        </div>

        {/* Feature Control Frame */}
        <div className="relative inline-flex flex-col">
          <div className="inline-flex border-2 border-slate-800 rounded text-slate-800 font-mono text-lg divide-x-2 divide-slate-800 bg-white shadow-sm overflow-hidden items-center select-none">
            {/* Symbol Cell */}
            <div 
              className="px-3.5 py-1.5 flex items-center justify-center hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => handleSymbolClick(
                isCirc2D 
                  ? "Circularidade: Avalia apenas fatias 2D individuais. Ignora a inclinação ou conicidade do eixo longo."
                  : "Cilindricidade: Avalia a superfície 3D total. O eixo deve estar perfeitamente contido entre dois cilindros concêntricos."
              )}
              title={isCirc2D ? "Símbolo de Circularidade" : "Símbolo de Cilindricidade"}
            >
              {isCirc2D ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {/* Circle for Circularity */}
                  <circle cx="12" cy="12" r="8" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Cylindricity Symbol: Circle flanked by two parallel lines */}
                  <line x1="4" y1="3" x2="4" y2="21" />
                  <circle cx="12" cy="12" r="6" />
                  <line x1="20" y1="3" x2="20" y2="21" />
                </svg>
              )}
            </div>

            {/* Tolerance Value Cell */}
            <div 
              className="px-4 py-1.5 flex items-center hover:bg-blue-50 cursor-pointer transition-colors font-bold text-base"
              onClick={() => handleSymbolClick(
                isCirc2D 
                  ? "Cada fatia circular deve estar contida entre dois círculos concêntricos separados por 0.05 mm."
                  : "A superfície total deve estar contida entre dois cilindros concêntricos separados por 0.05 mm."
              )}
              title="Valor da Tolerância"
            >
              <span>0.05</span>
            </div>
          </div>

          {activeTooltip && (
            <div className="absolute top-full mt-2 left-0 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl z-50 leading-relaxed border border-slate-700">
              {activeTooltip}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeModule === 3) {
    return (
      <div className="flex flex-col gap-3 items-start">
        {/* Feature Control Frame for Parallelism: [ // | 0.05 | A ] */}
        <div className="relative inline-flex flex-col">
          <div className="inline-flex border-2 border-slate-800 rounded text-slate-800 font-mono text-lg divide-x-2 divide-slate-800 bg-white shadow-sm overflow-hidden items-center select-none">
            {/* Symbol Cell */}
            <div 
              className="px-3.5 py-1.5 flex items-center justify-center hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => handleSymbolClick("Paralelismo: Tolerância de Orientação. Garante que a superfície superior não tenha inclinação excessiva.")}
              title="Símbolo de Paralelismo (//)"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {/* Parallel Slanted Lines (//) */}
                <line x1="7" y1="19" x2="13" y2="5" />
                <line x1="13" y1="19" x2="19" y2="5" />
              </svg>
            </div>

            {/* Tolerance Value Cell */}
            <div 
              className="px-4 py-1.5 flex items-center hover:bg-blue-50 cursor-pointer transition-colors font-bold text-base"
              onClick={() => handleSymbolClick("A face controlada deve estar contida entre dois planos separados por 0.05 mm.")}
              title="Valor da Tolerância"
            >
              <span>0.05</span>
            </div>

            {/* Datum Cell */}
            <div 
              className={`px-4 py-1.5 flex items-center font-bold font-mono transition-colors hover:bg-blue-50 cursor-pointer ${
                selectedDatumInFCF === 'A' ? 'bg-blue-100 text-blue-800' : ''
              }`}
              onClick={() => {
                handleDatumClick('A');
                handleSymbolClick("Datum A: A âncora! É a face inferior apoiada na mesa. Sem ela, o paralelismo não existe.");
              }}
              title="Datum de Referência A"
            >
              <span>A</span>
            </div>
          </div>

          {activeTooltip && (
            <div className="absolute top-full mt-2 left-0 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl z-50 leading-relaxed border border-slate-700">
              {activeTooltip}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeModule === 4) {
    return (
      <div className="flex flex-col gap-3 items-start">
        {/* Feature Control Frame for Perpendicularity: [ ⟂ | 0.05 | A ] */}
        <div className="relative inline-flex flex-col">
          <div className="inline-flex border-2 border-slate-800 rounded text-slate-800 font-mono text-lg divide-x-2 divide-slate-800 bg-white shadow-sm overflow-hidden items-center select-none">
            {/* Symbol Cell */}
            <div 
              className="px-3.5 py-1.5 flex items-center justify-center hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => handleSymbolClick("Perpendicularidade: Controla o desvio de uma superfície que deve estar a exatos 90° de um referencial.")}
              title="Símbolo de Perpendicularidade (⟂)"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {/* Perpendicular Lines (⟂) */}
                <line x1="12" y1="4" x2="12" y2="20" />
                <line x1="4" y1="20" x2="20" y2="20" />
              </svg>
            </div>

            {/* Tolerance Value Cell */}
            <div 
              className="px-4 py-1.5 flex items-center hover:bg-blue-50 cursor-pointer transition-colors font-bold text-base"
              onClick={() => handleSymbolClick("A face inteira deve estar contida entre dois planos verticais separados por 0.05 mm.")}
              title="Valor da Tolerância"
            >
              <span>0.05</span>
            </div>

            {/* Datum Cell */}
            <div 
              className={`px-4 py-1.5 flex items-center font-bold font-mono transition-colors hover:bg-blue-50 cursor-pointer ${
                selectedDatumInFCF === 'A' ? 'bg-blue-100 text-blue-800' : ''
              }`}
              onClick={() => {
                handleDatumClick('A');
                handleSymbolClick("Datum A: A base de apoio. É a partir dela que os 90° são calculados.");
              }}
              title="Datum de Referência A"
            >
              <span>A</span>
            </div>
          </div>

          {activeTooltip && (
            <div className="absolute top-full mt-2 left-0 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl z-50 leading-relaxed border border-slate-700">
              {activeTooltip}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeModule === 6) {
    return (
      <div className="flex flex-col gap-3 items-start">
        <div className="relative inline-flex flex-col">
          <div className="inline-flex border-2 border-slate-800 rounded text-slate-800 font-mono text-lg divide-x-2 divide-slate-800 bg-white shadow-sm overflow-hidden items-center select-none">
            {/* Symbol Cell: Circular Runout */}
            <div 
              className="px-3.5 py-1.5 flex items-center justify-center hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => handleSymbolClick("Batimento Circular: Avalia a oscilação em uma única seção transversal (fatia) enquanto a peça gira 360°.")}
              title="Símbolo de Batimento Circular"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="19" x2="19" y2="5" />
                <polyline points="10 5 19 5 19 14" />
              </svg>
            </div>

            {/* Tolerance Value Cell */}
            <div 
              className="px-4 py-1.5 flex items-center hover:bg-blue-50 cursor-pointer transition-colors font-bold text-base"
              onClick={() => handleSymbolClick("FIM (Full Indicator Movement): A oscilação total do ponteiro do relógio não pode ultrapassar 0.05 mm.")}
              title="Valor da Tolerância"
            >
              <span>0.05</span>
            </div>

            {/* Compound Datum Cell A-B */}
            <div 
              className={`px-4 py-1.5 flex items-center font-bold font-mono transition-colors hover:bg-blue-50 cursor-pointer ${
                selectedDatumInFCF === 'A-B' ? 'bg-blue-100 text-blue-800' : ''
              }`}
              onClick={() => {
                handleDatumClick('A-B');
                handleSymbolClick("Eixo Comum: Os Datums A e B juntos formam o eixo imaginário perfeito de rotação.");
              }}
              title="Eixo Comum Datum A-B"
            >
              <span>A-B</span>
            </div>
          </div>

          {activeTooltip && (
            <div className="absolute top-full mt-2 left-0 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl z-50 leading-relaxed border border-slate-700">
              {activeTooltip}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeModule === 7) {
    return (
      <div className="flex flex-col gap-3 items-start">
        <div className="relative inline-flex flex-col">
          <div className="inline-flex border-2 border-slate-800 rounded text-slate-800 font-mono text-lg divide-x-2 divide-slate-800 bg-white shadow-sm overflow-hidden items-center select-none">
            {/* Symbol Cell: Profile of a Surface */}
            <div 
              className="px-3.5 py-1.5 flex items-center justify-center hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => handleSymbolClick("Perfil de Superfície: Controla o desvio tridimensional de superfícies complexas ou curvas.")}
              title="Símbolo de Perfil de Superfície"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M 3 16 C 8 8, 16 8, 21 16" />
              </svg>
            </div>

            {/* Tolerance Value Cell */}
            <div 
              className="px-4 py-1.5 flex items-center hover:bg-blue-50 cursor-pointer transition-colors font-bold text-base"
              onClick={() => handleSymbolClick("Zona Bilateral: A superfície real deve ficar contida em um envelope uniforme de 0.20 mm (±0.10 mm em relação ao CAD nominal).")}
              title="Valor da Tolerância"
            >
              <span>0.20</span>
            </div>

            {/* Datum Primary Cell A */}
            <div 
              className={`px-3.5 py-1.5 flex items-center font-bold font-mono transition-colors hover:bg-blue-50 cursor-pointer ${
                selectedDatumInFCF === 'A' ? 'bg-blue-100 text-blue-800' : ''
              }`}
              onClick={() => {
                handleDatumClick('A');
                handleSymbolClick("Datums: Amarram a posição e a orientação da superfície curva no espaço.");
              }}
              title="Datum Primário A"
            >
              <span>A</span>
            </div>

            {/* Datum Secondary Cell B */}
            <div 
              className={`px-3.5 py-1.5 flex items-center font-bold font-mono transition-colors hover:bg-blue-50 cursor-pointer ${
                selectedDatumInFCF === 'B' ? 'bg-blue-100 text-blue-800' : ''
              }`}
              onClick={() => {
                handleDatumClick('B');
                handleSymbolClick("Datums: Amarram a posição e a orientação da superfície curva no espaço.");
              }}
              title="Datum Secundário B"
            >
              <span>B</span>
            </div>
          </div>

          {activeTooltip && (
            <div className="absolute top-full mt-2 left-0 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl z-50 leading-relaxed border border-slate-700">
              {activeTooltip}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeModule === 8) {
    return (
      <div className="flex flex-col gap-3 items-start">
        <div className="relative inline-flex flex-col">
          <div 
            className="inline-flex border-2 border-slate-800 rounded text-slate-800 font-mono text-sm font-bold divide-x-2 divide-slate-800 bg-white shadow-sm overflow-hidden items-center select-none cursor-pointer hover:bg-blue-50 transition-colors"
            onClick={() => handleSymbolClick("Stack-Up 1D: Análise do acúmulo de variabilidade dimensional em uma montagem mecânica de 3 componentes (Carcaça, Eixo e Arruela).")}
          >
            <div className="px-3.5 py-1.5 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider">
              Stack-Up 1D
            </div>
            <div className="px-4 py-1.5 text-slate-800 text-xs">
              Cadeia Dimensional de Montagem
            </div>
            <div className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs">
              3 Peças
            </div>
          </div>

          {activeTooltip && (
            <div className="absolute top-full mt-2 left-0 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl z-50 leading-relaxed border border-slate-700">
              {activeTooltip}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeModule === 9) {
    return (
      <div className="flex flex-col gap-3 items-start">
        <div className="relative inline-flex flex-col">
          <div 
            className="inline-flex border-2 border-slate-800 rounded text-slate-800 font-mono text-sm font-bold divide-x-2 divide-slate-800 bg-white shadow-sm overflow-hidden items-center select-none cursor-pointer hover:bg-blue-50 transition-colors"
            onClick={() => handleSymbolClick("Avaliação Geral: Exame final cobrindo Normas, Datums, Forma, Orientação, Posição e Batimento.")}
          >
            <div className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider">
              Exame Final
            </div>
            <div className="px-4 py-1.5 text-slate-800 text-xs">
              Simulado de Avaliação Geral
            </div>
            <div className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs">
              5 Tópicos
            </div>
          </div>

          {activeTooltip && (
            <div className="absolute top-full mt-2 left-0 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl z-50 leading-relaxed border border-slate-700">
              {activeTooltip}
            </div>
          )}
        </div>
      </div>
    );
  }

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
