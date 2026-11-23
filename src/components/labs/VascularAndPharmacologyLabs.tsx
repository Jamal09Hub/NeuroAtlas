import React, { useState } from 'react';
import { Activity, Pill, Zap } from 'lucide-react';
import {
  AnnotatedPlate,
  DiagramPin,
  DiagramStudyFrame,
  MedicalSvgDefs,
  PinOrLabel,
} from './DiagramPrimitives';
import circleOfWillisImg from '../../assets/images/circle_of_willis_1795394579183.jpg';
import dopamineBbbImg from '../../assets/images/dopamine_bbb_synapse_1795394580179.jpg';
import nmjPlateImg from '../../assets/images/neuromuscular_junction_plate_1795394579601.jpg';

// ============================================================================
// 6. CIRCLE OF WILLIS & CORTICAL VASCULAR TERRITORY EXPLORER
// ============================================================================
type VascularTerritory = 'mca' | 'aca' | 'pca' | 'lacunar' | 'sah-aneurysm';

const VASCULAR_TERRITORIES: Record<
  VascularTerritory,
  {
    id: VascularTerritory;
    label: string;
    circulation: string;
    clinical: string;
    management: string;
  }
> = {
  mca: {
    id: 'mca',
    label: 'Middle Cerebral Artery (MCA)',
    circulation: 'Anterior Circulation (~50% of strokes)',
    clinical:
      'Contralateral hemiparesis & sensory loss (face + arm > leg), contralateral homonymous hemianopia, Broca/Wernicke aphasia (dominant) or visuospatial neglect (non-dominant).',
    management:
      'Urgent CT head (exclude ICH/mimic). <=4.5h -> IV Alteplase + CTA for mechanical thrombectomy. >4.5h -> 300 mg aspirin x 2wk + stroke unit + >70% ICA CEA.',
  },
  aca: {
    id: 'aca',
    label: 'Anterior Cerebral Artery (ACA)',
    circulation: 'Anterior Circulation (Medial Strip)',
    clinical:
      'Contralateral leg & foot weakness > arm/face (medial motor homunculus), abulia / frontal lobe apathy, urinary incontinence.',
    management:
      'Reperfusion protocol if <=4.5h; note bilateral medial ACA/parasagittal falx meningioma mimics spinal cord paraparesis.',
  },
  pca: {
    id: 'pca',
    label: 'Vertebrobasilar & PCA',
    circulation: 'Posterior Circulation (~25% of strokes)',
    clinical:
      'Contralateral homonymous hemianopia (macular sparing), cortical blindness (bilateral PCA with intact pupils), vertigo, diplopia, ataxia, crossed CN signs, tetraparesis.',
    management:
      'CT/MRI posterior fossa (MRI superior for brainstem), dysphagia screen before oral intake, evaluate vertebral dissection.',
  },
  lacunar: {
    id: 'lacunar',
    label: 'Deep Perforators (Lacunar)',
    circulation: 'Small-Vessel Lipohyalinosis (~25% of strokes)',
    clinical:
      '4 classic syndromes WITH NO CORTICAL SIGNS (no aphasia/hemianopia): Pure motor hemiparesis, Pure sensory, Sensorimotor, Ataxic hemiparesis.',
    management:
      'Hypertension control (ACEi + thiazide-like diuretic), antiplatelet (clopidogrel), statin, diabetes control.',
  },
  'sah-aneurysm': {
    id: 'sah-aneurysm',
    label: 'Berry Aneurysm (SAH)',
    circulation: 'ACom / PCom / MCA Bifurcation (~85% SAH)',
    clinical:
      'Sudden thunderclap headache peaking within seconds, vomiting, neck stiffness, +/- painful pupil-involving CN III palsy (PCom aneurysm).',
    management:
      'Urgent CT head; if negative -> LP >=6–12h for spectrophotometry (xanthochromia). Oral Nimodipine + IV fluids + endovascular coiling/clipping.',
  },
};

