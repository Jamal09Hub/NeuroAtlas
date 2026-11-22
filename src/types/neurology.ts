export type InteractiveLabId =
  | 'visual-pathway'
  | 'spinal-tracts'
  | 'brainstem-atlas'
  | 'motor-reflex-cerebellum'
  | 'cranial-nerve-exam'
  | 'stroke-vascular'
  | 'parkinsons-bbb'
  | 'nmj-pns'
  | 'csf-matrix'
  | 'gcs-reflex';

export type DragDropExerciseId =
  | 'umn-lmn-nmj'
  | 'cranial-nerves'
  | 'headache-syndromes'
  | 'epilepsy-aeds'
  | 'stroke-haemorrhage'
  | 'pns-cord-lesions';

export interface ClinicalCallout {
  variant: 'pearl' | 'warning' | 'localisation';
  title: string;
  body: string;
}

export interface ConceptBlock {
  heading: string;
  summary?: string;
  bullets: string[];
  callout?: ClinicalCallout;
}

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface Lecture {
  id: string;
  moduleId: string;
  title: string;
  subtitle: string;
  sourcePdf: string;
  overview: string;
  keyConcepts: string[];
  sections: ConceptBlock[];
  tables?: ComparisonTable[];
  examPearls: string[];
  interactiveLabs?: InteractiveLabId[];
  dragDropId?: DragDropExerciseId;
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  lectures: Lecture[];
}

export interface DragDropCategory {
  id: string;
  label: string;
  description: string;
}

export interface DragDropItem {
  id: string;
  label: string;
  detail: string;
  correctCategoryId: string;
  rationale: string;
}

export interface DragDropExercise {
  id: DragDropExerciseId;
  title: string;
  moduleId: string;
  instructions: string;
  categories: DragDropCategory[];
  items: DragDropItem[];
}

export interface QuizQuestion {
  id: string;
  lectureId: string;
  moduleId: string;
  difficulty: 'Core Recall' | 'Clinical Vignette' | 'Differential & Mx';
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  highYieldTakeaway: string;
}

export interface QuizAttemptRecord {
  questionId: string;
  lectureId: string;
  moduleId: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface QuizSessionSummary {
  id: string;
  mode: 'custom' | 'all-questions' | 'weak-areas' | 'missed-review';
  label: string;
  lectureIds: string[];
  totalQuestions: number;
  correctCount: number;
  accuracyPercent: number;
  completedAt: number;
}

export interface StudentProgressState {
  reviewedLectureIds: string[];
  attemptsByQuestionId: Record<string, QuizAttemptRecord>;
  sessionHistory: QuizSessionSummary[];
  completedDragDropIds: string[];
}
