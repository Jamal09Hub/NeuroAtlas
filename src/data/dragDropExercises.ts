import { DragDropExercise, DragDropExerciseId } from '../types/neurology';

export const DRAG_DROP_EXERCISES: DragDropExercise[] = [
  {
    id: 'umn-lmn-nmj',
    title: 'Motor Pathway Sorter: UMN vs LMN vs Neuromuscular Junction',
    moduleId: 'foundations-neuroanatomy',
    instructions:
      'Sort each clinical sign, disease example, or electrophysiological finding into the correct anatomical motor localization.',
    categories: [
      {
        id: 'umn',
        label: 'Upper Motor Neurone (UMN)',
        description: 'Motor cortex, internal capsule, brainstem & spinal corticospinal tracts',
      },
      {
        id: 'lmn',
        label: 'Lower Motor Neurone (LMN)',
        description: 'Anterior horn cell, spinal roots, plexus & peripheral motor axons',
      },
      {
        id: 'nmj',
        label: 'Neuromuscular Junction (NMJ)',
        description: 'Postsynaptic acetylcholine receptor transmission (e.g. Myasthenia Gravis)',
      },
    ],
    items: [
      {
        id: 'umn-1',
        label: 'Spasticity & Clasp-Knife Tone',
        detail: 'Velocity-dependent increase in muscle resistance',
        correctCategoryId: 'umn',
        rationale: 'Loss of descending corticospinal inhibition produces velocity-dependent spasticity.',
      },
      {
        id: 'umn-2',
        label: 'Extensor Plantar Response (Babinski +)',
        detail: 'Great toe dorsiflexes with fanning of outer toes',
        correctCategoryId: 'umn',
        rationale: 'Upgoing plantar response is a hallmark UMN sign.',
      },
      {
        id: 'umn-3',
        label: 'Brisk Reflexes with Ankle Clonus',
        detail: 'Exaggerated stretch reflexes without muscle fasciculation',
        correctCategoryId: 'umn',
        rationale: 'UMN lesions disinhibit spinal reflex arcs, producing hyperreflexia and clonus.',
      },
      {
        id: 'lmn-1',
        label: 'Marked Muscle Wasting & Fasciculations',
        detail: 'Visible spontaneous twitches in denervated muscle bellies',
        correctCategoryId: 'lmn',
        rationale: 'Anterior horn cell or peripheral motor axon loss causes trophic wasting and fasciculations.',
      },
      {
        id: 'lmn-2',
        label: 'Flaccid Hypotonia & Areflexia',
        detail: 'Reduced muscle tone with absent deep tendon reflexes',
        correctCategoryId: 'lmn',
        rationale: 'Disruption of the efferent LMN arc abolishes reflex contraction and resting tone.',
      },
      {
        id: 'lmn-3',
        label: 'Absent C5 Biceps Jerk at Cord Compression Level',
        detail: 'Segmental anterior horn / root injury at lesion level',
        correctCategoryId: 'lmn',
        rationale: 'A focal cord lesion creates LMN signs at the exact compressed segment and UMN signs below.',
      },
      {
        id: 'nmj-1',
        label: 'Fatigable Painless Ptosis & Diplopia',
        detail: 'Worsens toward evening, improves transiently with ice pack',
        correctCategoryId: 'nmj',
        rationale: 'Depletion of available AChR transmission with repetitive firing causes classic fatigability.',
      },
      {
        id: 'nmj-2',
        label: 'Decremental EMG Response on Repetitive Stimulation',
        detail: 'Normal sensory NCS, normal reflexes, normal pupils',
        correctCategoryId: 'nmj',
        rationale: 'Myasthenia Gravis yields >10% compound muscle action potential decrement with preserved reflexes.',
      },
    ],
  },
  {
    id: 'cranial-nerves',
    title: 'Cranial Nerve & Brainstem Localizer Match',
    moduleId: 'cranial-nerves',
    instructions:
      'Match each bedside ocular, facial, or bulbar clinical finding to the precise cranial nerve or tract lesion.',
    categories: [
      {
        id: 'cn-3',
        label: 'CN III (Oculomotor) Palsy',
        description: 'Surgical PCom compression or medical microvascular ischaemia',
      },
      {
        id: 'cn-7-lmn',
        label: 'CN VII LMN vs UMN',
        description: 'Facial nerve canal/Bell’s palsy vs contralateral hemisphere stroke',
      },
      {
        id: 'cn-10-12',
        label: 'Lower CNs (X / XII) & Bulbar',
        description: 'Palatal/uvular and hypoglossal tongue lateralization',
      },
      {
        id: 'ino-horner',
        label: 'Horner’s & MLF (INO)',
        description: 'Autonomic sympathetic chain or conjugate brainstem tract',
      },
    ],
    items: [
      {
        id: 'cn-i1',
        label: 'Complete Ptosis + "Down & Out" Eye + Dilated Pupil',
        detail: 'Painful onset suggesting PCom aneurysm',
        correctCategoryId: 'cn-3',
        rationale: 'Compression of CN III paralyses levator palpebrae, medial/superior/inferior recti, and superficial pupil constrictor fibres.',
      },
      {
        id: 'cn-i2',
        label: 'Ipsilateral Loss of Forehead Wrinkles + Bell’s Phenomenon',
        detail: 'Whole half of face paralysed (+/- hyperacusis)',
        correctCategoryId: 'cn-7-lmn',
        rationale: 'An LMN CN VII lesion knocks out both upper and lower ipsilateral facial muscles.',
      },
      {
        id: 'cn-i3',
        label: 'Lower Facial Weakness with Preserved Forehead Wrinkling',
        detail: 'Contralateral cerebral hemisphere infarction',
        correctCategoryId: 'cn-7-lmn',
        rationale: 'UMN corticobulbar lesions spare the forehead due to bilateral cortical innervation.',
      },
      {
        id: 'cn-i4',
        label: 'Uvula Deviates AWAY from Weak Palate on "Ahh"',
        detail: 'Afferent gag intact, efferent palate paralysed',
        correctCategoryId: 'cn-10-12',
        rationale: 'Unopposed intact contralateral vagus pulls the uvula away from a CN X lesion.',
      },
      {
        id: 'cn-i5',
        label: 'Tongue Wasting, Fasciculations & Deviation TOWARD Lesion',
        detail: 'Unilateral LMN hypoglossal damage',
        correctCategoryId: 'cn-10-12',
        rationale: 'Intact contralateral genioglossus pushes the protruded tongue toward the weak CN XII side.',
      },
      {
        id: 'cn-i6',
        label: 'Partial Ptosis + Reactive Miosis + Ipsilateral Anhidrosis',
        detail: 'Painful presentation warrants urgent carotid dissection scan',
        correctCategoryId: 'ino-horner',
        rationale: 'Horner’s syndrome disrupts oculosympathetic innervation while preserving light/accommodation reflexes.',
      },
      {
        id: 'cn-i7',
        label: 'Impaired Adduction + Contralateral Abducting Nystagmus',
        detail: 'Preserved convergence; young adult strongly suggests MS',
        correctCategoryId: 'ino-horner',
        rationale: 'Medial Longitudinal Fasciculus (MLF) lesion causes Internuclear Ophthalmoplegia (INO).',
      },
    ],
  },
  {
    id: 'headache-syndromes',
    title: 'Headache & Craniofacial Pain Diagnostic Sorter',
    moduleId: 'headaches-facial-pain',
    instructions:
      'Classify each clinical vignette hallmark, trigger, or emergency treatment into the matching headache disorder.',
    categories: [
      {
        id: 'migraine-tth',
        label: 'Migraine & Tension-Type',
        description: 'Episodic disabling 4h–3d headaches vs band-like tightening pain',
      },
      {
        id: 'cluster',
        label: 'Cluster Headache',
        description: 'Trigeminal autonomic cephalalgia (men 4:1)',
      },
      {
        id: 'tn',
        label: 'Trigeminal Neuralgia',
        description: 'Paroxysmal V2/V3 neuropathic lancinating shocks',
      },
      {
        id: 'gca-iih',
        label: 'Vision-Threatening (GCA & IIH)',
        description: 'Temporal arteritis (>50yr) & Idiopathic Intracranial Hypertension',
      },
    ],
    items: [
      {
        id: 'hd-1',
        label: '4h–72h Throbbing + Photophobia + 25-min Visual Zig-Zag Aura',
        detail: 'Treated acutely with NSAID + antiemetic + triptan',
        correctCategoryId: 'migraine-tth',
        rationale: 'Classic migraine with aura; start preventive therapy (propranolol/amitriptyline/candesartan) if >=4 days/month.',
      },
      {
        id: 'hd-2',
        label: 'Bilateral Tight Band Pressure — Never Wakes Patient from Sleep',
        detail: 'No nausea, vomiting, or visual aura (42% lifetime prevalence)',
        correctCategoryId: 'migraine-tth',
        rationale: 'Tension-type headache lacks autonomic, GI, or visual features and does not wake patients at night.',
      },
      {
        id: 'hd-3',
        label: 'Nocturnal 1am Periorbital Pain (45 min) + Tearing + Blocked Nostril',
        detail: 'Treated acutely with SC Sumatriptan + 100% High-Flow O2',
        correctCategoryId: 'cluster',
        rationale: 'Cluster headache strikes in 4–8 wk clusters with ipsilateral autonomic signs and restlessness; Verapamil prevents attacks.',
      },
      {
        id: 'hd-4',
        label: '2-Second Electric Shocks in V2/V3 Triggered by Chewing/Shaving',
        detail: 'First-line medical therapy: Carbamazepine',
        correctCategoryId: 'tn',
        rationale: 'Trigeminal neuralgia is usually due to arterial loop compression (>40yr) or MS plaque (<40yr).',
      },
      {
        id: 'hd-5',
        label: 'Elderly Scalp Tenderness + Jaw Claudication + ESR 82 mm/h',
        detail: 'Start high-dose oral Prednisolone immediately before biopsy',
        correctCategoryId: 'gca-iih',
        rationale: 'Giant Cell Arteritis threatens irreversible ischaemic blindness; 24h steroid response is characteristic.',
      },
      {
        id: 'hd-6',
        label: 'Obese Young Woman + Papilloedema + Normal MRI/MRV + CSF Pressure 34 cm',
        detail: 'Treat with weight loss + Acetazolamide + visual field monitoring',
        correctCategoryId: 'gca-iih',
        rationale: 'IIH causes raised ICP headache and transient visual obscurations once CVST is excluded on MRV/CTV.',
      },
    ],
  },
  {
    id: 'epilepsy-aeds',
    title: 'Epilepsy Semiology & Anti-Epileptic Pharmacology Builder',
    moduleId: 'epilepsy-series',
    instructions:
      'Match each seizure feature, EEG signature, or AED pharmacology pearl to the correct category.',
    categories: [
      {
        id: 'focal-semiology',
        label: 'Focal Seizures (Temporal / Frontal)',
        description: '60% TLE & 30% FLE clinical manifestations',
      },
      {
        id: 'gen-eeg',
        label: 'Generalised Epilepsy (Absence / JME)',
        description: 'Typical childhood absence & Juvenile Myoclonic Epilepsy',
      },
      {
        id: 'broad-aed',
        label: 'Broad-Spectrum AEDs',
        description: 'Effective in both focal and generalised seizures',
      },
      {
        id: 'narrow-aed',
        label: 'Narrow-Spectrum AEDs & Interactions',
        description: 'Focal-only or absence-only agents + enzyme effects',
      },
    ],
    items: [
      {
        id: 'ep-1',
        label: 'Rising Epigastric Aura + Déjà Vu + Lip-Smacking Automatisms',
        detail: 'Accounts for ~60% of focal epilepsies',
        correctCategoryId: 'focal-semiology',
        rationale: 'Mesial temporal lobe seizures classically produce epigastric/déjà vu auras and oral/manual automatisms.',
      },
      {
        id: 'ep-2',
        label: 'Brief Nocturnal Motor Thrashing + Transient Post-Ictal Todd’s Paresis',
        detail: 'Minimal post-ictal confusion (~30% focal epilepsies)',
        correctCategoryId: 'focal-semiology',
        rationale: 'Frontal lobe seizures cluster at night and can leave transient unilateral Todd’s weakness.',
      },
      {
        id: 'ep-3',
        label: '10-Sec Staring Spell Provoked by 3-Min Hyperventilation (3 Hz Spike-Wave)',
        detail: 'No post-ictal confusion',
        correctCategoryId: 'gen-eeg',
        rationale: 'Typical childhood absence epilepsy demonstrates diagnostic 3 Hz generalised spike-and-wave discharges.',
      },
      {
        id: 'ep-4',
        label: 'Morning Myoclonic Jerks After Sleep Deprivation + Polyspike EEG',
        detail: 'Triad includes GTCS and occasional absences',
        correctCategoryId: 'gen-eeg',
        rationale: 'Juvenile Myoclonic Epilepsy (JME) typically causes morning myoclonus worsened by sleep deprivation.',
      },
      {
        id: 'ep-5',
        label: 'Sodium Valproate (Enzyme Inhibitor — High Teratogenicity)',
        detail: 'Associated with PCOS, weight gain, tremor, foetal valproate syndrome',
        correctCategoryId: 'broad-aed',
        rationale: 'Valproate is broad-spectrum and inhibits lamotrigine metabolism, but carries ~10% malformation + neurodevelopmental risk.',
      },
      {
        id: 'ep-6',
        label: 'Lamotrigine & Levetiracetam',
        detail: 'Preferred broad-spectrum choices in women of childbearing age',
        correctCategoryId: 'broad-aed',
        rationale: 'Both treat focal and generalised epilepsy with far lower teratogenic risk than valproate.',
      },
      {
        id: 'ep-7',
        label: 'Carbamazepine (CYP Inducer — Worsens Absence & Myoclonic Seizures)',
        detail: 'First-line focal epilepsy & trigeminal neuralgia; causes hyponatraemia',
        correctCategoryId: 'narrow-aed',
        rationale: 'Carbamazepine induces COCP/warfarin metabolism and aggravates generalised absence/JME seizures.',
      },
      {
        id: 'ep-8',
        label: 'Ethosuximide (Absence-Only Narrow Agent)',
        detail: 'Ineffective against focal or tonic-clonic seizures',
        correctCategoryId: 'narrow-aed',
        rationale: 'Ethosuximide selectively blocks thalamic T-type Ca2+ channels for pure childhood absence seizures.',
      },
    ],
  },
  {
    id: 'stroke-haemorrhage',
    title: 'Cerebrovascular Syndromes & Intracranial Bleeds Sorter',
    moduleId: 'stroke-vascular',
    instructions:
      'Place each clinical syndrome, imaging appearance, and acute treatment rule into its exact cerebrovascular category.',
    categories: [
      {
        id: 'ant-post',
        label: 'Anterior vs Posterior Ischaemic',
        description: 'Large-vessel cortical or brainstem infarcts',
      },
      {
        id: 'lacunar',
        label: 'Lacunar Syndromes (25%)',
        description: 'Deep perforating small-vessel infarcts without cortical signs',
      },
      {
        id: 'sah-cvst',
        label: 'SAH & CVST / Dissection',
        description: 'Vascular emergencies requiring specific angiography/LP/anticoagulation',
      },
      {
        id: 'sdh-edh',
        label: 'Subdural vs Extradural Haematoma',
        description: 'Crescent venous vs biconvex arterial extra-axial collections',
      },
    ],
    items: [
      {
        id: 'st-1',
        label: 'Amaurosis Fugax + Contralateral Hemiparesis + Dysphasia',
        detail: 'Carotid/MCA territory (~50% ischaemic strokes); CEA if >70% ICA',
        correctCategoryId: 'ant-post',
        rationale: 'Anterior circulation infarction combines retinal/hemispheric motor and cortical language or visual field deficits.',
      },
      {
        id: 'st-2',
        label: 'Pure Motor Hemiparesis (Face, Arm & Leg Equally) — No Aphasia/Hemianopia',
        detail: 'Posterior limb of internal capsule small-vessel occlusion',
        correctCategoryId: 'lacunar',
        rationale: 'Lacunar strokes lack cortical signs (no dysphasia, neglect, or visual field cuts).',
      },
      {
        id: 'st-3',
        label: 'Ataxic Hemiparesis & Pure Hemisensory Thalamic Stroke',
        detail: '2 of the 4 classic lacunar presentations',
        correctCategoryId: 'lacunar',
        rationale: 'Small deep perforators in pons/corona radiata/thalamus produce isolated motor, sensory, sensorimotor, or ataxic syndromes.',
      },
      {
        id: 'st-4',
        label: 'Thunderclap Headache + Negative CT -> LP at >=6–12h for Xanthochromia',
        detail: 'Prevent vasospasm with oral Nimodipine + IV hydration',
        correctCategoryId: 'sah-cvst',
        rationale: 'Delayed spectrophotometry detects bilirubin breakdown if early CT misses a Subarachnoid Haemorrhage.',
      },
      {
        id: 'st-5',
        label: 'Postpartum / OCP Headache + Seizures + Papilloedema -> Anticoagulate',
        detail: 'Diagnose with CTV or MRV',
        correctCategoryId: 'sah-cvst',
        rationale: 'Cerebral Venous Sinus Thrombosis requires anticoagulation even in the presence of venous haemorrhage.',
      },
      {
        id: 'st-6',
        label: 'Elderly Fluctuating Drowsiness Weeks After Minor Fall (Crescent CT)',
        detail: 'Torn cortical bridging veins crossing suture lines',
        correctCategoryId: 'sdh-edh',
        rationale: 'Chronic Subdural Haematoma produces concave crescent collections in atrophic brains.',
      },
      {
        id: 'st-7',
        label: 'Temporal Fracture + Lucid Interval -> Fixed Dilated Pupil (Biconvex CT)',
        detail: 'Middle meningeal artery rupture — neurosurgical emergency',
        correctCategoryId: 'sdh-edh',
        rationale: 'Extradural haematoma forms a lentiform/biconvex arterial collection limited by cranial sutures.',
      },
    ],
  },
  {
    id: 'pns-cord-lesions',
    title: 'Peripheral Nerve, Root & Spinal Cord Localizer Board',
    moduleId: 'cord-pns-muscle',
    instructions:
      'Assign each clinical sign or triad to the exact peripheral nerve, root, or spinal cord disorder.',
    categories: [
      {
        id: 'upper-pns',
        label: 'Upper Limb Nerve (Median / Ulnar / Radial)',
        description: 'Focal entrapment or spiral groove palsies',
      },
      {
        id: 'foot-drop',
        label: 'Common Peroneal vs L5 vs Sciatic',
        description: 'Lower limb foot drop localization',
      },
      {
        id: 'cord-tract',
        label: 'Spinal Cord Syndromes (Brown-Séquard / Syrinx / B12)',
        description: 'Distinctive dissociated or combined tract deficits',
      },
      {
        id: 'inherited-pns',
        label: 'CMT & Cauda Equina',
        description: 'Inherited champagne-bottle neuropathy vs surgical L1/2 emergency',
      },
    ],
    items: [
      {
        id: 'pn-1',
        label: 'Nocturnal Hand Tingling Relieved by Shaking + Thenar (APB) Wasting',
        detail: 'Tinel’s & Phalen’s positive',
        correctCategoryId: 'upper-pns',
        rationale: 'Carpal Tunnel Syndrome compresses the median nerve at the wrist, wasting abductor pollicis brevis.',
      },
      {
        id: 'pn-2',
        label: '1st Dorsal Interosseous Wasting + Froment’s + Medial 1.5 Finger Loss to Wrist',
        detail: 'Spares thenar eminence; cubital tunnel at elbow',
        correctCategoryId: 'upper-pns',
        rationale: 'Ulnar neuropathy wastes interossei while sparing median-supplied thenar muscles and stops at the wrist.',
      },
      {
        id: 'pn-3',
        label: 'Wrist Drop + 1st Dorsal Web Space Numbness with Intact Triceps Reflex',
        detail: 'Mid-shaft humeral fracture / Saturday night palsy',
        correctCategoryId: 'upper-pns',
        rationale: 'Spiral groove radial nerve compression spares proximal triceps branches.',
      },
      {
        id: 'pn-4',
        label: 'Painless Foot Drop + Weak Eversion + Normal Inversion & Normal Ankle Jerk',
        detail: 'Fibular neck compression (leg crossing / tight cast)',
        correctCategoryId: 'foot-drop',
        rationale: 'Common peroneal nerve palsy spares tibialis posterior (inversion) and tibial S1 ankle reflex.',
      },
      {
        id: 'pn-5',
        label: 'Sciatica + Foot Drop + Weak Inversion + Preserved Ankle Jerk',
        detail: 'Lumbar disc herniation compressing L5 nerve root',
        correctCategoryId: 'foot-drop',
        rationale: 'L5 supplies both ankle dorsiflexion (deep peroneal) and inversion via tibialis posterior (tibial).',
      },
      {
        id: 'pn-6',
        label: 'Cape-Like Pain/Temp Loss (Painless Burns) + Wasted Hands + Spastic Legs',
        detail: 'Associated with Arnold-Chiari Type I malformation',
        correctCategoryId: 'cord-tract',
        rationale: 'Cervical syringomyelia disrupts decussating spinothalamic fibres while sparing dorsal columns.',
      },
      {
        id: 'pn-7',
        label: 'Absent Ankle Jerks + Loss of Vibration/Position + Upgoing Plantars',
        detail: 'Vitamin B12 deficiency (SACD)',
        correctCategoryId: 'cord-tract',
        rationale: 'B12 SACD combines dorsal column, corticospinal UMN, and peripheral nerve pathology.',
      },
      {
        id: 'pn-8',
        label: 'Pes Cavus + Champagne-Bottle Legs + High-Stepping Gait (PMP22)',
        detail: 'Autosomal dominant; mild functional disability relative to wasting',
        correctCategoryId: 'inherited-pns',
        rationale: 'Charcot-Marie-Tooth (HMSN) causes chronic distal length-dependent wasting below mid-thigh.',
      },
      {
        id: 'pn-9',
        label: 'Saddle Anaesthesia (S2–S5) + Urinary Retention + Bilateral Sciatica',
        detail: 'Emergency MRI spine + urgent surgical decompression',
        correctCategoryId: 'inherited-pns',
        rationale: 'Cauda equina compression below L1/L2 is an acute surgical emergency.',
      },
    ],
  },
];

export const DRAG_DROP_BY_ID: Record<DragDropExerciseId, DragDropExercise> = Object.fromEntries(
  DRAG_DROP_EXERCISES.map((ex) => [ex.id, ex])
) as Record<DragDropExerciseId, DragDropExercise>;
