import React from 'react';
import { BookOpen, Target, FileText, CheckCircle2, ShieldCheck, PlayCircle } from 'lucide-react';
import { useGdtStore } from '../../store/useGdtStore';
import { CURRICULUM_MODULES } from '../../data/curriculumData';
import ExerciseEngine from '../ui/ExerciseEngine';
import MathFormula from '../ui/MathFormula';

const Column1: React.FC = () => {
  const { 
    activeModule, setActiveModule, 
    activeTab, setActiveTab,
    activeConceptIndex, setActiveConceptIndex
  } = useGdtStore();

  const currentModule = CURRICULUM_MODULES[activeModule] || CURRICULUM_MODULES[0];

  return (
    <div className="flex flex-col h-full text-sm">
      {/* Header / Module Selector */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50">
        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
          Módulo do Currículo (Gene R. Cogorno)
        </label>
        <select 
          className="w-full bg-white border border-slate-300 text-slate-800 rounded-md py-2 px-2.5 font-medium text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm cursor-pointer"
          value={activeModule < CURRICULUM_MODULES.length ? activeModule : 0}
          onChange={(e) => setActiveModule(Number(e.target.value))}
        >
          {CURRICULUM_MODULES.map((mod, idx) => (
            <option key={mod.id} value={idx}>
              Capítulo {mod.chapterNumber}: {mod.title.replace('Módulo ', '')}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white">
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-semibold text-xs transition-colors ${
            activeTab === 'teoria' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/40' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
          onClick={() => setActiveTab('teoria')}
        >
          <BookOpen size={16} /> Fundamentação Teórica
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-semibold text-xs transition-colors ${
            activeTab === 'exercicios' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/40' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
          onClick={() => setActiveTab('exercicios')}
        >
          <Target size={16} /> Motor de Exercícios ({currentModule.exercises.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {activeTab === 'teoria' ? (
          <div className="space-y-4">
            {/* Title & Subtitle */}
            <div>
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 mb-1 border border-blue-200">
                Capítulo {currentModule.chapterNumber} • {currentModule.category.toUpperCase()}
              </span>
              <h3 className="font-extrabold text-slate-800 text-lg leading-snug">
                {currentModule.theoryContent.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {currentModule.subtitle}
              </p>
            </div>

            {/* Introduction */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700 text-xs leading-relaxed">
              <p className="font-medium text-slate-800 mb-1 flex items-center gap-1.5">
                <FileText size={14} className="text-blue-600 shrink-0" />
                <span>Contexto Técnico e Histórico</span>
              </p>
              {currentModule.theoryContent.introduction}
            </div>

            {/* Key Points */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400">
                Conceitos-Chave (Clique para ativar no 3D)
              </h4>

              {currentModule.theoryContent.keyPoints.map((point, index) => {
                const isActiveConcept = activeConceptIndex === index;

                return (
                  <div 
                    key={index} 
                    onClick={() => setActiveConceptIndex(index)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none space-y-1.5 ${
                      isActiveConcept
                        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-100'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className={isActiveConcept ? 'text-blue-600' : 'text-slate-400'} />
                        {point.topic}
                      </h5>
                      {isActiveConcept && (
                        <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <PlayCircle size={10} /> Ativo no 3D
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-5">
                      {point.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Engineering Formulas with MathFormula */}
            {currentModule.theoryContent.engineeringFormulas && currentModule.theoryContent.engineeringFormulas.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400">
                  Fórmulas de Engenharia e Relações Matemáticas
                </h4>

                {currentModule.theoryContent.engineeringFormulas.map((form, idx) => (
                  <div key={idx} className="bg-blue-50/40 p-3.5 rounded-xl border border-blue-200 space-y-2">
                    <span className="font-bold text-blue-950 text-xs block">
                      {form.name}
                    </span>
                    <MathFormula formula={form.formula} />
                    <p className="text-[11px] text-slate-600 leading-normal italic">
                      {form.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Inspection Method */}
            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 space-y-1.5">
              <h4 className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-600" />
                Método de Inspeção & Metrologia CMM
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {currentModule.theoryContent.inspectionMethod}
              </p>
            </div>
          </div>
        ) : (
          <ExerciseEngine />
        )}
      </div>
    </div>
  );
};

export default Column1;
