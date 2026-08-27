import React from 'react';
import FeatureControlFrame from '../ui/FeatureControlFrame';
import MetrologyPanel from '../ui/MetrologyPanel';
import Chapter1Comparator from '../ui/Chapter1Comparator';
import Chapter2MetrologyPanel from '../ui/Chapter2MetrologyPanel';
import { ShieldCheck } from 'lucide-react';
import { useGdtStore } from '../../store/useGdtStore';
import { CURRICULUM_MODULES } from '../../data/curriculumData';

const Column3: React.FC = () => {
  const { activeModule } = useGdtStore();
  const currentModule = CURRICULUM_MODULES[activeModule] || CURRICULUM_MODULES[0];

  const isChapter1 = activeModule === 0;
  const isChapter2 = activeModule === 1;

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden text-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
        <div>
          <h2 className="font-bold text-slate-800 text-base">
            {isChapter1 ? 'Comparador Coordenada vs GD&T' : isChapter2 ? 'Inspeção Dimensional & Térmica' : 'Inspeção CMM & Metrologia'}
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {isChapter1 ? 'Análise do Capítulo 1 - Gene R. Cogorno' : isChapter2 ? 'Análise do Capítulo 2 - Gene R. Cogorno' : 'Especificação ASME Y14.5'}
          </span>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm">
          <ShieldCheck size={14} />
          CONFORME
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
        {isChapter1 ? (
          <Chapter1Comparator />
        ) : isChapter2 ? (
          <Chapter2MetrologyPanel />
        ) : (
          <>
            {/* Seção 1: Especificação do Projeto (FCF) */}
            {currentModule.fcfSpecification && (
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-1.5">
                  Seção 1: Quadro de Controle de Características (FCF)
                </h3>
                <FeatureControlFrame />
              </div>
            )}

            {/* Seção 2: Simulação Metrológica & Sliders de Usinagem */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-1.5">
                Seção 2: Simulação Metrológica e Parâmetros
              </h3>
              <MetrologyPanel />
            </div>
          </>
        )}

        {/* Seção 3: Resumo Técnico do Capítulo */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
            <span>📚</span> Resumo do Módulo {currentModule.chapterNumber} (Gene R. Cogorno)
          </h4>
          <p className="text-slate-600 leading-relaxed">
            {currentModule.theoryContent.introduction}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Column3;
