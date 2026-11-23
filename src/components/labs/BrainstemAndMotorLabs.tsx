import React, { useState } from 'react';
import { Brain, Layers } from 'lucide-react';
import {
  AnnotatedPlate,
  DiagramPin,
  DiagramStudyFrame,
  MedicalSvgDefs,
  PinOrLabel,
} from './DiagramPrimitives';
import anteriorBrainstemImg from '../../assets/images/brainstem_anterior_plate_1795394579813.jpg';
import dorsalBrainstemImg from '../../assets/images/dorsal_brainstem_plate_1795394619168.jpg';
import axialPonsImg from '../../assets/images/pons_axial_section_1795394579582.jpg';
import cstPathwayImg from '../../assets/images/corticospinal_tract_plate_1795394579613.jpg';
import stretchReflexImg from '../../assets/images/stretch_reflex_arc_1795394579864.jpg';
import cerebellumImg from '../../assets/images/cerebellum_anatomy_plate_1795394580037.jpg';

// ============================================================================
// 3. BRAINSTEM EXTERNAL & AXIAL CROSS-SECTION ATLAS (AMBOSS-INSPIRED)
// ============================================================================
type BrainstemView = 'anterior' | 'posterior' | 'axial-pons';
type BrainstemSyndrome = 'normal' | 'weber' | 'millard-gubler' | 'wallenberg';

const BRAINSTEM_SYNDROMES: Record<
  BrainstemSyndrome,
  {
    label: string;
    level: string;
    ipsilateral: string;
    contralateral: string;
    artery: string;
  }
> = {
  normal: {
    label: 'Intact Brainstem & CNs',
    level: 'Midbrain (CN III, IV) · Pons (CN V–VIII) · Medulla (CN IX–XII)',
    ipsilateral: 'All cranial nerve motor, sensory, and parasympathetic nuclei intact.',
    contralateral: 'Long motor (CST) and sensory (DCML, Spinothalamic) tracts intact.',
    artery: 'Posterior circulation: Vertebral -> Basilar -> PCA + PICA/AICA/SCA.',
  },
  weber: {
    label: 'Weber’s Syndrome (Midbrain)',
    level: 'Ventral Midbrain (Cerebral Peduncle + Exiting CN III)',
    ipsilateral: 'Complete CN III palsy ("down & out" eye, ptosis, blown pupil).',
    contralateral: 'Contralateral UMN hemiparesis (face + arm + leg) via corticospinal & corticobulbar tracts.',
    artery: 'Paramedian branches of PCA / Basilar bifurcation.',
  },
  'millard-gubler': {
    label: 'Ventral Pontine (Millard-Gubler)',
    level: 'Ventral Caudal Pons (CN VI + CN VII + Corticospinal)',
    ipsilateral: 'Ipsilateral LMN facial palsy (CN VII) + Lateral rectus palsy (CN VI).',
    contralateral: 'Contralateral spastic hemiparesis (sparing face).',
    artery: 'Paramedian & short circumferential branches of Basilar artery.',
  },
  wallenberg: {
    label: 'Lateral Medullary (Wallenberg)',
    level: 'Dorsolateral Medulla (Nucleus Ambiguus, Vestibular, Sympathetic, ST)',
    ipsilateral: 'Dysphagia/hoarseness (IX/X), Horner’s syndrome (sympathetic), facial pain/temp loss (V spinal), limb ataxia (ICP).',
    contralateral: 'Contralateral loss of pain & temperature over trunk and limbs (Spinothalamic tract).',
    artery: 'PICA (or Vertebral artery) occlusion — classic posterior circulation stroke!',
  },
};

