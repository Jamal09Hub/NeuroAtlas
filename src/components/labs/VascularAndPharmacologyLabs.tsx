import React, { useState } from 'react';
import { Activity, Pill, Zap } from 'lucide-react';
import {
  DiagramPin,
  DiagramStudyFrame,
  MedicalSvgDefs,
  PinOrLabel,
} from './DiagramPrimitives';

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
  { id: 'aca-pin', num: 1, label: 'ACA & ACom', detail: 'Medial hemisphere (leg > arm); ACom is #1 site of Berry aneurysm', x: 112, y: 42 },
  { id: 'mca-pin', num: 2, label: 'MCA (M1/M2)', detail: 'Lateral convexity (face/arm/speech); gives deep lenticulostriate perforators', x: 54, y: 92, labelX: 22, labelY: 112 },
  { id: 'pcom-pin', num: 3, label: 'PCom & ICA', detail: 'PCom aneurysm compresses CN III (painful blown pupil)', x: 82, y: 132 },
  { id: 'pca-pin', num: 4, label: 'Basilar & PCA', detail: 'Posterior circulation supplying brainstem, cerebellum & occipital lobe', x: 112, y: 184 },
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
        <div className="lg:col-span-7 p-4 bg-white border-b lg:border-b-0 lg:border-r border-[#DCE3E8] flex flex-col items-center">
          <svg
            viewBox="-35 0 470 250"
            className="w-full max-w-[475px] h-auto select-none"
            role="img"
            aria-label="Anatomical Circle of Willis overlying ventral brain base paired with lateral cerebral cortex vascular territories"
          >
            <MedicalSvgDefs prefix="str" />

            {/* Left Half: Ventral Brain Base + Circle of Willis */}
            <path
              d="M 112 16 C 72 16 40 44 38 82 C 26 98 24 134 38 158 C 46 184 72 204 96 204 L 96 226 L 128 226 L 128 204 C 152 204 178 184 186 158 C 200 134 198 98 186 82 C 184 44 152 16 112 16 Z"
              fill="url(#str-brain-blush)"
              stroke="#D4B2B4"
              strokeWidth="1.2"
              opacity="0.72"
            />

            {/* ACA Left/Right + ACom */}
            <path
              d="M 96 96 L 96 38 M 128 96 L 128 38"
              stroke={selected === 'aca' ? '#DC2626' : '#991B1B'}
              strokeWidth={selected === 'aca' ? '5.5' : '3.5'}
              strokeLinecap="round"
            />
            <line
              x1="96"
              y1="62"
              x2="128"
              y2="62"
              stroke={selected === 'sah-aneurysm' ? '#F59E0B' : '#991B1B'}
              strokeWidth="4"
            />

            {/* MCA Trunks + Bifurcation + Lenticulostriate Perforators */}
            <path
              d="M 96 96 Q 66 96 36 86 M 128 96 Q 158 96 188 86"
              fill="none"
              stroke={selected === 'mca' ? '#DC2626' : '#991B1B'}
              strokeWidth={selected === 'mca' ? '6.5' : '4.5'}
              strokeLinecap="round"
            />
            {/* Lenticulostriate deep perforators */}
            {[64, 72, 80, 144, 152, 160].map((x) => (
              <line
                key={x}
                x1={x}
                y1={92}
                x2={x}
                y2={68}
                stroke={selected === 'lacunar' ? '#DC2626' : '#D97706'}
                strokeWidth={selected === 'lacunar' ? '2.5' : '1.6'}
              />
            ))}

            {/* ICA Termini + PComs */}
            <circle cx="96" cy="96" r="4.5" fill="#7F1D1D" />
            <circle cx="128" cy="96" r="4.5" fill="#7F1D1D" />
            <path
              d="M 96 96 Q 92 122 102 146 M 128 96 Q 132 122 122 146"
              fill="none"
              stroke={selected === 'sah-aneurysm' ? '#F59E0B' : '#991B1B'}
              strokeWidth="3"
            />

            {/* Basilar + SCA + AICA + PICA + Vertebrals + PCAs */}
            <path
              d="M 112 146 L 112 204 M 92 232 L 112 204 L 132 232 M 112 146 Q 82 146 62 162 M 112 146 Q 142 146 162 162 M 112 156 L 78 156 M 112 156 L 146 156 M 102 218 L 76 224 M 122 218 L 148 224"
              fill="none"
              stroke={selected === 'pca' ? '#DC2626' : '#991B1B'}
              strokeWidth={selected === 'pca' ? '5' : '3.2'}
              strokeLinecap="round"
            />

            {/* Saccular Berry Aneurysms (Clickable Hotspots) */}
            {[
              { x: 112, y: 62, lbl: 'ACom' },
              { x: 96, y: 120, lbl: 'PCom' },
              { x: 54, y: 92, lbl: 'MCA' },
            ].map((a) => (
              <circle
                key={a.lbl}
                cx={a.x}
                cy={a.y}
                r={selected === 'sah-aneurysm' ? '7' : '5'}
                fill={selected === 'sah-aneurysm' ? '#F59E0B' : '#FEF3C7'}
                stroke="#B45309"
                strokeWidth="1.6"
                className="cursor-pointer"
                onClick={() => setSelected('sah-aneurysm')}
              />
            ))}

            {/* Right Half: Lateral Cortical Vascular Territories (Stroke II p.3) */}
            <g transform="translate(220, 26)">
              <text x="95" y="-6" textAnchor="middle" className="fill-[#0F172A] text-[10px] font-bold">
                Lateral Cortical Territories
              </text>
              {/* Brain Silhouette */}
              <path
                d="M 24 96 C 18 46 62 14 114 14 C 166 14 190 48 186 92 C 184 128 162 146 128 144 C 102 142 84 152 62 146 C 36 138 28 122 24 96 Z"
                fill="#FFFFFF"
                stroke="#9F6564"
                strokeWidth="1.4"
                filter="url(#str-soft-shadow)"
              />
              {/* ACA Territory (Superior/Frontal Rim - Amber) */}
              <path
                d="M 24 96 C 18 46 62 14 114 14 C 138 14 156 22 168 36 Q 112 30 62 46 Q 38 66 24 96 Z"
                fill="#FDE047"
                fillOpacity={selected === 'aca' ? 0.88 : 0.35}
                className="cursor-pointer"
                onClick={() => setSelected('aca')}
              />
              {/* MCA Territory (Lateral Convexity - Crimson/Coral) */}
              <path
                d="M 28 96 Q 40 66 64 48 Q 114 32 152 46 Q 158 98 134 124 Q 94 144 62 142 Q 34 134 28 96 Z"
                fill="#EF4444"
                fillOpacity={selected === 'mca' ? 0.72 : 0.25}
                className="cursor-pointer"
                onClick={() => setSelected('mca')}
              />
              {/* PCA Territory (Occipital Pole - Cobalt) */}
              <path
                d="M 152 46 C 176 46 188 68 186 96 C 184 128 158 146 128 144 Q 152 104 152 46 Z"
                fill="#0284C7"
                fillOpacity={selected === 'pca' ? 0.78 : 0.28}
                className="cursor-pointer"
                onClick={() => setSelected('pca')}
              />
              {/* Cerebellum & Brainstem beneath */}
              <path
                d="M 124 144 C 148 144 176 144 174 168 C 172 184 144 188 122 174 Z"
                fill="#D6A4A3"
                stroke="#9F6564"
                strokeWidth="1.1"
              />
              <path d="M 102 142 L 122 144 L 116 196 L 98 196 Z" fill="#EAD7C6" stroke="#9F7868" strokeWidth="1.1" />

              {/* Territory Legend */}
              <g transform="translate(18, 178)" className="text-[8.5px] font-semibold">
                <rect x="0" y="0" width="9" height="9" rx="1.5" fill="#FACC15" />
                <text x="13" y="8" className="fill-[#334155]">ACA (Leg)</text>
                <rect x="64" y="0" width="9" height="9" rx="1.5" fill="#EF4444" />
                <text x="77" y="8" className="fill-[#334155]">MCA (Face/Arm)</text>
                <rect x="148" y="0" width="9" height="9" rx="1.5" fill="#0284C7" />
                <text x="161" y="8" className="fill-[#334155]">PCA</text>
              </g>
            </g>

            {COW_PINS.map((pin) => (
              <PinOrLabel
                key={pin.id}
                pin={pin}
                quizMode={quizMode}
                isRevealed={revealedIds.includes(pin.id)}
                onReveal={toggleReveal}
                anchor={pin.x < 90 ? 'end' : 'middle'}
                fontSize={8}
              />
            ))}
          </svg>
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
  const spec = PD_DRUGS[drug];

  return (
    <DiagramStudyFrame
      title="Blood-Brain Barrier & Nigrostriatal Dopaminergic Synapse Pharmacology"
      subtitle="Endothelial Tight Junctions · LAT1 Carrier · Presynaptic Vesicle Exocytosis · Postsynaptic D2/NMDA Targets"
      icon={<Pill className="w-4 h-4 text-[#0B3A45]" />}
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
          <svg viewBox="0 0 420 220" className="w-full max-w-[450px] h-auto select-none">
            <MedicalSvgDefs prefix="bbb" />

            {/* Peripheral Capillary Lumen (Left) */}
            <rect x="8" y="14" width="128" height="192" rx="6" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1.4" />
            <text x="72" y="30" textAnchor="middle" className="fill-[#9A3412] text-[9.5px] font-bold">
              CAPILLARY LUMEN
            </text>
            {/* RBC silhouettes */}
            <ellipse cx="32" cy="54" rx="10" ry="6" fill="#FCA5A5" stroke="#DC2626" strokeWidth="0.9" />
            <ellipse cx="42" cy="176" rx="10" ry="6" fill="#FCA5A5" stroke="#DC2626" strokeWidth="0.9" />

            {/* Endothelial Cell Barrier + Tight Junctions + Astrocyte End-Foot */}
            <rect x="142" y="14" width="22" height="58" rx="4" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.2" />
            <rect x="142" y="96" width="22" height="110" rx="4" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.2" />
            {/* Tight junction zipper lines */}
            <path d="M 145 69 L 161 73 M 145 73 L 161 69" stroke="#0B3A45" strokeWidth="1.8" />
            <path d="M 145 96 L 161 100 M 145 100 L 161 96" stroke="#0B3A45" strokeWidth="1.8" />
            {/* LAT1 Carrier Protein Pore */}
            <rect x="140" y="75" width="26" height="18" rx="4" fill="#0F766E" />
            <text x="153" y="87" textAnchor="middle" className="fill-white text-[7.5px] font-mono font-bold">
              LAT1
            </text>
            <text x="153" y="216" textAnchor="middle" className="fill-[#0B3A45] text-[8.5px] font-mono font-bold">
              BBB
            </text>

            {/* CNS Nigrostriatal Synapse (Right) */}
            <rect x="170" y="14" width="242" height="192" rx="6" fill="#F4F7F9" stroke="#CBD5E1" strokeWidth="1.4" />
            {/* Presynaptic Nigral Bouton */}
            <path
              d="M 192 42 Q 246 28 280 54 Q 294 86 276 114 Q 246 128 192 114 Z"
              fill="#E0F2FE"
              stroke="#0284C7"
              strokeWidth="1.4"
            />
            <text x="234" y="48" textAnchor="middle" className="fill-[#0369A1] text-[8.5px] font-bold">
              Presynaptic Terminal
            </text>
            {/* Dopamine Vesicles */}
            <circle cx="242" cy="84" r="9" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" />
            <circle cx="262" cy="96" r="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" />
            <circle cx="242" cy="84" r="2.5" fill="#0B3A45" />
            <circle cx="262" cy="96" r="2.5" fill="#0B3A45" />

            {/* Postsynaptic Striatal Dendrite */}
            <path
              d="M 326 40 Q 308 88 326 172 L 402 172 L 402 40 Z"
              fill="#ECFDF5"
              stroke="#059669"
              strokeWidth="1.4"
            />
            <text x="364" y="56" textAnchor="middle" className="fill-[#065F46] text-[8.5px] font-bold">
              Striatal Spine
            </text>

            {/* D2 Receptor & NMDA Receptor */}
            <rect
              x="306"
              y="78"
              width="24"
              height="26"
              rx="4"
              fill={drug === 'da-agonist' ? '#0B3A45' : '#FFFFFF'}
              stroke="#059669"
              strokeWidth="1.6"
            />
            <text
              x="318"
              y="94"
              textAnchor="middle"
              className={`text-[8px] font-bold ${drug === 'da-agonist' ? 'fill-white' : 'fill-[#065F46]'}`}
            >
              D2
            </text>

            <rect
              x="306"
              y="124"
              width="24"
              height="24"
              rx="4"
              fill={drug === 'amantadine' ? '#0B3A45' : '#FFFFFF'}
              stroke="#64748B"
              strokeWidth="1.4"
            />
            <text
              x="318"
              y="139"
              textAnchor="middle"
              className={`text-[7.5px] font-bold ${drug === 'amantadine' ? 'fill-white' : 'fill-[#334155]'}`}
            >
              NMDA
            </text>

            {/* L-Dopa Crossing Arrow */}
            <path d="M 48 84 L 222 84" stroke="#0B3A45" strokeWidth="2.8" markerEnd="url(#bbb-arrow-teal)" />
            <text x="72" y="76" textAnchor="middle" className="fill-[#0F172A] text-[9.5px] font-bold">
              L-Dopa
            </text>

            {/* Peripheral DDC & COMT Inhibition */}
            <g opacity={drug === 'ldopa-dci' ? 1 : 0.45}>
              <rect x="20" y="106" width="104" height="22" rx="3" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1" />
              <text x="72" y="120" textAnchor="middle" className="fill-[#991B1B] text-[8.5px] font-bold">
                DCI blocks DDC -&gt; DA
              </text>
            </g>
            <g opacity={drug === 'comt-i' ? 1 : 0.45}>
              <rect x="20" y="138" width="104" height="22" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
              <text x="72" y="152" textAnchor="middle" className="fill-[#92400E] text-[8.5px] font-bold">
                COMT-i blocks 3-OMD
              </text>
            </g>

            {/* Central MAO-B Inhibition */}
            <g opacity={drug === 'maob-i' ? 1 : 0.55}>
              <rect x="190" y="148" width="106" height="24" rx="3" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" />
              <text x="243" y="163" textAnchor="middle" className="fill-[#166534] text-[8.5px] font-bold">
                MAO-B-i saves DA
              </text>
            </g>
          </svg>
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

  return (
    <DiagramStudyFrame
      title="Neuromuscular Junction (Myasthenia Gravis) & Peripheral Nerve Atlas"
      subtitle="Presynaptic Bouton, Junctional Folds, Anti-AChR IgG & Upper/Lower Limb Mononeuropathies"
      icon={<Zap className="w-4 h-4 text-[#0B3A45]" />}
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
            <svg viewBox="0 0 360 215" className="w-full max-w-[390px] h-auto select-none">
              <MedicalSvgDefs prefix="nmj" />
              {/* Myelinated Axon + Schwann Sheath */}
              <rect x="148" y="4" width="64" height="32" rx="4" fill="#FDE68A" stroke="#CA8A04" strokeWidth="1.2" />
              {/* Presynaptic Motor Bouton */}
              <path
                d="M 148 32 Q 92 66 108 92 Q 180 104 252 92 Q 268 66 212 32 Z"
                fill="url(#nmj-drg-amber)"
                stroke="#B45309"
                strokeWidth="1.5"
                filter="url(#nmj-soft-shadow)"
              />
              {/* Mitochondria & ACh Vesicles */}
              <ellipse cx="146" cy="56" rx="14" ry="7" fill="#FCA5A5" stroke="#B91C1C" strokeWidth="1" />
              <ellipse cx="214" cy="56" rx="14" ry="7" fill="#FCA5A5" stroke="#B91C1C" strokeWidth="1" />
              {[136, 162, 198, 224].map((x) => (
                <circle key={x} cx={x} cy="78" r="6" fill="#FFFFFF" stroke="#059669" strokeWidth="1.4" />
              ))}

              {/* Released ACh in Synaptic Cleft */}
              {[118, 146, 178, 206, 236].map((x) => (
                <circle
                  key={x}
                  cx={x}
                  cy={state === 'pyridostigmine' ? 114 : 110}
                  r={state === 'pyridostigmine' ? 4.5 : 3.5}
                  fill="#059669"
                />
              ))}

              {/* Postsynaptic Muscle Membrane with Deep Junctional Folds */}
              <path
                d="M 30 144 L 88 144 L 94 176 L 114 176 L 120 144 L 164 144 L 170 176 L 190 176 L 196 144 L 240 144 L 246 176 L 266 176 L 272 144 L 330 144 L 330 202 L 30 202 Z"
                fill="url(#nmj-muscle-red)"
                stroke="#991B1B"
                strokeWidth="1.6"
              />
              {/* Nicotinic AChR Receptor Channels along fold crests */}
              {[104, 142, 180, 218, 256].map((x) => (
                <rect key={x} x={x - 8} y="139" width="16" height="8" rx="2" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
              ))}

              {/* Y-Shaped Anti-AChR IgG Antibodies in MG */}
              {state === 'mg-attack' && (
                <g stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" fill="none">
                  {[104, 180, 256].map((x) => (
                    <g key={x}>
                      <line x1={x} y1="126" x2={x} y2="138" />
                      <line x1={x} y1="126" x2={x - 7} y2="117" />
                      <line x1={x} y1="126" x2={x + 7} y2="117" />
                    </g>
                  ))}
                  <text x="180" y="192" textAnchor="middle" className="fill-white text-[9px] font-bold">
                    Anti-AChR IgG Blocks Receptors &amp; Flattens Folds
                  </text>
                </g>
              )}

              {state === 'pyridostigmine' && (
                <text x="180" y="192" textAnchor="middle" className="fill-white text-[9px] font-bold">
                  AChE Inhibited -&gt; Prolonged Synaptic ACh Activation
                </text>
              )}
              {state === 'normal' && (
                <text x="180" y="192" textAnchor="middle" className="fill-white text-[9px] font-bold">
                  Intact Postsynaptic Junctional Folds &amp; Safety Margin
                </text>
              )}
            </svg>
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
