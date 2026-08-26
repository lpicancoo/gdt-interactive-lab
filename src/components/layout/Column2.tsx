import React from 'react';
import Viewport3D from '../3d/Viewport3D';
import { useGdtStore } from '../../store/useGdtStore';
import { Eye, EyeOff } from 'lucide-react';

const Column2: React.FC = () => {
  const { 
    showDatums, setShowDatums,
    showToleranceZones, setShowToleranceZones,
    showRealAxis, setShowRealAxis
  } = useGdtStore();

  return (
    <>
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <h2 className="text-lg font-bold text-slate-800 bg-white/80 px-3 py-1 rounded-lg backdrop-blur-sm border border-slate-200/50">
          Simulador 3D GD&T
        </h2>
      </div>

      {/* 3D Canvas Container */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Viewport3D />
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-slate-200 shadow-sm gap-1">
        <ToggleBtn active={showDatums} onClick={() => setShowDatums(!showDatums)} label="Datums" />
        <ToggleBtn active={showToleranceZones} onClick={() => setShowToleranceZones(!showToleranceZones)} label="Zonas" />
        <ToggleBtn active={showRealAxis} onClick={() => setShowRealAxis(!showRealAxis)} label="Eixo Real" />
      </div>
    </>
  );
};

const ToggleBtn = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5
      ${active ? 'bg-slate-800 text-white' : 'bg-transparent text-slate-600 hover:bg-slate-100'}`}
  >
    {active ? <Eye size={14} /> : <EyeOff size={14} />}
    {label}
  </button>
);

export default Column2;
