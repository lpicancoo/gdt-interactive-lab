import React, { useState, useEffect } from 'react';
import { useGdtStore } from '../../store/useGdtStore';
import { CURRICULUM_MODULES } from '../../data/curriculumData';
import { CheckCircle2, ChevronRight, Calculator, Crosshair, HelpCircle, Award, Check, X } from 'lucide-react';

const ExerciseEngine: React.FC = () => {
  const { 
    activeModule, 
    activeExercise, setActiveExercise, 
    exerciseProgress, setExerciseProgress,
    sliderValues
  } = useGdtStore();

  const currentModule = CURRICULUM_MODULES[activeModule] || CURRICULUM_MODULES[0];
  const exercises = currentModule.exercises;

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [calcInputs, setCalcInputs] = useState<Record<string, string>>({});
  const [calcResults, setCalcResults] = useState<Record<string, boolean>>({});

  // Evaluate interactive 3D actions safely inside useEffect
  useEffect(() => {
    exercises.forEach((ex) => {
      if (ex.type === 'interactive_3d') {
        if (ex.id === 'ex-1-2') {
          // Chapter 1 Step 2: Validate ΔX and ΔY near +0.006
          const devX = sliderValues.deviationX ?? 0;
          const devY = sliderValues.deviationY ?? 0;
          if (devX >= 0.0055 && devY >= 0.0055) {
            if (!exerciseProgress[ex.stepNumber]) {
              setExerciseProgress(ex.stepNumber, true);
            }
          }
        } else if (ex.interactiveAction?.requiredSliderKey) {
          const key = ex.interactiveAction.requiredSliderKey;
          const val = sliderValues[key];
          const min = ex.interactiveAction.targetValueMin ?? -Infinity;
          const max = ex.interactiveAction.targetValueMax ?? Infinity;

          if (val !== undefined && val >= min && val <= max) {
            if (!exerciseProgress[ex.stepNumber]) {
              setExerciseProgress(ex.stepNumber, true);
            }
          }
        }
      }
    });
  }, [sliderValues, activeModule, exercises, exerciseProgress, setExerciseProgress]);

  const handleSelectQuizOption = (exId: string, stepNum: number, optIndex: number, correctIndex?: number) => {
    setQuizAnswers((prev) => ({ ...prev, [exId]: optIndex }));
    const isCorrect = optIndex === correctIndex;
    setExerciseProgress(stepNum, isCorrect);
  };

  const handleVerifyCalculation = (exId: string, stepNum: number, correctVal?: number, tol: number = 0.001) => {
    const rawInput = calcInputs[exId]?.replace(',', '.') || '';
    const numericVal = parseFloat(rawInput);

    if (!isNaN(numericVal) && correctVal !== undefined) {
      const isCorrect = Math.abs(numericVal - correctVal) <= tol;
      setCalcResults((prev) => ({ ...prev, [exId]: isCorrect }));
      setExerciseProgress(stepNum, isCorrect);
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Intermediário':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Difícil':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Especialista':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="font-bold text-slate-800 text-base">
            Motor de Exercícios Dinâmicos
          </h3>
          <p className="text-xs text-slate-500">
            Capítulo {currentModule.chapterNumber} • {currentModule.title}
          </p>
        </div>
        <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shadow-sm">
          Passo {activeExercise} de {exercises.length}
        </span>
      </div>

      <div className="space-y-3">
        {exercises.map((ex) => {
          const isActive = activeExercise === ex.stepNumber;
          const isDone = exerciseProgress[ex.stepNumber] === true;

          return (
            <div 
              key={ex.id} 
              className={`rounded-2xl border transition-all overflow-hidden ${
                isActive 
                  ? 'border-blue-500 ring-2 ring-blue-100 bg-white shadow-md' 
                  : isDone 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : 'border-slate-200 bg-white opacity-85 hover:opacity-100'
              }`}
            >
              {/* Step Accordion Header */}
              <div 
                onClick={() => setActiveExercise(ex.stepNumber)}
                className="p-3.5 flex items-center justify-between cursor-pointer select-none border-b border-slate-100 bg-slate-50/60"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-inner ${
                    isDone 
                      ? 'bg-emerald-600 text-white' 
                      : isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-200 text-slate-700'
                  }`}>
                    {isDone ? <Check size={14} /> : ex.stepNumber}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">
                      {ex.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium capitalize">
                      {ex.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getDifficultyBadge(ex.difficulty)}`}>
                  {ex.difficulty}
                </span>
              </div>

              {/* Step Body (Expanded when active) */}
              {isActive && (
                <div className="p-4 space-y-4 animate-fadeIn">
                  {/* Instruction */}
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {ex.instruction}
                  </p>

                  {/* Scenario Box if present */}
                  {ex.scenario && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 italic space-y-1">
                      <span className="font-bold text-slate-900 not-italic block flex items-center gap-1">
                        <HelpCircle size={14} className="text-blue-600" /> Cenário de Projeto:
                      </span>
                      "{ex.scenario}"
                    </div>
                  )}

                  {/* Type 1: QUIZ CONCEPTUAL */}
                  {ex.type === 'quiz_conceptual' && ex.options && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Selecione a Alternativa Correta:
                      </span>
                      <div className="space-y-2">
                        {ex.options.map((opt, optIdx) => {
                          const selectedOpt = quizAnswers[ex.id];
                          const hasSelected = selectedOpt !== undefined;
                          const isThisSelected = selectedOpt === optIdx;
                          const isThisCorrect = optIdx === ex.correctOptionIndex;

                          let btnStyle = 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100';
                          if (hasSelected) {
                            if (isThisCorrect) {
                              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                            } else if (isThisSelected) {
                              btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-bold';
                            } else {
                              btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizOption(ex.id, ex.stepNumber, optIdx, ex.correctOptionIndex)}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                            >
                              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="leading-snug">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Type 2: CALCULATION */}
                  {ex.type === 'calculation' && (
                    <div className="space-y-3 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Digite seu Cálculo Numérico:
                      </span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ex: 0.034"
                          value={calcInputs[ex.id] || ''}
                          onChange={(e) => setCalcInputs((prev) => ({ ...prev, [ex.id]: e.target.value }))}
                          className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                          onClick={() => handleVerifyCalculation(ex.id, ex.stepNumber, ex.correctAnswerNumeric, ex.numericTolerance)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                        >
                          <Calculator size={14} /> Verificar
                        </button>
                      </div>

                      {calcResults[ex.id] !== undefined && (
                        <div className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                          calcResults[ex.id] 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                            : 'bg-rose-50 border-rose-200 text-rose-800'
                        }`}>
                          {calcResults[ex.id] ? <CheckCircle2 size={16} /> : <X size={16} />}
                          <span>
                            {calcResults[ex.id] 
                              ? 'Cálculo Numérico Perfeito!' 
                              : `Valor Incorreto. Resposta esperada: ${ex.correctAnswerNumeric}`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Type 3: INTERACTIVE 3D */}
                  {ex.type === 'interactive_3d' && (
                    <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-2">
                      <span className="font-bold block flex items-center gap-1.5 text-blue-900">
                        <Crosshair size={16} className="text-blue-600" /> Ação Requerida no Painel 3D:
                      </span>
                      <p className="text-blue-800 leading-relaxed">
                        Ajuste os sliders de metrologia à direita para testar os parâmetros exigidos. A validação ocorrerá automaticamente em tempo real!
                      </p>
                      {isDone && (
                        <div className="bg-emerald-100 text-emerald-900 font-bold p-2 rounded-lg border border-emerald-300 flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-700" />
                          <span>Parâmetros de Usinagem 3D Validados!</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* REVELAÇÃO DA EXPLICAÇÃO DETALHADA DO LIVRO (commentedSolution) */}
                  {(isDone || quizAnswers[ex.id] !== undefined || calcResults[ex.id] !== undefined) && (
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-2 border border-slate-800 animate-fadeIn shadow-lg">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block flex items-center gap-1.5">
                        <Award size={14} /> Resolução Comentada • Gene R. Cogorno:
                      </span>
                      <p className="text-xs leading-relaxed text-slate-300 font-normal">
                        {ex.commentedSolution}
                      </p>
                    </div>
                  )}

                  {/* Button for Next Exercise */}
                  {ex.stepNumber < exercises.length && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setActiveExercise(ex.stepNumber + 1)}
                        className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow"
                      >
                        Próximo Passo <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExerciseEngine;
