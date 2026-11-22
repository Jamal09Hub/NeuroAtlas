import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ALL_LECTURES, CURRICULUM_MODULES } from '../data/curriculum';
import { ALL_QUESTIONS } from '../data/questionBank';
import { DRAG_DROP_EXERCISES } from '../data/dragDropExercises';
import { evaluateDragDropAssignments, searchLectures } from './studyLogic';
import {
  buildQuizQueue,
  computePerformanceAnalytics,
  createSessionSummary,
} from './quizLogic';
import { QuizAttemptRecord } from '../types/neurology';

const EXPECTED_47_PDFS = [
  '1-_Basic_neuroanatomy__I_fcd84818.pdf',
  '1-_Headache-I_0f7ee1b1.pdf',
  '1-_Peripheral_nerves_lesions-I_68504d9b.pdf',
  '10-_Lower_CN_8c81b142.pdf',
  '10-_PD_I_0bd40663.pdf',
  '10_-_Infection_II_f81519e1.pdf',
  '11-_Intracranial_tumours_16ad59f5.pdf',
  '11-_Other_CN_9618d35a.pdf',
  '11-_PD_II_404c535e.pdf',
  '12-_Not_CN_975cac91.pdf',
  '12-_Other_neurological_disorders_I_79cd3ff6.pdf',
  '12-_PD_III_c65649a1.pdf',
  '13-_MS_I_6430403f.pdf',
  '13-_Other_neurological_disorders_II_2afafd6a.pdf',
  '13-_Paresis_106fd976.pdf',
  '14-_Ataxia_c8963ec7.pdf',
  '14-_MS_II_ad0a98da.pdf',
  '14-_Other_neurological_disorders_III_4202520c.pdf',
  '15-_MS_III_fec0bff0.pdf',
  '16-_Stroke_I_b4771021.pdf',
  '17-_Stroke_II_d57f4cd7.pdf',
  '18-_Stroke_III_e3986b67.pdf',
  '19-_Stroke_IV_87e2f5d4.pdf',
  '2-_Basic_neuroanatomy__II_707c7063.pdf',
  '2-_Headache-II_9b37640e.pdf',
  '2-_Peripheral_nerves_lesions-II_be7b5b85.pdf',
  '3-_Headache-III_e25a8c5a.pdf',
  '3-_Peripheral_neuropathy_69ebfd5b.pdf',
  '3-_Points_to_remember_68f4f551.pdf',
  '4-_Epilepsy-I_b71089d5.pdf',
  '4-_Functional_neurological_disorders_I_1b9253de.pdf',
  '4-_Neurological_investigations_f18aea86.pdf',
  '5-_Epilepsy-II_a559c0be.pdf',
  '5-_Functional_neurological_disorders_II_1380e20c.pdf',
  '5-_Speech_a816b3e9.pdf',
  '6-_Epilepsy-III_9416d9cb.pdf',
  '6-_II_nerve_57b00deb.pdf',
  '6-_MG_62b33181.pdf',
  '7-_Epilepsy-IV_cd073a93.pdf',
  '7-_III___VI_17f4f635.pdf',
  '7-_MND_0d3b081d.pdf',
  '8-_Coma_b80a1983.pdf',
  '8-_Epilepsy-V_925d8226.pdf',
  '8-_VII_nerve_6614b658.pdf',
  '9-IV_V_nerve_ed0c25b3.pdf',
  '9-_Epilepsy-VI_a618a5b6.pdf',
  '9-_Infection_I_9da32d33.pdf',
];

describe('Curriculum Completeness (All 47 PDFs)', () => {
  it('covers every single one of the 47 source PDFs without duplicates or omissions', () => {
    assert.equal(ALL_LECTURES.length, 47);
    const coveredPdfs = ALL_LECTURES.map((l) => l.sourcePdf).sort();
    assert.deepEqual(coveredPdfs, [...EXPECTED_47_PDFS].sort());
  });

  it('ignores irrelevant leading numbers in lecture and module titles', () => {
    for (const mod of CURRICULUM_MODULES) {
      assert.equal(/^\d+\s*[-_.]/.test(mod.title), false);
    }
    for (const lec of ALL_LECTURES) {
      assert.equal(/^\d+\s*[-_.]/.test(lec.title), false);
      assert.ok(lec.sections.length >= 2, `${lec.id} needs >=2 sections`);
      assert.ok(lec.examPearls.length >= 2, `${lec.id} needs >=2 pearls`);
    }
  });

  it('provides at least 4 high-yield quiz questions for every single one of the 47 lectures', () => {
    assert.equal(ALL_QUESTIONS.length, 188);
    for (const lec of ALL_LECTURES) {
      const qs = ALL_QUESTIONS.filter((q) => q.lectureId === lec.id);
      assert.equal(qs.length, 4, `Expected 4 questions for ${lec.id}`);
      for (const q of qs) {
        assert.equal(q.options.length, 4);
        assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3);
      }
    }
  });
});

