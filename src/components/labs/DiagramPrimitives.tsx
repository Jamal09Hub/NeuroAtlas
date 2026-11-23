import React, { useState } from 'react';
import { CheckCircle2, Eye, EyeOff, RotateCcw } from 'lucide-react';

export interface DiagramPin {
  id: string;
  num: number;
  label: string;
  detail: string;
  x: number;
  y: number;
  labelX?: number;
  labelY?: number;
}

interface DiagramStudyFrameProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  headerActions?: React.ReactNode;
  pins?: DiagramPin[];
  quizMode?: boolean;
  onToggleQuizMode?: (next: boolean) => void;
  revealedPinIds?: string[];
  onRevealPin?: (id: string) => void;
  onResetPins?: () => void;
  children: React.ReactNode;
}

export function DiagramStudyFrame({
  title,
  subtitle,
  icon,
  headerActions,
  pins,
  quizMode = false,
  onToggleQuizMode,
  revealedPinIds = [],
  onRevealPin,
  onResetPins,
  children,
}: DiagramStudyFrameProps) {
  return (
    <div className="bg-white border border-[#D8E1E8] rounded-md overflow-hidden">
      <div className="px-4 py-3 border-b border-[#DCE3E8] bg-[#F4F7F9] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <div className="min-w-0">
            <h4 className="font-semibold text-sm text-[#0F172A] leading-tight">
              {title}
            </h4>
            {subtitle && (
              <p className="text-[11px] text-[#475569] mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {pins && pins.length > 0 && onToggleQuizMode && (
            <div className="inline-flex bg-white p-0.5 rounded border border-[#CBD5E1]">
              <button
                type="button"
                onClick={() => onToggleQuizMode(false)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-xs transition-colors whitespace-nowrap shrink-0 ${
                  !quizMode
                    ? 'bg-[#0B3A45] text-white'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <Eye className="w-3 h-3" /> Labeled View
              </button>
              <button
                type="button"
                onClick={() => onToggleQuizMode(true)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-xs transition-colors whitespace-nowrap shrink-0 ${
                  quizMode
                    ? 'bg-[#0B3A45] text-white'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <EyeOff className="w-3 h-3" /> Self-Test Pins
              </button>
            </div>
          )}
          {headerActions}
        </div>
      </div>

      {children}

      {quizMode && pins && pins.length > 0 && (
        <div className="px-4 py-3 bg-[#F8FAFB] border-t border-[#DCE3E8]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <div className="text-xs font-semibold text-[#0B3A45]">
              Unlabeled Anatomy Self-Test — Click any numbered pin on the illustration or card below to reveal ({revealedPinIds.length}/{pins.length} revealed)
            </div>
            {onResetPins && (
              <button
                type="button"
                onClick={onResetPins}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#475569] hover:text-[#0F172A] px-2 py-1 bg-white border border-[#CBD5E1] rounded"
              >
                <RotateCcw className="w-3 h-3" /> Hide All
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {pins.map((pin) => {
              const isRevealed = revealedPinIds.includes(pin.id);
              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => onRevealPin?.(pin.id)}
                  className={`text-left px-3 py-2 rounded border text-xs transition-colors flex items-start gap-2.5 ${
                    isRevealed
                      ? 'bg-[#ECFDF5] border-[#6EE7B7] text-[#064E3B]'
                      : 'bg-white border-[#CBD5E1] hover:border-[#0B3A45] text-[#334155]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isRevealed
                        ? 'bg-[#059669] text-white'
                        : 'bg-[#0B3A45] text-white'
                    }`}
                  >
                    {pin.num}
                  </span>
                  <div className="min-w-0">
                    {isRevealed ? (
                      <>
                        <div className="font-semibold flex items-center gap-1">
                          <span>{pin.label}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                        </div>
                        <div className="text-[11px] opacity-85 mt-0.5 leading-snug">
                          {pin.detail}
                        </div>
                      </>
                    ) : (
                      <div className="font-medium text-[#64748B] py-0.5">
                        Click to reveal structure #{pin.num}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Shared SVG Anatomical Material & Gradient Definitions
 * Modeled after AMBOSS & Osmosis medical illustration palettes:
 * - Warm blush cortical tissue & white matter ivory
 * - Sage midbrain, pearlescent slate-blue pons, teal-slate medulla
 * - Golden amber cranial nerve roots with subtle rim shading
 * - Translucent aqua CSF cisterns & crimson/cobalt vascular beds
 */
export function MedicalSvgDefs({ prefix = 'med' }: { prefix?: string }) {
  return (
    <defs>
      <linearGradient id={`${prefix}-cortex-pink`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F9D5D3" />
        <stop offset="55%" stopColor="#F1BDBB" />
        <stop offset="100%" stopColor="#E3A19F" />
      </linearGradient>

      <linearGradient id={`${prefix}-brain-blush`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F4E2E2" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#E9C9CA" stopOpacity="0.92" />
      </linearGradient>

      <linearGradient id={`${prefix}-white-matter`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF8F3" />
        <stop offset="65%" stopColor="#F7EBDF" />
        <stop offset="100%" stopColor="#EAD6C5" />
      </linearGradient>

      <linearGradient id={`${prefix}-gray-matter`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0B6B4" />
        <stop offset="100%" stopColor="#C58E8C" />
      </linearGradient>

      <linearGradient id={`${prefix}-midbrain-sage`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#B8D8BA" />
        <stop offset="50%" stopColor="#CCE4CD" />
        <stop offset="100%" stopColor="#B0D2B2" />
      </linearGradient>

      <linearGradient id={`${prefix}-pons-blue`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#CBD7DE" />
        <stop offset="48%" stopColor="#E4ECEF" />
        <stop offset="100%" stopColor="#C1CFD8" />
      </linearGradient>

      <linearGradient id={`${prefix}-medulla-teal`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9ABBC4" />
        <stop offset="65%" stopColor="#B5CDD4" />
        <stop offset="100%" stopColor="#F0E1D6" />
      </linearGradient>

      <linearGradient id={`${prefix}-nerve-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#FACC15" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>

      <linearGradient id={`${prefix}-drg-amber`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#E5B95C" />
      </linearGradient>

      <linearGradient id={`${prefix}-csf-aqua`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.92" />
        <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.78" />
      </linearGradient>

      <linearGradient id={`${prefix}-venous-sinus`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818CF8" stopOpacity="0.82" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.75" />
      </linearGradient>

      <linearGradient id={`${prefix}-skull-bone`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5ECD8" />
        <stop offset="100%" stopColor="#DFCFAF" />
      </linearGradient>

      <linearGradient id={`${prefix}-artery-red`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>

      <linearGradient id={`${prefix}-muscle-red`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#D67C7A" />
        <stop offset="50%" stopColor="#E89D9B" />
        <stop offset="100%" stopColor="#C46361" />
      </linearGradient>

      <pattern
        id={`${prefix}-lesion-hatch`}
        width="6"
        height="6"
        patternTransform="rotate(45 0 0)"
        patternUnits="userSpaceOnUse"
      >
        <rect width="6" height="6" fill="#FEE2E2" fillOpacity="0.72" />
        <line x1="0" y1="0" x2="0" y2="6" stroke="#DC2626" strokeWidth="2" strokeOpacity="0.55" />
      </pattern>

      <filter id={`${prefix}-soft-shadow`} x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.12" />
      </filter>

      <filter id={`${prefix}-glow-lesion`} x="-25%" y="-25%" width="150%" height="150%">
        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#DC2626" floodOpacity="0.45" />
      </filter>

      <marker
        id={`${prefix}-arrow-teal`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0B3A45" />
      </marker>

      <marker
        id={`${prefix}-arrow-blue`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
      </marker>

      <marker
        id={`${prefix}-arrow-red`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
      </marker>
    </defs>
  );
}

/**
 * Renders either a crisp leader-line anatomical label OR a numbered interactive Self-Test pin.
 */
export function PinOrLabel({
  pin,
  quizMode,
  isRevealed,
  onReveal,
  anchor = 'middle',
  dx = 0,
  dy = 0,
  fontSize = 9.5,
  pinRadius = 9.5,
}: {
  pin: DiagramPin;
  quizMode: boolean;
  isRevealed: boolean;
  onReveal: (id: string) => void;
  anchor?: 'start' | 'middle' | 'end';
  dx?: number;
  dy?: number;
  fontSize?: number;
  pinRadius?: number;
}) {
  const scale = pinRadius / 9.5;

  if (!quizMode) {
    const tx = pin.labelX ?? pin.x + dx;
    const ty = pin.labelY ?? pin.y + dy;
    const hasLeader = pin.labelX !== undefined || pin.labelY !== undefined;
    return (
      <g className="select-none">
        {hasLeader && (
          <>
            <line
              x1={pin.x}
              y1={pin.y}
              x2={tx + (anchor === 'end' ? 6 * scale : anchor === 'start' ? -6 * scale : 0)}
              y2={ty - 4 * scale}
              stroke="#FFFFFF"
              strokeWidth={3.2 * scale}
              strokeLinecap="round"
            />
            <line
              x1={pin.x}
              y1={pin.y}
              x2={tx + (anchor === 'end' ? 6 * scale : anchor === 'start' ? -6 * scale : 0)}
              y2={ty - 4 * scale}
              stroke="#334155"
              strokeWidth={1.35 * scale}
              strokeLinecap="round"
            />
            <circle
              cx={pin.x}
              cy={pin.y}
              r={3.2 * scale}
              fill="#0B3A45"
              stroke="#FFFFFF"
              strokeWidth={1.2 * scale}
            />
          </>
        )}
        <text
          x={tx}
          y={ty}
          textAnchor={anchor}
          style={{
            fontSize: `${fontSize}px`,
            paintOrder: 'stroke',
            stroke: '#FFFFFF',
            strokeWidth: `${4.2 * scale}px`,
            strokeLinejoin: 'round',
          }}
          className="fill-[#0F172A] font-semibold"
        >
          {pin.label}
        </text>
      </g>
    );
  }

  return (
    <g
      onClick={(e) => {
        e.stopPropagation();
        onReveal(pin.id);
      }}
      className="cursor-pointer"
    >
      <circle
        cx={pin.x}
        cy={pin.y}
        r={pinRadius}
        fill={isRevealed ? '#059669' : '#0B3A45'}
        stroke="#FFFFFF"
        strokeWidth={1.9 * scale}
      />
      <text
        x={pin.x}
        y={pin.y + 3.4 * scale}
        textAnchor="middle"
        style={{ fontSize: `${9.5 * scale}px` }}
        className="fill-white font-mono font-bold select-none"
      >
        {pin.num}
      </text>
      {isRevealed && (
        <g
          transform={`translate(${
            pin.x + (anchor === 'end' ? -13 * scale : anchor === 'start' ? 13 * scale : 0)
          }, ${pin.y + (anchor === 'middle' ? -14 * scale : 3.5 * scale)})`}
        >
          <text
            textAnchor={anchor}
            style={{
              fontSize: `${fontSize}px`,
              paintOrder: 'stroke',
              stroke: '#FFFFFF',
              strokeWidth: `${4 * scale}px`,
              strokeLinejoin: 'round',
            }}
            className="fill-[#065F46] font-bold select-none"
          >
            {pin.label}
          </text>
        </g>
      )}
    </g>
  );
}

/**
 * Renders a high-resolution unlabeled medical illustration plate with a calibrated
 * SVG overlay for leader-line callouts, Self-Test Pins, and dynamic lesion highlights.
 */
export function AnnotatedPlate({
  src,
  alt,
  width,
  height,
  maxWidthClass = 'max-w-[500px]',
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  maxWidthClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative w-full ${maxWidthClass} mx-auto`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        referrerPolicy="no-referrer"
        className="w-full h-auto block select-none rounded-sm"
      />
      {children && (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0 w-full h-full overflow-visible select-none"
          aria-hidden="true"
        >
          {children}
        </svg>
      )}
    </div>
  );
}

