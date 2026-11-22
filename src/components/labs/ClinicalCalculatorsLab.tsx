import React, { useState } from 'react';
import { AlertTriangle, Calculator, FlaskConical } from 'lucide-react';
import {
  DiagramPin,
  DiagramStudyFrame,
  MedicalSvgDefs,
  PinOrLabel,
} from './DiagramPrimitives';

// ============================================================================
// 9. VENTRICULAR SYSTEM, CSF FLOW (OSMOSIS-INSPIRED) & CSF DIAGNOSTIC MATRIX
// ============================================================================
type CsfProfileId = 'normal' | 'bacterial' | 'viral' | 'tb' | 'fungal' | 'ms' | 'sah';

const CSF_PROFILES: Record<
  CsfProfileId,
  {
    id: CsfProfileId;
    label: string;
    appearance: string;
    pressure: string;
    cells: string;
    protein: string;
    glucose: string;
    special: string;
    action: string;
  }
> = {
  normal: {
    id: 'normal',
    label: 'Normal CSF',
    appearance: 'Crystal clear',
    pressure: '10–20 cm H2O',
    cells: '0–5 lymphocytes / uL',
    protein: '0.15–0.45 g/L',
    glucose: '>60% paired serum (>2.5 mmol/L)',
    special: 'Negative Gram stain, PCR & OCBs',
    action: 'Perform CT before LP if focal neurological signs, reduced GCS, seizures, or papilloedema.',
  },
  bacterial: {
    id: 'bacterial',
    label: 'Bacterial Meningitis',
    appearance: 'Turbid / purulent',
    pressure: 'Elevated (>20 cm H2O)',
    cells: '100–5,000+ Neutrophils / uL',
    protein: 'High (1–5 g/L)',
    glucose: 'Very Low (<40% serum)',
    special: 'Gram stain, CSF/blood culture, meningococcal PCR',
    action: 'Immediate IV Ceftriaxone (+ Amoxicillin if >55yr/immunocompromised) + IV Dexamethasone x 4d (~20% mortality).',
  },
  viral: {
    id: 'viral',
    label: 'Viral Meningitis / HSV',
    appearance: 'Clear',
    pressure: 'Normal or mildly raised',
    cells: '10–500 Lymphocytes / uL',
    protein: 'Normal to mildly high (<1 g/L)',
    glucose: 'Normal (>60% serum)',
    special: 'HSV-1/2 & Enterovirus PCR (MRI temporal lobe in HSV)',
    action: 'If altered awareness, confusion, or temporal seizures (HSV encephalitis), start IV Acyclovir immediately.',
  },
  tb: {
    id: 'tb',
    label: 'TB Meningitis',
    appearance: 'Clear or fibrin cobweb',
    pressure: 'Elevated',
    cells: '50–500 Lymphocytes / uL',
    protein: 'VERY High (1–6+ g/L)',
    glucose: 'VERY Low (<40% serum)',
    special: 'ZN stain low yield; TB culture ~60%; MRI basal meningeal enhancement',
    action: 'Start empirical RIPE quadruple anti-TB therapy + Dexamethasone urgently.',
  },
  fungal: {
    id: 'fungal',
    label: 'Cryptococcal',
    appearance: 'Clear',
    pressure: 'Markedly elevated (>30 cm)',
    cells: '20–300 Lymphocytes / uL',
    protein: 'High (0.5–3 g/L)',
    glucose: 'Low (<50% serum)',
    special: 'India ink (~50% sensitive) / Cryptococcal antigen (CrAg)',
    action: 'Seen in HIV/immunocompromised; treat with IV Amphotericin B + Flucytosine -> Fluconazole.',
  },
  ms: {
    id: 'ms',
    label: 'Multiple Sclerosis',
    appearance: 'Clear',
    pressure: 'Normal',
    cells: '0–50 Lymphocytes / uL',
    protein: 'Normal or mildly high (<0.8 g/L)',
    glucose: 'Normal',
    special: 'Oligoclonal IgG bands (OCBs) in CSF ABSENT in paired serum (~95%)',
    action: 'Confirms intrathecal IgG synthesis (dissemination in time). Exclude mimics.',
  },
  sah: {
    id: 'sah',
    label: 'SAH (CT-negative)',
    appearance: 'Blood-stained -> Xanthochromia',
    pressure: 'Elevated',
    cells: 'High RBCs (constant across sequential tubes)',
    protein: 'Mildly raised',
    glucose: 'Normal',
    special: 'Spectrophotometry for bilirubin/xanthochromia (LP >= 6–12h post-onset)',
    action: 'Urgent CTA/angiography -> coiling/clipping + oral Nimodipine + IV hydration.',
  },
};

