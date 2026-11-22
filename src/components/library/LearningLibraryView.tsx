import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Compass,
  Folder,
  FolderTree,
  Highlighter,
  Layers,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  Search,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import {
  ALL_LECTURES,
  CURRICULUM_MODULES,
  LECTURE_BY_ID,
  MODULE_BY_ID,
} from '../../data/curriculum';
import { DRAG_DROP_BY_ID, DRAG_DROP_EXERCISES } from '../../data/dragDropExercises';
import { InteractiveLabId } from '../../types/neurology';
import { getModuleCompletionStats, searchLectures } from '../../utils/studyLogic';
import { InteractiveLabRenderer, LAB_META } from '../labs/InteractiveLabRenderer';
import { DragDropBoard } from './DragDropBoard';

export type LibraryMode = 'article' | 'directory' | 'atlas' | 'sorting';

interface LearningLibraryViewProps {
  mode: LibraryMode;
  onChangeMode: (mode: LibraryMode) => void;
  selectedLectureId: string;
  onSelectLecture: (lectureId: string) => void;
  selectedLabId: InteractiveLabId;
  onSelectLab: (labId: InteractiveLabId) => void;
  reviewedLectureIds: string[];
  onToggleReviewed: (lectureId: string) => void;
  completedDragDropIds: string[];
  onCompleteDragDrop: (exerciseId: string) => void;
  onStartLectureQuiz: (lectureIds: string[], label: string) => void;
  onOpenQuickFind: () => void;
}

function renderFormattedBullet(text: string, highYield: boolean) {
  const colonIdx = text.indexOf(':');
  if (colonIdx > 0 && colonIdx <= 48) {
    const lead = text.slice(0, colonIdx + 1);
    const rest = text.slice(colonIdx + 1);
    return (
      <>
        <strong
          className={`font-semibold text-[#0F172A] ${
            highYield ? 'bg-[#FEF3C7] px-1 py-0.5 rounded-[3px] amboss-term' : 'amboss-term'
          }`}
        >
          {lead}
        </strong>
        <span className={highYield ? 'text-[#334155]' : 'text-[#1E293B]'}>{rest}</span>
      </>
    );
  }
  return <span className={highYield ? 'text-[#475569]' : 'text-[#1E293B]'}>{text}</span>;
}

