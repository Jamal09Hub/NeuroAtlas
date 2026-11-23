import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Eye, RotateCcw } from 'lucide-react';
import {
  AnnotatedPlate,
  DiagramPin,
  DiagramStudyFrame,
  MedicalSvgDefs,
  PinOrLabel,
} from './DiagramPrimitives';
import visualPathwayImg from '../../assets/images/visual_pathway_base_1795394579996.jpg';
import spinalCordImg from '../../assets/images/spinal_cord_section_1795394579672.jpg';

// ============================================================================
// 1. VISUAL PATHWAY & GOLDMANN PERIMETRY LESION LOCALIZER
// ============================================================================
type VisualLesionSite =
  | 'normal'
  | 'right-optic-nerve'
  | 'optic-chiasm'
  | 'left-optic-tract'
  | 'left-meyer-loop'
  | 'left-occipital';

type FieldLoss =
  | 'none'
  | 'left-half'
  | 'right-half'
  | 'full'
  | 'sup-right-quad'
  | 'macular-sparing-right-half';

interface VisualLesionSpec {
  id: VisualLesionSite;
  label: string;
  fieldDefectTitle: string;
  rapd: string;
  causes: string;
  leftEyeLoss: FieldLoss;
  rightEyeLoss: FieldLoss;
}

const VISUAL_LESIONS: Record<VisualLesionSite, VisualLesionSpec> = {
  normal: {
    id: 'normal',
    label: 'Intact Pathway',
    fieldDefectTitle: 'Full Bilateral Visual Fields',
    rapd: 'No RAPD — intact CN II afferent & bilateral CN III Edinger-Westphal efferent light reflex',
    causes: 'Intact Retina -> Optic Nerve -> Chiasm -> Optic Tract -> LGN -> Optic Radiations -> Calcarine Cortex',
    leftEyeLoss: 'none',
    rightEyeLoss: 'none',
  },
  'right-optic-nerve': {
    id: 'right-optic-nerve',
    label: 'Right Optic Nerve',
    fieldDefectTitle: 'Ipsilateral Right Monocular Blindness',
    rapd: 'Right RAPD POSITIVE on swinging flashlight test',
    causes: 'Optic neuritis (MS — retrobulbar pain on eye movement), GCA ischaemic optic neuropathy, optic nerve glioma/compression',
    leftEyeLoss: 'none',
    rightEyeLoss: 'full',
  },
  'optic-chiasm': {
    id: 'optic-chiasm',
    label: 'Optic Chiasm',
    fieldDefectTitle: 'Bitemporal Hemianopia',
    rapd: 'No RAPD unless asymmetric compression of one optic nerve',
    causes: 'Pituitary macroadenoma (superior field first), craniopharyngioma (inferior field first), suprasellar meningioma, ICA aneurysm',
    leftEyeLoss: 'left-half',
    rightEyeLoss: 'right-half',
  },
  'left-optic-tract': {
    id: 'left-optic-tract',
    label: 'Left Optic Tract',
    fieldDefectTitle: 'Right Homonymous Hemianopia (Incongruous)',
    rapd: 'Possible subtle contralateral right RAPD (53% nasal crossing fibres)',
    causes: 'Craniopharyngioma, demyelination, PCA/anterior choroidal infarct',
    leftEyeLoss: 'right-half',
    rightEyeLoss: 'right-half',
  },
  'left-meyer-loop': {
    id: 'left-meyer-loop',
    label: 'Left Meyer’s Loop',
    fieldDefectTitle: 'Right Superior Quadrantanopia ("Pie in the Sky")',
    rapd: 'Pupillary light reflexes NORMAL (afferent leaves before LGN)',
    causes: 'Left temporal lobe MCA infarct, temporal abscess, glioma, or temporal lobectomy for refractory epilepsy',
    leftEyeLoss: 'sup-right-quad',
    rightEyeLoss: 'sup-right-quad',
  },
  'left-occipital': {
    id: 'left-occipital',
    label: 'Left Occipital Cortex',
    fieldDefectTitle: 'Right Homonymous Hemianopia (Macular Sparing)',
    rapd: 'Pupillary light reflexes NORMAL; dual MCA/PCA macular blood supply spares central 5°',
    causes: 'Left Posterior Cerebral Artery (PCA) occlusion, occipital haemorrhage, or tumour',
    leftEyeLoss: 'macular-sparing-right-half',
    rightEyeLoss: 'macular-sparing-right-half',
  },
};