const CSF_PINS: DiagramPin[] = [
  { id: 'granulations', num: 1, label: 'Arachnoid Granulations', detail: 'Absorb CSF from subarachnoid space into Superior Sagittal Sinus', x: 174, y: 31, labelX: 72, labelY: 18 },
  { id: 'choroid', num: 2, label: 'Choroid Plexus', detail: 'Modified ependymal cells secreting ~500 mL/day CSF', x: 182, y: 92, labelX: 36, labelY: 64 },
  { id: 'foramen-monro', num: 3, label: 'Foramen of Monro', detail: 'Connects lateral ventricles to midline 3rd ventricle', x: 204, y: 112, labelX: 298, labelY: 46 },
  { id: 'aqueduct', num: 4, label: 'Cerebral Aqueduct', detail: 'Narrow midbrain channel (commonest site of obstructive hydrocephalus)', x: 178, y: 144, labelX: 298, labelY: 112 },
  { id: 'fourth-vent', num: 5, label: '4th Ventricle & Cisterns', detail: 'Exits via median (Magendie) & lateral (Luschka) apertures to cisterns', x: 162, y: 174, labelX: 44, labelY: 222 },
];

export function CsfMatrixLab() {
  const [tab, setTab] = useState<'ventricles' | 'matrix'>('ventricles');
  const [hydrocephalus, setHydrocephalus] = useState<'normal' | 'obstructive'>('normal');
  const [profile, setProfile] = useState<CsfProfileId>('bacterial');
  const [quizMode, setQuizMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const spec = CSF_PROFILES[profile];

  const toggleReveal = (id: string) =>
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <DiagramStudyFrame
      title="Ventricular System, CSF Circulation Atlas & Diagnostic LP Matrix"
      subtitle="Midsagittal Brain & Cisterns (Osmosis Reference) + Lumbar Puncture Interpretation Analyzer"
      icon={<FlaskConical className="w-4 h-4 text-[#0B3A45]" />}
      pins={tab === 'ventricles' ? CSF_PINS : undefined}
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
          <button
            type="button"
            onClick={() => setTab('ventricles')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-xs whitespace-nowrap ${
              tab === 'ventricles'
                ? 'bg-[#126D7C] text-white'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            CSF Flow &amp; Ventricles
          </button>
          <button
            type="button"
            onClick={() => setTab('matrix')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-xs whitespace-nowrap ${
              tab === 'matrix'
                ? 'bg-[#126D7C] text-white'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            LP Diagnostic Matrix
          </button>
        </div>
      }
    >
      {tab === 'ventricles' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-4 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3E8] flex items-center justify-center">
            <svg
              viewBox="-75 0 485 255"
              className="w-full max-w-[480px] h-auto select-none"
              role="img"
              aria-label="Midsagittal skull and brain showing lateral, 3rd, and 4th ventricles, cerebral aqueduct, choroid plexus, arachnoid granulations, and CSF circulation"
            >
              <MedicalSvgDefs prefix="csf" />
              {/* Outer Skull Calvarium */}
              <path
                d="M 46 140 C 32 76 86 18 178 16 C 272 16 334 62 330 132 C 326 168 296 178 274 176 L 266 196 L 234 196 L 222 178 L 194 238 L 136 238 L 138 206 C 98 204 58 182 46 140 Z"
                fill="url(#csf-skull-bone)"
                stroke="#B8A37E"
                strokeWidth="1.6"
              />
              {/* Dural Venous Sinus (Superior Sagittal Sinus - Indigo) */}
              <path
                d="M 56 134 C 46 78 96 28 178 26 C 260 26 318 68 318 128 C 316 144 304 156 286 158 L 284 146 C 300 144 304 132 304 126 C 304 74 250 38 178 38 C 106 38 60 84 68 134 Z"
                fill="url(#csf-venous-sinus)"
                stroke="#4F46E5"
                strokeWidth="1"
              />
              {/* Subarachnoid Space (Aqua CSF envelope) */}
              <path
                d="M 64 134 C 58 84 102 36 178 36 C 254 36 306 74 306 128 C 306 148 286 162 254 166 L 196 188 L 186 236 L 146 236 L 146 192 C 102 192 70 168 64 134 Z"
                fill="url(#csf-csf-aqua)"
              />
              {/* Arachnoid Granulations protruding into SSS */}
              {[136, 174, 214, 248].map((x) => (
                <circle key={x} cx={x} cy="33" r="4.5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1" />
              ))}

              {/* Cerebral Cortex Midsagittal Section + Gyri */}
              <path
                d="M 76 132 C 72 88 112 44 178 44 C 248 44 294 80 294 126 C 294 144 268 156 236 154 L 210 144 L 146 144 L 116 152 C 92 152 78 144 76 132 Z"
                fill="url(#csf-cortex-pink)"
                stroke="#B87E7D"
                strokeWidth="1.4"
              />
              {/* Corpus Callosum Arch */}
              <path
                d="M 122 108 Q 168 68 238 96 Q 244 106 232 108 Q 172 84 130 112 Z"
                fill="url(#csf-white-matter)"
                stroke="#C58E8C"
                strokeWidth="1.2"
              />
              {/* Cerebellum & Brainstem */}
              <path
                d="M 88 154 C 76 172 96 202 134 198 C 148 196 156 180 152 158 Z"
                fill="url(#csf-gray-matter)"
                stroke="#9F6564"
                strokeWidth="1.2"
              />
              <path
                d="M 152 136 L 186 136 Q 198 156 184 176 L 176 236 L 154 236 L 156 186 Q 146 160 152 136 Z"
                fill="#F4D7D6"
                stroke="#B68285"
                strokeWidth="1.2"
              />

              {/* Ventricular System (Lateral + 3rd + Aqueduct + 4th) */}
              <path
                d={
                  hydrocephalus === 'obstructive'
                    ? 'M 130 106 Q 172 78 232 100 Q 214 124 196 124 L 182 140 L 176 144'
                    : 'M 136 106 Q 172 86 226 102 Q 210 118 196 118 L 182 138 L 166 168 L 160 194'
                }
                fill="none"
                stroke="#0284C7"
                strokeWidth={hydrocephalus === 'obstructive' ? '12' : '7'}
                strokeLinecap="round"
                opacity="0.78"
              />
              {/* Choroid Plexus in Lateral Ventricle */}
              <path
                d="M 152 98 Q 174 88 202 96"
                fill="none"
                stroke="#DC2626"
                strokeWidth="3.5"
                strokeDasharray="3 2"
              />

              {/* Aqueductal Stenosis Blockade Marker */}
              {hydrocephalus === 'obstructive' && (
                <g>
                  <circle cx="177" cy="144" r="7" fill="#DC2626" />
                  <line x1="173" y1="140" x2="181" y2="148" stroke="#FFFFFF" strokeWidth="2" />
                  <line x1="181" y1="140" x2="173" y2="148" stroke="#FFFFFF" strokeWidth="2" />
                </g>
              )}

              {/* CSF Flow Arrows */}
              <path d="M 164 196 Q 158 214 156 230" fill="none" stroke="#0B3A45" strokeWidth="1.5" markerEnd="url(#csf-arrow-teal)" />
              <path d="M 116 48 Q 146 38 170 38" fill="none" stroke="#0B3A45" strokeWidth="1.5" markerEnd="url(#csf-arrow-teal)" />

              {/* Choroid Plexus Zoom Inset (Osmosis style Fig 4C) */}
              <g transform="translate(292, 168)">
                <rect x="0" y="0" width="80" height="72" rx="4" fill="#E0F2FE" stroke="#64748B" strokeWidth="1.2" />
                <path d="M 8 56 Q 22 14 34 44 Q 46 14 58 44 Q 68 18 74 56" fill="#FCA5A5" stroke="#B91C1C" strokeWidth="1.6" />
                <text x="40" y="66" textAnchor="middle" className="fill-[#0B3A45] text-[7.5px] font-bold">
                  Choroid Ependyma
                </text>
              </g>

              {CSF_PINS.map((pin) => (
                <PinOrLabel
                  key={pin.id}
                  pin={pin}
                  quizMode={quizMode}
                  isRevealed={revealedIds.includes(pin.id)}
                  onReveal={toggleReveal}
                  anchor={(pin.labelX ?? pin.x) > 190 ? 'start' : 'end'}
                  fontSize={7.8}
                />
              ))}
            </svg>
          </div>

          <div className="lg:col-span-5 p-4 bg-[#FAFCFD] space-y-3 text-xs">
            <div className="text-[11px] font-mono uppercase text-[#64748B]">
              CSF Dynamics &amp; Hydrocephalus Simulator
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setHydrocephalus('normal')}
                className={`px-2.5 py-1.5 rounded border font-semibold ${
                  hydrocephalus === 'normal'
                    ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                    : 'bg-white text-[#334155] border-[#DCE3E8]'
                }`}
              >
                Normal Flow
              </button>
              <button
                type="button"
                onClick={() => setHydrocephalus('obstructive')}
                className={`px-2.5 py-1.5 rounded border font-semibold ${
                  hydrocephalus === 'obstructive'
                    ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                    : 'bg-white text-[#334155] border-[#DCE3E8]'
                }`}
              >
                Aqueduct Stenosis
              </button>
            </div>
            <div className="p-3 rounded bg-white border border-[#DCE3E8] space-y-1.5">
              <div className="font-bold text-[#0F172A]">
                {hydrocephalus === 'normal'
                  ? 'Normal CSF Circulation (~150 mL volume; ~500 mL/day)'
                  : 'Non-Communicating (Obstructive) Hydrocephalus'}
              </div>
              <p className="text-[#334155] leading-relaxed">
                {hydrocephalus === 'normal'
                  ? 'Choroid plexus secretes CSF in lateral -> 3rd -> cerebral aqueduct -> 4th ventricle -> apertures of Magendie & Luschka -> subarachnoid cisterns -> arachnoid granulations into Superior Sagittal Sinus.'
                  : 'Blockage at the cerebral aqueduct dilates the lateral & 3rd ventricles while sparing the 4th ventricle. NEVER perform lumbar puncture in obstructive hydrocephalus — risk of fatal tonsillar coning!'}
              </p>
            </div>
            <div className="p-2.5 rounded bg-[#F1F5F8] border border-[#DCE3E8]">
              <span className="font-semibold text-[#0B3A45]">LP Rule: </span>
              Always insert needle at L3/L4 or L4/L5 below the conus medullaris (ends at L1 in adults).
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-[#DCE3E8] flex flex-wrap gap-1.5 bg-white">
            {(Object.keys(CSF_PROFILES) as CsfProfileId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setProfile(id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded border ${
                  profile === id
                    ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                    : 'bg-white text-[#334155] border-[#CBD5E1] hover:border-[#0B3A45]'
                }`}
              >
                {CSF_PROFILES[id].label}
              </button>
            ))}
          </div>

          <div className="p-4 space-y-3 text-xs bg-[#FAFCFD]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                ['Appearance', spec.appearance],
                ['Opening Pressure', spec.pressure],
                ['WBC / RBC Count', spec.cells],
                ['CSF Protein', spec.protein],
                ['CSF : Serum Glucose', spec.glucose],
                ['Special Diagnostics', spec.special],
              ].map(([k, v]) => (
                <div key={k} className="p-2.5 rounded bg-white border border-[#DCE3E8]">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">
                    {k}
                  </div>
                  <div className="font-semibold text-[#0F172A] mt-0.5 tabular-nums">{v}</div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded bg-[#ECFDF5] border border-[#6EE7B7] text-[#064E3B] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Immediate Clinical Action: </span>
                {spec.action}
              </div>
            </div>
          </div>
        </>
      )}
    </DiagramStudyFrame>
  );
}

// ============================================================================
// 10. GLASGOW COMA SCALE (GCS), PUPIL GAUGE & REFLEX CALCULATOR
// ============================================================================
export function GcsAndReflexLab() {
  const [eye, setEye] = useState(4);
  const [verbal, setVerbal] = useState(5);
  const [motor, setMotor] = useState(6);
  const total = eye + verbal + motor;
  const isComa = total <= 8;

  return (
    <DiagramStudyFrame
      title="Glasgow Coma Scale (GCS), Pupil Gauge & Deep Tendon Reflex Calculator"
      subtitle="Quantitative Consciousness Scoring (E4 V5 M6) · Coma Threshold <= 8 · Myotome Reflex Roots"
      icon={<Calculator className="w-4 h-4 text-[#0B3A45]" />}
      headerActions={
        <div className="font-mono text-xs font-bold tabular-nums px-2.5 py-1 rounded border border-[#CBD5E1] bg-white text-[#0B3A45]">
          GCS {total} / 15 (E{eye} V{verbal} M{motor})
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-4 space-y-3 text-xs border-b lg:border-b-0 lg:border-r border-[#DCE3E8] bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-[#0F172A] mb-1.5">
                Eye Opening (E1–4)
              </label>
              <div className="space-y-1">
                {[
                  [4, '4 — Spontaneous'],
                  [3, '3 — To speech'],
                  [2, '2 — To pain'],
                  [1, '1 — None'],
                ].map(([val, lbl]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setEye(Number(val))}
                    className={`w-full text-left px-2.5 py-1.5 rounded border font-medium ${
                      eye === val
                        ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                        : 'bg-[#F8FAFC] text-[#334155] border-[#DCE3E8]'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#0F172A] mb-1.5">
                Verbal Response (V1–5)
              </label>
              <div className="space-y-1">
                {[
                  [5, '5 — Oriented'],
                  [4, '4 — Confused'],
                  [3, '3 — Inappropriate words'],
                  [2, '2 — Incomprehensible'],
                  [1, '1 — None'],
                ].map(([val, lbl]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setVerbal(Number(val))}
                    className={`w-full text-left px-2.5 py-1.5 rounded border font-medium ${
                      verbal === val
                        ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                        : 'bg-[#F8FAFC] text-[#334155] border-[#DCE3E8]'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#0F172A] mb-1.5">
                Motor Response (M1–6)
              </label>
              <div className="space-y-1">
                {[
                  [6, '6 — Obeys commands'],
                  [5, '5 — Localises pain'],
                  [4, '4 — Normal flexion'],
                  [3, '3 — Abnormal flexion'],
                  [2, '2 — Extension'],
                  [1, '1 — None'],
                ].map(([val, lbl]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setMotor(Number(val))}
                    className={`w-full text-left px-2.5 py-1.5 rounded border font-medium ${
                      motor === val
                        ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                        : 'bg-[#F8FAFC] text-[#334155] border-[#DCE3E8]'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`p-3 rounded border ${
              isComa
                ? 'bg-[#FEF2F2] border-[#FCA5A5] text-[#7F1D1D]'
                : 'bg-[#F4F7F9] border-[#DCE3E8] text-[#1E293B]'
            }`}
          >
            <span className="font-semibold">
              {isComa ? 'ALERT — Coma Threshold (GCS <= 8): ' : 'Consciousness State: '}
            </span>
            {isComa
              ? 'Airway protection impaired; urgent ABCDE, consider intubation, check bedside glucose, ABG, paracetamol screen, pupils (pinpoint opiate/pontine vs blown CN III), and urgent CT head.'
              : 'Above coma threshold (>=9). Always document E/V/M subscores individually — never use ambiguous terms like "obtunded" or "stuporose".'}
          </div>
        </div>

        <div className="lg:col-span-5 p-4 bg-[#FAFCFD] text-xs space-y-3">
          <div className="font-semibold text-[#0F172A]">Deep Tendon Reflex Root Quick Check</div>
          <div className="border border-[#D7DFE5] rounded overflow-hidden bg-white divide-y divide-[#E5EBF0]">
            {[
              ['Biceps Jerk', 'C5 (C6)', 'Musculocutaneous n.'],
              ['Supinator Jerk', 'C6', 'Radial n.'],
              ['Triceps Jerk', 'C7', 'Radial n.'],
              ['Knee Jerk', 'L3 / L4', 'Femoral n.'],
              ['Ankle Jerk', 'S1', 'Tibial n.'],
            ].map(([name, root, nerve]) => (
              <div key={name} className="px-3 py-2 flex items-center justify-between">
                <span className="font-medium text-[#0F172A]">{name}</span>
                <span className="font-mono text-[#0B3A45] font-semibold">
                  {root} · {nerve}
                </span>
              </div>
            ))}
          </div>

          {/* Pupil Differential Strip */}
          <div className="p-2.5 rounded bg-white border border-[#DCE3E8]">
            <div className="font-semibold text-[#0F172A] mb-2">Bedside Coma Pupil Gauge</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'Pinpoint (1mm)', sub: 'Opioids / Pons', r: 3 },
                { label: 'Reactive (3.5mm)', sub: 'Metabolic / Normal', r: 6 },
                { label: 'Blown (7mm)', sub: 'Uncal Herniation', r: 10 },
              ].map((p) => (
                <div key={p.label} className="p-1.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                  <svg viewBox="0 0 36 28" className="w-9 h-7 mx-auto">
                    <ellipse cx="18" cy="14" rx="16" ry="11" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.2" />
                    <circle cx="18" cy="14" r={p.r} fill="#0F172A" />
                  </svg>
                  <div className="font-semibold text-[10px] text-[#0F172A] mt-0.5">{p.label}</div>
                  <div className="text-[9.5px] text-[#64748B]">{p.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DiagramStudyFrame>
  );
}