const ANTERIOR_PINS: DiagramPin[] = [
  { id: 'cn2', num: 1, label: 'Optic Chiasm (II)', detail: 'Crossing nasal retinal fibres superior to pituitary stalk', x: 448, y: 178, labelX: 675, labelY: 118 },
  { id: 'cn3', num: 2, label: 'Oculomotor (III)', detail: 'Exits ventral midbrain interpeduncular fossa', x: 396, y: 318, labelX: 215, labelY: 326 },
  { id: 'cn4', num: 3, label: 'Trochlear (IV)', detail: 'Only CN exiting dorsally; wraps around midbrain', x: 598, y: 392, labelX: 695, labelY: 382 },
  { id: 'cn5', num: 4, label: 'Trigeminal (V)', detail: 'Massive sensory + smaller motor root at mid-pons', x: 646, y: 524, labelX: 705, labelY: 508 },
  { id: 'cn6', num: 5, label: 'Abducent (VI)', detail: 'Exits medially at pontomedullary junction (LR6)', x: 398, y: 700, labelX: 215, labelY: 702 },
  { id: 'cn7-8', num: 6, label: 'CN VII & VIII', detail: 'Exit laterally at cerebellopontine angle (CPA)', x: 626, y: 738, labelX: 695, labelY: 735 },
  { id: 'cn9-10', num: 7, label: 'CN IX & X', detail: 'Post-olivary sulcus of medulla -> jugular foramen', x: 596, y: 816, labelX: 695, labelY: 836 },
  { id: 'cn12', num: 8, label: 'Hypoglossal (XII)', detail: 'Pre-olivary sulcus between pyramid and olive', x: 378, y: 868, labelX: 215, labelY: 888 },
  { id: 'decussation', num: 9, label: 'Pyramidal Decuss.', detail: '90% of corticospinal motor fibres cross in caudal medulla', x: 448, y: 1005, labelX: 668, labelY: 1032 },
];

const POSTERIOR_PINS: DiagramPin[] = [
  { id: 'colliculi', num: 1, label: 'Sup/Inf Colliculi', detail: 'Midbrain tectum: visual gaze (sup) & auditory relay (inf)', x: 496, y: 336, labelX: 665, labelY: 325 },
  { id: 'dorsal-iv', num: 2, label: 'Trochlear (IV)', detail: 'Exits dorsally below inferior colliculus, decussates', x: 356, y: 446, labelX: 225, labelY: 468 },
  { id: 'peduncles', num: 3, label: 'Cerebellar Peduncle', detail: 'Middle cerebellar peduncle connecting pons to cerebellum', x: 578, y: 575, labelX: 668, labelY: 578 },
  { id: 'rhomboid', num: 4, label: 'Rhomboid Fossa', detail: '4th ventricle floor: facial colliculus & striae medullares', x: 448, y: 636, labelX: 225, labelY: 654 },
  { id: 'gracile', num: 5, label: 'Gracile/Cuneate', detail: 'Dorsal column-medial lemniscus 2nd-order relay nuclei', x: 418, y: 805, labelX: 225, labelY: 838 },
];

const AXIAL_PINS: DiagramPin[] = [
  { id: 'mlf', num: 1, label: 'MLF (Gaze Tract)', detail: 'Connects CN VI to contralateral CN III (lesion = INO)', x: 585, y: 368, labelX: 585, labelY: 95 },
  { id: 'cn6-nuc', num: 2, label: 'CN VI & VII Loop', detail: 'Facial colliculus in dorsal pons; internal genu of CN VII', x: 662, y: 382, labelX: 910, labelY: 135 },
  { id: 'vestibular', num: 3, label: 'Vestibular Nuc.', detail: 'Lateral floor of 4th ventricle; balance & VOR', x: 805, y: 318, labelX: 945, labelY: 248 },
  { id: 'spinal-v', num: 4, label: 'Spinal CN V', detail: 'Ipsilateral facial pain & temperature sensation', x: 865, y: 345, labelX: 958, labelY: 382 },
  { id: 'cst-pons', num: 5, label: 'Corticospinal Tract', detail: 'Ventral basis pontis motor fascicles descending to pyramids', x: 465, y: 665, labelX: 235, labelY: 735 },
];

