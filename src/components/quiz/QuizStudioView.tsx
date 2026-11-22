import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  ListChecks,
  Play,
  RotateCcw,
  Search,
  Square,
  Strikethrough,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  ALL_LECTURES,
  CURRICULUM_MODULES,
  LECTURE_BY_ID,
  MODULE_BY_ID,
} from '../../data/curriculum';
import { ALL_QUESTIONS } from '../../data/questionBank';
import {
  QuizAttemptRecord,
  QuizQuestion,
  QuizSessionSummary,
  StudentProgressState,
} from '../../types/neurology';
import {
  buildQuizQueue,
  computePerformanceAnalytics,
  createSessionSummary,
} from '../../utils/quizLogic';

type QuizSubTab = 'setup' | 'runner' | 'analytics';

interface QuizStudioViewProps {
  progress: StudentProgressState;
  activeQuizRequest: {
    lectureIds: string[];
    label: string;
    nonce: number;
  } | null;
  onRecordAttempt: (attempt: QuizAttemptRecord) => void;
  onSaveSession: (summary: QuizSessionSummary) => void;
  onResetProgress: () => void;
  onOpenLectureInLibrary: (lectureId: string) => void;
}

export function QuizStudioView({
  progress,
  activeQuizRequest,
  onRecordAttempt,
  onSaveSession,
  onResetProgress,
  onOpenLectureInLibrary,
}: QuizStudioViewProps) {
  const [subTab, setSubTab] = useState<QuizSubTab>(() =>
    activeQuizRequest ? 'runner' : 'setup'
  );
  const [selectedLectureIds, setSelectedLectureIds] = useState<string[]>(() =>
    activeQuizRequest
      ? activeQuizRequest.lectureIds
      : CURRICULUM_MODULES[0].lectures.map((l) => l.id)
  );
  const [questionLimit, setQuestionLimit] = useState<number | 'all'>('all');
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [lectureSearch, setLectureSearch] = useState('');

  // Active quiz session state
  const [sessionMode, setSessionMode] =
    useState<QuizSessionSummary['mode']>('custom');
  const [sessionLabel, setSessionLabel] = useState('Custom Practice Quiz');
  const [quizQueue, setQuizQueue] = useState<QuizQuestion[]>(() =>
    activeQuizRequest
      ? buildQuizQueue({
          mode: 'custom',
          selectedLectureIds: activeQuizRequest.lectureIds,
          questionLimit: 'all',
          shuffle: false,
        })
      : []
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, number>>({});
  const [struckOptions, setStruckOptions] = useState<Record<string, number[]>>({});
  const [sessionFinished, setSessionFinished] = useState(false);

  // Sync external lecture quiz launches cleanly via tracked nonce
  const [lastHandledNonce, setLastHandledNonce] = useState<number>(
    activeQuizRequest?.nonce ?? 0
  );
  if (activeQuizRequest && activeQuizRequest.nonce !== lastHandledNonce) {
    setLastHandledNonce(activeQuizRequest.nonce);
    const q = buildQuizQueue({
      mode: 'custom',
      selectedLectureIds: activeQuizRequest.lectureIds,
      questionLimit: 'all',
      shuffle: false,
    });
    setSelectedLectureIds(activeQuizRequest.lectureIds);
    setSessionMode('custom');
    setSessionLabel(activeQuizRequest.label);
    setQuizQueue(q);
    setCurrentIdx(0);
    setSessionAnswers({});
    setStruckOptions({});
    setSessionFinished(false);
    setSubTab('runner');
  }

  const analytics = useMemo(
    () => computePerformanceAnalytics(progress.attemptsByQuestionId),
    [progress.attemptsByQuestionId]
  );

  const matchingCount = useMemo(() => {
    const selectedSet = new Set(selectedLectureIds);
    return ALL_QUESTIONS.filter((q) => selectedSet.has(q.lectureId)).length;
  }, [selectedLectureIds]);

  const toggleLectureSelection = (id: string) => {
    setSelectedLectureIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleModuleSelection = (moduleId: string) => {
    const mod = MODULE_BY_ID[moduleId];
    if (!mod) return;
    const modIds = mod.lectures.map((l) => l.id);
    const allSelected = modIds.every((id) => selectedLectureIds.includes(id));
    if (allSelected) {
      setSelectedLectureIds((prev) => prev.filter((id) => !modIds.includes(id)));
    } else {
      setSelectedLectureIds((prev) => Array.from(new Set([...prev, ...modIds])));
    }
  };

  const launchQuiz = (
    mode: QuizSessionSummary['mode'],
    label: string,
    lectureIdsOverride?: string[],
    limitOverride?: number | 'all'
  ) => {
    const ids = lectureIdsOverride ?? selectedLectureIds;
    const queue = buildQuizQueue({
      mode,
      selectedLectureIds: ids,
      questionLimit: limitOverride ?? questionLimit,
      shuffle: shuffleQuestions,
      attemptsByQuestionId: progress.attemptsByQuestionId,
    });
    if (queue.length === 0) return;

    setSessionMode(mode);
    setSessionLabel(label);
    setQuizQueue(queue);
    setCurrentIdx(0);
    setSessionAnswers({});
    setStruckOptions({});
    setSessionFinished(false);
    setSubTab('runner');
  };

  const handleSelectOption = (question: QuizQuestion, optionIdx: number) => {
    if (sessionAnswers[question.id] !== undefined) return;
    setSessionAnswers((prev) => ({ ...prev, [question.id]: optionIdx }));
    onRecordAttempt({
      questionId: question.id,
      lectureId: question.lectureId,
      moduleId: question.moduleId,
      selectedIndex: optionIdx,
      correctIndex: question.correctIndex,
      isCorrect: optionIdx === question.correctIndex,
      timestamp: Date.now(),
    });
  };

  const toggleStrikeOption = (questionId: string, optionIdx: number) => {
    setStruckOptions((prev) => {
      const current = prev[questionId] ?? [];
      const next = current.includes(optionIdx)
        ? current.filter((i) => i !== optionIdx)
        : [...current, optionIdx];
      return { ...prev, [questionId]: next };
    });
  };

  const handleFinishSession = () => {
    const summary = createSessionSummary(
      sessionMode,
      sessionLabel,
      quizQueue,
      sessionAnswers
    );
    onSaveSession(summary);
    setSessionFinished(true);
  };

  const currentQuestion = quizQueue[currentIdx];
  const answeredCount = Object.keys(sessionAnswers).length;
  const sessionCorrectCount = quizQueue.filter(
    (q) => sessionAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="flex-1 bg-[#F6F8FA] py-5 px-4 sm:px-6">
      <div className="max-w-[1440px] mx-auto space-y-5">
        {/* Sub-navigation bar */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-2.5 pb-3.5 border-b border-[#DCE3E8]">
          <div className="grid grid-cols-3 sm:inline-flex bg-[#EEF2F5] p-1 rounded-md border border-[#DCE3E8] w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSubTab('setup')}
              className={`inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
                subTab === 'setup'
                  ? 'bg-white text-[#0B3A45] shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              <ListChecks className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">QBank Builder</span>
              <span className="sm:hidden">Builder</span>
            </button>
            <button
              type="button"
              onClick={() => setSubTab('runner')}
              disabled={quizQueue.length === 0}
              className={`inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
                subTab === 'runner'
                  ? 'bg-white text-[#0B3A45] shadow-xs'
                  : quizQueue.length === 0
                  ? 'text-[#94A3B8] cursor-not-allowed'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              <Play className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">
                Active Session {quizQueue.length > 0 && `(${quizQueue.length})`}
              </span>
              <span className="sm:hidden">
                Quiz {quizQueue.length > 0 && `(${quizQueue.length})`}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSubTab('analytics')}
              className={`inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
                subTab === 'analytics'
                  ? 'bg-white text-[#0B3A45] shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Performance Analytics</span>
              <span className="sm:hidden">Analytics</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[#475569] tabular-nums">
            Bank Coverage: {analytics.attemptedUniqueCount}/{analytics.totalBankQuestions} ·{' '}
            Accuracy:{' '}
            {analytics.overallAccuracyPercent === null
              ? '—'
              : `${analytics.overallAccuracyPercent}%`}
          </div>
        </div>

        {/* ================================================================== */}
        {/* TAB 1: CUSTOM QUIZ BUILDER & ALL-QUESTIONS MODE                    */}
        {/* ================================================================== */}
        {subTab === 'setup' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left: Custom Lecture Selector */}
            <div className="lg:col-span-8 bg-white border border-[#DCE3E8] rounded-lg overflow-hidden">
              <div className="px-4 py-3.5 border-b border-[#DCE3E8] bg-[#F1F5F8] flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-bold text-[#0B3A45]">
                    Select Lectures for Custom Practice Exam
                  </h2>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Pick any combination across {ALL_LECTURES.length} clinical lectures ({matchingCount} questions matched)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedLectureIds(ALL_LECTURES.map((l) => l.id))
                    }
                    className="px-2.5 py-1 text-xs font-medium text-[#0B3A45] bg-white border border-[#DCE3E8] rounded hover:bg-[#F6F8FA] whitespace-nowrap shrink-0"
                  >
                    Select All 47
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLectureIds([])}
                    className="px-2.5 py-1 text-xs font-medium text-[#475569] bg-white border border-[#DCE3E8] rounded hover:bg-[#F6F8FA] whitespace-nowrap shrink-0"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="p-3.5 border-b border-[#DCE3E8]">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={lectureSearch}
                    onChange={(e) => setLectureSearch(e.target.value)}
                    placeholder="Filter lectures by topic name..."
                    aria-label="Filter lectures in quiz builder"
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F6F8FA] border border-[#DCE3E8] rounded-md focus:outline-none focus:border-[#126D7C] focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-4 space-y-3 max-h-[580px] overflow-y-auto">
                {CURRICULUM_MODULES.map((mod) => {
                  const filteredLectures = mod.lectures.filter((l) =>
                    l.title.toLowerCase().includes(lectureSearch.trim().toLowerCase())
                  );
                  if (filteredLectures.length === 0) return null;

                  const allModSelected = mod.lectures.every((l) =>
                    selectedLectureIds.includes(l.id)
                  );

                  return (
                    <div
                      key={mod.id}
                      className="border border-[#DCE3E8] rounded-md overflow-hidden"
                    >
                      <div className="px-3.5 py-2 bg-[#F1F5F8] border-b border-[#DCE3E8] flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => toggleModuleSelection(mod.id)}
                          className="flex items-center gap-2 text-xs font-bold text-[#0B3A45] text-left"
                        >
                          {allModSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#126D7C] shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-[#94A3B8] shrink-0" />
                          )}
                          <span>{mod.title}</span>
                        </button>
                        <span className="text-[11px] font-mono text-[#64748B] tabular-nums shrink-0">
                          {mod.lectures.length * 4} Qs
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:gap-px bg-[#E6ECF0]">
                        {filteredLectures.map((lec) => {
                          const checked = selectedLectureIds.includes(lec.id);
                          return (
                            <button
                              key={lec.id}
                              type="button"
                              onClick={() => toggleLectureSelection(lec.id)}
                              className={`text-left px-3 py-2 text-xs flex items-start gap-2 bg-white hover:bg-[#F6F8FA] transition-colors ${
                                checked ? 'text-[#0F172A] font-medium' : 'text-[#475569]'
                              }`}
                            >
                              {checked ? (
                                <CheckSquare className="w-3.5 h-3.5 text-[#126D7C] shrink-0 mt-0.5" />
                              ) : (
                                <Square className="w-3.5 h-3.5 text-[#CBD5E1] shrink-0 mt-0.5" />
                              )}
                              <span className="leading-snug">{lec.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right (First on Mobile): Launch Controls & All Questions Mode */}
            <div className="lg:col-span-4 space-y-4 order-first lg:order-last">
              <div className="bg-white border border-[#DCE3E8] rounded-lg p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#0B3A45]">
                  Configure Custom Session
                </h3>

                <div className="space-y-2 text-xs">
                  <label className="block font-semibold text-[#334155]">
                    Question Count
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {([10, 20, 40, 'all'] as const).map((lim) => (
                      <button
                        key={String(lim)}
                        type="button"
                        onClick={() => setQuestionLimit(lim)}
                        className={`py-1.5 px-2 rounded border font-mono text-xs font-semibold ${
                          questionLimit === lim
                            ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                            : 'bg-[#F6F8FA] text-[#334155] border-[#DCE3E8]'
                        }`}
                      >
                        {lim === 'all' ? 'All' : lim}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center justify-between text-xs font-medium text-[#334155] cursor-pointer pt-1">
                  <span>Shuffle question order</span>
                  <input
                    type="checkbox"
                    checked={shuffleQuestions}
                    onChange={(e) => setShuffleQuestions(e.target.checked)}
                    className="w-4 h-4 accent-[#126D7C]"
                  />
                </label>

                <button
                  type="button"
                  disabled={matchingCount === 0}
                  onClick={() =>
                    launchQuiz(
                      'custom',
                      `Custom Selection (${selectedLectureIds.length} Lectures)`
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-md bg-[#0B3A45] text-white font-semibold text-xs hover:bg-[#126D7C] disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start Custom Quiz (
                  {questionLimit === 'all'
                    ? matchingCount
                    : Math.min(questionLimit, matchingCount)}{' '}
                  Questions)
                </button>
              </div>

              {/* All Questions Mode Panel */}
              <div className="bg-[#0B3A45] text-white rounded-lg p-5 space-y-3 border border-[#072931]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#90D5E0]">
                  Complete Bank Marathon
                </div>
                <h3 className="text-base font-bold">
                  All Questions Mode ({ALL_QUESTIONS.length} Questions)
                </h3>
                <p className="text-xs text-[#D4E6EA] leading-relaxed">
                  Work systematically through every single question across all 47 lectures with immediate clinical explanations and analytics tracking.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    launchQuiz(
                      'all-questions',
                      `Complete Question Bank (${ALL_QUESTIONS.length} Qs)`,
                      [],
                      'all'
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-md bg-white text-[#0B3A45] font-semibold text-xs hover:bg-[#EEF5F7] transition-colors flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4 text-[#126D7C]" /> Launch All {ALL_QUESTIONS.length}{' '}
                  Questions
                </button>
              </div>

              {/* Adaptive Review Shortcuts */}
              <div className="bg-white border border-[#DCE3E8] rounded-lg p-5 space-y-2.5">
                <div className="text-xs font-bold text-[#0B3A45] flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#126D7C]" /> Targeted Weak-Area Modes
                </div>
                <button
                  type="button"
                  disabled={analytics.missedQuestionIds.length === 0}
                  onClick={() =>
                    launchQuiz(
                      'missed-review',
                      `Missed Questions Review (${analytics.missedQuestionIds.length})`,
                      [],
                      'all'
                    )
                  }
                  className="w-full py-2 px-3 rounded-md border border-[#DCE3E8] text-xs font-semibold text-[#0F172A] hover:bg-[#F6F8FA] disabled:text-[#94A3B8] disabled:bg-[#F8FAFC] flex items-center justify-between"
                >
                  <span>Retry Missed Questions</span>
                  <span className="font-mono tabular-nums">
                    {analytics.missedQuestionIds.length} Qs
                  </span>
                </button>
                <button
                  type="button"
                  disabled={analytics.weakLectureIds.length === 0}
                  onClick={() =>
                    launchQuiz(
                      'weak-areas',
                      `Weak Lectures Drill (${analytics.weakLectureIds.length} Lectures)`,
                      [],
                      'all'
                    )
                  }
                  className="w-full py-2 px-3 rounded-md border border-[#DCE3E8] text-xs font-semibold text-[#0F172A] hover:bg-[#F6F8FA] disabled:text-[#94A3B8] disabled:bg-[#F8FAFC] flex items-center justify-between"
                >
                  <span>Drill Lectures &lt;75% Accuracy</span>
                  <span className="font-mono tabular-nums">
                    {analytics.weakLectureIds.length} Lectures
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: ACTIVE QUIZ RUNNER (IMMEDIATE FEEDBACK + STRIKE-OUT)        */}
        {/* ================================================================== */}
        {subTab === 'runner' && (
          <div className="max-w-3xl mx-auto">
            {quizQueue.length === 0 ? (
              <div className="bg-white border border-[#DCE3E8] rounded-lg p-8 text-center space-y-3">
                <p className="text-sm text-[#475569]">No active quiz session.</p>
                <button
                  type="button"
                  onClick={() => setSubTab('setup')}
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-[#0B3A45] text-white"
                >
                  Open QBank Builder
                </button>
              </div>
            ) : sessionFinished ? (
              <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 sm:p-8 space-y-5">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                    Session Complete
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A]">{sessionLabel}</h2>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-md bg-[#F6F8FA] border border-[#DCE3E8]">
                    <div className="text-[11px] font-mono text-[#64748B]">SCORE</div>
                    <div className="text-xl font-bold font-mono tabular-nums text-[#0F172A] mt-1">
                      {sessionCorrectCount}/{answeredCount || quizQueue.length}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-md bg-[#F6F8FA] border border-[#DCE3E8]">
                    <div className="text-[11px] font-mono text-[#64748B]">ACCURACY</div>
                    <div className="text-xl font-bold font-mono tabular-nums text-[#0B3A45] mt-1">
                      {answeredCount === 0
                        ? '0%'
                        : `${Math.round((sessionCorrectCount / answeredCount) * 100)}%`}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-md bg-[#F6F8FA] border border-[#DCE3E8]">
                    <div className="text-[11px] font-mono text-[#64748B]">BANK COVERAGE</div>
                    <div className="text-xl font-bold font-mono tabular-nums text-[#126D7C] mt-1">
                      {analytics.coveragePercent}%
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSubTab('analytics')}
                    className="px-4 py-2 text-xs font-semibold rounded-md bg-[#0B3A45] text-white hover:bg-[#126D7C]"
                  >
                    View Performance Analytics
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubTab('setup')}
                    className="px-4 py-2 text-xs font-semibold rounded-md border border-[#DCE3E8] bg-white text-[#0B3A45] hover:bg-[#F6F8FA]"
                  >
                    Build Another Quiz
                  </button>
                </div>
              </div>
            ) : currentQuestion ? (
              <div className="bg-white border border-[#DCE3E8] rounded-lg overflow-hidden">
                {/* Runner Top Bar */}
                <div className="px-5 py-3.5 border-b border-[#DCE3E8] bg-[#F1F5F8] flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs">
                    <span className="font-mono font-bold text-[#0F172A] tabular-nums">
                      Question {currentIdx + 1} / {quizQueue.length}
                    </span>
                    <span className="text-[#94A3B8] mx-2">·</span>
                    <span className="font-semibold text-[#126D7C]">
                      {LECTURE_BY_ID[currentQuestion.lectureId]?.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono tabular-nums">
                    <span className="text-emerald-700 font-semibold">
                      {sessionCorrectCount}/{answeredCount} Correct
                    </span>
                    <button
                      type="button"
                      onClick={handleFinishSession}
                      className="font-sans font-semibold text-[#0B3A45] hover:bg-[#EEF5F7] px-2.5 py-1 border border-[#DCE3E8] rounded bg-white"
                    >
                      Finish Early
                    </button>
                  </div>
                </div>

                {/* Progress Strip */}
                <div className="w-full h-1 bg-[#E6ECF0]">
                  <div
                    className="h-full bg-[#126D7C] transition-all"
                    style={{
                      width: `${Math.round(((currentIdx + 1) / quizQueue.length) * 100)}%`,
                    }}
                  />
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                    <span>
                      {currentQuestion.difficulty} ·{' '}
                      {MODULE_BY_ID[currentQuestion.moduleId]?.title}
                    </span>
                    <span>Click strike icon to rule out distractors</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-[#0F172A] leading-relaxed">
                    {currentQuestion.stem}
                  </h3>

                  {/* Options with AMBOSS Strike-out Distractor Support */}
                  <div className="space-y-2.5">
                    {currentQuestion.options.map((opt, idx) => {
                      const chosenIdx = sessionAnswers[currentQuestion.id];
                      const hasAnswered = chosenIdx !== undefined;
                      const isThisSelected = chosenIdx === idx;
                      const isThisCorrect = currentQuestion.correctIndex === idx;
                      const isStruck =
                        !hasAnswered &&
                        (struckOptions[currentQuestion.id] ?? []).includes(idx);

                      let cardStyle =
                        'bg-white border-[#DCE3E8] hover:border-[#126D7C] hover:bg-[#F6F8FA] text-[#0F172A]';
                      if (hasAnswered) {
                        if (isThisCorrect) {
                          cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950';
                        } else if (isThisSelected && !isThisCorrect) {
                          cardStyle = 'bg-red-50 border-red-400 text-red-950';
                        } else {
                          cardStyle = 'bg-[#F8FAFC] border-[#DCE3E8] text-[#64748B]';
                        }
                      } else if (isStruck) {
                        cardStyle = 'bg-[#F8FAFC] border-[#DCE3E8] text-[#94A3B8]';
                      }

                      return (
                        <div key={idx} className="flex items-stretch gap-2">
                          <button
                            type="button"
                            disabled={hasAnswered}
                            onClick={() => handleSelectOption(currentQuestion, idx)}
                            className={`flex-1 text-left p-3.5 rounded-md border text-sm transition-colors flex items-start justify-between gap-3 ${cardStyle}`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="font-mono font-bold text-xs mt-0.5 shrink-0">
                                {String.fromCharCode(65 + idx)}.
                              </span>
                              <span className={`leading-snug ${isStruck ? 'line-through' : ''}`}>
                                {opt}
                              </span>
                            </div>
                            {hasAnswered && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                            )}
                            {hasAnswered && isThisSelected && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                            )}
                          </button>

                          {!hasAnswered && (
                            <button
                              type="button"
                              onClick={() => toggleStrikeOption(currentQuestion.id, idx)}
                              aria-label={`Strike out option ${String.fromCharCode(65 + idx)}`}
                              title="Cross out option"
                              className={`px-2.5 rounded-md border transition-colors shrink-0 ${
                                isStruck
                                  ? 'bg-[#EEF5F7] border-[#126D7C] text-[#0B3A45]'
                                  : 'bg-white border-[#DCE3E8] text-[#64748B] hover:text-[#0B3A45] hover:bg-[#F6F8FA]'
                              }`}
                            >
                              <Strikethrough className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Immediate Per-Question Feedback */}
                  {sessionAnswers[currentQuestion.id] !== undefined && (
                    <div
                      className={`p-4 rounded-md border space-y-2 text-xs sm:text-sm ${
                        sessionAnswers[currentQuestion.id] ===
                        currentQuestion.correctIndex
                          ? 'bg-emerald-50/75 border-emerald-300 text-emerald-950'
                          : 'bg-red-50/75 border-red-300 text-red-950'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold">
                        {sessionAnswers[currentQuestion.id] ===
                        currentQuestion.correctIndex ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>CORRECT</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-700" />
                            <span>
                              INCORRECT — Correct Option:{' '}
                              {String.fromCharCode(65 + currentQuestion.correctIndex)}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed">{currentQuestion.explanation}</p>
                      <div className="pt-2 border-t border-black/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span>
                          <strong>Exam Pearl:</strong> {currentQuestion.highYieldTakeaway}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onOpenLectureInLibrary(currentQuestion.lectureId)
                          }
                          className="inline-flex items-center gap-1 font-semibold underline hover:no-underline whitespace-nowrap shrink-0"
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Read Source Lecture
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={currentIdx === 0}
                      onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                      className="px-3.5 py-2 text-xs font-semibold rounded-md border border-[#DCE3E8] bg-white text-[#0B3A45] disabled:text-[#CBD5E1]"
                    >
                      Previous
                    </button>

                    {currentIdx < quizQueue.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentIdx((i) => i + 1)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-[#0B3A45] text-white hover:bg-[#126D7C]"
                      >
                        Next Question <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFinishSession}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-[#126D7C] text-white hover:bg-[#0B3A45]"
                      >
                        Complete &amp; Save Analytics
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: PERFORMANCE ANALYTICS DASHBOARD                             */}
        {/* ================================================================== */}
        {subTab === 'analytics' && (
          <div className="space-y-6">
            {/* KPI Summary Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white border border-[#DCE3E8] rounded-lg p-4">
                <div className="text-[11px] font-mono uppercase text-[#64748B]">
                  Overall Accuracy
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-[#0F172A] mt-1">
                  {analytics.overallAccuracyPercent === null
                    ? '—'
                    : `${analytics.overallAccuracyPercent}%`}
                </div>
                <div className="text-xs text-[#64748B] mt-0.5 tabular-nums">
                  {analytics.correctUniqueCount} / {analytics.attemptedUniqueCount} correct
                </div>
              </div>

              <div className="bg-white border border-[#DCE3E8] rounded-lg p-4">
                <div className="text-[11px] font-mono uppercase text-[#64748B]">
                  Question Bank Coverage
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-[#0B3A45] mt-1">
                  {analytics.coveragePercent}%
                </div>
                <div className="text-xs text-[#64748B] mt-0.5 tabular-nums">
                  {analytics.attemptedUniqueCount} / {analytics.totalBankQuestions} unique Qs
                </div>
              </div>

              <div className="bg-white border border-[#DCE3E8] rounded-lg p-4">
                <div className="text-[11px] font-mono uppercase text-[#64748B]">
                  Lectures Reviewed
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-[#126D7C] mt-1">
                  {progress.reviewedLectureIds.length} / {ALL_LECTURES.length}
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  Across 12 clinical domains
                </div>
              </div>

              <div className="bg-white border border-[#DCE3E8] rounded-lg p-4">
                <div className="text-[11px] font-mono uppercase text-[#64748B]">
                  Weak Areas (&lt;75%)
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-amber-700 mt-1">
                  {analytics.weakLectureIds.length}
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  {analytics.missedQuestionIds.length} missed questions logged
                </div>
              </div>
            </div>

            {analytics.attemptedUniqueCount === 0 ? (
              <div className="bg-white border border-[#DCE3E8] rounded-lg p-8 text-center space-y-3">
                <h3 className="text-base font-bold text-[#0F172A]">
                  No Quiz Attempts Recorded Yet
                </h3>
                <p className="text-xs text-[#475569] max-w-md mx-auto">
                  Complete any custom practice exam or launch All Questions Mode to unlock per-domain accuracy breakdowns and weak-lecture drills.
                </p>
                <button
                  type="button"
                  onClick={() => setSubTab('setup')}
                  className="px-4 py-2 text-xs font-semibold rounded-md bg-[#0B3A45] text-white"
                >
                  Start Your First Quiz
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white border border-[#DCE3E8] rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#DCE3E8] bg-[#F1F5F8] flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#0B3A45]">
                      Accuracy by Clinical Neurology Domain
                    </h3>
                    <button
                      type="button"
                      onClick={onResetProgress}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569] hover:text-red-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Analytics
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#DCE3E8] bg-[#F8FAFC] text-[#475569]">
                          <th className="py-2.5 px-4 font-semibold border-r border-[#DCE3E8]">
                            Clinical Domain
                          </th>
                          <th className="py-2.5 px-4 font-semibold text-right border-r border-[#DCE3E8]">
                            Attempted
                          </th>
                          <th className="py-2.5 px-4 font-semibold text-right border-r border-[#DCE3E8]">
                            Correct
                          </th>
                          <th className="py-2.5 px-4 font-semibold text-right border-r border-[#DCE3E8]">
                            Accuracy
                          </th>
                          <th className="py-2.5 px-4 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DCE3E8]">
                        {analytics.byModule.map((m) => (
                          <tr key={m.moduleId} className="hover:bg-[#F6F8FA]">
                            <td className="py-2.5 px-4 font-semibold text-[#0F172A] border-r border-[#DCE3E8]">
                              {m.moduleTitle}
                            </td>
                            <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#475569] border-r border-[#DCE3E8]">
                              {m.attemptedCount}/{m.totalBankQuestions}
                            </td>
                            <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#334155] border-r border-[#DCE3E8]">
                              {m.correctCount}
                            </td>
                            <td className="py-2.5 px-4 text-right font-mono tabular-nums font-bold border-r border-[#DCE3E8]">
                              {m.accuracyPercent === null ? (
                                <span className="text-[#94A3B8]">—</span>
                              ) : (
                                <span
                                  className={
                                    m.accuracyPercent >= 75
                                      ? 'text-emerald-700'
                                      : 'text-amber-700'
                                  }
                                >
                                  {m.accuracyPercent}%
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  const mod = MODULE_BY_ID[m.moduleId];
                                  if (mod) {
                                    launchQuiz(
                                      'custom',
                                      m.moduleTitle,
                                      mod.lectures.map((l) => l.id),
                                      'all'
                                    );
                                  }
                                }}
                                className="text-xs font-semibold text-[#126D7C] hover:underline whitespace-nowrap"
                              >
                                Quiz Domain
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {progress.sessionHistory.length > 0 && (
                  <div className="bg-white border border-[#DCE3E8] rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#DCE3E8] bg-[#F1F5F8]">
                      <h3 className="text-sm font-bold text-[#0B3A45]">
                        Recent Practice Sessions
                      </h3>
                    </div>
                    <div className="divide-y divide-[#DCE3E8]">
                      {progress.sessionHistory.slice(0, 8).map((sess) => (
                        <div
                          key={sess.id}
                          className="px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <div className="font-semibold text-[#0F172A]">{sess.label}</div>
                            <div className="text-[11px] text-[#64748B]">
                              {new Date(sess.completedAt).toLocaleString()}
                            </div>
                          </div>
                          <div className="font-mono tabular-nums font-semibold text-[#0B3A45]">
                            {sess.correctCount}/{sess.totalQuestions} ({sess.accuracyPercent}%)
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
