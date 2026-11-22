import { ALL_LECTURES, CURRICULUM_MODULES } from '../data/curriculum';
import { ALL_QUESTIONS } from '../data/questionBank';
import {
  QuizAttemptRecord,
  QuizQuestion,
  QuizSessionSummary,
  StudentProgressState,
} from '../types/neurology';

export interface QuizBuilderConfig {
  mode: 'custom' | 'all-questions' | 'weak-areas' | 'missed-review';
  selectedLectureIds: string[];
  questionLimit?: number | 'all';
  shuffle?: boolean;
  attemptsByQuestionId?: Record<string, QuizAttemptRecord>;
}

export function shuffleArray<T>(items: T[], rng: () => number = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

export function buildQuizQueue(
  config: QuizBuilderConfig,
  rng: () => number = Math.random
): QuizQuestion[] {
  let pool: QuizQuestion[] = [];

  if (config.mode === 'all-questions') {
    pool = [...ALL_QUESTIONS];
  } else if (config.mode === 'missed-review') {
    const attempts = config.attemptsByQuestionId ?? {};
    pool = ALL_QUESTIONS.filter((q) => {
      const rec = attempts[q.id];
      return rec && !rec.isCorrect;
    });
  } else if (config.mode === 'weak-areas') {
    const analytics = computePerformanceAnalytics(
      config.attemptsByQuestionId ?? {}
    );
    const weakIds = new Set(analytics.weakLectureIds);
    pool =
      weakIds.size > 0
        ? ALL_QUESTIONS.filter((q) => weakIds.has(q.lectureId))
        : [...ALL_QUESTIONS];
  } else {
    const selectedSet = new Set(config.selectedLectureIds);
    pool = ALL_QUESTIONS.filter((q) => selectedSet.has(q.lectureId));
  }

  const ordered = config.shuffle ? shuffleArray(pool, rng) : pool;

  if (
    config.questionLimit &&
    config.questionLimit !== 'all' &&
    config.questionLimit > 0
  ) {
    return ordered.slice(0, config.questionLimit);
  }

  return ordered;
}

export interface LecturePerformanceStat {
  lectureId: string;
  lectureTitle: string;
  moduleId: string;
  totalBankQuestions: number;
  attemptedCount: number;
  correctCount: number;
  accuracyPercent: number | null;
}

export interface ModulePerformanceStat {
  moduleId: string;
  moduleTitle: string;
  totalBankQuestions: number;
  attemptedCount: number;
  correctCount: number;
  accuracyPercent: number | null;
}

export interface PerformanceAnalytics {
  totalBankQuestions: number;
  attemptedUniqueCount: number;
  correctUniqueCount: number;
  overallAccuracyPercent: number | null;
  coveragePercent: number;
  missedQuestionIds: string[];
  weakLectureIds: string[];
  byModule: ModulePerformanceStat[];
  byLecture: LecturePerformanceStat[];
}

export function computePerformanceAnalytics(
  attemptsByQuestionId: Record<string, QuizAttemptRecord>
): PerformanceAnalytics {
  const totalBankQuestions = ALL_QUESTIONS.length;
  const attemptedRecords = ALL_QUESTIONS.map((q) => ({
    question: q,
    attempt: attemptsByQuestionId[q.id],
  }));

  const attemptedUnique = attemptedRecords.filter((r) => Boolean(r.attempt));
  const correctUnique = attemptedUnique.filter((r) => r.attempt?.isCorrect);

  const missedQuestionIds = attemptedUnique
    .filter((r) => r.attempt && !r.attempt.isCorrect)
    .map((r) => r.question.id);

  const byLecture: LecturePerformanceStat[] = ALL_LECTURES.map((lec) => {
    const lecQuestions = ALL_QUESTIONS.filter((q) => q.lectureId === lec.id);
    const lecAttempted = lecQuestions.filter(
      (q) => attemptsByQuestionId[q.id] !== undefined
    );
    const lecCorrect = lecAttempted.filter(
      (q) => attemptsByQuestionId[q.id]?.isCorrect
    );
    const accuracyPercent =
      lecAttempted.length === 0
        ? null
        : Math.round((lecCorrect.length / lecAttempted.length) * 100);

    return {
      lectureId: lec.id,
      lectureTitle: lec.title,
      moduleId: lec.moduleId,
      totalBankQuestions: lecQuestions.length,
      attemptedCount: lecAttempted.length,
      correctCount: lecCorrect.length,
      accuracyPercent,
    };
  });

  const byModule: ModulePerformanceStat[] = CURRICULUM_MODULES.map((mod) => {
    const modQuestions = ALL_QUESTIONS.filter((q) => q.moduleId === mod.id);
    const modAttempted = modQuestions.filter(
      (q) => attemptsByQuestionId[q.id] !== undefined
    );
    const modCorrect = modAttempted.filter(
      (q) => attemptsByQuestionId[q.id]?.isCorrect
    );
    const accuracyPercent =
      modAttempted.length === 0
        ? null
        : Math.round((modCorrect.length / modAttempted.length) * 100);

    return {
      moduleId: mod.id,
      moduleTitle: mod.title,
      totalBankQuestions: modQuestions.length,
      attemptedCount: modAttempted.length,
      correctCount: modCorrect.length,
      accuracyPercent,
    };
  });

  const weakLectureIds = byLecture
    .filter((stat) => stat.accuracyPercent !== null && stat.accuracyPercent < 75)
    .map((stat) => stat.lectureId);

  return {
    totalBankQuestions,
    attemptedUniqueCount: attemptedUnique.length,
    correctUniqueCount: correctUnique.length,
    overallAccuracyPercent:
      attemptedUnique.length === 0
        ? null
        : Math.round((correctUnique.length / attemptedUnique.length) * 100),
    coveragePercent:
      totalBankQuestions === 0
        ? 0
        : Math.round((attemptedUnique.length / totalBankQuestions) * 100),
    missedQuestionIds,
    weakLectureIds,
    byModule,
    byLecture,
  };
}

export const DEFAULT_PROGRESS_STATE: StudentProgressState = {
  reviewedLectureIds: [],
  attemptsByQuestionId: {},
  sessionHistory: [],
  completedDragDropIds: [],
};

const STORAGE_KEY = 'neuroatlas_student_progress_v1';

export function loadStudentProgress(): StudentProgressState {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return DEFAULT_PROGRESS_STATE;
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS_STATE;
    const parsed = JSON.parse(raw) as Partial<StudentProgressState>;
    return {
      reviewedLectureIds: Array.isArray(parsed.reviewedLectureIds)
        ? parsed.reviewedLectureIds
        : [],
      attemptsByQuestionId:
        parsed.attemptsByQuestionId && typeof parsed.attemptsByQuestionId === 'object'
          ? parsed.attemptsByQuestionId
          : {},
      sessionHistory: Array.isArray(parsed.sessionHistory)
        ? parsed.sessionHistory
        : [],
      completedDragDropIds: Array.isArray(parsed.completedDragDropIds)
        ? parsed.completedDragDropIds
        : [],
    };
  } catch {
    return DEFAULT_PROGRESS_STATE;
  }
}

export function saveStudentProgress(state: StudentProgressState): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    // Ignore storage quota / private-browsing errors cleanly
  }
}

export function createSessionSummary(
  mode: QuizSessionSummary['mode'],
  label: string,
  questions: QuizQuestion[],
  sessionAnswers: Record<string, number>
): QuizSessionSummary {
  const answeredQuestions = questions.filter(
    (q) => sessionAnswers[q.id] !== undefined
  );
  const correctCount = answeredQuestions.filter(
    (q) => sessionAnswers[q.id] === q.correctIndex
  ).length;
  const totalQuestions = answeredQuestions.length || questions.length;
  const lectureIds = Array.from(new Set(questions.map((q) => q.lectureId)));

  return {
    id: `sess-${Date.now()}`,
    mode,
    label,
    lectureIds,
    totalQuestions,
    correctCount,
    accuracyPercent:
      totalQuestions === 0
        ? 0
        : Math.round((correctCount / totalQuestions) * 100),
    completedAt: Date.now(),
  };
}
