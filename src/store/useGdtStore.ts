import { create } from 'zustand';

interface GdtState {
  activeModule: number;
  setActiveModule: (m: number) => void;
  
  activeTab: 'teoria' | 'exercicios';
  setActiveTab: (tab: 'teoria' | 'exercicios') => void;
  
  activeExercise: number;
  setActiveExercise: (ex: number) => void;

  showDatums: boolean;
  setShowDatums: (val: boolean) => void;
  showToleranceZones: boolean;
  setShowToleranceZones: (val: boolean) => void;
  showRealAxis: boolean;
  setShowRealAxis: (val: boolean) => void;

  holeDiameter: number;
  setHoleDiameter: (val: number) => void;
  
  deviationX: number;
  setDeviationX: (val: number) => void;
  deviationY: number;
  setDeviationY: (val: number) => void;

  selectedDatumInFCF: string | null;
  setSelectedDatumInFCF: (datum: string | null) => void;

  activeTooltip: string | null;
  setActiveTooltip: (val: string | null) => void;

  highlightToleranceZones: boolean;
  setHighlightToleranceZones: (val: boolean) => void;

  exerciseProgress: Record<number, boolean>;
  setExerciseProgress: (ex: number, done: boolean) => void;

  gaugeAnimationActive: boolean;
  setGaugeAnimationActive: (val: boolean) => void;
}

export const useGdtStore = create<GdtState>((set) => ({
  activeModule: 5,
  setActiveModule: (m) => set({ activeModule: m, activeExercise: 1 }),
  
  activeTab: 'exercicios',
  setActiveTab: (tab) => set({ activeTab: tab }),

  activeExercise: 1,
  setActiveExercise: (ex) => set({ activeExercise: ex }),

  showDatums: true,
  setShowDatums: (val) => set({ showDatums: val }),
  
  showToleranceZones: true,
  setShowToleranceZones: (val) => set({ showToleranceZones: val }),
  
  showRealAxis: true,
  setShowRealAxis: (val) => set({ showRealAxis: val }),

  holeDiameter: 10.0, // MMC
  setHoleDiameter: (val) => set({ holeDiameter: val }),

  deviationX: 0,
  setDeviationX: (val) => set({ deviationX: val }),
  
  deviationY: 0,
  setDeviationY: (val) => set({ deviationY: val }),

  selectedDatumInFCF: null,
  setSelectedDatumInFCF: (val) => set({ selectedDatumInFCF: val }),

  activeTooltip: null,
  setActiveTooltip: (val) => set({ activeTooltip: val, highlightToleranceZones: val !== null }),

  highlightToleranceZones: false,
  setHighlightToleranceZones: (val) => set({ highlightToleranceZones: val }),

  exerciseProgress: {},
  setExerciseProgress: (ex, done) => set((state) => ({ 
    exerciseProgress: { ...state.exerciseProgress, [ex]: done } 
  })),

  gaugeAnimationActive: false,
  setGaugeAnimationActive: (val) => set({ gaugeAnimationActive: val }),
}));