export function LearningLibraryView({
  mode,
  onChangeMode,
  selectedLectureId,
  onSelectLecture,
  selectedLabId,
  onSelectLab,
  reviewedLectureIds,
  onToggleReviewed,
  completedDragDropIds,
  onCompleteDragDrop,
  onStartLectureQuiz,
  onOpenQuickFind,
}: LearningLibraryViewProps) {
  const [railTab, setRailTab] = useState<'outline' | 'curriculum'>('outline');
  const [railOpen, setRailOpen] = useState(true);
  const [highYieldMode, setHighYieldMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilterId, setModuleFilterId] = useState<string>('all');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CURRICULUM_MODULES.map((m) => [m.id, true]))
  );

  const activeLecture = LECTURE_BY_ID[selectedLectureId] ?? ALL_LECTURES[0];
  const activeModule = MODULE_BY_ID[activeLecture.moduleId] ?? CURRICULUM_MODULES[0];
  const isReviewed = reviewedLectureIds.includes(activeLecture.id);

  // Directory cascading selection state
  const [directoryModuleId, setDirectoryModuleId] = useState<string>(activeModule.id);
  const directoryModule =
    MODULE_BY_ID[directoryModuleId] ?? CURRICULUM_MODULES[0];
  const directoryPreviewLecture =
    directoryModule.lectures.find((l) => l.id === selectedLectureId) ??
    directoryModule.lectures[0];

  const completionStats = useMemo(
    () => getModuleCompletionStats(reviewedLectureIds),
    [reviewedLectureIds]
  );

  const searchResults = useMemo(
    () =>
      searchLectures(
        searchQuery,
        moduleFilterId === 'all' ? null : moduleFilterId
      ),
    [searchQuery, moduleFilterId]
  );

  const currentIndex = ALL_LECTURES.findIndex((l) => l.id === activeLecture.id);
  const prevLecture = currentIndex > 0 ? ALL_LECTURES[currentIndex - 1] : null;
  const nextLecture =
    currentIndex < ALL_LECTURES.length - 1
      ? ALL_LECTURES[currentIndex + 1]
      : null;

  const toggleModuleExpand = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleChooseLecture = (lectureId: string) => {
    onSelectLecture(lectureId);
    onChangeMode('article');
    setMobileDrawerOpen(false);
    setCollapsedSections({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (secKey: string) => {
    setCollapsedSections((prev) => ({ ...prev, [secKey]: !prev[secKey] }));
  };

  const allSectionsCollapsed = activeLecture.sections.every(
    (_, idx) => collapsedSections[`${activeLecture.id}-${idx}`]
  );

  const toggleAllSections = () => {
    const nextState: Record<string, boolean> = {};
    activeLecture.sections.forEach((_, idx) => {
      nextState[`${activeLecture.id}-${idx}`] = !allSectionsCollapsed;
    });
    setCollapsedSections(nextState);
  };

  const scrollToAnchor = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const curriculumTree = (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-[#DCE3E8] space-y-2.5 bg-white">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#0B3A45]">
            {ALL_LECTURES.length} Clinical Lectures
          </span>
          <span className="font-mono text-[#475569] tabular-nums">
            {completionStats.reviewedCount}/{completionStats.totalLectures}
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#E6ECF0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#126D7C] transition-all"
            style={{ width: `${completionStats.percent}%` }}
          />
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter topics, signs, drugs..."
            aria-label="Filter neurology lectures"
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#F6F8FA] border border-[#DCE3E8] rounded-md focus:outline-none focus:border-[#126D7C] focus:bg-white"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear filter"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <select
          value={moduleFilterId}
          onChange={(e) => setModuleFilterId(e.target.value)}
          aria-label="Filter by clinical domain"
          className="w-full px-2.5 py-1.5 text-xs bg-[#F6F8FA] border border-[#DCE3E8] rounded-md focus:outline-none focus:border-[#126D7C]"
        >
          <option value="all">All 12 Clinical Domains</option>
          {CURRICULUM_MODULES.map((mod) => (
            <option key={mod.id} value={mod.id}>
              {mod.title} ({mod.lectures.length})
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {searchQuery.trim() ? (
          searchResults.length === 0 ? (
            <div className="p-4 text-center text-xs text-[#64748B]">
              No lectures matched &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[11px] font-mono text-[#64748B] uppercase">
                {searchResults.length} matching lectures
              </div>
              {searchResults.map((res) => {
                const active = res.lecture.id === activeLecture.id;
                const done = reviewedLectureIds.includes(res.lecture.id);
                return (
                  <button
                    key={res.lecture.id}
                    type="button"
                    onClick={() => handleChooseLecture(res.lecture.id)}
                    className={`w-full text-left p-2.5 rounded-md border text-xs transition-colors ${
                      active
                        ? 'bg-[#EEF5F7] border-[#126D7C] text-[#0B3A45]'
                        : 'bg-white border-[#DCE3E8] hover:bg-[#F6F8FA] text-[#334155]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-[#0F172A]">{res.lecture.title}</span>
                      {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                      {res.matchSnippet}
                    </div>
                  </button>
                );
              })}
            </div>
          )
        ) : (
          CURRICULUM_MODULES.filter(
            (m) => moduleFilterId === 'all' || m.id === moduleFilterId
          ).map((mod) => {
            const isOpen = expandedModules[mod.id];
            return (
              <div key={mod.id} className="border border-[#DCE3E8] rounded-md bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleModuleExpand(mod.id)}
                  className="w-full px-3 py-2 bg-[#F1F5F8] hover:bg-[#E8EFF4] flex items-center justify-between gap-2 text-left"
                >
                  <span className="text-xs font-semibold text-[#0B3A45] leading-snug">
                    {mod.title}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#475569] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="divide-y divide-[#EEF2F5]">
                    {mod.lectures.map((lec) => {
                      const active = lec.id === activeLecture.id;
                      const done = reviewedLectureIds.includes(lec.id);
                      return (
                        <button
                          key={lec.id}
                          type="button"
                          onClick={() => handleChooseLecture(lec.id)}
                          className={`w-full text-left px-3 py-2 text-xs flex items-start gap-2 transition-colors ${
                            active
                              ? 'bg-[#EEF5F7] text-[#0B3A45] font-semibold'
                              : 'hover:bg-[#F6F8FA] text-[#334155]'
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-[#CBD5E1] shrink-0 mt-0.5" />
                          )}
                          <span className="leading-snug">{lec.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  const outlinePanel = (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#DCE3E8] bg-white">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
          {activeModule.title}
        </div>
        <div className="text-sm font-bold text-[#0B3A45] mt-0.5 leading-snug">
          {activeLecture.title}
        </div>
      </div>

      <nav aria-label="Article outline" className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
        <button
          type="button"
          onClick={() => scrollToAnchor('article-summary')}
          className="w-full text-left px-2.5 py-1.5 rounded-md font-semibold text-[#0F172A] hover:bg-[#E8EFF4] transition-colors"
        >
          Summary &amp; Syllabus
        </button>

        {activeLecture.interactiveLabs && activeLecture.interactiveLabs.length > 0 && (
          <button
            type="button"
            onClick={() => scrollToAnchor('article-diagrams')}
            className="w-full text-left px-2.5 py-1.5 rounded-md font-semibold text-[#126D7C] hover:bg-[#E8EFF4] transition-colors"
          >
            Interactive Diagrams ({activeLecture.interactiveLabs.length})
          </button>
        )}

        <div className="pt-1">
          <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
            Clinical Sections
          </div>
          {activeLecture.sections.map((sec, idx) => (
            <button
              key={sec.heading}
              type="button"
              onClick={() => {
                setCollapsedSections((prev) => ({
                  ...prev,
                  [`${activeLecture.id}-${idx}`]: false,
                }));
                scrollToAnchor(`sec-${idx}`);
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-md text-[#334155] hover:bg-[#E8EFF4] hover:text-[#0B3A45] transition-colors flex items-start gap-1.5"
            >
              <span className="text-[#64748B] shrink-0">↳</span>
              <span className="leading-snug">{sec.heading}</span>
            </button>
          ))}
        </div>

        {activeLecture.tables && activeLecture.tables.length > 0 && (
          <button
            type="button"
            onClick={() => scrollToAnchor('article-tables')}
            className="w-full text-left px-2.5 py-1.5 rounded-md font-medium text-[#334155] hover:bg-[#E8EFF4]"
          >
            Comparison Tables ({activeLecture.tables.length})
          </button>
        )}

        {activeLecture.dragDropId && (
          <button
            type="button"
            onClick={() => scrollToAnchor('article-sorting')}
            className="w-full text-left px-2.5 py-1.5 rounded-md font-medium text-[#334155] hover:bg-[#E8EFF4]"
          >
            Interactive Sorting Exercise
          </button>
        )}

        <button
          type="button"
          onClick={() => scrollToAnchor('article-pearls')}
          className="w-full text-left px-2.5 py-1.5 rounded-md font-semibold text-[#92400E] hover:bg-[#FEF3C7]/60"
        >
          High-Yield Exam Pearls
        </button>
      </nav>

      <div className="p-3 border-t border-[#DCE3E8] bg-white">
        <button
          type="button"
          onClick={() => setRailTab('curriculum')}
          className="w-full py-2 px-3 rounded-md border border-[#DCE3E8] bg-[#F6F8FA] hover:bg-[#EEF5F7] text-xs font-semibold text-[#0B3A45] flex items-center justify-between"
        >
          <span>Browse All 47 Lectures</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Mobile secondary navigation bar for hidden desktop links */}
      <div className="md:hidden px-3 py-2 bg-[#F6F8FA] border-b border-[#DCE3E8] flex items-center gap-1.5 overflow-x-auto">
        {(
          [
            { id: 'article', label: 'Reader' },
            { id: 'directory', label: 'Directory' },
            { id: 'atlas', label: 'Atlas (10)' },
            { id: 'sorting', label: 'Sorting (6)' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChangeMode(item.id)}
            className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap shrink-0 border ${
              mode === item.id
                ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                : 'bg-white text-[#334155] border-[#DCE3E8]'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onOpenQuickFind}
          className="ml-auto px-2.5 py-1 rounded text-xs font-semibold bg-white border border-[#DCE3E8] text-[#0B3A45] whitespace-nowrap shrink-0 inline-flex items-center gap-1"
        >
          <Search className="w-3 h-3" /> Find
        </button>
      </div>

      {/* Mobile Curriculum Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#0B3A45]/40"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-80 max-w-[88vw] bg-[#F6F8FA] h-full border-r border-[#DCE3E8] flex flex-col z-10">
            <div className="px-4 py-3 bg-[#0B3A45] text-white flex items-center justify-between">
              <span className="font-semibold text-sm">Neurology Curriculum</span>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close curriculum drawer"
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">{curriculumTree}</div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* MODE 1: AMBOSS ARTICLE READER                                      */}
      {/* ================================================================== */}
      {mode === 'article' && (
        <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
          {/* Left Collapsible Rail */}
          {railOpen && (
            <aside className="hidden lg:flex flex-col w-[296px] xl:w-[316px] shrink-0 bg-[#F6F8FA] border-r border-[#DCE3E8] sticky top-[52px] h-[calc(100vh-52px)]">
              <div className="px-2.5 py-2 border-b border-[#DCE3E8] bg-[#F1F5F8] flex items-center justify-between gap-2">
                <div className="grid grid-cols-2 flex-1 bg-white border border-[#DCE3E8] rounded-md p-0.5">
                  <button
                    type="button"
                    onClick={() => setRailTab('outline')}
                    className={`py-1 text-xs font-semibold rounded transition-colors ${
                      railTab === 'outline'
                        ? 'bg-[#0B3A45] text-white'
                        : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    Outline
                  </button>
                  <button
                    type="button"
                    onClick={() => setRailTab('curriculum')}
                    className={`py-1 text-xs font-semibold rounded transition-colors ${
                      railTab === 'curriculum'
                        ? 'bg-[#0B3A45] text-white'
                        : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    47 Lectures
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setRailOpen(false)}
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                  className="p-1.5 rounded text-[#475569] hover:text-[#0B3A45] hover:bg-white"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                {railTab === 'outline' ? outlinePanel : curriculumTree}
              </div>
            </aside>
          )}

          {/* Right White Reading Canvas */}
          <div className="flex-1 min-w-0 bg-white flex flex-col">
            {/* Workspace Breadcrumb & Action Bar */}
            <div className="border-b border-[#DCE3E8] bg-white px-4 sm:px-8 py-2.5 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 text-xs text-[#64748B]">
                  {!railOpen && (
                    <button
                      type="button"
                      onClick={() => setRailOpen(true)}
                      aria-label="Open sidebar"
                      className="hidden lg:inline-flex items-center gap-1 px-2 py-1 rounded border border-[#DCE3E8] bg-[#F6F8FA] text-[#0B3A45] hover:bg-[#EEF5F7]"
                    >
                      <PanelLeftOpen className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(true)}
                    className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#DCE3E8] bg-[#F6F8FA] text-xs font-semibold text-[#0B3A45]"
                  >
                    <Menu className="w-3.5 h-3.5" /> All 47 Lectures
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDirectoryModuleId(activeModule.id);
                      onChangeMode('directory');
                    }}
                    className="hidden sm:inline hover:text-[#0B3A45] hover:underline truncate"
                  >
                    {activeModule.title}
                  </button>
                  <span className="hidden sm:inline">&rsaquo;</span>
                  <span className="font-semibold text-[#0B3A45] truncate">
                    {activeLecture.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onOpenQuickFind}
                  className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#DCE3E8] bg-[#F6F8FA] hover:bg-[#EEF5F7] text-xs text-[#475569] shrink-0"
                >
                  <Search className="w-3.5 h-3.5 text-[#126D7C]" />
                  <span>Find content</span>
                  <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#DCE3E8] text-[#64748B]">
                    Ctrl+K
                  </kbd>
                </button>
              </div>

              {/* AMBOSS Article Toolbar Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onStartLectureQuiz([activeLecture.id], activeLecture.title)
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#DCE3E8] bg-white hover:bg-[#F6F8FA] text-xs font-semibold text-[#0B3A45] whitespace-nowrap shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 text-[#126D7C]" />
                    <span>QBank (4 Questions)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleReviewed(activeLecture.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      isReviewed
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-white border-[#DCE3E8] text-[#334155] hover:bg-[#F6F8FA]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isReviewed ? 'Reviewed' : 'Mark Reviewed'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHighYieldMode((v) => !v)}
                    aria-pressed={highYieldMode}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      highYieldMode
                        ? 'bg-[#FEF3C7] border-[#D97706] text-[#92400E]'
                        : 'bg-white border-[#DCE3E8] text-[#475569] hover:bg-[#F6F8FA]'
                    }`}
                  >
                    <Highlighter className="w-3.5 h-3.5" />
                    <span>{highYieldMode ? 'High-Yield On' : 'High-Yield Off'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleAllSections}
                    className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-[#DCE3E8] bg-white hover:bg-[#F6F8FA] text-xs font-medium text-[#475569] whitespace-nowrap shrink-0"
                  >
                    {allSectionsCollapsed ? 'Expand All' : 'Collapse All'}
                  </button>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <article className="px-4 sm:px-8 py-6 max-w-[920px] space-y-6">
              {/* Summary & Syllabus */}
              <section id="article-summary" className="space-y-4 pb-5 border-b border-[#DCE3E8]">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
                  <span className="font-semibold text-[#126D7C]">{activeModule.title}</span>
                  <span className="font-mono tabular-nums">
                    {activeLecture.keyConcepts.length} Core Concepts · 4 QBank Items
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
                    {activeLecture.title}
                  </h1>
                  <p className="text-sm text-[#475569] mt-1">{activeLecture.subtitle}</p>
                </div>

                <p className="text-[15px] text-[#1E293B] leading-relaxed bg-[#F6F8FA] border border-[#DCE3E8] rounded-md p-4">
                  {activeLecture.overview}
                </p>

                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] mb-2">
                    Syllabus Coverage
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-[#334155]">
                    {activeLecture.keyConcepts.map((kc) => (
                      <li key={kc} className="flex items-start gap-2">
                        <span className="text-[#126D7C] font-bold mt-0.5">&bull;</span>
                        <span className="amboss-term">{kc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Embedded Anatomical & Physiological Interactive Diagrams */}
              {activeLecture.interactiveLabs && activeLecture.interactiveLabs.length > 0 && (
                <section id="article-diagrams" className="space-y-4">
                  {activeLecture.interactiveLabs.map((labId) => (
                    <InteractiveLabRenderer key={labId} labId={labId} />
                  ))}
                </section>
              )}

              {/* Collapsible Clinical Sections (AMBOSS Grey Bar Style) */}
              <section className="space-y-3">
                {activeLecture.sections.map((sec, idx) => {
                  const secKey = `${activeLecture.id}-${idx}`;
                  const isCollapsed = !!collapsedSections[secKey];
                  return (
                    <div key={sec.heading} id={`sec-${idx}`} className="border-b border-[#DCE3E8] pb-4 last:border-b-0">
                      <button
                        type="button"
                        aria-expanded={!isCollapsed}
                        onClick={() => toggleSection(secKey)}
                        className="w-full px-4 py-2.5 rounded-md bg-[#F1F5F8] hover:bg-[#E7EEF3] flex items-center justify-between gap-3 text-left transition-colors"
                      >
                        <span className="flex items-center gap-2 font-bold text-base text-[#0F172A]">
                          <span className="text-[#64748B] text-sm">↳</span>
                          <span>{sec.heading}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#475569] shrink-0 transition-transform ${
                            isCollapsed ? '-rotate-90' : ''
                          }`}
                        />
                      </button>

                      {!isCollapsed && (
                        <div className="pt-3.5 px-1 sm:px-2 space-y-3">
                          {sec.summary && (
                            <p
                              className={`text-sm leading-relaxed ${
                                highYieldMode ? 'text-[#64748B]' : 'text-[#334155]'
                              }`}
                            >
                              {sec.summary}
                            </p>
                          )}

                          <ul className="space-y-2 text-sm leading-relaxed">
                            {sec.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#126D7C] shrink-0" />
                                <div>{renderFormattedBullet(bullet, highYieldMode)}</div>
                              </li>
                            ))}
                          </ul>

                          {sec.callout && (
                            <div
                              className={`mt-3 p-3.5 rounded-md border text-xs leading-relaxed ${
                                highYieldMode ? 'ring-1 ring-[#D97706]/50 ' : ''
                              }${
                                sec.callout.variant === 'warning'
                                  ? 'bg-[#FEF2F2] border-[#FECACA] text-[#7F1D1D]'
                                  : sec.callout.variant === 'localisation'
                                  ? 'bg-[#EEF5F7] border-[#B8D7DE] text-[#0B3A45]'
                                  : 'bg-[#FFFDF5] border-[#E8D5A3] text-[#78350F]'
                              }`}
                            >
                              <div className="font-bold mb-0.5">{sec.callout.title}</div>
                              <div>{sec.callout.body}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>

              {/* Bordered Clinical Comparison Tables */}
              {activeLecture.tables && activeLecture.tables.length > 0 && (
                <section id="article-tables" className="space-y-4">
                  {activeLecture.tables.map((tbl) => (
                    <div
                      key={tbl.title}
                      className="border border-[#DCE3E8] rounded-md overflow-hidden bg-white"
                    >
                      <div className="px-4 py-2.5 bg-[#F1F5F8] border-b border-[#DCE3E8]">
                        <h3 className="font-bold text-sm text-[#0F172A]">{tbl.title}</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-[#DCE3E8] bg-[#F8FAFC]">
                              {tbl.headers.map((h) => (
                                <th
                                  key={h}
                                  className="py-2.5 px-4 font-semibold text-[#0B3A45] border-r border-[#DCE3E8] last:border-r-0 whitespace-nowrap"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#DCE3E8]">
                            {tbl.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-[#F6F8FA]">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`py-2.5 px-4 leading-snug border-r border-[#DCE3E8] last:border-r-0 ${
                                      cIdx === 0
                                        ? 'font-semibold text-[#0F172A] bg-[#F8FAFC]/70'
                                        : 'text-[#334155]'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Embedded Drag-and-Drop Board */}
              {activeLecture.dragDropId && DRAG_DROP_BY_ID[activeLecture.dragDropId] && (
                <section id="article-sorting">
                  <DragDropBoard
                    exercise={DRAG_DROP_BY_ID[activeLecture.dragDropId]}
                    onComplete={onCompleteDragDrop}
                  />
                </section>
              )}

              {/* High-Yield Exam Pearls */}
              <section
                id="article-pearls"
                className={`rounded-md border p-4 space-y-2 ${
                  highYieldMode
                    ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F]'
                    : 'bg-[#FFFDF5] border-[#E8D5A3] text-[#78350F]'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-[#92400E]">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>High-Yield Exam Pearls</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {activeLecture.examPearls.map((pearl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-[#B45309]">&bull;</span>
                      <span>{pearl}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Prev / Next Footer */}
              <nav
                aria-label="Lecture sequence"
                className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#DCE3E8]"
              >
                {prevLecture ? (
                  <button
                    type="button"
                    onClick={() => handleChooseLecture(prevLecture.id)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#F6F8FA] border border-[#DCE3E8] rounded-md text-[#0B3A45] hover:bg-[#EEF5F7]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-left">
                      <span className="block text-[10px] font-mono text-[#64748B]">PREVIOUS</span>
                      {prevLecture.title.split(':')[0]}
                    </span>
                  </button>
                ) : (
                  <div />
                )}

                {nextLecture && (
                  <button
                    type="button"
                    onClick={() => handleChooseLecture(nextLecture.id)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#F6F8FA] border border-[#DCE3E8] rounded-md text-[#0B3A45] hover:bg-[#EEF5F7] ml-auto"
                  >
                    <span className="text-right">
                      <span className="block text-[10px] font-mono text-[#64748B]">NEXT</span>
                      {nextLecture.title.split(':')[0]}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </nav>
            </article>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* MODE 2: CASCADING DIRECTORY (AMBOSS MILLER COLUMNS)                */}
      {/* ================================================================== */}
      {mode === 'directory' && (
        <div className="flex-1 bg-[#F6F8FA] py-6 px-4 sm:px-6">
          <div className="max-w-[1440px] mx-auto space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#0F172A]">
                  Clinical Neurology Curriculum Directory
                </h1>
                <p className="text-xs text-[#475569] mt-0.5">
                  Browse all 12 domains and 47 lectures systematically — click any lecture to open the article or launch its QBank.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenQuickFind}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#DCE3E8] bg-white hover:bg-[#EEF5F7] text-xs font-medium text-[#0B3A45]"
              >
                <Search className="w-3.5 h-3.5 text-[#126D7C]" /> Find Content (Ctrl+K)
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Column 1: 12 Clinical Domains */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-xs font-bold text-[#0B3A45] px-1">
                  Clinical Domains (12)
                </div>
                <div className="bg-white border border-[#DCE3E8] rounded-lg divide-y divide-[#DCE3E8] overflow-hidden shadow-xs">
                  {CURRICULUM_MODULES.map((mod) => {
                    const active = mod.id === directoryModule.id;
                    const modStat = completionStats.byModule.find(
                      (s) => s.moduleId === mod.id
                    );
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => {
                          setDirectoryModuleId(mod.id);
                          onSelectLecture(mod.lectures[0].id);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between gap-2 transition-colors ${
                          active
                            ? 'bg-[#EEF5F7] text-[#0B3A45] font-semibold'
                            : 'bg-white text-[#334155] hover:bg-[#F6F8FA]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <Folder
                            className={`w-4 h-4 shrink-0 ${
                              active ? 'text-[#126D7C]' : 'text-[#64748B]'
                            }`}
                          />
                          <span className="truncate">{mod.title}</span>
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-[11px] text-[#64748B] tabular-nums">
                            {modStat?.reviewed ?? 0}/{mod.lectures.length}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Lectures in Selected Domain */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-xs font-bold text-[#0B3A45] px-1">
                  {directoryModule.title} ({directoryModule.lectures.length} Lectures)
                </div>
                <div className="bg-white border border-[#DCE3E8] rounded-lg divide-y divide-[#DCE3E8] overflow-hidden shadow-xs">
                  {directoryModule.lectures.map((lec) => {
                    const active = lec.id === directoryPreviewLecture.id;
                    const done = reviewedLectureIds.includes(lec.id);
                    return (
                      <button
                        key={lec.id}
                        type="button"
                        onClick={() => onSelectLecture(lec.id)}
                        className={`w-full text-left px-3.5 py-2.5 text-xs flex items-start justify-between gap-2 transition-colors ${
                          active
                            ? 'bg-[#EEF5F7] text-[#0B3A45] font-semibold'
                            : 'bg-white text-[#334155] hover:bg-[#F6F8FA]'
                        }`}
                      >
                        <span className="flex items-start gap-2 min-w-0">
                          {done ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          ) : (
                            <BookOpen className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                          )}
                          <span className="leading-snug">{lec.title}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] shrink-0 mt-0.5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Lecture Brief & Actions */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-xs font-bold text-[#0B3A45] px-1">
                  Topic Overview &amp; Launch
                </div>
                <div className="bg-white border border-[#DCE3E8] rounded-lg p-5 space-y-4 shadow-xs">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#126D7C]">
                      {directoryModule.title}
                    </div>
                    <h2 className="text-lg font-bold text-[#0F172A] mt-1">
                      {directoryPreviewLecture.title}
                    </h2>
                    <p className="text-xs text-[#475569] mt-1">
                      {directoryPreviewLecture.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#334155] leading-relaxed bg-[#F6F8FA] border border-[#DCE3E8] rounded-md p-3">
                    {directoryPreviewLecture.overview}
                  </p>

                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] mb-1.5">
                      Key Concepts ({directoryPreviewLecture.keyConcepts.length})
                    </div>
                    <ul className="space-y-1 text-xs text-[#334155]">
                      {directoryPreviewLecture.keyConcepts.map((kc) => (
                        <li key={kc} className="flex items-start gap-1.5">
                          <span className="text-[#126D7C] font-bold">&bull;</span>
                          <span>{kc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {directoryPreviewLecture.interactiveLabs &&
                    directoryPreviewLecture.interactiveLabs.length > 0 && (
                      <div className="pt-2 border-t border-[#DCE3E8]">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] mb-1.5">
                          Linked Anatomical Atlases
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {directoryPreviewLecture.interactiveLabs.map((labId) => (
                            <button
                              key={labId}
                              type="button"
                              onClick={() => {
                                onSelectLab(labId);
                                onChangeMode('atlas');
                              }}
                              className="px-2.5 py-1 rounded border border-[#DCE3E8] bg-[#F6F8FA] hover:border-[#126D7C] text-[11px] font-semibold text-[#0B3A45]"
                            >
                              {LAB_META[labId].title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="pt-3 border-t border-[#DCE3E8] flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleChooseLecture(directoryPreviewLecture.id)}
                      className="flex-1 py-2 px-3 rounded-md bg-[#0B3A45] hover:bg-[#126D7C] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onStartLectureQuiz(
                          [directoryPreviewLecture.id],
                          directoryPreviewLecture.title
                        )
                      }
                      className="py-2 px-3 rounded-md border border-[#DCE3E8] bg-white hover:bg-[#F6F8FA] text-[#0B3A45] text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Play className="w-3.5 h-3.5 text-[#126D7C]" />
                      <span>Quiz (4 Qs)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* MODE 3: VISUAL ANATOMY & PHYSIOLOGY ATLAS (10 INTERACTIVE LABS)    */}
      {/* ================================================================== */}
      {mode === 'atlas' && (
        <div className="flex-1 bg-[#F6F8FA] py-6 px-4 sm:px-6">
          <div className="max-w-[1440px] mx-auto space-y-5">
            <div className="bg-white border border-[#DCE3E8] rounded-lg p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#126D7C]" />
                    <span>Interactive Neuroanatomy &amp; Clinical Localization Atlas</span>
                  </h1>
                  <p className="text-xs text-[#475569] mt-0.5">
                    High-detail vector plates with clickable pathology localizers and Osmosis-style Self-Test Pin toggles.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#64748B] tabular-nums">
                  10 Interactive Atlases
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                {(Object.keys(LAB_META) as InteractiveLabId[]).map((labId) => {
                  const active = selectedLabId === labId;
                  return (
                    <button
                      key={labId}
                      type="button"
                      onClick={() => onSelectLab(labId)}
                      className={`text-left p-3 rounded-md border transition-colors ${
                        active
                          ? 'bg-[#EEF5F7] border-[#126D7C]'
                          : 'bg-[#F6F8FA] border-[#DCE3E8] hover:bg-white'
                      }`}
                    >
                      <div className="font-semibold text-xs text-[#0B3A45]">
                        {LAB_META[labId].title}
                      </div>
                      <div className="text-[11px] text-[#475569] mt-0.5 line-clamp-2">
                        {LAB_META[labId].subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <InteractiveLabRenderer labId={selectedLabId} />
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* MODE 4: INTERACTIVE DRAG & DROP SORTING LABS (6 EXERCISES)         */}
      {/* ================================================================== */}
      {mode === 'sorting' && (
        <div className="flex-1 bg-[#F6F8FA] py-6 px-4 sm:px-6">
          <div className="max-w-[1200px] mx-auto space-y-5">
            <div className="bg-white border border-[#DCE3E8] rounded-lg p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#126D7C]" />
                  <span>Clinical Differentiation Sorting Labs</span>
                </h1>
                <p className="text-xs text-[#475569] mt-0.5">
                  Drag and drop clinical findings or tap-to-place with instant bedside feedback across 6 high-yield neurology boards.
                </p>
              </div>
              <div className="font-mono text-xs font-semibold text-[#0B3A45] tabular-nums">
                {completedDragDropIds.length} / {DRAG_DROP_EXERCISES.length} Boards Completed
              </div>
            </div>

            <div className="space-y-6">
              {DRAG_DROP_EXERCISES.map((ex) => (
                <DragDropBoard
                  key={ex.id}
                  exercise={ex}
                  onComplete={onCompleteDragDrop}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