const VISUAL_PINS: DiagramPin[] = [
  { id: 'optic-nerve', num: 1, label: 'Optic Nerve (II)', detail: 'Pre-chiasmal axons from both nasal and temporal hemiretinas', x: 705, y: 225, labelX: 925, labelY: 168 },
  { id: 'chiasm', num: 2, label: 'Optic Chiasm', detail: 'Nasal retinal fibres decussate here above pituitary fossa', x: 600, y: 325, labelX: 925, labelY: 305 },
  { id: 'optic-tract', num: 3, label: 'Optic Tract', detail: 'Carries contralateral visual hemifield to LGN & pretectal nucleus', x: 525, y: 425, labelX: 245, labelY: 395 },
  { id: 'lgn', num: 4, label: 'LGN (Thalamus)', detail: 'Thalamic 6-layer relay nucleus (pupillary fibres exit before LGN)', x: 465, y: 515, labelX: 235, labelY: 505 },
  { id: 'meyer', num: 5, label: 'Meyer’s Loop', detail: 'Loops anteriorly around temporal horn; carries superior visual quadrant', x: 395, y: 590, labelX: 235, labelY: 625 },
  { id: 'occipital', num: 6, label: 'Calcarine Cortex (V1)', detail: 'Primary visual cortex; macular pole receives dual PCA + MCA supply', x: 515, y: 815, labelX: 255, labelY: 825 },
];

function GoldmannPerimetryCircle({
  eyeLabel,
  loss,
}: {
  eyeLabel: string;
  loss: FieldLoss;
}) {
  const isLeft = eyeLabel.startsWith('Left');
  const fullLeftHalf = loss === 'full' || loss === 'left-half';
  const fullRightHalf =
    loss === 'full' || loss === 'right-half' || loss === 'macular-sparing-right-half';
  const macularSpared = loss === 'macular-sparing-right-half';
  const supRightQuad = loss === 'sup-right-quad';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg viewBox="0 0 112 112" className="w-28 h-28">
        <defs>
          <clipPath id={`clip-${eyeLabel.replace(/\s+/g, '')}`}>
            <circle cx="56" cy="56" r="46" />
          </clipPath>
        </defs>
        <circle cx="56" cy="56" r="46" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.6" />
        {/* Concentric perimetry rings */}
        <circle cx="56" cy="56" r="32" fill="none" stroke="#E2E8F0" strokeWidth="0.9" />
        <circle cx="56" cy="56" r="18" fill="none" stroke="#E2E8F0" strokeWidth="0.9" />
        <line x1="56" y1="10" x2="56" y2="102" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="10" y1="56" x2="102" y2="56" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 2" />

        {/* Visual Field Defect Masks */}
        <g clipPath={`url(#clip-${eyeLabel.replace(/\s+/g, '')})`}>
          {fullLeftHalf && (
            <rect x="10" y="10" width="46" height="92" fill="#0F172A" fillOpacity="0.86" />
          )}
          {fullRightHalf && (
            <rect x="56" y="10" width="46" height="92" fill="#0F172A" fillOpacity="0.86" />
          )}
          {supRightQuad && (
            <rect x="56" y="10" width="46" height="46" fill="#0F172A" fillOpacity="0.86" />
          )}
          {/* Macular sparing keyhole notch */}
          {macularSpared && (
            <circle cx="56" cy="56" r="11" fill="#FFFFFF" />
          )}
        </g>

        {/* Physiological blind spot (15° temporal) */}
        <ellipse
          cx={isLeft ? 38 : 74}
          cy="58"
          rx="2.5"
          ry="3.5"
          fill="#94A3B8"
        />
        <circle cx="56" cy="56" r="2.2" fill="#0B3A45" />
      </svg>
      <span className="text-xs font-semibold text-[#1E293B]">{eyeLabel}</span>
    </div>
  );
}

