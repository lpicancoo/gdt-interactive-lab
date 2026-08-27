import React from 'react';

interface MathFormulaProps {
  formula: string;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({ formula, className = '' }) => {
  // Parser that converts common LaTeX expressions into clean React HTML math elements
  const renderMathContent = (raw: string) => {
    // Clean \text{...} wrappers
    let text = raw.replace(/\\text\{([^}]+)\}/g, '$1');
    
    // Check if formula contains a fraction \frac{A}{B}
    const fracMatch = text.match(/^([^=]+=\s*)?\\frac\{([^}]+)\}\{([^}]+)\}(.*)$/);
    if (fracMatch) {
      const prefix = fracMatch[1] ? parseSimpleSymbols(fracMatch[1]) : null;
      const num = fracMatch[2];
      const den = fracMatch[3];
      const suffix = fracMatch[4] ? parseSimpleSymbols(fracMatch[4]) : null;

      return (
        <span className="inline-flex items-center gap-1.5 font-mono text-xs">
          {prefix && <span>{prefix}</span>}
          <span className="inline-flex flex-col items-center justify-center align-middle mx-1 my-0.5">
            <span className="px-1 border-b border-blue-400 font-bold text-center text-[11px] leading-tight text-blue-950">
              {parseSubSuper(num)}
            </span>
            <span className="px-1 font-bold text-center text-[11px] leading-tight text-blue-950">
              {parseSubSuper(den)}
            </span>
          </span>
          {suffix && <span>{suffix}</span>}
        </span>
      );
    }

    return <span className="font-mono text-xs font-semibold leading-relaxed">{parseSubSuper(text)}</span>;
  };

  const parseSimpleSymbols = (str: string) => {
    return str
      .replace(/\\pi/g, 'π')
      .replace(/\\cdot/g, '·')
      .replace(/\\approx/g, '≈')
      .replace(/\\equiv/g, '≡')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\Delta/g, 'Δ');
  };

  const parseSubSuper = (str: string) => {
    let clean = parseSimpleSymbols(str);
    
    // Replace square roots like \sqrt{2} or \sqrt{\Delta X^2 + \Delta Y^2}
    if (clean.includes('√(')) {
      clean = clean.replace(/√\(([^)]+)\)/g, '√($1)');
    }

    // Split by subscripts A_{sub} or A_sub and superscripts A^2
    const parts = clean.split(/(_\{[^}]+\}|_[\w]+|\^[0-9]+|\^\{[^}]+\})/g);

    return parts.map((part, i) => {
      if (part.startsWith('_{') && part.endsWith('}')) {
        return <sub key={i} className="text-[9px] font-bold text-blue-700">{part.slice(2, -1)}</sub>;
      }
      if (part.startsWith('_') && part.length > 1) {
        return <sub key={i} className="text-[9px] font-bold text-blue-700">{part.slice(1)}</sub>;
      }
      if (part.startsWith('^{') && part.endsWith('}')) {
        return <sup key={i} className="text-[9px] font-bold text-slate-900">{part.slice(2, -1)}</sup>;
      }
      if (part.startsWith('^') && part.length > 1) {
        return <sup key={i} className="text-[9px] font-bold text-slate-900">{part.slice(1)}</sup>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className={`bg-white px-3.5 py-2.5 rounded-lg border border-blue-200 shadow-inner flex items-center justify-center text-slate-800 font-mono ${className}`}>
      {renderMathContent(formula)}
    </div>
  );
};

export default MathFormula;
