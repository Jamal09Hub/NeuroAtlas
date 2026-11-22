import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  GripVertical,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { DragDropExercise } from '../../types/neurology';
import { evaluateDragDropAssignments } from '../../utils/studyLogic';

interface DragDropBoardProps {
  exercise: DragDropExercise;
  onComplete?: (exerciseId: string) => void;
}

export function DragDropBoard({ exercise, onComplete }: DragDropBoardProps) {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  const [draggedTokenId, setDraggedTokenId] = useState<string | null>(null);
  const [activeHoverCategory, setActiveHoverCategory] = useState<string | null>(null);

  const evaluation = useMemo(
    () => evaluateDragDropAssignments(exercise, assignments),
    [exercise, assignments]
  );

  const unplacedItems = exercise.items.filter((item) => !assignments[item.id]);

  const assignItemToCategory = (itemId: string, categoryId: string) => {
    setAssignments((prev) => {
      const next = { ...prev, [itemId]: categoryId };
      const check = evaluateDragDropAssignments(exercise, next);
      if (check.isCompleteAndPerfect && onComplete) {
        onComplete(exercise.id);
      }
      return next;
    });
    setSelectedTokenId(null);
    setDraggedTokenId(null);
    setActiveHoverCategory(null);
  };

  const removeAssignment = (itemId: string) => {
    setAssignments((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  const handleReset = () => {
    setAssignments({});
    setSelectedTokenId(null);
    setDraggedTokenId(null);
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedTokenId(itemId);
    setSelectedTokenId(itemId);
    e.dataTransfer.setData('text/plain', itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropOnCategory = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain') || draggedTokenId;
    if (itemId) {
      assignItemToCategory(itemId, categoryId);
    }
  };

  return (
    <div className="bg-white border border-[#DCE3E8] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#DCE3E8] bg-[#F1F5F8] flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-semibold text-sm text-[#0B3A45]">{exercise.title}</h4>
          <p className="text-xs text-[#475569] mt-0.5">{exercise.instructions}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold tabular-nums text-[#0B3A45]">
            {evaluation.correctCount} / {evaluation.totalItems} Correct
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#0B3A45] bg-white border border-[#DCE3E8] rounded hover:bg-[#F6F8FA] whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {evaluation.isCompleteAndPerfect && (
          <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-2 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              All {evaluation.totalItems} clinical cards matched accurately. Review the rationales inside each category bin below.
            </span>
          </div>
        )}

        {/* Unplaced Cards Tray */}
        <div className="p-3.5 rounded-md bg-[#F6F8FA] border border-[#DCE3E8]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#475569] font-semibold">
              Unsorted Clinical Findings ({unplacedItems.length} remaining)
            </span>
            <span className="text-[11px] text-[#64748B]">
              Drag cards into bins or tap a card then tap a target bin
            </span>
          </div>

          {unplacedItems.length === 0 ? (
            <div className="py-3 text-center text-xs text-[#64748B]">
              All findings placed. Click any placed card to return it, or reset to practice again.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {unplacedItems.map((item) => {
                const isSelected = selectedTokenId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onClick={() =>
                      setSelectedTokenId((prev) => (prev === item.id ? null : item.id))
                    }
                    className={`text-left px-3 py-2 rounded-md border text-xs transition-colors cursor-grab active:cursor-grabbing flex items-start gap-2 max-w-full sm:max-w-[310px] ${
                      isSelected
                        ? 'bg-[#EEF5F7] border-[#126D7C] ring-1 ring-[#126D7C]'
                        : 'bg-white border-[#DCE3E8] hover:border-[#126D7C]'
                    }`}
                  >
                    <GripVertical className="w-3.5 h-3.5 text-[#94A3B8] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0F172A]">{item.label}</div>
                      <div className="text-[11px] text-[#475569] mt-0.5">{item.detail}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Drop Target Category Bins */}
        <div
          className={`grid grid-cols-1 gap-3 ${
            exercise.categories.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
          }`}
        >
          {exercise.categories.map((cat) => {
            const placedHere = exercise.items.filter(
              (item) => assignments[item.id] === cat.id
            );
            const isDropHighlight = activeHoverCategory === cat.id;

            return (
              <div
                key={cat.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  setActiveHoverCategory(cat.id);
                }}
                onDragLeave={() => setActiveHoverCategory(null)}
                onDrop={(e) => handleDropOnCategory(e, cat.id)}
                onClick={() => {
                  if (selectedTokenId) {
                    assignItemToCategory(selectedTokenId, cat.id);
                  }
                }}
                className={`rounded-md border p-3 min-h-[160px] transition-colors flex flex-col gap-2 ${
                  isDropHighlight
                    ? 'bg-[#EEF5F7] border-[#126D7C]'
                    : selectedTokenId
                    ? 'bg-[#F6F8FA] border-dashed border-[#126D7C] cursor-pointer hover:bg-[#EEF5F7]/60'
                    : 'bg-white border-[#DCE3E8]'
                }`}
              >
                <div className="pb-2 border-b border-[#DCE3E8] flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-xs text-[#0B3A45]">{cat.label}</div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">{cat.description}</div>
                  </div>
                  {selectedTokenId && (
                    <span className="text-[10px] font-mono font-semibold text-[#126D7C] shrink-0">
                      PLACE HERE
                    </span>
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  {placedHere.length === 0 ? (
                    <div className="h-full min-h-[72px] flex items-center justify-center text-[11px] text-[#94A3B8]">
                      Drop or tap to place here
                    </div>
                  ) : (
                    placedHere.map((item) => {
                      const isCorrect = item.correctCategoryId === cat.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAssignment(item.id);
                          }}
                          title="Click to return card back to tray"
                          className={`w-full text-left p-2.5 rounded-md border text-xs transition-colors ${
                            isCorrect
                              ? 'bg-emerald-50/80 border-emerald-300'
                              : 'bg-red-50/80 border-red-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-1.5">
                              {isCorrect ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                              )}
                              <span
                                className={`font-semibold ${
                                  isCorrect ? 'text-emerald-950' : 'text-red-950'
                                }`}
                              >
                                {item.label}
                              </span>
                            </div>
                            <span
                              className={`text-[10px] font-mono font-semibold shrink-0 ${
                                isCorrect ? 'text-emerald-700' : 'text-red-700'
                              }`}
                            >
                              {isCorrect ? 'CORRECT' : 'TRY AGAIN'}
                            </span>
                          </div>
                          <p
                            className={`mt-1 text-[11px] leading-snug ${
                              isCorrect ? 'text-emerald-900' : 'text-red-900'
                            }`}
                          >
                            {isCorrect
                              ? item.rationale
                              : 'Mismatch — click this card to return it and try another category.'}
                          </p>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
