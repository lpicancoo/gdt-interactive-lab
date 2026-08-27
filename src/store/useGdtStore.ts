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

  // Module 0 Onboarding State
  showFabricationErrors: boolean;
  setShowFabricationErrors: (val: boolean) => void;
  onboardingStep: number;
  setOnboardingStep: (val: number) => void;
  hasInteractedWithCamera: boolean;
  setHasInteractedWithCamera: (val: boolean) => void;
  // Module 1 Flatness vs Straightness State
  formType: 'planeza' | 'retilineidade';
  setFormType: (val: 'planeza' | 'retilineidade') => void;
  warpConcave: number;
  setWarpConcave: (val: number) => void;
  warpTwist: number;
  setWarpTwist: (val: number) => void;

  // Module 2 Circularity vs Cylindricity State
  cylinderFormType: 'circularidade' | 'cilindricidade';
  setCylinderFormType: (val: 'circularidade' | 'cilindricidade') => void;
  errorOvality: number;
  setErrorOvality: (val: number) => void;
  errorTaper: number;
  setErrorTaper: (val: number) => void;

  // Module 3 Orientation (Parallelism) State
  tiltZ: number;
  setTiltZ: (val: number) => void;
  warpForm: number;
  setWarpForm: (val: number) => void;

  // Module 4 Orientation (Perpendicularity) State
  angularError: number;
  setAngularError: (val: number) => void;

  // Module 6 Runout (Batimento Circular) State
  eccentricity: number;
  setEccentricity: (val: number) => void;
  circularityError: number;
  setCircularityError: (val: number) => void;

  // Module 7 Profile of Surface (Perfil de Superfície) State
  peakDeviation: number;
  setPeakDeviation: (val: number) => void;
  valleySink: number;
  setValleySink: (val: number) => void;

  // Module 8 Assembly Stack-Up (Montagem e Acúmulo de Tolerâncias) State
  lengthHousing: number;
  setLengthHousing: (val: number) => void;
  lengthShaft: number;
  setLengthShaft: (val: number) => void;
  lengthWasher: number;
  setLengthWasher: (val: number) => void;

  // Dynamic Slider State for Curriculum Modules
  sliderValues: Record<string, number>;
  setSliderValue: (key: string, value: number) => void;

  // Module 9 Quiz Evaluation Scores State
  scores: {
    normas: number;
    datums: number;
    forma: number;
    orientacao: number;
    localizacao: number;
  };
  addScore: (category: 'normas' | 'datums' | 'forma' | 'orientacao' | 'localizacao') => void;
  resetScores: () => void;
}

export const useGdtStore = create<GdtState>((set) => ({
  activeModule: 1, // Defaulting to Module 1: Tolerâncias de Forma (Planeza)
  setActiveModule: (m) => set({ 
    activeModule: m, 
    activeExercise: 1, 
    onboardingStep: 1,
    exerciseProgress: {},
    selectedDatumInFCF: null,
    activeTooltip: null,
    warpConcave: 0,
    warpTwist: 0,
    errorOvality: 0,
    errorTaper: 0,
    tiltZ: 0,
    warpForm: 0,
    angularError: 0,
    eccentricity: 0,
    circularityError: 0,
    peakDeviation: 0,
    valleySink: 0,
    lengthHousing: 50.00,
    lengthShaft: 45.00,
    lengthWasher: 4.50,
    scores: { normas: 0, datums: 0, forma: 0, orientacao: 0, localizacao: 0 },
    deviationX: 0,
    deviationY: 0,
    sliderValues: {
      holeDiameter: 3.000,
      deviationX: 0.000,
      deviationY: 0.000,
      temperature: 20,
      thermalExpansion: 0.000,
      shaftDiameter: 1.020,
      bendingBowing: 0.000,
      datumSurfaceError: 0.020,
      shiftMovement: 0.000
    }
  }),
  
  activeTab: 'exercicios',
  setActiveTab: (tab) => set({ activeTab: tab }),

  sliderValues: {
    holeDiameter: 3.000,
    deviationX: 0.000,
    deviationY: 0.000,
    temperature: 20,
    thermalExpansion: 0.000,
    shaftDiameter: 1.020,
    bendingBowing: 0.000,
    datumSurfaceError: 0.020,
    shiftMovement: 0.000
  },
  setSliderValue: (key, val) => set((state) => ({
    sliderValues: { ...state.sliderValues, [key]: val },
    // Also sync with legacy fields if matching key exists
    ...(key === 'holeDiameter' ? { holeDiameter: val } : {}),
    ...(key === 'deviationX' ? { deviationX: val } : {}),
    ...(key === 'deviationY' ? { deviationY: val } : {})
  })),

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

  // Module 1 Form Type initial values
  formType: 'planeza',
  setFormType: (val) => set({ formType: val }),

  warpConcave: 0,
  setWarpConcave: (val) => set({ warpConcave: val }),
  
  warpTwist: 0,
  setWarpTwist: (val) => set({ warpTwist: val }),

  // Module 2 Form Type initial values
  cylinderFormType: 'circularidade',
  setCylinderFormType: (val) => set({ cylinderFormType: val }),

  errorOvality: 0,
  setErrorOvality: (val) => set({ errorOvality: val }),

  errorTaper: 0,
  setErrorTaper: (val) => set({ errorTaper: val }),

  // Module 3 Parallelism initial values
  tiltZ: 0,
  setTiltZ: (val) => set({ tiltZ: val }),

  warpForm: 0,
  setWarpForm: (val) => set({ warpForm: val }),

  // Module 4 Perpendicularity initial values
  angularError: 0,
  setAngularError: (val) => set({ angularError: val }),

  // Module 6 Runout initial values
  eccentricity: 0,
  setEccentricity: (val) => set({ eccentricity: val }),

  circularityError: 0,
  setCircularityError: (val) => set({ circularityError: val }),

  // Module 7 Profile initial values
  peakDeviation: 0,
  setPeakDeviation: (val) => set({ peakDeviation: val }),

  valleySink: 0,
  setValleySink: (val) => set({ valleySink: val }),

  // Module 8 Assembly initial values
  lengthHousing: 50.00,
  setLengthHousing: (val) => set({ lengthHousing: val }),

  lengthShaft: 45.00,
  setLengthShaft: (val) => set({ lengthShaft: val }),

  lengthWasher: 4.50,
  setLengthWasher: (val) => set({ lengthWasher: val }),

  // Module 9 Quiz Evaluation initial values
  scores: { normas: 0, datums: 0, forma: 0, orientacao: 0, localizacao: 0 },
  addScore: (category) => set((state) => ({
    scores: { ...state.scores, [category]: state.scores[category] + 1 }
  })),
  resetScores: () => set({
    scores: { normas: 0, datums: 0, forma: 0, orientacao: 0, localizacao: 0 }
  }),

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

  showFabricationErrors: false,
  setShowFabricationErrors: (val) => set({ showFabricationErrors: val }),
  
  onboardingStep: 1,
  setOnboardingStep: (val) => set({ onboardingStep: val }),
  
  hasInteractedWithCamera: false,
  setHasInteractedWithCamera: (val) => set({ hasInteractedWithCamera: val }),
}));
