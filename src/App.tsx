import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Brain,
  ClipboardCheck,
  Compass,
  FolderTree,
  Layers,
  Play,
  Search,
  X,
} from 'lucide-react';
import { ALL_LECTURES } from './data/curriculum';
import { ALL_QUESTIONS } from './data/questionBank';
import {
  InteractiveLabId,
  QuizAttemptRecord,
  QuizSessionSummary,
  StudentProgressState,
} from './types/neurology';
import {
  DEFAULT_PROGRESS_STATE,
  loadStudentProgress,
  saveStudentProgress,
} from './utils/quizLogic';
import { searchLectures } from './utils/studyLogic';
import { LearningLibraryView, LibraryMode } from './components/library/LearningLibraryView';
import { LAB_META } from './components/labs/InteractiveLabRenderer';
import { QuizStudioView } from './components/quiz/QuizStudioView';

type PrimarySection = 'library' | 'quiz';

export default function App() {
  const [activeSection, setActiveSection] = useState<PrimarySection>('library');
  const [libraryMode, setLibraryMode] = useState<LibraryMode>('article');
  const [selectedLectureId, setSelectedLectureId] = useState<string>(
    ALL_LECTURES[0].id
  );
  const [selectedLabId, setSelectedLabId] = useState<InteractiveLabId>('brainstem-atlas');
  const [progress, setProgress] = useState<StudentProgressState>(() =>
    loadStudentProgress()
  );
  const [activeQuizRequest, setActiveQuizRequest] = useState<{
    lectureIds: string[];
    label: string;
    nonce: number;
  } | null>(null);

  const [findOpen, setFindOpen] = useState(false);
  const [findQuery, setFindQuery] = useState('');

  useEffect(() => {
    saveStudentProgress(progress);
  }, [progress]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setFindOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setFindOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const findResults = useMemo(() => {
    const lectures = searchLectures(findQuery, null).slice(0, 8);
    const q = findQuery.trim().toLowerCase();
    const labs = (Object.keys(LAB_META) as InteractiveLabId[])
      .filter(
        (id) =>
          !q ||
          LAB_META[id].title.toLowerCase().includes(q) ||
          LAB_META[id].subtitle.toLowerCase().includes(q)
      )
      .slice(0, 4);
    return { lectures, labs };
  }, [findQuery]);

  const handleToggleReviewed = (lectureId: string) => {
    setProgress((prev) => {
      const exists = prev.reviewedLectureIds.includes(lectureId);
      const nextIds = exists
        ? prev.reviewedLectureIds.filter((id) => id !== lectureId)
        : [...prev.reviewedLectureIds, lectureId];
      return { ...prev, reviewedLectureIds: nextIds };
    });
  };

  const handleCompleteDragDrop = (exerciseId: string) => {
    setProgress((prev) => {
      if (prev.completedDragDropIds.includes(exerciseId)) return prev;
      return {
        ...prev,
        completedDragDropIds: [...prev.completedDragDropIds, exerciseId],
      };
    });
  };

  const handleRecordAttempt = (attempt: QuizAttemptRecord) => {
    setProgress((prev) => ({
      ...prev,
      attemptsByQuestionId: {
        ...prev.attemptsByQuestionId,
        [attempt.questionId]: attempt,
      },
    }));
  };

  const handleSaveSession = (summary: QuizSessionSummary) => {
    setProgress((prev) => ({
      ...prev,
      sessionHistory: [summary, ...prev.sessionHistory].slice(0, 25),
    }));
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS_STATE);
  };

  const handleStartLectureQuiz = (lectureIds: string[], label: string) => {
    setActiveQuizRequest({
      lectureIds,
      label,
      nonce: Date.now(),
    });
    setActiveSection('quiz');
  };

  const handleLaunchAllQuestions = () => {
    setActiveQuizRequest({
      lectureIds: ALL_LECTURES.map((l) => l.id),
      label: `All Questions Marathon (${ALL_QUESTIONS.length} Qs)`,
      nonce: Date.now(),
    });
    setActiveSection('quiz');
  };

  const handleOpenLectureInLibrary = (lectureId: string) => {
    setSelectedLectureId(lectureId);
    setLibraryMode('article');
    setActiveSection('library');
  };

  const openLibraryMode = (mode: LibraryMode) => {
    setLibraryMode(mode);
    setActiveSection('library');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A]">
      {/* 3-Zone Clinical Teal Top Bar (AMBOSS Style) */}
      <header className="sticky top-0 z-40 bg-[#0B3A45] text-white border-b border-[#072931]">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 h-[52px] flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => openLibraryMode('article')}
            className="flex items-center gap-2 shrink-0 text-left focus:outline-none"
          >
            <span className="w-7 h-7 rounded-md bg-[#126D7C] border border-white/15 text-white flex items-center justify-center shrink-0">
              <Brain className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm sm:text-[15px] tracking-tight text-white whitespace-nowrap">
              NeuroAtlas
            </span>
          </button>

          {/* Zone 2: Single-line Primary Navigation */}
          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-1 overflow-x-auto no-scrollbar"
          >
            <button
              type="button"
              onClick={() => openLibraryMode('article')}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'library' && libraryMode === 'article'
                  ? 'bg-white text-[#0B3A45]'
                  : 'text-[#D4E6EA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>Library</span>
            </button>

            <button
              type="button"
              onClick={() => openLibraryMode('directory')}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'library' && libraryMode === 'directory'
                  ? 'bg-white text-[#0B3A45]'
                  : 'text-[#D4E6EA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5 shrink-0" />
              <span>Directory</span>
            </button>

            <button
              type="button"
              onClick={() => openLibraryMode('atlas')}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'library' && libraryMode === 'atlas'
                  ? 'bg-white text-[#0B3A45]'
                  : 'text-[#D4E6EA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span>Visual Atlas</span>
            </button>

            <button
              type="button"
              onClick={() => openLibraryMode('sorting')}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'library' && libraryMode === 'sorting'
                  ? 'bg-white text-[#0B3A45]'
                  : 'text-[#D4E6EA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>Sorting Labs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('quiz')}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'quiz'
                  ? 'bg-white text-[#0B3A45]'
                  : 'text-[#D4E6EA] hover:bg-white/10 hover:text-white'
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">QBank &amp; Analytics</span>
              <span className="sm:hidden">QBank</span>
            </button>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleLaunchAllQuestions}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md bg-[#126D7C] hover:bg-[#178294] border border-white/20 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <Play className="w-3 h-3 shrink-0" />
              <span className="hidden sm:inline">All {ALL_QUESTIONS.length} Questions</span>
              <span className="sm:hidden">All 188</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col">
        {activeSection === 'library' ? (
          <LearningLibraryView
            mode={libraryMode}
            onChangeMode={setLibraryMode}
            selectedLectureId={selectedLectureId}
            onSelectLecture={setSelectedLectureId}
            selectedLabId={selectedLabId}
            onSelectLab={setSelectedLabId}
            reviewedLectureIds={progress.reviewedLectureIds}
            onToggleReviewed={handleToggleReviewed}
            completedDragDropIds={progress.completedDragDropIds}
            onCompleteDragDrop={handleCompleteDragDrop}
            onStartLectureQuiz={handleStartLectureQuiz}
            onOpenQuickFind={() => setFindOpen(true)}
          />
        ) : (
          <QuizStudioView
            progress={progress}
            activeQuizRequest={activeQuizRequest}
            onRecordAttempt={handleRecordAttempt}
            onSaveSession={handleSaveSession}
            onResetProgress={handleResetProgress}
            onOpenLectureInLibrary={handleOpenLectureInLibrary}
          />
        )}
      </main>

      {/* Global Ctrl+K Quick Find Modal */}
      {findOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0B3A45]/45 backdrop-blur-[1px] flex items-start justify-center pt-16 sm:pt-24 px-4"
          onClick={() => setFindOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Find neurology content"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white border border-[#DCE3E8] rounded-lg shadow-xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-[#DCE3E8] flex items-center gap-2.5 bg-[#F6F8FA]">
              <Search className="w-4 h-4 text-[#126D7C] shrink-0" />
              <input
                type="text"
                autoFocus
                value={findQuery}
                onChange={(e) => setFindQuery(e.target.value)}
                placeholder="Search any concept, clinical sign, drug, tract, or atlas (e.g., Hoover, Meyer loop, xanthochromia)..."
                aria-label="Quick find neurology topics"
                className="flex-1 bg-transparent text-sm text-[#0F172A] placeholder:text-[#64748B] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setFindOpen(false)}
                aria-label="Close search dialog"
                className="p-1 rounded text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto divide-y divide-[#DCE3E8]">
              {findResults.labs.length > 0 && (
                <div className="p-3 bg-white">
                  <div className="px-2 pb-1.5 text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                    Interactive Anatomical Atlases
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {findResults.labs.map((labId) => (
                      <button
                        key={labId}
                        type="button"
                        onClick={() => {
                          setSelectedLabId(labId);
                          openLibraryMode('atlas');
                          setFindOpen(false);
                        }}
                        className="text-left px-3 py-2 rounded-md border border-[#DCE3E8] bg-[#F6F8FA] hover:border-[#126D7C] hover:bg-white transition-colors"
                      >
                        <div className="text-xs font-semibold text-[#0B3A45]">
                          {LAB_META[labId].title}
                        </div>
                        <div className="text-[11px] text-[#475569] mt-0.5 line-clamp-1">
                          {LAB_META[labId].subtitle}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 bg-white">
                <div className="px-2 pb-1.5 text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                  Lectures &amp; Clinical Topics ({findResults.lectures.length} shown)
                </div>
                {findResults.lectures.length === 0 ? (
                  <div className="px-3 py-6 text-center text-xs text-[#64748B]">
                    No lectures matched &ldquo;{findQuery}&rdquo;.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {findResults.lectures.map((res) => (
                      <button
                        key={res.lecture.id}
                        type="button"
                        onClick={() => {
                          handleOpenLectureInLibrary(res.lecture.id);
                          setFindOpen(false);
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-md hover:bg-[#F1F5F8] transition-colors flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-[#0B3A45]">
                            {res.lecture.title}
                          </div>
                          <div className="text-[11px] text-[#475569] mt-0.5 line-clamp-1">
                            {res.matchSnippet}
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#64748B] shrink-0">
                          {res.moduleTitle.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
