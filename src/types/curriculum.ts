export type GeometricCategory = 'fundamentals' | 'form' | 'orientation' | 'location' | 'runout' | 'profile' | 'assembly';

export interface Exercise {
  id: string;
  stepNumber: number;
  type: 'interactive_3d' | 'calculation' | 'quiz_conceptual' | 'inspection_cmm';
  title: string;
  difficulty: 'Fácil' | 'Intermediário' | 'Difícil' | 'Especialista';
  instruction: string;
  scenario?: string;
  targetTolerance?: number;
  interactiveAction?: {
    requiredSliderKey?: string;
    targetValueMin?: number;
    targetValueMax?: number;
    triggerStatus?: 'APROVADO' | 'REPROVADO';
    requiredFcfClick?: string; // ex: 'datumA', 'symbol', 'tolerance'
  };
  options?: string[];
  correctOptionIndex?: number;
  correctAnswerNumeric?: number;
  numericTolerance?: number;
  commentedSolution: string; // Explicação detalhada baseada no livro
}

export interface ModuleData {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  category: GeometricCategory;
  fcfSpecification: {
    symbol: string;
    toleranceValue: string;
    materialModifier?: string;
    primaryDatum?: string;
    primaryModifier?: string;
    secondaryDatum?: string;
    secondaryModifier?: string;
    tertiaryDatum?: string;
    tertiaryModifier?: string;
  } | null;
  theoryContent: {
    title: string;
    introduction: string;
    keyPoints: { topic: string; description: string }[];
    engineeringFormulas?: { name: string; formula: string; explanation: string }[];
    inspectionMethod: string;
  };
  model3DConfig: {
    modelType: 'flange_4holes' | 'block_single_hole' | 'stepped_shaft' | 'bracket_L' | 'datum_targets_plate';
    baseDimensions: Record<string, number>;
    defaultFeatures: Record<string, any>;
    toleranceZoneType: 'cylindrical' | 'parallel_planes' | 'concentric_cylinders' | 'surface_envelope';
  };
  sliderConfig: {
    key: string;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    description: string;
  }[];
  exercises: Exercise[];
}
