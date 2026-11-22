import React, { useState } from 'react';
import { Brain, Compass, Layers } from 'lucide-react';
import {
  DiagramPin,
  DiagramStudyFrame,
  MedicalSvgDefs,
  PinOrLabel,
} from './DiagramPrimitives';

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
  { id: 'cn2', num: 1, label: 'Optic Chiasm (CN II)', detail: 'Crossing nasal retinal fibres superior to pituitary stalk', x: 180, y: 53, labelX: 286, labelY: 26 },
  { id: 'cn3', num: 2, label: 'Oculomotor (CN III)', detail: 'Exits ventral midbrain interpeduncular fossa', x: 152, y: 95, labelX: 64, labelY: 84 },
  { id: 'cn4', num: 3, label: 'Trochlear (CN IV)', detail: 'Only CN exiting dorsally; wraps around midbrain', x: 106, y: 112, labelX: 60, labelY: 114 },
  { id: 'cn5', num: 4, label: 'Trigeminal (CN V)', detail: 'Massive sensory + smaller motor root at mid-pons', x: 96, y: 156, labelX: 60, labelY: 156 },
  { id: 'cn6', num: 5, label: 'Abducent (CN VI)', detail: 'Exits medially at pontomedullary junction (LR6)', x: 154, y: 215, labelX: 64, labelY: 222 },
  { id: 'cn7-8', num: 6, label: 'CN VII & VIII (CPA)', detail: 'Exit laterally at cerebellopontine angle (CPA)', x: 266, y: 202, labelX: 294, labelY: 196 },
  { id: 'cn9-10', num: 7, label: 'CN IX & X (Post-olivary)', detail: 'Post-olivary sulcus of medulla -> jugular foramen', x: 246, y: 242, labelX: 292, labelY: 248 },
  { id: 'cn12', num: 8, label: 'Hypoglossal (CN XII)', detail: 'Pre-olivary sulcus between pyramid and olive', x: 148, y: 240, labelX: 64, labelY: 258 },
  { id: 'decussation', num: 9, label: 'Pyramidal Decussation', detail: '90% of corticospinal motor fibres cross in caudal medulla', x: 180, y: 298, labelX: 274, labelY: 304 },
];

const POSTERIOR_PINS: DiagramPin[] = [
  { id: 'colliculi', num: 1, label: 'Sup. & Inf. Colliculi', detail: 'Midbrain tectum: visual gaze (sup) & auditory relay (inf)', x: 196, y: 92, labelX: 292, labelY: 88 },
  { id: 'dorsal-iv', num: 2, label: 'Trochlear Nerve (CN IV)', detail: 'Exits dorsally below inferior colliculus, decussates', x: 114, y: 122, labelX: 64, labelY: 120 },
  { id: 'peduncles', num: 3, label: 'Middle Cerebellar Peduncle', detail: 'Largest cerebellar peduncle connecting pons to cerebellum', x: 264, y: 176, labelX: 292, labelY: 176 },
  { id: 'rhomboid', num: 4, label: 'Rhomboid Fossa (4th Ventricle)', detail: 'Houses facial colliculus (CN VI nucleus + VII loop) & striae', x: 180, y: 188, labelX: 64, labelY: 196 },
  { id: 'gracile', num: 5, label: 'Gracile & Cuneate Tubercles', detail: 'Dorsal column-medial lemniscus 2nd-order relay nuclei', x: 168, y: 276, labelX: 68, labelY: 282 },
];