export function BrainstemAtlasLab() {
  const [view, setView] = useState<BrainstemView>('anterior');
  const [syndrome, setSyndrome] = useState<BrainstemSyndrome>('normal');
  const [quizMode, setQuizMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const activePins =
    view === 'anterior'
      ? ANTERIOR_PINS
      : view === 'posterior'
      ? POSTERIOR_PINS
      : AXIAL_PINS;

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const spec = BRAINSTEM_SYNDROMES[syndrome];

  return (
    <DiagramStudyFrame
      title="Brainstem Morphology, Cranial Nerve Origins & Axial Nuclei Atlas"
      subtitle="Color-coded Midbrain (Sage) · Pons (Slate Blue) · Medulla (Teal) · Cranial Nerves II–XII"
      icon={<Brain className="w-4 h-4 text-[#0B3A45]" />}
      pins={activePins}
      quizMode={quizMode}
      onToggleQuizMode={(next) => {
        setQuizMode(next);
        setRevealedIds([]);
      }}
      revealedPinIds={revealedIds}
      onRevealPin={toggleReveal}
      onResetPins={() => setRevealedIds([])}
      headerActions={
        <div className="inline-flex bg-white p-0.5 rounded border border-[#CBD5E1]">
          {[
            { id: 'anterior', label: 'Anterior View' },
            { id: 'posterior', label: 'Posterior View' },
            { id: 'axial-pons', label: 'Axial Pons Section' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setView(tab.id as BrainstemView);
                setRevealedIds([]);
              }}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-xs transition-colors whitespace-nowrap ${
                view === tab.id
                  ? 'bg-[#126D7C] text-white'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-4 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3E8] flex flex-col items-center justify-center">
          {view === 'anterior' && (
            <AnnotatedPlate
              src={anteriorBrainstemImg}
              alt="Anterior brainstem anatomy showing diencephalon, midbrain, pons, medulla, and cranial nerves II through XII"
              width={896}
              height={1200}
              maxWidthClass="max-w-[440px]"
            >
              <MedicalSvgDefs prefix="bsa" />
              {syndrome === 'weber' && (
                <ellipse
                  cx={374}
                  cy={322}
                  rx={54}
                  ry={38}
                  fill="url(#bsa-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth={5}
                  filter="url(#bsa-glow-lesion)"
                />
              )}
              {syndrome === 'millard-gubler' && (
                <ellipse
                  cx={384}
                  cy={650}
                  rx={68}
                  ry={44}
                  fill="url(#bsa-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth={5}
                  filter="url(#bsa-glow-lesion)"
                />
              )}
              {syndrome === 'wallenberg' && (
                <ellipse
                  cx={342}
                  cy={810}
                  rx={46}
                  ry={52}
                  fill="url(#bsa-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth={5}
                  filter="url(#bsa-glow-lesion)"
                />
              )}
              {ANTERIOR_PINS.map((pin) => {
                const useStart = (pin.labelX ?? pin.x) > 450;
                return (
                  <PinOrLabel
                    key={pin.id}
                    pin={pin}
                    quizMode={quizMode}
                    isRevealed={revealedIds.includes(pin.id)}
                    onReveal={toggleReveal}
                    anchor={useStart ? 'start' : 'end'}
                    fontSize={22}
                    pinRadius={20}
                  />
                );
              })}
            </AnnotatedPlate>
          )}

          {view === 'posterior' && (
            <AnnotatedPlate
              src={dorsalBrainstemImg}
              alt="Posterior brainstem anatomy showing colliculi, trochlear nerve, cerebellar peduncles, and 4th ventricle floor"
              width={896}
              height={1200}
              maxWidthClass="max-w-[440px]"
            >
              {POSTERIOR_PINS.map((pin) => {
                const useStart = (pin.labelX ?? pin.x) > 450;
                return (
                  <PinOrLabel
                    key={pin.id}
                    pin={pin}
                    quizMode={quizMode}
                    isRevealed={revealedIds.includes(pin.id)}
                    onReveal={toggleReveal}
                    anchor={useStart ? 'start' : 'end'}
                    fontSize={22}
                    pinRadius={20}
                  />
                );
              })}
            </AnnotatedPlate>
          )}

          {view === 'axial-pons' && (
            <AnnotatedPlate
              src={axialPonsImg}
              alt="Axial pontine cross-section showing CN VI and VII nuclei, MLF, vestibular and trigeminal nuclei, and corticospinal tracts"
              width={1200}
              height={896}
              maxWidthClass="max-w-[500px]"
            >
              <MedicalSvgDefs prefix="bsx" />
              {syndrome === 'millard-gubler' && (
                <ellipse
                  cx={735}
                  cy={665}
                  rx={110}
                  ry={72}
                  fill="url(#bsx-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth={5}
                  filter="url(#bsx-glow-lesion)"
                />
              )}
              {AXIAL_PINS.map((pin) => (
                <PinOrLabel
                  key={pin.id}
                  pin={pin}
                  quizMode={quizMode}
                  isRevealed={revealedIds.includes(pin.id)}
                  onReveal={toggleReveal}
                  anchor={
                    pin.id === 'mlf'
                      ? 'middle'
                      : (pin.labelX ?? pin.x) < 600
                      ? 'end'
                      : 'start'
                  }
                  fontSize={25}
                  pinRadius={23}
                />
              ))}
            </AnnotatedPlate>
          )}
        </div>

        {/* Interactive Brainstem Crossed Syndrome Localizer */}
        <div className="lg:col-span-5 p-4 space-y-3 bg-[#FAFCFD]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] mb-2">
              Brainstem Crossed Syndrome Localizer
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(BRAINSTEM_SYNDROMES) as BrainstemSyndrome[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSyndrome(k)}
                  className={`px-2.5 py-2 text-left text-xs font-semibold rounded border transition-colors ${
                    syndrome === k
                      ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                      : 'bg-white text-[#334155] border-[#DCE3E8] hover:border-[#0B3A45]'
                  }`}
                >
                  {BRAINSTEM_SYNDROMES[k].label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded bg-white border border-[#DCE3E8]">
              <div className="text-[10px] font-mono uppercase text-[#64748B]">Anatomical Level</div>
              <div className="font-semibold text-[#0F172A] mt-0.5">{spec.level}</div>
            </div>
            <div className="p-2.5 rounded bg-[#FEF2F2] border border-[#FECACA]">
              <div className="text-[10px] font-mono uppercase text-[#991B1B]">Ipsilateral CN / Local Signs</div>
              <div className="text-[#7F1D1D] mt-0.5 leading-relaxed">{spec.ipsilateral}</div>
            </div>
            <div className="p-2.5 rounded bg-[#EFF6FF] border border-[#BFDBFE]">
              <div className="text-[10px] font-mono uppercase text-[#1E40AF]">Contralateral Long-Tract Signs</div>
              <div className="text-[#1E3A8A] mt-0.5 leading-relaxed">{spec.contralateral}</div>
            </div>
            <div className="p-2.5 rounded bg-[#F1F5F8] border border-[#DCE3E8]">
              <div className="text-[10px] font-mono uppercase text-[#475569]">Vascular Supply</div>
              <div className="text-[#334155] mt-0.5">{spec.artery}</div>
            </div>
          </div>
        </div>
      </div>
    </DiagramStudyFrame>
  );
}

// ============================================================================
// 4. CORTICOSPINAL PATHWAY, STRETCH REFLEX & CEREBELLUM (OSMOSIS-INSPIRED)
// ============================================================================
type MotorAtlasTab = 'corticospinal' | 'reflex' | 'cerebellum';

const CST_PINS: DiagramPin[] = [
  { id: 'precentral', num: 1, label: 'Motor Cortex (UMN)', detail: 'UMN Betz cell bodies arranged somatotopically (medial leg, lateral face/hand)', x: 625, y: 130, labelX: 680, labelY: 72 },
  { id: 'capsule', num: 2, label: 'Internal Capsule', detail: 'Dense UMN tract bundle; small lacunar infarct causes dense contralateral hemiparesis', x: 538, y: 292, labelX: 682, labelY: 312 },
  { id: 'pyramid', num: 3, label: 'Medullary Pyramids', detail: '90% cross to Lateral CST; 10% descend ipsilaterally as Anterior CST', x: 455, y: 685, labelX: 235, labelY: 705 },
  { id: 'lmn', num: 4, label: 'Anterior Horn (LMN)', detail: 'Synapse onto alpha motor neuron exiting ventral root -> skeletal muscle', x: 508, y: 1085, labelX: 245, labelY: 1105 },
];

const REFLEX_PINS: DiagramPin[] = [
  { id: 'drg', num: 1, label: 'Dorsal Root Ganglion (Ia)', detail: 'Pseudounipolar sensory neuron cell body from muscle spindle', x: 525, y: 175, labelX: 345, labelY: 98 },
  { id: 'ia-synapse', num: 2, label: 'Excitatory (+) Synapse', detail: 'Direct activation of extensor alpha-motor neuron -> muscle contraction', x: 802, y: 296, labelX: 935, labelY: 520 },
  { id: 'interneuron', num: 3, label: 'Inhibitory (−) Interneuron', detail: 'Reciprocal inhibition relaxes antagonist flexor muscle simultaneously', x: 874, y: 248, labelX: 660, labelY: 58 },
  { id: 'spindle', num: 4, label: 'Muscle Spindle (α–γ)', detail: 'Alpha-gamma coactivation keeps spindle taut during contraction', x: 375, y: 728, labelX: 675, labelY: 825 },
];

const CEREBELLUM_PINS: DiagramPin[] = [
  { id: 'vermis', num: 1, label: 'Vermis (Midline)', detail: 'Midline strip controlling trunk posture, gait, and limb synergy', x: 316, y: 440, labelX: 316, labelY: 140 },
  { id: 'primary-fissure', num: 2, label: 'Primary Fissure', detail: 'Separates Anterior Lobe from Posterior Lobe on superior surface', x: 215, y: 315, labelX: 195, labelY: 195 },
  { id: 'flocculonodular', num: 3, label: 'Flocculonodular Lobe', detail: 'Balance, equilibrium & vestibulo-ocular reflex control', x: 785, y: 555, labelX: 695, labelY: 780 },
  { id: 'peduncles', num: 4, label: 'Cerebellar Peduncles', detail: 'Middle carries pontocerebellar planning input; Superior carries major output', x: 742, y: 405, labelX: 735, labelY: 155 },
];

export function MotorReflexCerebellumLab() {
  const [tab, setTab] = useState<MotorAtlasTab>('corticospinal');
  const [cstLesion, setCstLesion] = useState<'cortex' | 'capsule' | 'cord'>('capsule');
  const [reflexRoot, setReflexRoot] = useState<'biceps' | 'triceps' | 'knee' | 'ankle'>('knee');
  const [cerebellarZone, setCerebellarZone] = useState<'hemisphere' | 'vermis' | 'flocculonodular'>('hemisphere');
  const [quizMode, setQuizMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const pins =
    tab === 'corticospinal'
      ? CST_PINS
      : tab === 'reflex'
      ? REFLEX_PINS
      : CEREBELLUM_PINS;

  const toggleReveal = (id: string) =>
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <DiagramStudyFrame
      title="Motor Pathways, Stretch Reflex Arc & Cerebellar Anatomy Atlas"
      subtitle="Corticospinal Tract Decussation · Monosynaptic Stretch Reflex & α–γ Coactivation · Cerebellar Lobes"
      icon={<Layers className="w-4 h-4 text-[#0B3A45]" />}
      pins={pins}
      quizMode={quizMode}
      onToggleQuizMode={(next) => {
        setQuizMode(next);
        setRevealedIds([]);
      }}
      revealedPinIds={revealedIds}
      onRevealPin={toggleReveal}
      onResetPins={() => setRevealedIds([])}
      headerActions={
        <div className="inline-flex bg-white p-0.5 rounded border border-[#CBD5E1]">
          {[
            { id: 'corticospinal', label: 'Corticospinal Tract' },
            { id: 'reflex', label: 'Stretch Reflex & α–γ' },
            { id: 'cerebellum', label: 'Cerebellum' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id as MotorAtlasTab);
                setRevealedIds([]);
              }}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-xs transition-colors whitespace-nowrap ${
                tab === t.id
                  ? 'bg-[#126D7C] text-white'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-4 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3E8] flex items-center justify-center">
          {tab === 'corticospinal' && (
            <AnnotatedPlate
              src={cstPathwayImg}
              alt="Corticospinal pathway from coronal motor cortex through medullary pyramids to spinal cord lower motor neuron"
              width={896}
              height={1200}
              maxWidthClass="max-w-[440px]"
            >
              <MedicalSvgDefs prefix="cst" />
              {cstLesion === 'cortex' && (
                <circle
                  cx={625}
                  cy={130}
                  r={36}
                  fill="url(#cst-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth={5}
                  filter="url(#cst-glow-lesion)"
                />
              )}
              {cstLesion === 'capsule' && (
                <circle
                  cx={538}
                  cy={292}
                  r={32}
                  fill="url(#cst-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth={5}
                  filter="url(#cst-glow-lesion)"
                />
              )}
              {cstLesion === 'cord' && (
                <circle
                  cx={518}
                  cy={972}
                  r={30}
                  fill="url(#cst-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth={5}
                  filter="url(#cst-glow-lesion)"
                />
              )}
              {CST_PINS.map((pin) => (
                <PinOrLabel
                  key={pin.id}
                  pin={pin}
                  quizMode={quizMode}
                  isRevealed={revealedIds.includes(pin.id)}
                  onReveal={toggleReveal}
                  anchor={(pin.labelX ?? pin.x) < 448 ? 'end' : 'start'}
                  fontSize={22}
                  pinRadius={20}
                />
              ))}
            </AnnotatedPlate>
          )}

          {tab === 'reflex' && (
            <AnnotatedPlate
              src={stretchReflexImg}
              alt="Monosynaptic stretch reflex arc and alpha-gamma coactivation diagram"
              width={1200}
              height={896}
              maxWidthClass="max-w-[500px]"
            >
              <circle cx={802} cy={296} r={19} fill="#16A34A" stroke="#FFFFFF" strokeWidth={3} />
              <text x={802} y={304} textAnchor="middle" className="fill-white text-[24px] font-bold">
                +
              </text>
              <circle cx={874} cy={248} r={19} fill="#DC2626" stroke="#FFFFFF" strokeWidth={3} />
              <text x={874} y={256} textAnchor="middle" className="fill-white text-[24px] font-bold">
                −
              </text>
              {REFLEX_PINS.map((pin) => (
                <PinOrLabel
                  key={pin.id}
                  pin={pin}
                  quizMode={quizMode}
                  isRevealed={revealedIds.includes(pin.id)}
                  onReveal={toggleReveal}
                  anchor={
                    pin.id === 'spindle'
                      ? 'start'
                      : (pin.labelX ?? pin.x) < 700
                      ? 'end'
                      : 'start'
                  }
                  fontSize={24}
                  pinRadius={22}
                />
              ))}
            </AnnotatedPlate>
          )}

          {tab === 'cerebellum' && (
            <AnnotatedPlate
              src={cerebellumImg}
              alt="Cerebellar anatomy showing hemispheres, vermis, primary fissure, flocculonodular lobe, and cerebellar peduncles"
              width={1200}
              height={896}
              maxWidthClass="max-w-[500px]"
            >
              <MedicalSvgDefs prefix="cer" />
              {cerebellarZone === 'hemisphere' && (
                <ellipse
                  cx={145}
                  cy={475}
                  rx={88}
                  ry={115}
                  fill="url(#cer-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth={5}
                  filter="url(#cer-glow-lesion)"
                />
              )}
              {cerebellarZone === 'vermis' && (
                <ellipse
                  cx={315}
                  cy={465}
                  rx={38}
                  ry={165}
                  fill="url(#cer-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth={5}
                  filter="url(#cer-glow-lesion)"
                />
              )}
              {cerebellarZone === 'flocculonodular' && (
                <circle
                  cx={785}
                  cy={555}
                  r={46}
                  fill="url(#cer-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth={5}
                  filter="url(#cer-glow-lesion)"
                />
              )}
              {CEREBELLUM_PINS.map((pin) => (
                <PinOrLabel
                  key={pin.id}
                  pin={pin}
                  quizMode={quizMode}
                  isRevealed={revealedIds.includes(pin.id)}
                  onReveal={toggleReveal}
                  anchor={
                    pin.id === 'vermis'
                      ? 'middle'
                      : pin.id === 'flocculonodular'
                      ? 'start'
                      : 'end'
                  }
                  fontSize={24}
                  pinRadius={22}
                />
              ))}
            </AnnotatedPlate>
          )}
        </div>

        {/* Clinical Correlation & Controls */}
        <div className="lg:col-span-5 p-4 bg-[#FAFCFD] space-y-3 text-xs">
          {tab === 'corticospinal' && (
            <>
              <div className="text-[11px] font-mono uppercase text-[#64748B]">
                Select Corticospinal Lesion Level
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'cortex', label: 'Motor Cortex' },
                  { id: 'capsule', label: 'Internal Capsule' },
                  { id: 'cord', label: 'Spinal Cord' },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setCstLesion(b.id as 'cortex' | 'capsule' | 'cord')}
                    className={`px-2 py-1.5 rounded border font-semibold ${
                      cstLesion === b.id
                        ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                        : 'bg-white text-[#334155] border-[#DCE3E8]'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              <div className="p-3 rounded bg-white border border-[#DCE3E8] space-y-1.5">
                <div className="font-semibold text-[#0F172A]">
                  {cstLesion === 'cortex'
                    ? 'Focal Cortical Lesion (ACA / MCA)'
                    : cstLesion === 'capsule'
                    ? 'Internal Capsule Lacunar Infarct'
                    : 'Spinal Cord Lateral CST (Below Decussation)'}
                </div>
                <p className="text-[#334155] leading-relaxed">
                  {cstLesion === 'cortex'
                    ? 'Produces CONTRALATERAL monoparesis or disproportionate weakness (leg > arm in ACA; face/arm > leg in MCA) with UMN signs.'
                    : cstLesion === 'capsule'
                    ? 'Dense CONTRALATERAL pure motor hemiparesis affecting face, arm, and leg equally without cortical signs (no aphasia/hemianopia).'
                    : 'Produces IPSILATERAL UMN weakness below the lesion (spasticity, brisk reflexes, clonus, upgoing plantar) because decussation already occurred in the medulla.'}
                </p>
              </div>
            </>
          )}

          {tab === 'reflex' && (
            <>
              <div className="text-[11px] font-mono uppercase text-[#64748B]">
                Monosynaptic Reflex Root Selector
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'biceps', label: 'Biceps (C5/C6)' },
                  { id: 'triceps', label: 'Triceps (C7)' },
                  { id: 'knee', label: 'Knee (L3/L4)' },
                  { id: 'ankle', label: 'Ankle (S1)' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setReflexRoot(r.id as 'biceps' | 'triceps' | 'knee' | 'ankle')}
                    className={`px-2.5 py-1.5 rounded border font-semibold ${
                      reflexRoot === r.id
                        ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                        : 'bg-white text-[#334155] border-[#DCE3E8]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <div className="p-3 rounded bg-white border border-[#DCE3E8] space-y-1.5">
                <div className="font-semibold text-[#0F172A]">
                  {reflexRoot === 'biceps'
                    ? 'Biceps Jerk — C5 (C6) · Musculocutaneous Nerve'
                    : reflexRoot === 'triceps'
                    ? 'Triceps Jerk — C7 · Radial Nerve'
                    : reflexRoot === 'knee'
                    ? 'Patellar Knee Jerk — L3 / L4 · Femoral Nerve'
                    : 'Achilles Ankle Jerk — S1 · Tibial Nerve'}
                </div>
                <p className="text-[#334155] leading-relaxed">
                  {reflexRoot === 'biceps'
                    ? 'Absent in C5 radiculopathy; inverted biceps jerk occurs in C5/C6 cervical cord compression.'
                    : reflexRoot === 'triceps'
                    ? 'SPARED in mid-humeral spiral groove radial nerve palsy (triceps branches arise proximally in axilla!).'
                    : reflexRoot === 'knee'
                    ? 'Stretch of patellar tendon activates Type Ia afferents -> monosynaptic excitation of quadriceps + reciprocal inhibition of hamstrings.'
                    : 'Lost early in peripheral neuropathy, S1 radiculopathy (sciatica), and B12 subacute combined degeneration.'}
                </p>
              </div>
            </>
          )}

          {tab === 'cerebellum' && (
            <>
              <div className="text-[11px] font-mono uppercase text-[#64748B]">
                Functional Cerebellar Division Localizer
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'hemisphere', label: 'Hemisphere' },
                  { id: 'vermis', label: 'Vermis' },
                  { id: 'flocculonodular', label: 'Flocculonodular' },
                ].map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setCerebellarZone(z.id as 'hemisphere' | 'vermis' | 'flocculonodular')}
                    className={`px-2 py-1.5 rounded border font-semibold ${
                      cerebellarZone === z.id
                        ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                        : 'bg-white text-[#334155] border-[#DCE3E8]'
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>
              <div className="p-3 rounded bg-white border border-[#DCE3E8] space-y-1.5">
                <div className="font-semibold text-[#0F172A]">
                  {cerebellarZone === 'hemisphere'
                    ? 'Pontocerebellum (Lateral Hemispheres) -> IPSILATERAL Limb Signs'
                    : cerebellarZone === 'vermis'
                    ? 'Spinocerebellum (Midline Vermis) -> Truncal & Gait Ataxia'
                    : 'Vestibulocerebellum (Flocculonodular) -> Equilibrium & Nystagmus'}
                </div>
                <p className="text-[#334155] leading-relaxed">
                  {cerebellarZone === 'hemisphere'
                    ? 'Double-crossing pathways mean a right cerebellar hemisphere lesion causes RIGHT-sided dysmetria, intention tremor, dysdiadochokinesia, and scanning dysarthria.'
                    : cerebellarZone === 'vermis'
                    ? 'Classic in chronic alcoholic cerebellar degeneration: broad-based drunken gait failing heel-to-toe tandem walking, while finger-to-nose can stay relatively spared.'
                    : 'Coordinates balance and eye movements via vestibular nuclei; lesions cause severe vertigo, nystagmus, and truncal instability (medulloblastoma in children).'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </DiagramStudyFrame>
  );
}
