import React, { useState } from 'react';
import { AlertTriangle, Calculator, FlaskConical } from 'lucide-react';
import {
  AnnotatedPlate,
  DiagramPin,
  DiagramStudyFrame,
  PinOrLabel,
} from './DiagramPrimitives';
import csfVentriclesImg from '../../assets/images/csf_ventricles_sagittal_1795394579691.jpg';

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
  { id: 'granulations', num: 1, label: 'Arachnoid Granulations', detail: 'Absorb CSF from subarachnoid space into Superior Sagittal Sinus', x: 825, y: 192, labelX: 875, labelY: 92 },
  { id: 'choroid', num: 2, label: 'Choroid Plexus', detail: 'Modified ependymal cells secreting ~500 mL/day CSF', x: 642, y: 342, labelX: 910, labelY: 222 },
  { id: 'foramen-monro', num: 3, label: 'Foramen of Monro', detail: 'Connects lateral ventricles to midline 3rd ventricle', x: 556, y: 432, labelX: 912, labelY: 360 },
  { id: 'aqueduct', num: 4, label: 'Cerebral Aqueduct', detail: 'Narrow midbrain channel (commonest site of obstructive hydrocephalus)', x: 662, y: 514, labelX: 905, labelY: 508 },
  { id: 'fourth-vent', num: 5, label: '4th Ventricle & Cisterns', detail: 'Exits via median (Magendie) & lateral (Luschka) apertures to cisterns', x: 664, y: 588, labelX: 875, labelY: 685 },
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
            <AnnotatedPlate
              src={csfVentriclesImg}
              alt="Midsagittal skull and brain showing lateral, 3rd, and 4th ventricles, cerebral aqueduct, choroid plexus, arachnoid granulations, and CSF circulation"
              width={1200}
              height={896}
              maxWidthClass="max-w-[500px]"
            >
              {/* Obstructive Hydrocephalus Halo + Aqueductal Stenosis Blockade Marker */}
              {hydrocephalus === 'obstructive' && (
                <g>
                  <path
                    d="M 520 355 Q 645 275 795 395 Q 725 465 565 445 Z"
                    fill="#0284C7"
                    fillOpacity={0.32}
                    stroke="#DC2626"
                    strokeWidth={5}
                    strokeDasharray="10 6"
                  />
                  <circle cx={662} cy={514} r={24} fill="#DC2626" stroke="#FFFFFF" strokeWidth={4} />
                  <line x1={649} y1={501} x2={675} y2={527} stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" />
                  <line x1={675} y1={501} x2={649} y2={527} stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" />
                </g>
              )}

              {CSF_PINS.map((pin) => (
                <PinOrLabel
                  key={pin.id}
                  pin={pin}
                  quizMode={quizMode}
                  isRevealed={revealedIds.includes(pin.id)}
                  onReveal={toggleReveal}
                  anchor="start"
                  fontSize={22}
                  pinRadius={20}
                />
              ))}
            </AnnotatedPlate>
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