export function VisualPathwayLab() {
  const [selected, setSelected] = useState<VisualLesionSite>('optic-chiasm');
  const [quizMode, setQuizMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const spec = VISUAL_LESIONS[selected];

  const toggleReveal = (id: string) =>
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <DiagramStudyFrame
      title="Visual Pathway, Pupillary Reflex & Goldmann Perimetry Localizer"
      subtitle="Axial Brain Base Anatomy · Nasal Decussating Fibres (Amber) vs Temporal Ipsilateral Fibres (Teal)"
      icon={<Eye className="w-4 h-4 text-[#0B3A45]" />}
      pins={VISUAL_PINS}
      quizMode={quizMode}
      onToggleQuizMode={(next) => {
        setQuizMode(next);
        setRevealedIds([]);
      }}
      revealedPinIds={revealedIds}
      onRevealPin={toggleReveal}
      onResetPins={() => setRevealedIds([])}
      headerActions={
        <button
          type="button"
          onClick={() => setSelected('normal')}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#334155] hover:text-[#0F172A] px-2.5 py-1 border border-[#CBD5E1] rounded bg-white whitespace-nowrap"
        >
          <RotateCcw className="w-3 h-3" /> Reset Pathway
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-4 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3E8] flex flex-col items-center justify-center">
          <AnnotatedPlate
            src={visualPathwayImg}
            alt="Anatomical axial brain base showing optic nerve, chiasm, LGN, Meyer's loop, optic radiations, and calcarine cortex"
            width={1200}
            height={896}
            maxWidthClass="max-w-[500px]"
          >
            {/* Anatomical Eye Laterality Markers */}
            <text x={465} y={32} textAnchor="middle" className="fill-[#334155] text-[22px] font-bold">
              LEFT EYE
            </text>
            <text x={735} y={32} textAnchor="middle" className="fill-[#334155] text-[22px] font-bold">
              RIGHT EYE
            </text>

            {/* Clickable Lesion Bars */}
            {[
              { id: 'right-optic-nerve', x1: 676, y1: 216, x2: 742, y2: 242 },
              { id: 'optic-chiasm', x1: 600, y1: 292, x2: 600, y2: 362 },
              { id: 'left-optic-tract', x1: 500, y1: 405, x2: 552, y2: 444 },
              { id: 'left-meyer-loop', x1: 372, y1: 572, x2: 422, y2: 606 },
              { id: 'left-occipital', x1: 482, y1: 794, x2: 548, y2: 836 },
            ].map((bar) => {
              const isAct = selected === bar.id;
              return (
                <g
                  key={bar.id}
                  onClick={() => setSelected(bar.id as VisualLesionSite)}
                  className="cursor-pointer"
                >
                  <line
                    x1={bar.x1}
                    y1={bar.y1}
                    x2={bar.x2}
                    y2={bar.y2}
                    stroke="#FFFFFF"
                    strokeWidth={isAct ? 22 : 16}
                    strokeLinecap="round"
                  />
                  <line
                    x1={bar.x1}
                    y1={bar.y1}
                    x2={bar.x2}
                    y2={bar.y2}
                    stroke={isAct ? '#DC2626' : '#0B3A45'}
                    strokeWidth={isAct ? 14 : 10}
                    strokeLinecap="round"
                  />
                  <line
                    x1={bar.x1}
                    y1={bar.y1}
                    x2={bar.x2}
                    y2={bar.y2}
                    stroke="#FFFFFF"
                    strokeWidth={3.5}
                    strokeDasharray="6 5"
                  />
                </g>
              );
            })}

            {VISUAL_PINS.map((pin) => (
              <PinOrLabel
                key={pin.id}
                pin={pin}
                quizMode={quizMode}
                isRevealed={revealedIds.includes(pin.id)}
                onReveal={toggleReveal}
                anchor={(pin.labelX ?? pin.x) > 600 ? 'start' : 'end'}
                fontSize={24}
                pinRadius={22}
              />
            ))}
          </AnnotatedPlate>
        </div>

        {/* Perimetry & Clinical Localization Panel */}
        <div className="lg:col-span-5 p-4 bg-[#FAFCFD] flex flex-col justify-between gap-3">
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-1.5">
              {(Object.keys(VISUAL_LESIONS) as VisualLesionSite[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelected(key)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded border text-left transition-colors ${
                    selected === key
                      ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                      : 'bg-white text-[#334155] border-[#DCE3E8] hover:border-[#0B3A45]'
                  }`}
                >
                  {VISUAL_LESIONS[key].label}
                </button>
              ))}
            </div>

            <div className="p-3 rounded bg-white border border-[#DCE3E8]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                Goldmann Perimetry (Patient’s View)
              </div>
              <div className="flex items-center justify-around py-2">
                <GoldmannPerimetryCircle eyeLabel="Left Eye" loss={spec.leftEyeLoss} />
                <GoldmannPerimetryCircle eyeLabel="Right Eye" loss={spec.rightEyeLoss} />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-white border border-[#DCE3E8] flex items-start gap-2">
                {selected === 'normal' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-[#0F172A] block">
                    {spec.fieldDefectTitle}
                  </span>
                  <span className="text-[#475569]">{spec.rapd}</span>
                </div>
              </div>
              <div className="p-2.5 rounded bg-[#F1F5F8] border border-[#DCE3E8] text-[#1E293B]">
                <span className="font-semibold text-[#0B3A45]">Clinical Causes: </span>
                {spec.causes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DiagramStudyFrame>
  );
}

// ============================================================================
// 2. SPINAL CORD LONG-TRACT CROSS-SECTION & LESION SIMULATOR
// ============================================================================
type CordScenario = 'normal' | 'brown-sequard' | 'syringomyelia' | 'b12-sacd' | 'asa-infarct';

interface CordScenarioSpec {
  id: CordScenario;
  label: string;
  summary: string;
  motorRight: string;
  motorLeft: string;
  vibRight: string;
  vibLeft: string;
  painRight: string;
  painLeft: string;
  damagedTracts: ('cst-r' | 'dc-r' | 'st-r' | 'dc-l' | 'cst-l' | 'st-l' | 'central' | 'asa')[];
}

const CORD_SCENARIOS: Record<CordScenario, CordScenarioSpec> = {
  normal: {
    id: 'normal',
    label: 'Intact Cord',
    summary: 'Spinothalamic fibres cross in the anterior white commissure (cord); Dorsal columns & Corticospinal tracts cross in the lower medulla.',
    motorRight: 'Intact (5/5)',
    motorLeft: 'Intact (5/5)',
    vibRight: 'Intact',
    vibLeft: 'Intact',
    painRight: 'Intact',
    painLeft: 'Intact',
    damagedTracts: [],
  },
  'brown-sequard': {
    id: 'brown-sequard',
    label: 'Right Hemisection',
    summary: 'Severing the RIGHT half of the cord at T10 produces ipsilateral UMN weakness + proprioception loss and contralateral pain/temperature loss.',
    motorRight: 'IPSILATERAL UMN Weakness + Brisk Reflexes + Babinski +',
    motorLeft: 'Preserved',
    vibRight: 'IPSILATERAL Loss (Vibration & Joint Position)',
    vibLeft: 'Preserved',
    painRight: 'Preserved below T10',
    painLeft: 'CONTRALATERAL Loss of Pain/Temp (1–2 segments below T10)',
    damagedTracts: ['cst-r', 'dc-r', 'st-r'],
  },
  syringomyelia: {
    id: 'syringomyelia',
    label: 'Cervical Syringomyelia',
    summary: 'Central canal syrinx (Chiari I) damages crossing spinothalamic fibres first (suspended cape sensory loss) then anterior horn motor cells.',
    motorRight: 'Hand LMN wasting/areflexia + Leg UMN spasticity',
    motorLeft: 'Hand LMN wasting/areflexia + Leg UMN spasticity',
    vibRight: 'SPARED (Dorsal columns intact)',
    vibLeft: 'SPARED (Dorsal columns intact)',
    painRight: 'Bilateral CAPE Loss (painless burns)',
    painLeft: 'Bilateral CAPE Loss (painless burns)',
    damagedTracts: ['central'],
  },
  'b12-sacd': {
    id: 'b12-sacd',
    label: 'B12 Degeneration',
    summary: 'Vitamin B12 deficiency demyelinates Dorsal Columns + Lateral Corticospinal tracts + peripheral nerves (absent ankle jerks + upgoing plantars).',
    motorRight: 'UMN spastic paraparesis + Upgoing plantar + Absent ankle jerk',
    motorLeft: 'UMN spastic paraparesis + Upgoing plantar + Absent ankle jerk',
    vibRight: 'LOST (Sensory ataxia / Romberg +)',
    vibLeft: 'LOST (Sensory ataxia / Romberg +)',
    painRight: 'Distal glove-stocking paraesthesia',
    painLeft: 'Distal glove-stocking paraesthesia',
    damagedTracts: ['dc-r', 'dc-l', 'cst-r', 'cst-l'],
  },
  'asa-infarct': {
    id: 'asa-infarct',
    label: 'Anterior Spinal Artery',
    summary: 'Occlusion of the single Anterior Spinal Artery infarcts the anterior 2/3 of the cord (CST + Spinothalamic + Anterior Horns), SPARING dorsal columns.',
    motorRight: 'Bilateral Paraplegia (LMN at level, UMN below)',
    motorLeft: 'Bilateral Paraplegia (LMN at level, UMN below)',
    vibRight: 'SPARED (Posterior spinal arteries intact)',
    vibLeft: 'SPARED (Posterior spinal arteries intact)',
    painRight: 'Bilateral Loss below lesion',
    painLeft: 'Bilateral Loss below lesion',
    damagedTracts: ['asa', 'cst-r', 'cst-l', 'st-r', 'st-l'],
  },
};

const CORD_PINS: DiagramPin[] = [
  { id: 'gracilis', num: 1, label: 'Dorsal Columns (Gracilis/Cuneatus)', detail: 'Ipsilateral vibration, joint position, fine touch -> crosses in medulla', x: 560, y: 265, labelX: 600, labelY: 112 },
  { id: 'drg-pin', num: 2, label: 'Dorsal Root Ganglion', detail: 'First-order sensory neuron cell bodies entering dorsal horn', x: 970, y: 385, labelX: 935, labelY: 175 },
  { id: 'cst', num: 3, label: 'Lat. Corticospinal', detail: 'Upper motor neurone descending tract (already crossed in medulla)', x: 755, y: 405, labelX: 955, labelY: 280 },
  { id: 'st', num: 4, label: 'Spinothalamic Tract', detail: 'Pain & temperature; crossed 1–2 levels via anterior commissure', x: 760, y: 525, labelX: 920, labelY: 745 },
  { id: 'ventral-root', num: 5, label: 'Ventral Motor Root (LMN)', detail: 'Alpha motor axons exiting anterior gray horn to skeletal muscle', x: 835, y: 625, labelX: 600, labelY: 805 },
];

export function SpinalTractsLab() {
  const [scenario, setScenario] = useState<CordScenario>('brown-sequard');
  const [quizMode, setQuizMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const spec = CORD_SCENARIOS[scenario];
  const has = (t: CordScenarioSpec['damagedTracts'][number]) =>
    spec.damagedTracts.includes(t);

  const toggleReveal = (id: string) =>
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <DiagramStudyFrame
      title="Spinal Cord Cross-Section, Nerve Roots & Long-Tract Simulator"
      subtitle="Butterfly Gray Horns · Dorsal Root Ganglia · Somatotopic Tracts & Vascular Territories"
      icon={<AlertTriangle className="w-4 h-4 text-[#0B3A45]" />}
      pins={CORD_PINS}
      quizMode={quizMode}
      onToggleQuizMode={(next) => {
        setQuizMode(next);
        setRevealedIds([]);
      }}
      revealedPinIds={revealedIds}
      onRevealPin={toggleReveal}
      onResetPins={() => setRevealedIds([])}
      headerActions={
        <div className="flex flex-wrap gap-1">
          {(Object.keys(CORD_SCENARIOS) as CordScenario[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setScenario(k)}
              className={`px-2 py-1 text-[11px] font-semibold rounded border whitespace-nowrap ${
                scenario === k
                  ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                  : 'bg-white text-[#334155] border-[#CBD5E1] hover:border-[#0B3A45]'
              }`}
            >
              {CORD_SCENARIOS[k].label}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-6 p-4 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3E8] flex flex-col items-center justify-center">
          <AnnotatedPlate
            src={spinalCordImg}
            alt="Anatomical spinal cord cross section with dorsal and ventral roots, dorsal root ganglia, butterfly gray matter, and long tracts"
            width={1200}
            height={896}
            maxWidthClass="max-w-[480px]"
          >
            <MedicalSvgDefs prefix="spc" />

            {/* Radiological Side Markers */}
            <text x={38} y={64} className="fill-[#64748B] text-[24px] font-mono font-semibold">
              PATIENT RIGHT
            </text>
            <text x={1162} y={64} textAnchor="end" className="fill-[#64748B] text-[24px] font-mono font-semibold">
              PATIENT LEFT
            </text>

            {/* Lesion Zone Overlays */}
            {scenario === 'brown-sequard' && (
              <path
                d="M 600 205 C 460 205 365 290 365 415 C 365 550 450 638 582 642 L 600 572 Z"
                fill="url(#spc-lesion-hatch)"
                stroke="#DC2626"
                strokeWidth={5}
                filter="url(#spc-glow-lesion)"
              />
            )}
            {scenario === 'asa-infarct' && (
              <path
                d="M 372 418 Q 600 380 828 418 C 820 555 728 642 618 642 L 600 572 L 582 642 C 472 642 380 555 372 418 Z"
                fill="url(#spc-lesion-hatch)"
                stroke="#DC2626"
                strokeWidth={5}
                filter="url(#spc-glow-lesion)"
              />
            )}
            {has('dc-r') && scenario === 'b12-sacd' && (
              <>
                <ellipse cx={545} cy={272} rx={58} ry={48} fill="url(#spc-lesion-hatch)" stroke="#DC2626" strokeWidth={4} />
                <ellipse cx={655} cy={272} rx={58} ry={48} fill="url(#spc-lesion-hatch)" stroke="#DC2626" strokeWidth={4} />
                <ellipse cx={442} cy={402} rx={48} ry={44} fill="url(#spc-lesion-hatch)" stroke="#DC2626" strokeWidth={4} />
                <ellipse cx={758} cy={402} rx={48} ry={44} fill="url(#spc-lesion-hatch)" stroke="#DC2626" strokeWidth={4} />
              </>
            )}
            {has('central') && (
              <circle
                cx={600}
                cy={440}
                r={76}
                fill="url(#spc-lesion-hatch)"
                stroke="#DC2626"
                strokeWidth={5}
                filter="url(#spc-glow-lesion)"
              />
            )}

            {CORD_PINS.map((pin) => (
              <PinOrLabel
                key={pin.id}
                pin={pin}
                quizMode={quizMode}
                isRevealed={revealedIds.includes(pin.id)}
                onReveal={toggleReveal}
                anchor={pin.id === 'gracilis' || pin.id === 'ventral-root' ? 'middle' : 'start'}
                fontSize={24}
                pinRadius={22}
              />
            ))}
          </AnnotatedPlate>
        </div>

        <div className="lg:col-span-6 p-4 bg-[#FAFCFD] space-y-3 text-xs">
          <p className="text-[#1E293B] leading-relaxed font-medium">{spec.summary}</p>
          <div className="border border-[#D7DFE5] rounded overflow-hidden bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F1F5F8] border-b border-[#D7DFE5] text-[#0F172A]">
                  <th className="py-2 px-3 font-semibold">Pathway</th>
                  <th className="py-2 px-3 font-semibold">Patient Right</th>
                  <th className="py-2 px-3 font-semibold">Patient Left</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EBF0]">
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#0F172A]">Motor (CST)</td>
                  <td className="py-2 px-3 text-[#334155]">{spec.motorRight}</td>
                  <td className="py-2 px-3 text-[#334155]">{spec.motorLeft}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#0F172A]">Vib / JPS (DC)</td>
                  <td className="py-2 px-3 text-[#334155]">{spec.vibRight}</td>
                  <td className="py-2 px-3 text-[#334155]">{spec.vibLeft}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#0F172A]">Pain / Temp (ST)</td>
                  <td className="py-2 px-3 text-[#334155]">{spec.painRight}</td>
                  <td className="py-2 px-3 text-[#334155]">{spec.painLeft}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DiagramStudyFrame>
  );
}

// ============================================================================
// 5. CRANIAL NERVE OCULAR, FACIAL (CN VII) & BULBAR (X/XII) SIMULATOR
// ============================================================================
type CNCaseId =
  | 'cn3-surgical'
  | 'cn6-abducent'
  | 'left-ino'
  | 'horner'
  | 'cn7-umn-vs-lmn'
  | 'cn10-12';

const CN_CASES: Record<
  CNCaseId,
  { label: string; finding: string; localisation: string; causes: string }
> = {
  'cn3-surgical': {
    label: 'CN III Palsy (Surgical)',
    finding: 'Complete right ptosis, eye resting "down & out", dilated unreactive 7 mm right pupil.',
    localisation: 'Superficial parasympathetic fibres compressed externally (unlike microvascular DM which spares pupil).',
    causes: 'Painful PCom artery aneurysm (emergency CTA!), uncal/tentorial herniation (coning).',
  },
  'cn6-abducent': {
    label: 'Right CN VI Palsy',
    finding: 'Right eye fails to abduct past midline on right lateral gaze -> horizontal diplopia worse looking right/far.',
    localisation: 'Right lateral rectus paralysis (LR6).',
    causes: 'False localising sign in raised ICP, microvascular DM/HTN, pontine infarct.',
  },
  'left-ino': {
    label: 'Left INO (MLF Lesion)',
    finding: 'On right gaze: Left eye fails to adduct + Right abducting eye shows horizontal jerk nystagmus; convergence preserved.',
    localisation: 'Left Medial Longitudinal Fasciculus (MLF) linking CN VI nucleus to contralateral CN III medial rectus.',
    causes: 'Young adult (esp. bilateral) = Multiple Sclerosis; Older adult = Brainstem infarct.',
  },
  horner: {
    label: 'Right Horner’s Syndrome',
    finding: 'Partial ptosis (Müller’s), miosis (small pupil REACTIVE to light/accomm), enophthalmos, ipsilateral anhidrosis.',
    localisation: '3-neurone oculosympathetic pathway (Hypothalamus -> C8–T2 -> Sup. Cervical Ganglion -> Carotid -> Eye).',
    causes: 'Painful carotid dissection (CTA!), Pancoast apical lung tumour, lateral medullary stroke, syringomyelia.',
  },
  'cn7-umn-vs-lmn': {
    label: 'CN VII: UMN vs LMN',
    finding: 'LMN paralyses entire ipsilateral hemiface (forehead + eye closure + mouth); UMN SPARES forehead via bilateral corticobulbar supply.',
    localisation: 'LMN = Pons/CPA/Facial canal/Parotid; UMN = Contralateral motor cortex / internal capsule.',
    causes: 'Bell’s palsy, Ramsay Hunt (ear vesicles!), CPA tumour; bilateral LMN = GBS, neurosarcoid, Lyme.',
  },
  'cn10-12': {
    label: 'CN X & CN XII Deviation',
    finding: 'Right CN X palsy -> uvula pulls LEFT (AWAY from lesion). Right CN XII palsy -> wasted fasciculating tongue deviates RIGHT (TOWARD lesion).',
    localisation: 'Bulbar (LMN: wasted tongue, absent jaw/gag) vs Pseudobulbar (bilateral UMN: spastic tongue, brisk jaw jerk, emotional lability).',
    causes: 'MND shows mixed bulbar + pseudobulbar signs; bilateral lacunar strokes cause pseudobulbar palsy.',
  },
};

export function CranialNerveLab() {
  const [active, setActive] = useState<CNCaseId>('cn3-surgical');
  const spec = CN_CASES[active];

  const isRightPtosisFull = active === 'cn3-surgical';
  const isRightPtosisPartial = active === 'horner';
  const rightPupilRadius =
    active === 'cn3-surgical' ? 10 : active === 'horner' ? 4 : 6.5;
  const rightIrisX = active === 'cn3-surgical' ? 92 : active === 'cn6-abducent' ? 108 : 100;
  const rightIrisY = active === 'cn3-surgical' ? 92 : 84;
  const leftIrisX = active === 'left-ino' ? 242 : 254;

  return (
    <DiagramStudyFrame
      title="Ocular Motility, Facial (CN VII) & Oropharyngeal (CN X/XII) Clinical Localizer"
      subtitle="Interactive Clinical Bedside Examination Plates"
      icon={<Eye className="w-4 h-4 text-[#0B3A45]" />}
      headerActions={
        <div className="flex flex-wrap gap-1">
          {(Object.keys(CN_CASES) as CNCaseId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`px-2 py-1 text-[11px] font-semibold rounded border transition-colors ${
                active === id
                  ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                  : 'bg-white text-[#334155] border-[#CBD5E1] hover:border-[#0B3A45]'
              }`}
            >
              {CN_CASES[id].label}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-6 p-4 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3E8] flex items-center justify-center">
          {active === 'cn7-umn-vs-lmn' ? (
            <svg viewBox="0 0 360 190" className="w-full max-w-[400px] h-auto select-none">
              <MedicalSvgDefs prefix="cn7" />
              {[
                { cx: 92, title: 'Right LMN VII (Bell’s)', isUmn: false },
                { cx: 268, title: 'Right UMN VII (Stroke)', isUmn: true },
              ].map((face) => (
                <g key={face.title}>
                  <text x={face.cx} y="16" textAnchor="middle" className="fill-[#0F172A] text-[10.5px] font-bold">
                    {face.title}
                  </text>
                  {/* Anatomical Face Contour */}
                  <path
                    d={`M ${face.cx - 52} 70 C ${face.cx - 54} 34 ${face.cx + 54} 34 ${face.cx + 52} 70 C ${face.cx + 52} 118 ${face.cx + 32} 166 ${face.cx} 168 C ${face.cx - 32} 166 ${face.cx - 52} 118 ${face.cx - 52} 70 Z`}
                    fill="#FDECE6"
                    stroke="#C59C9E"
                    strokeWidth="1.5"
                  />
                  {/* Frontalis muscle striations */}
                  {face.isUmn ? (
                    <>
                      <path d={`M ${face.cx - 38} 54 Q ${face.cx} 47 ${face.cx + 38} 54`} fill="none" stroke="#059669" strokeWidth="2.2" />
                      <path d={`M ${face.cx - 36} 62 Q ${face.cx} 55 ${face.cx + 36} 62`} fill="none" stroke="#059669" strokeWidth="2.2" />
                      <text x={face.cx} y="41" textAnchor="middle" className="fill-[#059669] text-[8px] font-mono font-bold">
                        FOREHEAD SPARED
                      </text>
                    </>
                  ) : (
                    <>
                      <path d={`M ${face.cx + 4} 54 Q ${face.cx + 22} 50 ${face.cx + 38} 54`} fill="none" stroke="#475569" strokeWidth="2" />
                      <path d={`M ${face.cx + 4} 62 Q ${face.cx + 22} 58 ${face.cx + 38} 62`} fill="none" stroke="#475569" strokeWidth="2" />
                      <text x={face.cx - 24} y="59" textAnchor="middle" className="fill-[#DC2626] text-[7.5px] font-mono font-bold">
                        SMOOTH
                      </text>
                    </>
                  )}
                  {/* Eyes (Lagophthalmos / Bell's on LMN) */}
                  <ellipse
                    cx={face.cx - 22}
                    cy="86"
                    rx="12"
                    ry={face.isUmn ? 5 : 8}
                    fill="#FFFFFF"
                    stroke={face.isUmn ? '#334155' : '#DC2626'}
                    strokeWidth="1.6"
                  />
                  <circle cx={face.cx - 22} cy={face.isUmn ? 86 : 82} r="3.5" fill="#0B3A45" />
                  <ellipse cx={face.cx + 22} cy="86" rx="12" ry="5" fill="#FFFFFF" stroke="#334155" strokeWidth="1.6" />
                  <circle cx={face.cx + 22} cy="86" r="3.5" fill="#0B3A45" />
                  {/* Nose */}
                  <path d={`M ${face.cx} 86 L ${face.cx - 4} 112 L ${face.cx + 4} 112`} fill="none" stroke="#C59C9E" strokeWidth="1.2" />
                  {/* Drooping right mouth angle */}
                  <path
                    d={`M ${face.cx - 22} 134 Q ${face.cx} 136 ${face.cx + 24} 124`}
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </g>
              ))}
            </svg>
          ) : active === 'cn10-12' ? (
            <svg viewBox="0 0 360 190" className="w-full max-w-[400px] h-auto select-none">
              <MedicalSvgDefs prefix="cn10" />
              {/* Left Panel: Oropharynx & Palatal Uvula Deviation */}
              <g transform="translate(10, 12)">
                <text x="80" y="12" textAnchor="middle" className="fill-[#0F172A] text-[10.5px] font-bold">
                  Right CN X (Palate)
                </text>
                <ellipse cx="80" cy="88" rx="64" ry="54" fill="#991B1B" stroke="#7F1D1D" strokeWidth="2" />
                {/* Soft palate drooping on patient's right (viewer left), pulled up on left */}
                <path
                  d="M 24 94 Q 52 72 80 62 Q 108 42 136 90 L 136 42 Q 80 32 24 42 Z"
                  fill="#FCA5A5"
                  stroke="#B91C1C"
                  strokeWidth="1.4"
                />
                {/* Uvula pulled AWAY (to viewer right) */}
                <path
                  d="M 76 62 Q 88 86 96 92 Q 84 96 78 80 Z"
                  fill="#EF4444"
                  stroke="#991B1B"
                  strokeWidth="1.2"
                />
                <text x="80" y="158" textAnchor="middle" className="fill-[#0B3A45] text-[9.5px] font-semibold">
                  Uvula deviates AWAY from lesion
                </text>
              </g>

              {/* Right Panel: Tongue Protrusion (CN XII) */}
              <g transform="translate(190, 12)">
                <text x="80" y="12" textAnchor="middle" className="fill-[#0F172A] text-[10.5px] font-bold">
                  Right CN XII (Tongue)
                </text>
                <path d="M 38 42 Q 80 32 122 42" fill="none" stroke="#475569" strokeWidth="2" />
                {/* Tongue Deviating TOWARD Right (viewer left) with right hemiatrophy */}
                <path
                  d="M 54 44 L 106 44 Q 98 106 58 134 Q 44 126 48 84 Z"
                  fill="#F87171"
                  stroke="#991B1B"
                  strokeWidth="1.6"
                />
                <line x1="80" y1="44" x2="58" y2="132" stroke="#B91C1C" strokeWidth="1" strokeDasharray="3 2" />
                <text x="58" y="88" textAnchor="middle" className="fill-white text-[7.5px] font-mono font-bold">
                  WASTED
                </text>
                <text x="80" y="158" textAnchor="middle" className="fill-[#0B3A45] text-[9.5px] font-semibold">
                  Tongue licks TOWARD lesion
                </text>
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 360 185" className="w-full max-w-[400px] h-auto select-none">
              <MedicalSvgDefs prefix="eye" />
              <text x="100" y="20" textAnchor="middle" className="fill-[#0F172A] text-[10.5px] font-bold">
                Patient Right Eye
              </text>
              <text x="260" y="20" textAnchor="middle" className="fill-[#0F172A] text-[10.5px] font-bold">
                Patient Left Eye
              </text>

              {/* Eyebrow contours */}
              <path d="M 56 46 Q 100 34 142 46" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 218 46 Q 260 34 304 46" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />

              {/* Right Orbital Palpebral Fissure */}
              <path
                d="M 56 84 Q 100 54 144 84 Q 100 112 56 84 Z"
                fill="#FFFFFF"
                stroke="#334155"
                strokeWidth="1.8"
                filter="url(#eye-soft-shadow)"
              />
              {/* Iris + Pupil */}
              <circle cx={rightIrisX} cy={rightIrisY} r="15" fill="#0B3A45" fillOpacity="0.24" stroke="#0B3A45" strokeWidth="1.6" />
              <circle cx={rightIrisX} cy={rightIrisY} r={rightPupilRadius} fill="#0F172A" />
              <circle cx={rightIrisX - 3} cy={rightIrisY - 3} r="2" fill="#FFFFFF" opacity="0.8" />

              {/* Ptosis Eyelid Overlay */}
              {isRightPtosisFull && (
                <path
                  d="M 56 84 Q 100 54 144 84 L 144 96 Q 100 100 56 96 Z"
                  fill="#F3D5CE"
                  stroke="#9F6564"
                  strokeWidth="1.5"
                />
              )}
              {isRightPtosisPartial && (
                <path
                  d="M 56 84 Q 100 54 144 84 L 144 78 Q 100 78 56 78 Z"
                  fill="#F3D5CE"
                  stroke="#9F6564"
                  strokeWidth="1.4"
                />
              )}

              {/* Left Orbital Palpebral Fissure */}
              <path
                d="M 216 84 Q 260 54 304 84 Q 260 112 216 84 Z"
                fill="#FFFFFF"
                stroke="#334155"
                strokeWidth="1.8"
                filter="url(#eye-soft-shadow)"
              />
              <circle cx={leftIrisX} cy="84" r="15" fill="#0B3A45" fillOpacity="0.24" stroke="#0B3A45" strokeWidth="1.6" />
              <circle cx={leftIrisX} cy="84" r="6.5" fill="#0F172A" />
              <circle cx={leftIrisX - 3} cy="81" r="2" fill="#FFFFFF" opacity="0.8" />

              {/* Gaze vectors */}
              {active === 'left-ino' && (
                <>
                  <path d="M 100 120 L 66 120" fill="none" stroke="#0B3A45" strokeWidth="2" markerEnd="url(#eye-arrow-teal)" />
                  <text x="260" y="124" textAnchor="middle" className="fill-[#DC2626] text-[9px] font-bold">
                    Fails Adduction
                  </text>
                </>
              )}

              <text x="180" y="156" textAnchor="middle" className="fill-[#334155] text-[10px] font-semibold">
                {active === 'cn3-surgical'
                  ? 'Resting "Down & Out" + Complete Ptosis + Dilated Unreactive Pupil'
                  : active === 'cn6-abducent'
                  ? 'Right gaze attempt: Right lateral rectus fails abduction'
                  : active === 'left-ino'
                  ? 'Right gaze: Left eye cannot adduct + Right abducting nystagmus'
                  : 'Partial Müller ptosis + Reactive Miosis (Anisocoria)'}
              </text>
            </svg>
          )}
        </div>

        <div className="lg:col-span-6 p-4 bg-[#FAFCFD] space-y-3 text-xs">
          <div className="p-3 rounded bg-white border border-[#DCE3E8]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">
              Clinical Examination Finding
            </span>
            <p className="text-[#0F172A] font-semibold mt-1 leading-relaxed">{spec.finding}</p>
          </div>
          <div className="p-3 rounded bg-[#F1F5F8] border border-[#DCE3E8]">
            <span className="font-semibold text-[#0B3A45]">Anatomical Localisation: </span>
            <span className="text-[#334155]">{spec.localisation}</span>
          </div>
          <div className="p-3 rounded bg-[#FFFBEB] border border-[#FDE68A]">
            <span className="font-semibold text-[#92400E]">High-Yield Causes: </span>
            <span className="text-[#78350F]">{spec.causes}</span>
          </div>
        </div>
      </div>
    </DiagramStudyFrame>
  );
}
