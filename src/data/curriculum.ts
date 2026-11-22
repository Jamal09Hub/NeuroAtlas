import { CurriculumModule, Lecture } from '../types/neurology';
import { foundationsAndInvestigationsModules } from './modules/foundationsAndInvestigations';
import { cranialNervesModule } from './modules/cranialNerves';
import { corticalAndEpilepsyModules } from './modules/corticalAndEpilepsy';
import { strokeAndHeadacheModules } from './modules/strokeAndHeadache';
import { pdMsInfectionsModules } from './modules/pdMsInfections';
import { cordPnsFndTumoursModules } from './modules/cordPnsFndTumours';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  ...foundationsAndInvestigationsModules,
  cranialNervesModule,
  ...corticalAndEpilepsyModules,
  ...strokeAndHeadacheModules,
  ...pdMsInfectionsModules,
  ...cordPnsFndTumoursModules,
];

export const ALL_LECTURES: Lecture[] = CURRICULUM_MODULES.flatMap(
  (mod) => mod.lectures
);

export const LECTURE_BY_ID: Record<string, Lecture> = Object.fromEntries(
  ALL_LECTURES.map((lec) => [lec.id, lec])
);

export const MODULE_BY_ID: Record<string, CurriculumModule> = Object.fromEntries(
  CURRICULUM_MODULES.map((mod) => [mod.id, mod])
);
