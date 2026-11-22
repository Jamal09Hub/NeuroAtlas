import { QuizQuestion } from '../types/neurology';
import { foundationsAndCranialQuestions } from './questions/foundationsAndCranial';
import { corticalEpilepsyStrokeQuestions } from './questions/corticalEpilepsyStroke';
import { headachePdMsInfectionsQuestions } from './questions/headachePdMsInfections';
import { cordPnsFndTumoursQuestions } from './questions/cordPnsFndTumours';

export const ALL_QUESTIONS: QuizQuestion[] = [
  ...foundationsAndCranialQuestions,
  ...corticalEpilepsyStrokeQuestions,
  ...headachePdMsInfectionsQuestions,
  ...cordPnsFndTumoursQuestions,
];

export const QUESTION_BY_ID: Record<string, QuizQuestion> = Object.fromEntries(
  ALL_QUESTIONS.map((q) => [q.id, q])
);