describe('Search & Drag-and-Drop Pure Logic', () => {
  it('finds specific neurology concepts accurately across all 47 lectures', () => {
    const hooverMatches = searchLectures('Hoover');
    assert.ok(hooverMatches.length >= 1);
    assert.equal(hooverMatches[0].lecture.id, 'fnd-1');

    const xanthoMatches = searchLectures('xanthochromia');
    assert.ok(xanthoMatches.some((r) => r.lecture.id === 'stroke-2'));

    const allInModule = searchLectures('', 'cranial-nerves');
    assert.equal(allInModule.length, 7);
  });

  it('evaluates drag-and-drop board assignments accurately', () => {
    const ex = DRAG_DROP_EXERCISES[0];
    const perfectAssignments = Object.fromEntries(
      ex.items.map((item) => [item.id, item.correctCategoryId])
    );
    const perfectResult = evaluateDragDropAssignments(ex, perfectAssignments);
    assert.equal(perfectResult.isCompleteAndPerfect, true);
    assert.equal(perfectResult.correctCount, ex.items.length);

    const flawedAssignments = {
      ...perfectAssignments,
      [ex.items[0].id]: ex.categories.find(
        (c) => c.id !== ex.items[0].correctCategoryId
      )!.id,
    };
    const flawedResult = evaluateDragDropAssignments(ex, flawedAssignments);
    assert.equal(flawedResult.isCompleteAndPerfect, false);
    assert.deepEqual(flawedResult.incorrectItemIds, [ex.items[0].id]);
  });
});

describe('Quiz Builder & Analytics Pure Logic', () => {
  it('supports custom lecture selection AND All Questions Mode', () => {
    const customQueue = buildQuizQueue({
      mode: 'custom',
      selectedLectureIds: ['cn-2-optic', 'stroke-2'],
      questionLimit: 'all',
      shuffle: false,
    });
    assert.equal(customQueue.length, 8);
    assert.ok(
      customQueue.every(
        (q) => q.lectureId === 'cn-2-optic' || q.lectureId === 'stroke-2'
      )
    );

    const limitedQueue = buildQuizQueue({
      mode: 'custom',
      selectedLectureIds: ['cn-2-optic', 'stroke-2', 'epilepsy-4'],
      questionLimit: 5,
      shuffle: true,
    });
    assert.equal(limitedQueue.length, 5);

    const allQueue = buildQuizQueue({
      mode: 'all-questions',
      selectedLectureIds: [],
      shuffle: false,
    });
    assert.equal(allQueue.length, 188);
  });

  it('computes accurate performance analytics, weak areas, and missed review queues', () => {
    const attempts: Record<string, QuizAttemptRecord> = {
      'q-cn2-1': {
        questionId: 'q-cn2-1',
        lectureId: 'cn-2-optic',
        moduleId: 'cranial-nerves',
        selectedIndex: 0,
        correctIndex: 1,
        isCorrect: false,
        timestamp: 1000,
      },
      'q-cn2-2': {
        questionId: 'q-cn2-2',
        lectureId: 'cn-2-optic',
        moduleId: 'cranial-nerves',
        selectedIndex: 1,
        correctIndex: 1,
        isCorrect: true,
        timestamp: 2000,
      },
      'q-bna1-1': {
        questionId: 'q-bna1-1',
        lectureId: 'basic-neuroanatomy-1',
        moduleId: 'foundations-neuroanatomy',
        selectedIndex: 1,
        correctIndex: 1,
        isCorrect: true,
        timestamp: 3000,
      },
    };

    const analytics = computePerformanceAnalytics(attempts);
    assert.equal(analytics.totalBankQuestions, 188);
    assert.equal(analytics.attemptedUniqueCount, 3);
    assert.equal(analytics.correctUniqueCount, 2);
    assert.equal(analytics.overallAccuracyPercent, 67);
    assert.deepEqual(analytics.missedQuestionIds, ['q-cn2-1']);
    assert.deepEqual(analytics.weakLectureIds, ['cn-2-optic']);

    const weakQueue = buildQuizQueue({
      mode: 'weak-areas',
      selectedLectureIds: [],
      attemptsByQuestionId: attempts,
    });
    assert.equal(weakQueue.length, 4);
    assert.ok(weakQueue.every((q) => q.lectureId === 'cn-2-optic'));

    const missedQueue = buildQuizQueue({
      mode: 'missed-review',
      selectedLectureIds: [],
      attemptsByQuestionId: attempts,
    });
    assert.equal(missedQueue.length, 1);
    assert.equal(missedQueue[0].id, 'q-cn2-1');

    const summary = createSessionSummary(
      'custom',
      'Optic Nerve Review',
      weakQueue,
      { 'q-cn2-1': 1, 'q-cn2-2': 1, 'q-cn2-3': 0, 'q-cn2-4': 0 }
    );
    assert.equal(summary.correctCount, 3);
    assert.equal(summary.accuracyPercent, 75);
  });
});
