import { ALL_LECTURES, CURRICULUM_MODULES } from '../data/curriculum';
import { DragDropExercise, Lecture } from '../types/neurology';

export interface LectureSearchResult {
  lecture: Lecture;
  moduleTitle: string;
  matchSnippet: string;
  score: number;
}

export function searchLectures(
  query: string,
  moduleFilterId?: string | null
): LectureSearchResult[] {
  const trimmed = query.trim().toLowerCase();
  const modules = moduleFilterId
    ? CURRICULUM_MODULES.filter((m) => m.id === moduleFilterId)
    : CURRICULUM_MODULES;

  if (!trimmed) {
    return modules.flatMap((mod) =>
      mod.lectures.map((lecture) => ({
        lecture,
        moduleTitle: mod.title,
        matchSnippet: lecture.overview,
        score: 1,
      }))
    );
  }

  const terms = trimmed.split(/\s+/).filter(Boolean);
  const results: LectureSearchResult[] = [];

  for (const mod of modules) {
    for (const lecture of mod.lectures) {
      let score = 0;
      let snippet = lecture.overview;

      const titleLower = lecture.title.toLowerCase();
      const subtitleLower = lecture.subtitle.toLowerCase();
      const overviewLower = lecture.overview.toLowerCase();
      const conceptsLower = lecture.keyConcepts.join(' ').toLowerCase();
      const pearlsLower = lecture.examPearls.join(' ').toLowerCase();
      const sectionTexts = lecture.sections.flatMap((s) => [
        s.heading,
        s.summary ?? '',
        ...s.bullets,
        s.callout?.title ?? '',
        s.callout?.body ?? '',
      ]);
      const tableTexts = (lecture.tables ?? []).flatMap((t) => [
        t.title,
        ...t.headers,
        ...t.rows.flat(),
      ]);

      const allCorpus = [
        titleLower,
        subtitleLower,
        overviewLower,
        conceptsLower,
        pearlsLower,
        ...sectionTexts.map((x) => x.toLowerCase()),
        ...tableTexts.map((x) => x.toLowerCase()),
      ].join(' \n ');

      const matchesAllTerms = terms.every((term) => allCorpus.includes(term));
      if (!matchesAllTerms) continue;

      for (const term of terms) {
        if (titleLower.includes(term)) score += 12;
        if (subtitleLower.includes(term)) score += 7;
        if (conceptsLower.includes(term)) score += 6;
        if (pearlsLower.includes(term)) score += 4;
        if (overviewLower.includes(term)) score += 3;
      }

      const matchingSegment =
        sectionTexts.find((seg) =>
          terms.some((t) => seg.toLowerCase().includes(t))
        ) ??
        lecture.examPearls.find((p) =>
          terms.some((t) => p.toLowerCase().includes(t))
        ) ??
        lecture.overview;

      snippet =
        matchingSegment.length > 180
          ? `${matchingSegment.slice(0, 177)}...`
          : matchingSegment;

      results.push({
        lecture,
        moduleTitle: mod.title,
        matchSnippet: snippet,
        score: Math.max(score, 1),
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

export interface DragDropEvaluation {
  placedCount: number;
  totalItems: number;
  correctCount: number;
  incorrectItemIds: string[];
  correctItemIds: string[];
  isCompleteAndPerfect: boolean;
}

export function evaluateDragDropAssignments(
  exercise: DragDropExercise,
  assignments: Record<string, string>
): DragDropEvaluation {
  const correctItemIds: string[] = [];
  const incorrectItemIds: string[] = [];

  for (const item of exercise.items) {
    const assignedCat = assignments[item.id];
    if (!assignedCat) continue;
    if (assignedCat === item.correctCategoryId) {
      correctItemIds.push(item.id);
    } else {
      incorrectItemIds.push(item.id);
    }
  }

  const placedCount = correctItemIds.length + incorrectItemIds.length;
  const totalItems = exercise.items.length;

  return {
    placedCount,
    totalItems,
    correctCount: correctItemIds.length,
    incorrectItemIds,
    correctItemIds,
    isCompleteAndPerfect:
      placedCount === totalItems && incorrectItemIds.length === 0,
  };
}

export function getModuleCompletionStats(reviewedLectureIds: string[]) {
  const reviewedSet = new Set(reviewedLectureIds);
  const totalLectures = ALL_LECTURES.length;
  const reviewedCount = ALL_LECTURES.filter((l) => reviewedSet.has(l.id)).length;

  const byModule = CURRICULUM_MODULES.map((mod) => {
    const modTotal = mod.lectures.length;
    const modReviewed = mod.lectures.filter((l) => reviewedSet.has(l.id)).length;
    return {
      moduleId: mod.id,
      moduleTitle: mod.title,
      total: modTotal,
      reviewed: modReviewed,
      percent: modTotal === 0 ? 0 : Math.round((modReviewed / modTotal) * 100),
    };
  });

  return {
    totalLectures,
    reviewedCount,
    percent:
      totalLectures === 0
        ? 0
        : Math.round((reviewedCount / totalLectures) * 100),
    byModule,
  };
}