const AXIAL_PINS: DiagramPin[] = [
  { id: 'mlf', num: 1, label: 'MLF (Gaze Pathway)', detail: 'Connects CN VI to contralateral CN III (lesion = INO)', x: 232, y: 84, labelX: 162, labelY: 38 },
  { id: 'cn6-nuc', num: 2, label: 'CN VI Nucleus & VII Loop', detail: 'Facial colliculus in dorsal pons; internal genu of CN VII', x: 264, y: 94, labelX: 306, labelY: 36 },
  { id: 'vestibular', num: 3, label: 'Vestibular Nuclei (VIII)', detail: 'Lateral floor of 4th ventricle; balance & VOR', x: 310, y: 82, labelX: 360, labelY: 74 },
  { id: 'spinal-v', num: 4, label: 'Spinal Trigeminal (CN V)', detail: 'Ipsilateral facial pain & temperature sensation', x: 324, y: 114, labelX: 362, labelY: 116 },
  { id: 'cst-pons', num: 5, label: 'Corticospinal Tracts', detail: 'Ventral basis pontis motor fascicles descending to pyramids', x: 276, y: 178, labelX: 354, labelY: 192 },
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
            <svg
              viewBox="-45 0 450 345"
              className="w-full max-w-[460px] h-auto select-none"
              role="img"
              aria-label="Anterior brainstem anatomy showing diencephalon, midbrain, pons, medulla, and cranial nerves II through XII"
            >
              <MedicalSvgDefs prefix="bsa" />
              {/* Diencephalon & Cerebral Hemisphere Base */}
              <path
                d="M 65 20 Q 115 8 180 12 Q 245 8 295 20 Q 302 58 260 68 Q 220 74 180 68 Q 140 74 100 68 Q 58 58 65 20 Z"
                fill="url(#bsa-brain-blush)"
                stroke="#D4B2B4"
                strokeWidth="1.2"
              />
              {/* Mammillary bodies */}
              <circle cx="171" cy="68" r="6" fill="#E8C6C8" stroke="#C59C9E" strokeWidth="1" />
              <circle cx="189" cy="68" r="6" fill="#E8C6C8" stroke="#C59C9E" strokeWidth="1" />

              {/* Midbrain Cerebral Peduncles (Sage Green - AMBOSS style) */}
              <path
                d="M 118 65 Q 134 94 142 122 L 218 122 Q 226 94 242 65 Q 208 75 180 72 Q 152 75 118 65 Z"
                fill="url(#bsa-midbrain-sage)"
                stroke="#6E9A74"
                strokeWidth="1.4"
              />
              {/* Vertical crus cerebri striations */}
              {[130, 138, 146, 154, 206, 214, 222, 230].map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1={72}
                  x2={x + (x < 180 ? 6 : -6)}
                  y2={116}
                  stroke="#7AA680"
                  strokeWidth="0.8"
                  strokeOpacity="0.65"
                />
              ))}
              {/* Interpeduncular fossa */}
              <path d="M 164 76 Q 180 106 196 76 Q 180 86 164 76 Z" fill="#A2C4A5" opacity="0.65" />

              {/* Weber's Lesion Highlight */}
              {syndrome === 'weber' && (
                <ellipse
                  cx="148"
                  cy="96"
                  rx="20"
                  ry="14"
                  fill="url(#bsa-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth="2"
                  filter="url(#bsa-glow-lesion)"
                />
              )}

              {/* Pons (Pearlescent Slate-Blue with transverse pontocerebellar striations) */}
              <path
                d="M 134 118 Q 180 112 226 118 Q 266 136 266 168 Q 262 198 222 204 Q 180 212 138 204 Q 98 198 94 168 Q 94 136 134 118 Z"
                fill="url(#bsa-pons-blue)"
                stroke="#859AA8"
                strokeWidth="1.5"
                filter="url(#bsa-soft-shadow)"
              />
              {/* Basilar sulcus & transverse fiber curves */}
              <line x1="180" y1="118" x2="180" y2="205" stroke="#9BB0BE" strokeWidth="1.8" opacity="0.6" />
              {[132, 144, 156, 168, 180, 192].map((y) => (
                <path
                  key={y}
                  d={`M 105 ${y} Q 145 ${y + 6} 180 ${y + 2} Q 215 ${y + 6} 255 ${y}`}
                  fill="none"
                  stroke="#94AAB7"
                  strokeWidth="0.75"
                  opacity="0.55"
                />
              ))}

              {syndrome === 'millard-gubler' && (
                <ellipse
                  cx="146"
                  cy="188"
                  rx="24"
                  ry="14"
                  fill="url(#bsa-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth="2"
                  filter="url(#bsa-glow-lesion)"
                />
              )}

              {/* Medulla Oblongata (Teal-Slate fading to ivory spinal cord) */}
              <path
                d="M 136 202 Q 180 210 224 202 Q 230 232 222 262 L 204 328 Q 180 334 156 328 L 138 262 Q 130 232 136 202 Z"
                fill="url(#bsa-medulla-teal)"
                stroke="#6D949E"
                strokeWidth="1.4"
              />
              {/* Anterior median fissure & Pyramids & Olives */}
              <line x1="180" y1="208" x2="180" y2="288" stroke="#5E828C" strokeWidth="1.4" />
              {/* Olives */}
              <ellipse cx="152" cy="235" rx="9" ry="18" fill="#89AEB8" stroke="#628A95" strokeWidth="1" />
              <ellipse cx="208" cy="235" rx="9" ry="18" fill="#89AEB8" stroke="#628A95" strokeWidth="1" />
              {/* Pyramidal decussation chevrons */}
              {[292, 298, 304].map((y) => (
                <path
                  key={y}
                  d={`M 173 ${y} L 180 ${y + 5} L 187 ${y}`}
                  fill="none"
                  stroke="#4E737D"
                  strokeWidth="1.4"
                />
              ))}

              {syndrome === 'wallenberg' && (
                <ellipse
                  cx="142"
                  cy="236"
                  rx="16"
                  ry="18"
                  fill="url(#bsa-lesion-hatch)"
                  stroke="#DC2626"
                  strokeWidth="2"
                  filter="url(#bsa-glow-lesion)"
                />
              )}

              {/* CRANIAL NERVES IN GOLDEN AMBER (AMBOSS palette) */}
              {/* Optic Chiasm & Tracts (CN II) */}
              <path
                d="M 122 40 Q 158 52 180 52 Q 202 52 238 40 L 240 48 Q 206 58 180 58 Q 154 58 120 48 Z"
                fill="url(#bsa-nerve-gold)"
                stroke="#A16207"
                strokeWidth="1"
              />
              <path d="M 155 55 Q 130 66 112 78" fill="none" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
              <path d="M 205 55 Q 230 66 248 78" fill="none" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />

              {/* CN III Oculomotor */}
              <path d="M 168 85 Q 155 94 146 102" fill="none" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
              <path d="M 192 85 Q 205 94 214 102" fill="none" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />

              {/* CN IV Trochlear wrapping from posterior */}
              <path d="M 124 104 Q 108 110 100 116" fill="none" stroke="#EAB308" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 236 104 Q 252 110 260 116" fill="none" stroke="#EAB308" strokeWidth="2.4" strokeLinecap="round" />

              {/* CN V Trigeminal (thick sensory + smaller motor) */}
              <path d="M 116 146 L 96 156" stroke="#EAB308" strokeWidth="6.5" strokeLinecap="round" />
              <path d="M 244 146 L 264 156" stroke="#EAB308" strokeWidth="6.5" strokeLinecap="round" />

              {/* CN VI Abducent */}
              <path d="M 164 202 Q 158 214 152 222" fill="none" stroke="#EAB308" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M 196 202 Q 202 214 208 222" fill="none" stroke="#EAB308" strokeWidth="2.8" strokeLinecap="round" />

              {/* CN VII & VIII at CPA */}
              <path d="M 122 194 L 92 204 M 120 199 L 90 212" stroke="#EAB308" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M 238 194 L 268 204 M 240 199 L 270 212" stroke="#EAB308" strokeWidth="2.8" strokeLinecap="round" />

              {/* CN XII Pre-olivary rootlets */}
              {[228, 234, 240].map((y) => (
                <React.Fragment key={y}>
                  <line x1="164" y1={y} x2="144" y2={y + 6} stroke="#EAB308" strokeWidth="1.8" />
                  <line x1="196" y1={y} x2="216" y2={y + 6} stroke="#EAB308" strokeWidth="1.8" />
                </React.Fragment>
              ))}

              {/* CN IX, X, XI Post-olivary rootlets */}
              {[224, 232, 240, 250, 260].map((y) => (
                <React.Fragment key={y}>
                  <line x1="138" y1={y} x2="112" y2={y + 8} stroke="#EAB308" strokeWidth="2" />
                  <line x1="222" y1={y} x2="248" y2={y + 8} stroke="#EAB308" strokeWidth="2" />
                </React.Fragment>
              ))}

              {/* Labels or Self-Test Pins */}
              {ANTERIOR_PINS.map((pin) => {
                const useStart = (pin.labelX ?? pin.x) > 190;
                return (
                  <PinOrLabel
                    key={pin.id}
                    pin={pin}
                    quizMode={quizMode}
                    isRevealed={revealedIds.includes(pin.id)}
                    onReveal={toggleReveal}
                    anchor={useStart ? 'start' : 'end'}
                    fontSize={8.2}
                  />
                );
              })}
            </svg>
          )}

          {view === 'posterior' && (
            <svg
              viewBox="-45 0 450 345"
              className="w-full max-w-[460px] h-auto select-none"
              role="img"
              aria-label="Posterior brainstem anatomy showing colliculi, trochlear nerve, cerebellar peduncles, and 4th ventricle floor"
            >
              <MedicalSvgDefs prefix="bsp" />
              {/* Thalami Pulvinar */}
              <path
                d="M 76 18 Q 125 10 172 34 L 180 62 L 188 34 Q 235 10 284 18 Q 290 64 242 74 L 118 74 Q 70 64 76 18 Z"
                fill="url(#bsp-brain-blush)"
                stroke="#D4B2B4"
                strokeWidth="1.2"
              />
              {/* Pineal gland */}
              <ellipse cx="180" cy="64" rx="8" ry="12" fill="#E3B3B5" stroke="#B68285" strokeWidth="1.2" />

              {/* Midbrain Tectum (Colliculi) */}
              <path
                d="M 128 70 L 232 70 L 238 122 L 122 122 Z"
                fill="url(#bsp-midbrain-sage)"
                stroke="#6E9A74"
                strokeWidth="1.3"
              />
              {/* 4 Colliculi */}
              <circle cx="163" cy="86" r="13" fill="#B6DBB8" stroke="#6E9A74" strokeWidth="1.2" />
              <circle cx="197" cy="86" r="13" fill="#B6DBB8" stroke="#6E9A74" strokeWidth="1.2" />
              <circle cx="164" cy="110" r="11" fill="#A9D2AC" stroke="#6E9A74" strokeWidth="1.2" />
              <circle cx="196" cy="110" r="11" fill="#A9D2AC" stroke="#6E9A74" strokeWidth="1.2" />

              {/* CN IV Trochlear emerging dorsally */}
              <path d="M 164 123 Q 135 128 112 122" fill="none" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
              <path d="M 196 123 Q 225 128 248 122" fill="none" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />

              {/* Cerebellar Peduncles & Rhomboid Fossa (Slate Blue) */}
              <path
                d="M 122 122 Q 84 148 80 182 Q 92 214 134 218 L 180 250 L 226 218 Q 268 214 280 182 Q 276 148 238 122 Z"
                fill="url(#bsp-pons-blue)"
                stroke="#859AA8"
                strokeWidth="1.4"
              />
              {/* Cut Cerebellar Peduncles */}
              <ellipse cx="106" cy="176" rx="22" ry="30" fill="#DDE6EC" stroke="#8CA1B0" strokeWidth="1.2" />
              <ellipse cx="254" cy="176" rx="22" ry="30" fill="#DDE6EC" stroke="#8CA1B0" strokeWidth="1.2" />

              {/* Rhomboid Fossa Diamond (Floor of 4th Ventricle) */}
              <path
                d="M 180 128 L 216 184 L 180 248 L 144 184 Z"
                fill="#E5ECEF"
                stroke="#7A94A3"
                strokeWidth="1.3"
              />
              <line x1="180" y1="128" x2="180" y2="248" stroke="#7A94A3" strokeWidth="1.2" />
              {/* Striae medullares */}
              <path d="M 148 184 Q 180 190 212 184" fill="none" stroke="#7A94A3" strokeWidth="1" />
              <path d="M 150 188 Q 180 194 210 188" fill="none" stroke="#7A94A3" strokeWidth="1" />

              {/* Dorsal Medulla & Gracile/Cuneate Tubercles */}
              <path
                d="M 136 218 L 180 250 L 224 218 L 218 282 L 204 330 L 156 330 L 142 282 Z"
                fill="url(#bsp-medulla-teal)"
                stroke="#6D949E"
                strokeWidth="1.4"
              />
              <line x1="180" y1="250" x2="180" y2="330" stroke="#5E828C" strokeWidth="1.4" />
              <line x1="168" y1="252" x2="168" y2="328" stroke="#6E949E" strokeWidth="0.9" />
              <line x1="192" y1="252" x2="192" y2="328" stroke="#6E949E" strokeWidth="0.9" />

              {POSTERIOR_PINS.map((pin) => {
                const useStart = (pin.labelX ?? pin.x) > 190;
                return (
                  <PinOrLabel
                    key={pin.id}
                    pin={pin}
                    quizMode={quizMode}
                    isRevealed={revealedIds.includes(pin.id)}
                    onReveal={toggleReveal}
                    anchor={useStart ? 'start' : 'end'}
                    fontSize={8.2}
                  />
                );
              })}
            </svg>
          )}

          {view === 'axial-pons' && (
            <svg
              viewBox="0 0 465 255"
              className="w-full max-w-[475px] h-auto select-none"
              role="img"
              aria-label="Axial pontine cross-section showing CN VI and VII nuclei, MLF, vestibular and trigeminal nuclei, and corticospinal tracts"
            >
              <MedicalSvgDefs prefix="bsx" />
              {/* Mini Locator Brainstem Inset (AMBOSS style from image_e4ae2a62.png) */}
              <g transform="translate(8, 12)">
                <rect x="0" y="0" width="92" height="190" rx="6" fill="#F8FAFB" stroke="#DCE3E8" />
                <path
                  d="M 28 24 L 64 24 L 62 54 Q 78 70 76 86 Q 74 102 60 108 L 54 174 L 38 174 L 32 108 Q 18 102 16 86 Q 14 70 30 54 Z"
                  fill="#E2E8F0"
                  stroke="#94A3B8"
                  strokeWidth="1.2"
                />
                {/* Translucent blue axial slice plane */}
                <polygon
                  points="8,88 84,88 76,104 16,104"
                  fill="#38BDF8"
                  fillOpacity="0.32"
                  stroke="#0284C7"
                  strokeWidth="1.2"
                />
                <text x="46" y="184" textAnchor="middle" className="fill-[#475569] text-[8px] font-mono">
                  Caudal Pons
                </text>
              </g>

              {/* Magnified Axial Pons Cross-Section */}
              <g transform="translate(10, 8)">
                <path
                  d="M 136 58 Q 190 78 240 82 Q 290 78 344 58 Q 366 108 346 158 Q 308 212 240 218 Q 172 212 134 158 Q 114 108 136 58 Z"
                  fill="url(#bsx-white-matter)"
                  stroke="#94A3B8"
                  strokeWidth="1.6"
                  filter="url(#bsx-soft-shadow)"
                />
                {/* Transverse Pontine Nuclei fibers texture */}
                <ellipse cx="188" cy="176" rx="44" ry="22" fill="#EAD7C6" opacity="0.65" />
                <ellipse cx="292" cy="176" rx="44" ry="22" fill="#EAD7C6" opacity="0.65" />

                {/* Corticospinal Motor Bundles (Basis Pontis) */}
                <ellipse cx="204" cy="178" rx="18" ry="11" fill="#4F46E5" fillOpacity="0.24" stroke="#4338CA" strokeWidth="1.3" />
                <ellipse cx="276" cy="178" rx="18" ry="11" fill="#4F46E5" fillOpacity="0.24" stroke="#4338CA" strokeWidth="1.3" />

                {/* MLF (Dorsal midline) */}
                <ellipse cx="232" cy="86" rx="4.5" ry="9" fill="#64748B" opacity="0.7" />
                <ellipse cx="248" cy="86" rx="4.5" ry="9" fill="#64748B" opacity="0.7" />

                {/* Motor CN VI Nuclei (Crimson) & CN VII Motor Nuclei (Amber) */}
                <circle cx="216" cy="96" r="10" fill="#DC2626" fillOpacity="0.82" />
                <circle cx="264" cy="96" r="10" fill="#DC2626" fillOpacity="0.82" />
                <ellipse cx="200" cy="128" rx="12" ry="9" fill="#F59E0B" fillOpacity="0.85" />
                <ellipse cx="280" cy="128" rx="12" ry="9" fill="#F59E0B" fillOpacity="0.85" />

                {/* Sensory Nuclei (Green: Vestibular + Spinal V) */}
                <ellipse cx="170" cy="82" rx="16" ry="9" fill="#16A34A" fillOpacity="0.78" />
                <ellipse cx="310" cy="82" rx="16" ry="9" fill="#16A34A" fillOpacity="0.78" />
                <ellipse cx="158" cy="112" rx="12" ry="10" fill="#4ADE80" fillOpacity="0.82" />
                <ellipse cx="322" cy="112" rx="12" ry="10" fill="#4ADE80" fillOpacity="0.82" />

                {/* Exiting CN VI (medial ventral) & CN VII (lateral CPA) golden nerves */}
                <path d="M 216 106 Q 222 155 224 224" fill="none" stroke="#EAB308" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M 264 106 Q 258 155 256 224" fill="none" stroke="#EAB308" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M 200 128 Q 214 92 195 104 L 136 168" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <path d="M 280 128 Q 266 92 285 104 L 344 168" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />

                {AXIAL_PINS.map((pin) => (
                  <PinOrLabel
                    key={pin.id}
                    pin={pin}
                    quizMode={quizMode}
                    isRevealed={revealedIds.includes(pin.id)}
                    onReveal={toggleReveal}
                    anchor={(pin.labelX ?? pin.x) < 220 ? 'end' : 'start'}
                    fontSize={8}
                  />
                ))}
              </g>
            </svg>
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
  { id: 'precentral', num: 1, label: 'Primary Motor Cortex (UMN)', detail: 'UMN Betz cell bodies arranged somatotopically (medial leg, lateral face/hand)', x: 228, y: 44, labelX: 288, labelY: 28 },
  { id: 'capsule', num: 2, label: 'Internal Capsule (Post. Limb)', detail: 'Dense UMN tract bundle; small lacunar infarct causes dense contralateral hemiparesis', x: 212, y: 94, labelX: 288, labelY: 96 },
  { id: 'pyramid', num: 3, label: 'Medullary Pyramids (90% Cross)', detail: '90% cross to Lateral CST; 10% descend ipsilaterally as Anterior CST', x: 186, y: 204, labelX: 112, labelY: 196 },
  { id: 'lmn', num: 4, label: 'Anterior Horn Cell (LMN)', detail: 'Synapse onto alpha motor neuron exiting ventral root -> skeletal muscle', x: 184, y: 282, labelX: 116, labelY: 294 },
];

const REFLEX_PINS: DiagramPin[] = [
  { id: 'drg', num: 1, label: 'Dorsal Root Ganglion (Ia)', detail: 'Pseudounipolar sensory neuron cell body from muscle spindle', x: 290, y: 46, labelX: 300, labelY: 24 },
  { id: 'ia-synapse', num: 2, label: 'Excitatory (+) Synapse', detail: 'Direct activation of extensor alpha-motor neuron -> muscle contraction', x: 212, y: 110, labelX: 294, labelY: 148 },
  { id: 'interneuron', num: 3, label: 'Inhibitory (−) Interneuron', detail: 'Reciprocal inhibition relaxes antagonist flexor muscle simultaneously', x: 196, y: 96, labelX: 108, labelY: 36 },
  { id: 'spindle', num: 4, label: 'Muscle Spindle (α–γ)', detail: 'Alpha-gamma coactivation keeps spindle taut during contraction', x: 80, y: 182, labelX: 148, labelY: 194 },
];

const CEREBELLUM_PINS: DiagramPin[] = [
  { id: 'vermis', num: 1, label: 'Vermis (Midline)', detail: 'Midline strip controlling trunk posture, gait, and limb synergy', x: 230, y: 58, labelX: 122, labelY: 42 },
  { id: 'primary-fissure', num: 2, label: 'Primary Fissure', detail: 'Separates Anterior Lobe from Posterior Lobe on superior surface', x: 240, y: 146, labelX: 298, labelY: 132 },
  { id: 'flocculonodular', num: 3, label: 'Flocculonodular Lobe', detail: 'Balance, equilibrium & vestibulo-ocular reflex control', x: 198, y: 214, labelX: 298, labelY: 236 },
  { id: 'peduncles', num: 4, label: 'Cerebellar Peduncles', detail: 'Middle carries pontocerebellar planning input; Superior carries major output', x: 68, y: 174, labelX: 68, labelY: 108 },
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
            <svg
              viewBox="0 0 420 325"
              className="w-full max-w-[460px] h-auto select-none"
              role="img"
              aria-label="Corticospinal pathway from coronal motor cortex through medullary pyramids to spinal cord lower motor neuron"
            >
              <MedicalSvgDefs prefix="cst" />
              {/* Mini Lateral Brain Orientation Inset */}
              <g transform="translate(14, 24)">
                <path
                  d="M 10 38 Q 10 12 42 10 Q 74 10 82 32 Q 84 48 64 54 Q 44 54 24 50 Q 12 48 10 38 Z"
                  fill="url(#cst-cortex-pink)"
                  stroke="#B87E7D"
                  strokeWidth="1.2"
                />
                <path d="M 52 50 Q 62 66 76 54 Q 68 48 52 50 Z" fill="#D9A1A0" stroke="#B87E7D" strokeWidth="1" />
                <line x1="46" y1="6" x2="36" y2="56" stroke="#0B3A45" strokeWidth="2" />
                <text x="46" y="70" textAnchor="middle" className="fill-[#475569] text-[8px] font-semibold">
                  Coronal Slice
                </text>
              </g>

              {/* Coronal Cerebral Hemispheres with Gyri/Sulci */}
              <path
                d="M 185 38 C 165 18 135 28 132 52 C 122 68 126 96 142 106 C 152 114 172 106 184 114 L 184 134 L 216 134 L 216 114 C 228 106 248 114 258 106 C 274 96 278 68 268 52 C 265 28 235 18 215 38 C 206 20 194 20 185 38 Z"
                fill="url(#cst-cortex-pink)"
                stroke="#B87E7D"
                strokeWidth="1.4"
                filter="url(#cst-soft-shadow)"
              />
              {/* Inner white matter + Lateral Ventricles + Thalami */}
              <path
                d="M 185 48 Q 160 36 146 60 Q 140 86 160 96 L 188 94 L 194 112 L 206 112 L 212 94 L 240 96 Q 260 86 254 60 Q 240 36 215 48 Z"
                fill="url(#cst-white-matter)"
              />
              <path d="M 186 72 Q 192 64 198 72 L 198 84 L 186 80 Z" fill="#FFFFFF" stroke="#C58E8C" strokeWidth="0.9" />
              <path d="M 214 72 Q 208 64 202 72 L 202 84 L 214 80 Z" fill="#FFFFFF" stroke="#C58E8C" strokeWidth="0.9" />

              {/* Brainstem Silhouette (Midbrain -> Pons -> Medulla) */}
              <path
                d="M 176 150 Q 200 156 224 150 Q 244 166 238 182 Q 220 192 214 204 L 210 242 L 190 242 L 186 204 Q 180 192 162 182 Q 156 166 176 150 Z"
                fill="url(#cst-gray-matter)"
                stroke="#A8706F"
                strokeWidth="1.3"
              />
              {/* Medullary midline */}
              <line x1="200" y1="188" x2="200" y2="240" stroke="#9F6564" strokeWidth="1" strokeDasharray="3 2" />

              {/* Spinal Cord Cross-Section at Bottom */}
              <g transform="translate(132, 250)">
                <ellipse cx="68" cy="30" rx="54" ry="26" fill="url(#cst-white-matter)" stroke="#9F7868" strokeWidth="1.3" />
                <path
                  d="M 46 14 Q 56 28 68 28 Q 80 28 90 14 Q 96 20 88 32 Q 96 44 88 50 Q 74 44 72 34 L 64 34 Q 62 44 48 50 Q 40 44 48 32 Q 40 20 46 14 Z"
                  fill="url(#cst-gray-matter)"
                  stroke="#9F6564"
                  strokeWidth="1"
                />
              </g>

              {/* UMN Axon Path (90% Crosses at Medullary Pyramids -> Lateral CST) */}
              <path
                d="M 228 44 Q 214 82 208 112 L 208 194 L 182 208 L 178 272 L 184 282"
                fill="none"
                stroke="#DC2626"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              {/* 10% Anterior CST (Uncrossed until cord) */}
              <path
                d="M 208 194 L 210 286 Q 196 292 184 282"
                fill="none"
                stroke="#EA580C"
                strokeWidth="1.8"
                strokeDasharray="4 2"
              />
              {/* LMN Axon Exiting Ventral Root */}
              <path
                d="M 184 282 L 122 292"
                fill="none"
                stroke="#0B3A45"
                strokeWidth="2.8"
                markerEnd="url(#cst-arrow-teal)"
              />
              <circle cx="228" cy="44" r="3.5" fill="#DC2626" />
              <circle cx="184" cy="282" r="3.5" fill="#0B3A45" />

              {/* Lesion Marker based on selection */}
              {cstLesion === 'cortex' && (
                <circle cx="228" cy="44" r="10" fill="url(#cst-lesion-hatch)" stroke="#DC2626" strokeWidth="2" />
              )}
              {cstLesion === 'capsule' && (
                <circle cx="212" cy="94" r="10" fill="url(#cst-lesion-hatch)" stroke="#DC2626" strokeWidth="2" />
              )}
              {cstLesion === 'cord' && (
                <circle cx="180" cy="272" r="10" fill="url(#cst-lesion-hatch)" stroke="#DC2626" strokeWidth="2" />
              )}

              {CST_PINS.map((pin) => (
                <PinOrLabel
                  key={pin.id}
                  pin={pin}
                  quizMode={quizMode}
                  isRevealed={revealedIds.includes(pin.id)}
                  onReveal={toggleReveal}
                  anchor={(pin.labelX ?? pin.x) < 200 ? 'end' : 'start'}
                  fontSize={8.2}
                />
              ))}
            </svg>
          )}

          {tab === 'reflex' && (
            <svg
              viewBox="0 0 420 275"
              className="w-full max-w-[460px] h-auto select-none"
              role="img"
              aria-label="Monosynaptic stretch reflex arc and alpha-gamma coactivation diagram"
            >
              <MedicalSvgDefs prefix="ref" />
              {/* Spinal Cord Cross-Section with DRG */}
              <ellipse cx="228" cy="86" rx="58" ry="38" fill="url(#ref-white-matter)" stroke="#9F7868" strokeWidth="1.5" />
              <path
                d="M 205 56 Q 218 80 228 80 Q 238 80 251 56 Q 260 66 250 86 Q 262 106 250 116 Q 235 110 233 93 L 223 93 Q 221 110 206 116 Q 194 106 206 86 Q 196 66 205 56 Z"
                fill="url(#ref-gray-matter)"
                stroke="#9F6564"
                strokeWidth="1.2"
              />
              {/* Dorsal Root + DRG */}
              <path d="M 252 60 Q 294 34 316 74" fill="none" stroke="url(#ref-drg-amber)" strokeWidth="9" strokeLinecap="round" />
              <ellipse cx="290" cy="46" rx="14" ry="8" fill="#FDE68A" stroke="#CA8A04" strokeWidth="1.2" transform="rotate(-15 290 46)" />
              {/* Ventral Root */}
              <path d="M 250 110 Q 292 126 316 88" fill="none" stroke="url(#ref-drg-amber)" strokeWidth="8" strokeLinecap="round" />

              {/* Left Dorsal/Ventral exit to Muscle */}
              <path d="M 204 60 Q 158 34 128 76" fill="none" stroke="url(#ref-drg-amber)" strokeWidth="9" strokeLinecap="round" />
              <ellipse cx="164" cy="46" rx="14" ry="8" fill="#FDE68A" stroke="#CA8A04" strokeWidth="1.2" transform="rotate(15 164 46)" />
              <path d="M 206 110 Q 158 124 128 84" fill="none" stroke="url(#ref-drg-amber)" strokeWidth="8" strokeLinecap="round" />

              {/* Muscle Belly (Extensor & Flexor) with Striations */}
              <g transform="translate(26, 152)">
                <path
                  d="M 10 20 Q 52 6 98 20 L 106 44 Q 52 58 4 44 Z"
                  fill="url(#ref-muscle-red)"
                  stroke="#991B1B"
                  strokeWidth="1.2"
                />
                {/* Muscle Spindle capsule */}
                <ellipse cx="55" cy="30" rx="22" ry="7" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.2" />
                <text x="55" y="68" textAnchor="middle" className="fill-[#475569] text-[8.5px] font-semibold">
                  Stretched Extensor + Spindle
                </text>
              </g>

              {/* Ia Sensory Neuron (Cyan) */}
              <path
                d="M 80 182 Q 80 86 130 76 Q 164 46 212 64 Q 218 90 210 108"
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.4"
              />
              {/* Alpha Motor Neuron (+) back to Extensor */}
              <path
                d="M 210 108 Q 168 118 128 86 Q 94 96 64 174"
                fill="none"
                stroke="#059669"
                strokeWidth="2.4"
                markerEnd="url(#ref-arrow-teal)"
              />
              {/* Excitatory (+) & Inhibitory (-) Badges */}
              <circle cx="212" cy="110" r="7" fill="#16A34A" />
              <text x="212" y="113" textAnchor="middle" className="fill-white text-[9px] font-bold">+</text>
              <circle cx="196" cy="96" r="7" fill="#DC2626" />
              <text x="196" y="99" textAnchor="middle" className="fill-white text-[9px] font-bold">−</text>

              {REFLEX_PINS.map((pin) => (
                <PinOrLabel
                  key={pin.id}
                  pin={pin}
                  quizMode={quizMode}
                  isRevealed={revealedIds.includes(pin.id)}
                  onReveal={toggleReveal}
                  anchor={(pin.labelX ?? pin.x) < 180 ? 'end' : 'start'}
                  fontSize={8.2}
                />
              ))}
            </svg>
          )}

          {tab === 'cerebellum' && (
            <svg
              viewBox="0 0 420 270"
              className="w-full max-w-[460px] h-auto select-none"
              role="img"
              aria-label="Cerebellar anatomy showing hemispheres, vermis, primary fissure, flocculonodular lobe, and cerebellar peduncles"
            >
              <MedicalSvgDefs prefix="cer" />
              {/* Anterior View (Top Right) */}
              <g transform="translate(154, 18)">
                <path
                  d="M 76 26 C 46 14 14 26 12 46 C 10 68 42 74 68 64 L 76 62 L 84 64 C 110 74 142 68 140 46 C 138 26 106 14 76 26 Z"
                  fill="url(#cer-gray-matter)"
                  stroke="#9F6564"
                  strokeWidth="1.4"
                />
                {/* Vermis midline */}
                <ellipse
                  cx="76"
                  cy="44"
                  rx="11"
                  ry="20"
                  fill={cerebellarZone === 'vermis' ? '#FDE68A' : '#E2B4B2'}
                  stroke="#9F6564"
                  strokeWidth="1.2"
                />
                {cerebellarZone === 'hemisphere' && (
                  <ellipse cx="40" cy="44" rx="22" ry="15" fill="url(#cer-lesion-hatch)" stroke="#DC2626" strokeWidth="1.8" />
                )}
                {/* Fine cerebellar folia */}
                {[28, 35, 42, 49, 56].map((y) => (
                  <path
                    key={y}
                    d={`M 20 ${y} Q 46 ${y - 3} 64 ${y} M 88 ${y} Q 106 ${y - 3} 132 ${y}`}
                    fill="none"
                    stroke="#A8706F"
                    strokeWidth="0.8"
                  />
                ))}
              </g>

              {/* Posterior Peduncles View (Bottom Left) */}
              <g transform="translate(20, 128)">
                <path
                  d="M 38 14 L 58 14 L 58 112 L 38 112 Z"
                  fill="url(#cer-pons-blue)"
                  stroke="#7A94A3"
                  strokeWidth="1.2"
                />
                <path
                  d="M 16 36 C 28 24 68 24 80 36 C 92 48 86 72 64 74 L 32 74 C 10 72 4 48 16 36 Z"
                  fill="url(#cer-gray-matter)"
                  stroke="#9F6564"
                  strokeWidth="1.2"
                />
                <text x="48" y="126" textAnchor="middle" className="fill-[#475569] text-[8.5px] font-semibold">
                  Sup / Mid / Inf Peduncles
                </text>
              </g>

              {/* Sagittal Lobes Cross-Section (Bottom Right) */}
              <g transform="translate(154, 122)">
                {/* Brainstem attachment */}
                <path d="M 10 18 Q 34 38 36 86 L 20 112 L 2 112 Z" fill="#F1C5C4" stroke="#B68285" strokeWidth="1.2" />
                {/* Cerebellum Sagittal Arbor Vitae */}
                <path
                  d="M 32 42 C 56 12 126 16 134 56 C 140 86 106 108 68 96 C 48 92 40 78 32 42 Z"
                  fill="url(#cer-cortex-pink)"
                  stroke="#9F6564"
                  strokeWidth="1.4"
                />
                {/* Primary fissure */}
                <path d="M 88 20 Q 72 46 54 58" fill="none" stroke="#0B3A45" strokeWidth="2" />
                {/* Flocculonodular lobe */}
                <ellipse
                  cx="44"
                  cy="92"
                  rx="14"
                  ry="8"
                  fill={cerebellarZone === 'flocculonodular' ? 'url(#cer-lesion-hatch)' : '#FDE68A'}
                  stroke="#CA8A04"
                  strokeWidth="1.3"
                />
              </g>

              {CEREBELLUM_PINS.map((pin) => (
                <PinOrLabel
                  key={pin.id}
                  pin={pin}
                  quizMode={quizMode}
                  isRevealed={revealedIds.includes(pin.id)}
                  onReveal={toggleReveal}
                  anchor={(pin.labelX ?? pin.x) < 150 ? 'end' : (pin.labelX ?? pin.x) > 260 ? 'start' : 'middle'}
                  fontSize={8.2}
                />
              ))}
            </svg>
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