const COW_PINS: DiagramPin[] = [
  { id: 'aca-pin', num: 1, label: 'ACA & ACom', detail: 'Medial hemisphere (leg > arm); ACom is #1 site of Berry aneurysm', x: 345, y: 248, labelX: 162, labelY: 92 },
  { id: 'mca-pin', num: 2, label: 'MCA (M1/M2)', detail: 'Lateral convexity (face/arm/speech); gives deep lenticulostriate perforators', x: 205, y: 295, labelX: 136, labelY: 274 },
  { id: 'pcom-pin', num: 3, label: 'PCom & ICA', detail: 'PCom aneurysm compresses CN III (painful blown pupil)', x: 306, y: 352, labelX: 146, labelY: 428 },
  { id: 'pca-pin', num: 4, label: 'Basilar & PCA', detail: 'Posterior circulation supplying brainstem, cerebellum & occipital lobe', x: 345, y: 468, labelX: 160, labelY: 595 },
];

export function StrokeVascularLab() {
  const [selected, setSelected] = useState<VascularTerritory>('mca');
  const [quizMode, setQuizMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const spec = VASCULAR_TERRITORIES[selected];

  const toggleReveal = (id: string) =>
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <DiagramStudyFrame
      title="Circle of Willis, Deep Perforators & Cortical Vascular Territory Atlas"
      subtitle="Ventral Brain Arterial Anastomoses + Lateral Cerebral Cortex Territory Map"
      icon={<Activity className="w-4 h-4 text-[#B91C1C]" />}
      pins={COW_PINS}
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
          {(Object.keys(VASCULAR_TERRITORIES) as VascularTerritory[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelected(t)}
              className={`px-2 py-1 rounded border text-[11px] font-semibold ${
                selected === t
                  ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                  : 'bg-white text-[#334155] border-[#CBD5E1] hover:border-[#B91C1C]'
              }`}
            >
              {VASCULAR_TERRITORIES[t].label.split(' (')[0]}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-4 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3E8] flex flex-col items-center justify-center">
          <AnnotatedPlate
            src={circleOfWillisImg}
            alt="Anatomical Circle of Willis overlying ventral brain base paired with lateral cerebral cortex vascular territories"
            width={1376}
            height={768}
            maxWidthClass="max-w-[540px]"
          >
            {/* Active Arterial / Territory Highlight Rings */}
            {selected === 'aca' && (
              <>
                <circle cx={345} cy={235} r={58} fill="#FACC15" fillOpacity={0.28} stroke="#CA8A04" strokeWidth={5} />
                <ellipse
                  cx={910}
                  cy={245}
                  rx={165}
                  ry={95}
                  transform="rotate(-14 910 245)"
                  fill="#FACC15"
                  fillOpacity={0.24}
                  stroke="#CA8A04"
                  strokeWidth={5}
                  className="cursor-pointer"
                />
              </>
            )}
            {selected === 'mca' && (
              <>
                <circle cx={205} cy={295} r={58} fill="#EF4444" fillOpacity={0.26} stroke="#DC2626" strokeWidth={5} />
                <ellipse
                  cx={1045}
                  cy={355}
                  rx={165}
                  ry={115}
                  transform="rotate(-18 1045 355)"
                  fill="#EF4444"
                  fillOpacity={0.22}
                  stroke="#DC2626"
                  strokeWidth={5}
                  className="cursor-pointer"
                />
              </>
            )}
            {selected === 'pca' && (
              <>
                <ellipse cx={345} cy={465} rx={78} ry={96} fill="#0284C7" fillOpacity={0.24} stroke="#0369A1" strokeWidth={5} />
                <ellipse
                  cx={1220}
                  cy={415}
                  rx={88}
                  ry={108}
                  transform="rotate(14 1220 415)"
                  fill="#0284C7"
                  fillOpacity={0.24}
                  stroke="#0369A1"
                  strokeWidth={5}
                  className="cursor-pointer"
                />
              </>
            )}
            {selected === 'lacunar' && (
              <ellipse cx={250} cy={298} rx={44} ry={34} fill="#D97706" fillOpacity={0.32} stroke="#B45309" strokeWidth={5} />
            )}

            {/* Clickable Lateral Cortical Territory Hotspots */}
            <ellipse
              cx={905}
              cy={245}
              rx={155}
              ry={85}
              transform="rotate(-14 905 245)"
              fill="transparent"
              className="cursor-pointer"
              onClick={() => setSelected('aca')}
            />
            <ellipse
              cx={1045}
              cy={355}
              rx={160}
              ry={105}
              transform="rotate(-18 1045 355)"
              fill="transparent"
              className="cursor-pointer"
              onClick={() => setSelected('mca')}
            />
            <ellipse
              cx={1215}
              cy={415}
              rx={82}
              ry={100}
              transform="rotate(14 1215 415)"
              fill="transparent"
              className="cursor-pointer"
              onClick={() => setSelected('pca')}
            />

            {/* Saccular Berry Aneurysm Clickable Hotspots */}
            {[
              { x: 345, y: 248, lbl: 'ACom' },
              { x: 306, y: 352, lbl: 'PCom' },
              { x: 256, y: 288, lbl: 'MCA' },
            ].map((a) => (
              <circle
                key={a.lbl}
                cx={a.x}
                cy={a.y}
                r={selected === 'sah-aneurysm' ? 20 : 14}
                fill={selected === 'sah-aneurysm' ? '#F59E0B' : '#FEF3C7'}
                fillOpacity={0.92}
                stroke="#B45309"
                strokeWidth={4}
                className="cursor-pointer"
                onClick={() => setSelected('sah-aneurysm')}
              />
            ))}

            {/* Right Panel Territory Legend */}
            <g transform="translate(748, 692)">
              <rect x={0} y={0} width={22} height={22} rx={4} fill="#FACC15" stroke="#CA8A04" strokeWidth={2} />
              <text x={32} y={19} className="fill-[#334155] text-[24px] font-semibold">
                ACA (Leg)
              </text>
              <rect x={185} y={0} width={22} height={22} rx={4} fill="#EF4444" stroke="#B91C1C" strokeWidth={2} />
              <text x={217} y={19} className="fill-[#334155] text-[24px] font-semibold">
                MCA (Face/Arm)
              </text>
              <rect x={428} y={0} width={22} height={22} rx={4} fill="#0284C7" stroke="#0369A1" strokeWidth={2} />
              <text x={460} y={19} className="fill-[#334155] text-[24px] font-semibold">
                PCA
              </text>
            </g>

            {COW_PINS.map((pin) => (
              <PinOrLabel
                key={pin.id}
                pin={pin}
                quizMode={quizMode}
                isRevealed={revealedIds.includes(pin.id)}
                onReveal={toggleReveal}
                anchor="end"
                fontSize={24}
                pinRadius={22}
              />
            ))}
          </AnnotatedPlate>
        </div>

        <div className="lg:col-span-5 p-4 bg-[#FAFCFD] space-y-3 text-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
            {spec.circulation}
          </div>
          <div className="p-3 rounded bg-white border border-[#DCE3E8]">
            <span className="font-semibold text-[#0F172A] block mb-1">Clinical Syndrome</span>
            <span className="text-[#334155] leading-relaxed">{spec.clinical}</span>
          </div>
          <div className="p-3 rounded bg-[#F1F5F8] border border-[#DCE3E8]">
            <span className="font-semibold text-[#0B3A45] block mb-1">
              Acute &amp; Secondary Prevention
            </span>
            <span className="text-[#1E293B] leading-relaxed">{spec.management}</span>
          </div>
        </div>
      </div>
    </DiagramStudyFrame>
  );
}

// ============================================================================
// 7. PARKINSON'S BBB & STRIATAL DOPAMINERGIC SYNAPSE LAB
// ============================================================================
type PdDrugId = 'ldopa-dci' | 'comt-i' | 'maob-i' | 'da-agonist' | 'amantadine';

const PD_DRUGS: Record<
  PdDrugId,
  { name: string; site: string; mechanism: string; pearl: string }
> = {
  'ldopa-dci': {
    name: 'Levodopa + Carbidopa / Benserazide',
    site: 'Peripheral Blood & Striatum across BBB LAT1 Transporter',
    mechanism:
      'Dopamine cannot cross endothelial tight junctions. L-Dopa enters via LAT1 neutral amino-acid transporter; peripheral DCI (Sinemet / Madopar) inhibits peripheral DDC so L-Dopa converts to dopamine inside the brain.',
    pearl:
      'Gold-standard motor efficacy, but chronic pulsatile stimulation leads to wearing-off and peak-dose choreiform dyskinesias.',
  },
  'comt-i': {
    name: 'COMT Inhibitors (Entacapone, Opicapone)',
    site: 'Peripheral Circulation (blocks L-Dopa -> 3-OMD)',
    mechanism:
      'Inhibits peripheral catechol-O-methyltransferase (COMT), extending L-Dopa plasma half-life and increasing brain delivery (triple pill: Stalevo / Sastravi).',
    pearl: 'Smooths end-of-dose wearing-off; entacapone discolours urine harmlessly orange-brown.',
  },
  'maob-i': {
    name: 'MAO-B Inhibitors (Selegiline, Rasagiline, Safinamide)',
    site: 'Central Nigrostriatal Synaptic Cleft',
    mechanism:
      'Inhibits central MAO-B enzymatic degradation of dopamine into DOPAC, prolonging synaptic dopamine dwell time.',
    pearl: 'Mild monotherapy early or adjunct to reduce off-time.',
  },
  'da-agonist': {
    name: 'Dopamine Agonists (Ropinirole, Pramipexole, Rotigotine)',
    site: 'Postsynaptic Striatal D2/D3 GPCRs',
    mechanism:
      'Directly stimulate postsynaptic striatal dopamine receptors independently of degenerating nigral presynaptic neurons.',
    pearl:
      'Warn patients & family explicitly about Impulse Control Disorders (pathological gambling, hypersexuality, compulsive shopping) & sudden sleep attacks.',
  },
  amantadine: {
    name: 'Amantadine (Anti-Dyskinesia)',
    site: 'Postsynaptic Glutamate / NMDA Receptors',
    mechanism: 'Weak NMDA receptor antagonist specifically indicated to suppress L-Dopa-induced dyskinesias.',
    pearl: 'Monitor for livedo reticularis and peripheral ankle oedema.',
  },
};

export function ParkinsonsPharmacologyLab() {
  const [drug, setDrug] = useState<PdDrugId>('ldopa-dci');
  const [quizMode, setQuizMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const spec = PD_DRUGS[drug];

  const PD_PINS: DiagramPin[] = [
    { id: 'tight-junction', num: 1, label: 'BBB Tight Junction', detail: 'Blocks peripheral dopamine & carbidopa from entering brain', x: 438, y: 222, labelX: 505, labelY: 68 },
    { id: 'lat1', num: 2, label: 'LAT1 Carrier', detail: 'Neutral amino-acid transporter shuttling L-Dopa across endothelium', x: 575, y: 318, labelX: 625, labelY: 168 },
    { id: 'vesicles', num: 3, label: 'Dopamine Vesicles', detail: 'Presynaptic nigral storage & exocytosis (MAO-B degrades DA here)', x: 1125, y: 315, labelX: 1185, labelY: 158 },
    { id: 'd2', num: 4, label: 'D2/D3 GPCR', detail: 'Postsynaptic striatal target of dopamine agonists (ropinirole, pramipexole)', x: 985, y: 495, labelX: 830, labelY: 660 },
    { id: 'nmda', num: 5, label: 'NMDA Channel', detail: 'Amantadine antagonises NMDA to suppress L-Dopa dyskinesias', x: 1205, y: 505, labelX: 1195, labelY: 675 },
  ];

  const toggleReveal = (id: string) =>
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <DiagramStudyFrame
      title="Blood-Brain Barrier & Nigrostriatal Dopaminergic Synapse Pharmacology"
      subtitle="Endothelial Tight Junctions · LAT1 Carrier · Presynaptic Vesicle Exocytosis · Postsynaptic D2/NMDA Targets"
      icon={<Pill className="w-4 h-4 text-[#0B3A45]" />}
      pins={PD_PINS}
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
          {(Object.keys(PD_DRUGS) as PdDrugId[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setDrug(k)}
              className={`px-2 py-1 rounded border text-[11px] font-semibold ${
                drug === k
                  ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                  : 'bg-white text-[#334155] border-[#CBD5E1] hover:border-[#0B3A45]'
              }`}
            >
              {PD_DRUGS[k].name.split(' (')[0].split(' +')[0]}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-4 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3E8] flex items-center justify-center">
          <AnnotatedPlate
            src={dopamineBbbImg}
            alt="Blood-brain barrier capillary endothelium with LAT1 transporter paired with nigrostriatal dopaminergic synapse"
            width={1376}
            height={768}
            maxWidthClass="max-w-[540px]"
          >
            {/* Active Drug Target Highlights */}
            {(drug === 'ldopa-dci' || drug === 'comt-i') && (
              <>
                <rect
                  x={115}
                  y={525}
                  width={260}
                  height={56}
                  rx={10}
                  fill={drug === 'ldopa-dci' ? '#FEE2E2' : '#FEF3C7'}
                  fillOpacity={0.94}
                  stroke={drug === 'ldopa-dci' ? '#DC2626' : '#D97706'}
                  strokeWidth={3.5}
                />
                <text
                  x={245}
                  y={561}
                  textAnchor="middle"
                  className={`text-[23px] font-bold ${
                    drug === 'ldopa-dci' ? 'fill-[#991B1B]' : 'fill-[#92400E]'
                  }`}
                >
                  {drug === 'ldopa-dci' ? 'DCI blocks DDC' : 'COMT-i blocks 3-OMD'}
                </text>
                <circle
                  cx={575}
                  cy={318}
                  r={52}
                  fill="#0F766E"
                  fillOpacity={0.18}
                  stroke="#0F766E"
                  strokeWidth={5}
                />
              </>
            )}
            {drug === 'maob-i' && (
              <>
                <ellipse
                  cx={1080}
                  cy={410}
                  rx={140}
                  ry={55}
                  fill="#DCFCE7"
                  fillOpacity={0.45}
                  stroke="#16A34A"
                  strokeWidth={5}
                />
                <rect x={690} y={540} width={250} height={54} rx={10} fill="#DCFCE7" stroke="#16A34A" strokeWidth={3.5} />
                <text x={815} y={575} textAnchor="middle" className="fill-[#166534] text-[22px] font-bold">
                  MAO-B-i saves DA
                </text>
              </>
            )}
            {drug === 'da-agonist' && (
              <ellipse
                cx={985}
                cy={495}
                rx={165}
                ry={52}
                fill="#0B3A45"
                fillOpacity={0.18}
                stroke="#0B3A45"
                strokeWidth={5}
              />
            )}
            {drug === 'amantadine' && (
              <circle
                cx={1205}
                cy={505}
                r={54}
                fill="#4F46E5"
                fillOpacity={0.2}
                stroke="#4338CA"
                strokeWidth={5}
              />
            )}

            {PD_PINS.map((pin) => (
              <PinOrLabel
                key={pin.id}
                pin={pin}
                quizMode={quizMode}
                isRevealed={revealedIds.includes(pin.id)}
                onReveal={toggleReveal}
                anchor={pin.id === 'd2' ? 'end' : 'middle'}
                fontSize={24}
                pinRadius={22}
              />
            ))}
          </AnnotatedPlate>
        </div>

        <div className="lg:col-span-5 p-4 bg-[#FAFCFD] space-y-2.5 text-xs">
          <div className="font-bold text-[#0F172A] text-sm">{spec.name}</div>
          <div className="text-[11px] font-mono text-[#0B3A45]">{spec.site}</div>
          <p className="text-[#334155] leading-relaxed">{spec.mechanism}</p>
          <div className="p-2.5 rounded bg-[#FFFBEB] border border-[#FDE68A] text-[#78350F]">
            <span className="font-semibold">Clinical Pearl: </span>
            {spec.pearl}
          </div>
        </div>
      </div>
    </DiagramStudyFrame>
  );
}

// ============================================================================
// 8. NEUROMUSCULAR JUNCTION (MG) & PERIPHERAL NERVE ATLAS
// ============================================================================
type NmjState = 'normal' | 'mg-attack' | 'pyridostigmine' | 'peripheral-map';

export function NmjAndPeripheralLab() {
  const [state, setState] = useState<NmjState>('mg-attack');
  const [quizMode, setQuizMode] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const NMJ_PINS: DiagramPin[] = [
    { id: 'bouton', num: 1, label: 'Presynaptic Bouton', detail: 'Voltage-gated Ca²⁺ influx triggers ACh vesicle exocytosis', x: 505, y: 315, labelX: 255, labelY: 165 },
    { id: 'vesicles', num: 2, label: 'ACh Vesicles', detail: 'Quantal acetylcholine packets ready for active-zone release', x: 620, y: 382, labelX: 935, labelY: 225 },
    { id: 'cleft', num: 3, label: 'Synaptic Cleft (AChE)', detail: 'Acetylcholinesterase hydrolyses ACh; target of pyridostigmine', x: 600, y: 535, labelX: 945, labelY: 455 },
    { id: 'achr', num: 4, label: 'Nicotinic AChR', detail: 'Postsynaptic Na⁺/K⁺ ion channel attacked by Anti-AChR IgG in MG', x: 728, y: 592, labelX: 965, labelY: 615 },
    { id: 'folds', num: 5, label: 'Junctional Folds', detail: 'Deep sarcolemmal folds providing safety margin against fatigue', x: 515, y: 650, labelX: 265, labelY: 795 },
  ];

  const toggleReveal = (id: string) =>
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <DiagramStudyFrame
      title="Neuromuscular Junction (Myasthenia Gravis) & Peripheral Nerve Atlas"
      subtitle="Presynaptic Bouton, Junctional Folds, Anti-AChR IgG & Upper/Lower Limb Mononeuropathies"
      icon={<Zap className="w-4 h-4 text-[#0B3A45]" />}
      pins={state !== 'peripheral-map' ? NMJ_PINS : undefined}
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
          {[
            { id: 'normal', label: 'Normal NMJ' },
            { id: 'mg-attack', label: 'Myasthenia Gravis' },
            { id: 'pyridostigmine', label: 'Pyridostigmine' },
            { id: 'peripheral-map', label: '4 Limb Nerve Palsies' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setState(btn.id as NmjState)}
              className={`px-2 py-1 text-[11px] font-semibold rounded border ${
                state === btn.id
                  ? 'bg-[#0B3A45] text-white border-[#0B3A45]'
                  : 'bg-white text-[#334155] border-[#CBD5E1] hover:border-[#0B3A45]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      }
    >
      {state === 'peripheral-map' ? (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                name: 'Median (CTS)',
                sign: 'Thenar Wasting + Palmar 3.5 Digits',
                color: '#0284C7',
              },
              {
                name: 'Ulnar (Elbow)',
                sign: 'Ulnar Claw + Froment’s + Medial 1.5',
                color: '#7C3AED',
              },
              {
                name: 'Radial (Spiral Groove)',
                sign: 'Wrist Drop + 1st Dorsal Web (Triceps Spared)',
                color: '#D97706',
              },
              {
                name: 'Common Peroneal',
                sign: 'Foot Drop + Weak Eversion (Inversion Intact)',
                color: '#DC2626',
              },
            ].map((n) => (
              <div key={n.name} className="p-3 rounded border border-[#DCE3E8] bg-[#FAFCFD]">
                <div className="font-bold text-xs text-[#0F172A]">{n.name}</div>
                <div className="text-[11px] text-[#475569] mt-1 leading-snug">{n.sign}</div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto border border-[#D7DFE5] rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F1F5F8] border-b border-[#D7DFE5]">
                  <th className="py-2 px-3 font-semibold text-[#0F172A]">Nerve &amp; Site</th>
                  <th className="py-2 px-3 font-semibold text-[#0F172A]">Key Motor Deficit</th>
                  <th className="py-2 px-3 font-semibold text-[#0F172A]">Sensory Map</th>
                  <th className="py-2 px-3 font-semibold text-[#0F172A]">Exam Distinguisher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EBF0]">
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#0F172A]">Median (Carpal Tunnel)</td>
                  <td className="py-2 px-3 text-[#334155]">Abductor Pollicis Brevis (thenar wasting)</td>
                  <td className="py-2 px-3 text-[#334155]">Palmar lateral 3.5 digits</td>
                  <td className="py-2 px-3 text-[#334155]">Nocturnal relief shaking hand; Tinel / Phalen +</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#0F172A]">Ulnar (Cubital Tunnel)</td>
                  <td className="py-2 px-3 text-[#334155]">1st dorsal interosseous + ulnar claw + Froment’s</td>
                  <td className="py-2 px-3 text-[#334155]">Medial 1.5 digits (stops at wrist)</td>
                  <td className="py-2 px-3 text-[#334155]">Spares thenar; C8/T1 radiculopathy extends up forearm</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#0F172A]">Radial (Spiral Groove)</td>
                  <td className="py-2 px-3 text-[#334155]">Wrist drop + weak MCP finger extension</td>
                  <td className="py-2 px-3 text-[#334155]">1st dorsal web space</td>
                  <td className="py-2 px-3 text-[#334155]">Spiral groove SPARES triceps reflex</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-[#0F172A]">Common Peroneal (Fibular Neck)</td>
                  <td className="py-2 px-3 text-[#334155]">Foot drop (EHL) + weak eversion</td>
                  <td className="py-2 px-3 text-[#334155]">Lateral calf + dorsum of foot</td>
                  <td className="py-2 px-3 text-[#334155]">Ankle inversion &amp; ankle jerk INTACT (vs L5/Sciatic)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 p-4 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3E8] flex items-center justify-center">
            <AnnotatedPlate
              src={nmjPlateImg}
              alt="Neuromuscular junction showing presynaptic motor bouton, ACh vesicles, synaptic cleft, and postsynaptic junctional folds studded with nicotinic AChRs"
              width={1200}
              height={896}
              maxWidthClass="max-w-[460px]"
            >
              {/* Y-Shaped Anti-AChR IgG Antibodies in MG */}
              {state === 'mg-attack' && (
                <g stroke="#DC2626" strokeWidth={8} strokeLinecap="round" fill="none">
                  {[
                    { x: 495, y: 576 },
                    { x: 595, y: 576 },
                    { x: 710, y: 584 },
                  ].map((pt) => (
                    <g key={pt.x}>
                      <circle cx={pt.x} cy={pt.y} r={24} fill="#DC2626" fillOpacity={0.18} stroke="none" />
                      <line x1={pt.x} y1={pt.y - 32} x2={pt.x} y2={pt.y - 4} />
                      <line x1={pt.x} y1={pt.y - 32} x2={pt.x - 18} y2={pt.y - 54} />
                      <line x1={pt.x} y1={pt.y - 32} x2={pt.x + 18} y2={pt.y - 54} />
                    </g>
                  ))}
                  <rect x={180} y={818} width={840} height={54} rx={8} fill="#991B1B" fillOpacity={0.9} stroke="none" />
                  <text x={600} y={854} textAnchor="middle" stroke="none" className="fill-white text-[24px] font-bold">
                    Anti-AChR IgG Blocks Receptors &amp; Flattens Folds
                  </text>
                </g>
              )}

              {state === 'pyridostigmine' && (
                <g>
                  {[445, 595, 735].map((x) => (
                    <circle key={x} cx={x} cy={535} r={12} fill="#059669" stroke="#FFFFFF" strokeWidth={3} />
                  ))}
                  <rect x={170} y={818} width={860} height={54} rx={8} fill="#065F46" fillOpacity={0.92} />
                  <text x={600} y={854} textAnchor="middle" className="fill-white text-[24px] font-bold">
                    AChE Inhibited -&gt; Prolonged Synaptic ACh Activation
                  </text>
                </g>
              )}

              {state === 'normal' && (
                <g>
                  <rect x={170} y={818} width={860} height={54} rx={8} fill="#0B3A45" fillOpacity={0.9} />
                  <text x={600} y={854} textAnchor="middle" className="fill-white text-[24px] font-bold">
                    Intact Postsynaptic Junctional Folds &amp; Safety Margin
                  </text>
                </g>
              )}

              {NMJ_PINS.map((pin) => (
                <PinOrLabel
                  key={pin.id}
                  pin={pin}
                  quizMode={quizMode}
                  isRevealed={revealedIds.includes(pin.id)}
                  onReveal={toggleReveal}
                  anchor={(pin.labelX ?? pin.x) < 550 ? 'end' : 'start'}
                  fontSize={24}
                  pinRadius={22}
                />
              ))}
            </AnnotatedPlate>
          </div>

          <div className="lg:col-span-6 p-4 bg-[#FAFCFD] text-xs space-y-2.5 flex flex-col justify-center">
            {state === 'normal' && (
              <>
                <div className="font-bold text-[#0F172A] text-sm">Normal NMJ Safety Margin</div>
                <p className="text-[#334155] leading-relaxed">
                  Presynaptic action potentials open voltage-gated Ca²⁺ channels, triggering ACh vesicle exocytosis onto dense postsynaptic nicotinic AChRs without fatigue.
                </p>
              </>
            )}
            {state === 'mg-attack' && (
              <>
                <div className="font-bold text-[#B91C1C] text-sm">Myasthenia Gravis (Postsynaptic Block)</div>
                <p className="text-[#334155] leading-relaxed">
                  Anti-AChR antibodies (~85% generalised) block &amp; complement-destroy junctional folds -&gt; repetitive contraction depletes safety margin (&gt;10% EMG decrement), causing fatigable ptosis, diplopia, bulbar, and proximal limb weakness. Screen thorax CT for thymoma and track serial FVC (&lt;1.5 L = crisis).
                </p>
              </>
            )}
            {state === 'pyridostigmine' && (
              <>
                <div className="font-bold text-[#059669] text-sm">Pyridostigmine (AChE Inhibitor)</div>
                <p className="text-[#334155] leading-relaxed">
                  Reversibly inhibits synaptic cleft acetylcholinesterase so ACh persists longer across remaining AChRs (manage muscarinic cramps/diarrhoea with propantheline).
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </DiagramStudyFrame>
  );
}
