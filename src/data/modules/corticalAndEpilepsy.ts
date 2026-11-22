import { CurriculumModule } from '../../types/neurology';

export const corticalAndEpilepsyModules: CurriculumModule[] = [
  {
    id: 'cortical-consciousness',
    title: 'Higher Cortical Function & Consciousness',
    description:
      'Language localization, aphasia syndromes, dysarthria vs dysphonia, brainstem reticular activating system, GCS, and emergency coma assessment.',
    accentColor: '#4338CA',
    lectures: [
      {
        id: 'speech-aphasia',
        moduleId: 'cortical-consciousness',
        title: 'Speech, Language & Aphasia Localization',
        subtitle: 'Dominant hemisphere networks, Broca vs Wernicke vs Conductive vs Global aphasia, and bedside testing',
        sourcePdf: '5-_Speech_a816b3e9.pdf',
        overview:
          'Separates disorders of phonation (dysphonia), articulation (dysarthria), and language processing (dysphasia/aphasia), detailing dominant hemisphere networks and bedside speech examination.',
        keyConcepts: [
          'Hemispheric dominance (left in RH & 60–70% LH)',
          'Broca (IFG), Wernicke (STG), Arcuate fasciculus',
          'Dysphonia vs Dysarthria vs Aphasia',
          'Broca vs Wernicke vs Conductive vs Global aphasia',
          'Naming impaired in ALL aphasias (non-localising)',
        ],
        interactiveLabs: ['stroke-vascular'],
        sections: [
          {
            heading: 'Functional Neuroanatomy of Speech & Language',
            bullets: [
              'Hemispheric dominance: The left hemisphere is language-dominant in virtually all right-handed individuals and in 60–70% of left-handed individuals.',
              'Broca’s area (inferior frontal gyrus, posterior part): Motor speech production and grammatical expression.',
              'Wernicke’s area (superior temporal gyrus, posterior part): Auditory language comprehension.',
              'Arcuate fasciculus: White-matter tract linking Wernicke’s area to Broca’s area, essential for verbatim repetition.',
              'Motor execution pathways for speech articulation & phonation: Corticobulbar tracts, cerebellum, basal ganglia, and lower cranial nerves (CN X, XII).',
            ],
          },
          {
            heading: 'Phonation, Articulation & Language Distinction',
            bullets: [
              'Dysphonia: Abnormality of voice volume/quality (hoarseness, whisper) due to vocal cord/laryngeal or CN X recurrent laryngeal pathology; language and grammar intact.',
              'Dysarthria: Mechanical impairment of articulation/pronunciation due to weakness, spasticity, or incoordination of bulbar muscles (corticobulbar pseudobulbar, cerebellar scanning, extrapyramidal hypophonic, bulbar nasal/LMN, MG fatigable). Comprehension, reading, and writing are intact.',
              'Dysphasia / Aphasia: Disorder of higher cortical language comprehension and/or expression (usually dominant hemisphere MCA territory lesion).',
            ],
          },
          {
            heading: 'Aphasia Syndromes & Bedside Examination',
            bullets: [
              'Broca’s (Expressive / Non-fluent) aphasia: Effortful, telegraphic, non-fluent speech with impaired repetition, intact comprehension, and patient frustration/awareness (lesion: inferior frontal gyrus).',
              'Wernicke’s (Receptive / Fluent) aphasia: Fluent, grammatical-sounding speech packed with paraphasias and neologisms ("word salad"), severely impaired comprehension, impaired repetition, and lack of insight (lesion: superior temporal gyrus).',
              'Conductive aphasia: Fluent speech and intact comprehension, with disproportionately severe impairment of REPETITION (lesion: arcuate fasciculus).',
              'Global aphasia: Severe non-fluent output, poor comprehension, and absent repetition (large dominant hemisphere MCA infarct).',
              'Bedside exam sequence: 1) Spontaneous speech fluency; 2) Comprehension (open-ended questions and 1-, 2-, 3-step commands); 3) Repetition ("No ifs, ands, or buts"); 4) Naming (note: nominal dysphasia/anomia occurs in ALL types of aphasia and has NO specific localising value!); 5) Reading & writing.',
            ],
            callout: {
              variant: 'pearl',
              title: 'Naming Has No Localising Value',
              body: 'Word-finding difficulty (anomia) occurs in Broca’s, Wernicke’s, conductive, and global aphasia alike. Use fluency, comprehension, and repetition to localise.',
            },
          },
        ],
        tables: [
          {
            title: 'Aphasia Classification Matrix',
            headers: ['Aphasia Type', 'Fluency', 'Comprehension', 'Repetition', 'Anatomical Site'],
            rows: [
              ['Broca’s (Expressive)', 'Non-fluent', 'Intact', 'Impaired', 'Inferior frontal gyrus'],
              ['Wernicke’s (Receptive)', 'Fluent (jargon)', 'Impaired', 'Impaired', 'Superior temporal gyrus'],
              ['Conductive', 'Fluent', 'Intact', 'Impaired', 'Arcuate fasciculus'],
              ['Global', 'Non-fluent', 'Impaired', 'Impaired', 'Large dominant MCA territory'],
            ],
          },
        ],
        examPearls: [
          'Left hemisphere dominates language in ~95% of right-handers and 60–70% of left-handers.',
          'Always test repetition specifically to distinguish conductive aphasia (isolated repetition deficit with fluent speech and intact comprehension).',
        ],
      },
      {
        id: 'coma-unconsciousness',
        moduleId: 'cortical-consciousness',
        title: 'Coma & Impaired Consciousness: RAS, GCS & Emergency Care',
        subtitle: 'Arousal vs awareness, CNS vs metabolic/toxic causes, Glasgow Coma Scale, and acute resuscitation',
        sourcePdf: '8-_Coma_b80a1983.pdf',
        overview:
          'Defines consciousness via brainstem Reticular Activating System (RAS) arousal plus bilateral cortical awareness, replaces vague terms with objective GCS scoring (E4 V5 M6), categorises CNS vs systemic causes, and outlines emergency coma management.',
        keyConcepts: [
          'RAS arousal + bilateral cerebral cortex awareness',
          'Avoid vague terms ("stuporose", "obtunded")',
          'GCS (E4 V5 M6; coma <= 8)',
          'CNS vs Non-CNS (metabolic/toxic/hypoxic) causes',
          'Pinpoint pupils (opiate / pontine) & unilateral fixed dilated (III)',
          'ABCDE, bedside glucose, paracetamol screen, ABG, IV glucose/naloxone',
        ],
        interactiveLabs: ['gcs-reflex'],
        sections: [
          {
            heading: 'Physiology of Consciousness & Terminology',
            bullets: [
              'Consciousness requires two intact components: 1) Arousal/wakefulness (mediated by the brainstem Reticular Activating System [RAS] from pons/midbrain to thalamus) and 2) Awareness/content (mediated by intact bilateral cerebral hemispheres).',
              'A unilateral cerebral hemisphere lesion does NOT cause coma unless it exerts mass effect compressing the brainstem RAS or opposite hemisphere.',
              'Avoid imprecise clinical labels like "stuporose", "obtunded", or "semi-conscious" — always document exact Glasgow Coma Scale (GCS) components (E, V, M).',
            ],
          },
          {
            heading: 'Aetiology: CNS vs Non-CNS Causes',
            bullets: [
              'CNS structural/infective/epileptic causes: Traumatic brain injury (SDH, EDH, diffuse axonal injury), stroke (massive ICH, SAH, brainstem/basilar stroke), intracranial tumour with herniation, meningitis/encephalitis, non-convulsive or post-ictal status epilepticus.',
              'Non-CNS systemic causes: Metabolic (hypoglycaemia, DKA/HHS, hepatic/uraemic encephalopathy, hyponatraemia, myxoedema), Toxic/Drug overdose (opioids, benzodiazepines, alcohol, paracetamol/salicylates, tricyclics, CO), Hypoxia/Hypercapnia (respiratory failure), Hypothermia, Sepsis.',
            ],
          },
          {
            heading: 'Glasgow Coma Scale (GCS) & Focused Coma Examination',
            bullets: [
              'Eye Opening (E1–4): 4 Spontaneous, 3 To speech, 2 To pain, 1 None.',
              'Verbal Response (V1–5): 5 Oriented, 4 Confused, 3 Inappropriate words, 2 Incomprehensible sounds, 1 None.',
              'Motor Response (M1–6): 6 Obeys commands, 5 Localises pain, 4 Normal flexion/withdraws, 3 Abnormal flexion (decorticate), 2 Extension (decerebrate), 1 None.',
              'Score <= 8 indicates coma and inability to protect the airway (consider intubation). Minimum score = 3 (never 0); Maximum = 15.',
              'Pupillary clues: Unilateral fixed dilated pupil = CN III compression / uncal herniation; Bilateral pinpoint pupils = Opiate overdose or pontine haemorrhage; Midposition fixed = midbrain lesion.',
            ],
          },
          {
            heading: 'Immediate Emergency Management',
            bullets: [
              'ABCDE stabilisation first (airway protection if GCS <= 8, oxygen, cervical spine protection if trauma).',
              'Immediate capillary blood glucose -> if hypoglycaemic, give IV dextrose (plus IV thiamine if alcohol misuse/malnutrition suspected to prevent Wernicke’s encephalopathy).',
              'Urgent bloods: FBC, U&Es, LFTs, calcium, blood glucose, ABG, blood cultures, AND toxicology/paracetamol & salicylate screen (easily missed!).',
              'Specific antidotes/therapies: IV naloxone for opioid toxicity (pinpoint pupils + respiratory depression), IV anticonvulsants for seizures, urgent CT head once stabilised, IV ceftriaxone + acyclovir if CNS infection suspected.',
            ],
            callout: {
              variant: 'warning',
              title: 'Never Forget Bedside Glucose & Paracetamol Screen',
              body: 'Hypoglycaemia is rapidly reversible yet lethal if missed; always check bedside glucose immediately and include a paracetamol level in unexplained coma.',
            },
          },
        ],
        tables: [
          {
            title: 'Glasgow Coma Scale (GCS) Reference (Total 3–15)',
            headers: ['Score', 'Eye Opening (E)', 'Verbal Response (V)', 'Best Motor Response (M)'],
            rows: [
              ['6', '—', '—', 'Obeys commands'],
              ['5', '—', 'Oriented', 'Localises to pain'],
              ['4', 'Spontaneous', 'Confused', 'Normal flexion (withdrawal)'],
              ['3', 'To speech / sound', 'Inappropriate words', 'Abnormal flexion (decorticate)'],
              ['2', 'To pain / pressure', 'Incomprehensible sounds', 'Extension (decerebrate)'],
              ['1', 'None', 'None', 'None'],
            ],
          },
        ],
        examPearls: [
          'Coma requires either bilateral cortical dysfunction OR a brainstem RAS lesion; record E/V/M sub-scores rather than words like "obtunded".',
          'GCS <= 8 defines coma and signals urgent airway assessment.',
        ],
      },
    ],
  },
  {
    id: 'epilepsy-series',
    title: 'Epilepsy & Seizure Disorders',
    description:
      'Complete 6-part clinical series covering seizure semiology, differential diagnosis from syncope/NEAD, EEG & imaging, AED pharmacology & surgery, status epilepticus, and driving/pregnancy.',
    accentColor: '#7C3AED',
    lectures: [
      {
        id: 'epilepsy-1',
        moduleId: 'epilepsy-series',
        title: 'Epilepsy I: Definitions, Epidemiology & Seizure Semiology',
        subtitle: 'ILAE 2017 classification, focal lobe semiology, Todd’s paresis, and generalised seizure syndromes',
        sourcePdf: '4-_Epilepsy-I_b71089d5.pdf',
        overview:
          'Distinguishes an isolated epileptic seizure from epilepsy, details incidence/prevalence and identifiable causes, and maps ILAE 2017 focal vs generalised seizure types including Juvenile Myoclonic Epilepsy.',
        keyConcepts: [
          'Seizure vs Epilepsy definition',
          'Incidence 50–120/100k; Prevalence 4–10/1000; 25% specific cause',
          'ILAE 2017: Focal vs Generalised vs Unknown onset',
          'Temporal (60%) & Frontal (30%, Todd’s paresis) semiology',
          'Typical vs Atypical absence & Myoclonic / JME',
        ],
        dragDropId: 'epilepsy-aeds',
        sections: [
          {
            heading: 'Definitions & Epidemiology',
            bullets: [
              'Epileptic seizure: Transient occurrence of signs/symptoms due to abnormal excessive or synchronous neuronal activity in the brain.',
              'Epilepsy: Tendency to have recurrent unprovoked epileptic seizures (>= 2 unprovoked seizures >24h apart, or 1 unprovoked seizure with >=60% recurrence risk).',
              'Incidence: 50–120 per 100,000/year; Prevalence: 4–10 per 1,000 population.',
              'Only ~25% have an identifiable structural/metabolic/genetic cause (e.g., mesial temporal sclerosis, vascular lesion/stroke, tumour, trauma, cortical dysplasia); ~75% have no specific structural cause found.',
            ],
          },
          {
            heading: 'Focal-Onset Seizures (ILAE 2017)',
            bullets: [
              'Subclassified by awareness: Focal aware (formerly simple partial) vs Focal impaired awareness (formerly complex partial), plus progression to Focal-to-bilateral tonic-clonic.',
              'Temporal lobe (60% of focal epilepsies): Rising epigastric aura, déjà vu/jamais vu, olfactory/gustatory hallucinations, fear, lip-smacking/picking automatisms, post-ictal confusion.',
              'Frontal lobe (30%): Brief, nocturnal, clustered motor seizures (bicycling, fencing posture, head/eye version), minimal post-ictal confusion, and Todd’s paresis (transient post-ictal limb weakness mimicking stroke).',
              'Parietal lobe (<10%): Contralateral paraesthesias/tingling or distortion of body image.',
              'Occipital lobe (<10%): Elementary visual hallucinations (flashing lights, coloured spots).',
            ],
          },
          {
            heading: 'Generalised-Onset Seizures',
            bullets: [
              'Tonic-clonic: Sudden loss of consciousness -> tonic stiffening (cry, apnoea, cyanosis) -> rhythmic clonic jerking (+/- tongue biting lateral border, incontinence) -> post-ictal drowsiness, headache, myalgia.',
              'Typical absence (childhood): Brief 5–15 sec staring spells with abrupt onset/offset, eyelid fluttering, NO post-ictal confusion, easily provoked by hyperventilation; 3 Hz spike-and-wave on EEG.',
              'Atypical absence: Longer duration, gradual onset/offset, often with tone changes and underlying developmental delay/Lennox-Gastaut.',
              'Myoclonic: Brief shock-like muscle jerks, predominantly morning awakening. Juvenile Myoclonic Epilepsy (JME): Triad of morning myoclonic jerks, generalised tonic-clonic seizures, and occasional absences; triggered by sleep deprivation/alcohol.',
              'Tonic (sustained stiffening, falls) and Atonic ("drop attacks" with sudden loss of postural tone).',
            ],
          },
        ],
        tables: [
          {
            title: 'Focal Seizure Localization by Cerebral Lobe',
            headers: ['Lobe', 'Proportion', 'Characteristic Aura / Semiology'],
            rows: [
              ['Temporal', '~60%', 'Epigastric rising aura, déjà vu, olfactory hallucination, oral/manual automatisms, post-ictal confusion'],
              ['Frontal', '~30%', 'Brief nocturnal motor thrashing/posturing, rapid recovery, Todd’s paresis'],
              ['Parietal', '<10%', 'Contralateral somatosensory tingling/numbness'],
              ['Occipital', '<10%', 'Flashing lights, scotomas, elementary visual hallucinations'],
            ],
          },
        ],
        examPearls: [
          'Temporal lobe epilepsy accounts for ~60% of focal epilepsies; frontal lobe seizures are characteristically brief, nocturnal, and may leave Todd’s paresis.',
          'Juvenile Myoclonic Epilepsy classically causes morning myoclonic jerks (dropping breakfast cup) after sleep deprivation.',
        ],
      },
      {
        id: 'epilepsy-2',
        moduleId: 'epilepsy-series',
        title: 'Epilepsy II: Clinical Diagnosis, Syncope & Differential Diagnosis',
        subtitle: 'Eyewitness history structure, Faint vs Fit differentiation, and Non-Epileptic Attack Disorder',
        sourcePdf: '5-_Epilepsy-II_a559c0be.pdf',
        overview:
          'Emphasizes that epilepsy is a clinical diagnosis built on before/during/after eyewitness history, carefully distinguishing seizures from vasovagal/cardiac syncope, NEAD (PNES), migraine, TIA, and hypoglycaemia.',
        keyConcepts: [
          'Clinical diagnosis & essential eyewitness account',
          'Before / During / After event history framework',
          'Syncope subtypes: vasovagal, postural, cardiac',
          'Faint vs Fit table (lateral tongue bite, cyanosis, recovery)',
          'Non-Epileptic Attack Disorder (NEAD / PNES)',
        ],
        sections: [
          {
            heading: 'Epilepsy Is a Clinical Diagnosis',
            bullets: [
              'No single test diagnoses epilepsy; diagnosis rests on an accurate history from BOTH the patient and an eyewitness.',
              'Structure history around Before (triggers: standing, pain, sleep deprivation, aura), During (colour, eye state, movement symmetry, tongue biting, incontinence, duration), and After (immediate recovery vs prolonged post-ictal confusion/sleepiness/myalgia).',
            ],
          },
          {
            heading: 'Syncope & Faint vs Fit Differentiation',
            bullets: [
              'Syncope causes transient global cerebral hypoperfusion: Vasovagal (prolonged standing, heat, pain, fear), Postural/orthostatic hypotension (elderly, antihypertensives, autonomic neuropathy), Cardiac syncope (arrhythmias, aortic stenosis — sudden exertional collapse without warning -> urgent ECG!).',
              'Convulsive syncope trap: Brief myoclonic jerks (<15–20 sec) and urinary incontinence CAN occur in a simple faint if the patient is held upright, so brief jerking alone does not prove epilepsy.',
              'Key discriminators favouring Seizure: Occurrence while lying flat/asleep, blue/cyanosed face, lateral tongue biting, prolonged post-ictal confusion (>10–15 min) and deep sleep/headache afterward.',
              'Key discriminators favouring Syncope: Triggered standing/warm room, prodromal nausea/sweating/tunnel vision/pallor, brief loss of consciousness (<1–2 min), rapid orientation on waking.',
            ],
          },
          {
            heading: 'Non-Epileptic Attack Disorder (NEAD) & Other Mimics',
            bullets: [
              'NEAD (Psychogenic Non-Epileptic Seizures): Paroxysmal episodes resembling seizures without cortical epileptiform EEG discharge. Clues: Gradual onset, fluctuating/prolonged duration (>5–10 min), pelvic thrusting, side-to-side head shaking, tightly closed eyes resisting opening, asynchronous thrashing, crying, rapid recovery without post-ictal confusion.',
              'Other mimics: Hypoglycaemia, TIA/hemiplegic migraine, panic attacks, paroxysmal movement disorders, REM sleep behaviour disorder.',
            ],
            callout: {
              variant: 'warning',
              title: 'Always Exclude Cardiac Syncope',
              body: 'Exertional syncope, sudden unheralded collapse, palpitations, or family history of sudden cardiac death requires urgent 12-lead ECG and cardiology assessment.',
            },
          },
        ],
        tables: [
          {
            title: 'Faint (Syncope) vs Fit (Generalised Seizure)',
            headers: ['Clinical Feature', 'Syncope (Faint)', 'Epileptic Seizure (Fit)'],
            rows: [
              ['Posture / Trigger', 'Usually standing/sitting; heat, fear, venepuncture', 'Any posture (including supine/asleep); sleep deprivation'],
              ['Prodrome', 'Light-headedness, nausea, sweating, grey-out vision', 'None or brief stereotypic focal aura (déjà vu, rising epigastric)'],
              ['Facial Colour', 'Pale / grey', 'Cyanosed / dusky blue'],
              ['Convulsive Movements', 'Absent or brief irregular jerks (<15 sec)', 'Sustained tonic stiffness followed by rhythmic clonic jerks'],
              ['Tongue Biting', 'Rare (if present, usually tip)', 'Classic lateral border of tongue'],
              ['Recovery', 'Rapid (<1–2 min), alert quickly', 'Prolonged post-ictal confusion, drowsiness, headache, myalgia'],
            ],
          },
        ],
        examPearls: [
          'Brief jerks and urinary incontinence can occur in vasovagal syncope (especially if held upright); rapid recovery and prodromal pallor/sweating point to syncope.',
          'Tightly closed eyes resisting opening, waxing-and-waning thrashing, and pelvic thrusting suggest NEAD.',
        ],
      },
      {
        id: 'epilepsy-3',
        moduleId: 'epilepsy-series',
        title: 'Epilepsy III: Investigation (EEG, MRI, SPECT & PET)',
        subtitle: 'Sensitivity/specificity of routine vs sleep EEG, activation procedures, and pre-surgical imaging',
        sourcePdf: '6-_Epilepsy-III_9416d9cb.pdf',
        overview:
          'Covers the diagnostic yield and pitfalls of EEG modalities, characteristic EEG signatures (3 Hz spike-and-wave, polyspike-and-wave), superiority of MRI over CT, and functional imaging for epilepsy surgery.',
        keyConcepts: [
          'Routine EEG yield 30–40%; Sleep-deprived 70–80%',
          '4% false-positive epileptiform EEG in healthy normals',
          'Hyperventilation (3 min) & photic stimulation',
          '3 Hz spike-and-wave (absence) & polyspike (JME)',
          'MRI brain superiority & SPECT/PET pre-surgical workup',
        ],
        sections: [
          {
            heading: 'Electroencephalography (EEG) Yield & Pitfalls',
            bullets: [
              'Routine interictal EEG sensitivity: Only 30–40% after a first seizure; repeating or performing sleep-deprived EEG raises yield to 70–80%.',
              'False positives: Up to 4% of healthy people without epilepsy show incidental epileptiform discharges — therefore EEG must NEVER be used in isolation to diagnose epilepsy.',
              'Activation procedures: Hyperventilation for 3 minutes (provokes 3 Hz spike-and-wave in childhood absence epilepsy) and intermittent photic stimulation (detects photosensitivity, common in JME).',
              'Modalities: Routine (20–30 min), Sleep-deprived EEG, Ambulatory 24–72h EEG, and Inpatient Video-Telemetry (gold standard to capture habitual attacks and correlate clinical semiology with EEG, distinguishing epilepsy from NEAD and localising surgical focus).',
              'Classic EEG patterns: 3 Hz generalised spike-and-wave (Typical absence); Generalised polyspike-and-wave (JME); Focal sharp waves/spikes (focal epilepsy); Burst-suppression / continuous monitoring in ICU status epilepticus under general anaesthesia.',
            ],
          },
          {
            heading: 'Structural & Functional Neuroimaging',
            bullets: [
              'MRI Brain (dedicated epilepsy protocol): Investigation of choice to detect mesial temporal (hippocampal) sclerosis, cortical dysplasia, cavernomas, low-grade tumours, and focal scarring. Superior to CT, which often misses subtle epileptogenic lesions.',
              'CT Head: Reserved for acute emergency seizures (ruling out acute bleed, trauma, or large mass) or when MRI is contraindicated.',
              'Functional imaging (Pre-surgical evaluation): Ictal SPECT (shows focal hyperperfusion during seizure) and interictal FDG-PET (shows focal hypometabolism) help localise the epileptogenic zone when MRI is equivocal.',
            ],
          },
        ],
        examPearls: [
          'A normal routine EEG does NOT exclude epilepsy (only 30–40% sensitive interictally); sleep EEG boosts detection to 70–80%.',
          'Typical absence seizures produce 3 Hz generalised spike-and-wave discharges triggered by 3 minutes of hyperventilation.',
        ],
      },
      {
        id: 'epilepsy-4',
        moduleId: 'epilepsy-series',
        title: 'Epilepsy IV: Anti-Epileptic Drugs & Epilepsy Surgery',
        subtitle: 'When to start/stop AEDs, broad vs narrow spectrum drugs, enzyme interactions, toxicities, and surgical outcomes',
        sourcePdf: '7-_Epilepsy-IV_cd073a93.pdf',
        overview:
          'Covers the holistic four-pillar epilepsy management plan (Explain, Drug, Surgery, Monitor), monotherapy principles, exact spectrum and adverse-effect profiles of all key AEDs, hepatic enzyme interactions, drug level monitoring, withdrawal after >=2 years, and surgical options.',
        keyConcepts: [
          'Do not routinely treat a single unprovoked seizure',
          'Monotherapy first; dual therapy improves only 10–15%',
          'Broad-spectrum vs Narrow focal vs Narrow absence AEDs',
          'Valproate teratogenicity/PCOS; Carbamazepine hyponatraemia; Levetiracetam mood',
          'Enzyme inducers (CBZ, PHT, PB) vs Valproate (inhibitor)',
          'AED withdrawal after >=2 yr seizure-free & temporal resection (40–87%)',
        ],
        dragDropId: 'epilepsy-aeds',
        sections: [
          {
            heading: 'Core Management Principles',
            bullets: [
              'Four pillars: Explain diagnosis & safety/driving, Drug therapy (AEDs), Surgery (if refractory), and Long-term Monitoring.',
              'Single seizure rule: Do NOT routinely start an AED after a single unprovoked seizure unless high recurrence risk exists (structural MRI lesion, epileptiform EEG, or nocturnal/focal neurological deficit).',
              'Monotherapy first: ~50% become seizure-free on first monotherapy, ~15% on second monotherapy; adding a second drug (dual therapy) achieves control in only 10–15% more while increasing toxicity.',
              'Stopping AEDs: Consider gradual withdrawal (over months) after >= 2 years completely seizure-free, weighing relapse risk (~20–40%) and driving implications.',
              'Blood drug levels: Only useful for checking adherence, suspected toxicity (especially phenytoin’s zero-order kinetics!), or pregnancy clearance changes — treat the patient, not the serum level.',
            ],
          },
          {
            heading: 'AED Spectrum & Key Pharmacology',
            bullets: [
              'Broad-spectrum AEDs (Focal AND Generalised seizures): Sodium Valproate (highly effective in generalised/JME, but severe teratogenicity, PCOS, weight gain, tremor, hair loss, hepatotoxicity — avoid in women of childbearing potential!), Lamotrigine (rash/SJS on rapid titration, slow up-titration), Levetiracetam (mood/irritability/rare psychosis, minimal drug interactions), Topiramate (weight loss, cognitive slowing/word-finding, paraesthesia, renal stones, acute angle-closure glaucoma), Zonisamide (stones, weight loss).',
              'Narrow-spectrum Focal AEDs (can WORSEN generalised absence/myoclonic seizures!): Carbamazepine & Oxcarbazepine (diplopia/ataxia, rash/HLA-B*1502, hyponatraemia, enzyme inducer), Lacosamide (PR prolongation), Phenytoin (gum hypertrophy, hirsutism, ataxia, osteomalacia, Stevens-Johnson, zero-order kinetics), Phenobarbitone / Primidone (sedation, behavioural effects), Tiagabine.',
              'Narrow-spectrum Absence AED: Ethosuximide (selective for childhood absence seizures; GI upset, hiccups; ineffective for tonic-clonic seizures).',
              'Adjuncts / Myoclonus / Rescue: Piracetam (myoclonus), Benzodiazepines (Clobazam, Clonazepam, Lorazepam/Diazepam for rescue — tolerance limits chronic use).',
              'Enzyme interactions: Carbamazepine, Phenytoin, Phenobarbitone, and Primidone are potent CYP450 INDUCERS (accelerate clearance of warfarin, COCP, steroids, lamotrigine). Sodium Valproate is an enzyme INHIBITOR (raises lamotrigine and warfarin levels!).',
            ],
            callout: {
              variant: 'warning',
              title: 'Carbamazepine Worsens Absence & Myoclonic Seizures',
              body: 'Narrow-spectrum sodium-channel blockers like carbamazepine, oxcarbazepine, and phenytoin are first-line for focal seizures but can paradoxically exacerbate generalised absence and myoclonic (JME) seizures.',
            },
          },
          {
            heading: 'Epilepsy Surgery',
            bullets: [
              'Indicated for drug-resistant focal epilepsy (failure of >=2 appropriately chosen AEDs).',
              'Anterior temporal lobe resection (for mesial temporal sclerosis) is the most common procedure, yielding 40–87% seizure freedom.',
              'Palliative/other procedures: Vagus Nerve Stimulation (VNS), corpus callosotomy (drop attacks), lesionectomy, hemispherectomy.',
            ],
          },
        ],
        tables: [
          {
            title: 'High-Yield Anti-Epileptic Drug (AED) Quick Reference',
            headers: ['AED', 'Spectrum', 'Key Side Effects & Exam Pearls', 'Enzyme Effect'],
            rows: [
              ['Sodium Valproate', 'Broad (1st line men/generalised)', 'Teratogenic (NTD/neurodev), PCOS, weight gain, tremor, hair loss, hepatotoxicity', 'Inhibitor'],
              ['Lamotrigine', 'Broad (1st line women/focal)', 'Stevens-Johnson rash (titrate slowly), insomnia', 'Neutral (cleared faster by inducers/valproate inhibits)'],
              ['Levetiracetam', 'Broad', 'Irritability, depression, rare psychosis; few interactions', 'Neutral'],
              ['Topiramate', 'Broad (+ migraine prophylaxis)', 'Weight loss, renal stones, word-finding difficulty, teratogenic', 'Weak inducer at high dose'],
              ['Carbamazepine', 'Focal ONLY (worsens absence/JME)', 'Hyponatraemia, diplopia, ataxia, rash', 'Potent Inducer'],
              ['Phenytoin', 'Focal & Status (IV)', 'Gingival hyperplasia, hirsutism, ataxia, zero-order kinetics', 'Potent Inducer'],
              ['Ethosuximide', 'Typical Absence ONLY', 'GI upset, lethargy; does NOT protect against GTCS', 'Neutral'],
            ],
          },
        ],
        examPearls: [
          'Valproate inhibits lamotrigine metabolism (raising rash risk); carbamazepine and phenytoin induce warfarin and oral contraceptive metabolism.',
          'Consider AED withdrawal only after >=2 years seizure-free; temporal lobectomy achieves 40–87% seizure freedom in refractory TLE.',
        ],
      },
      {
        id: 'epilepsy-5',
        moduleId: 'epilepsy-series',
        title: 'Epilepsy V: Status Epilepticus Emergency Protocol',
        subtitle: '5-minute operational definition, 20% mortality, precipitants, and staged pharmacological escalation',
        sourcePdf: '8-_Epilepsy-V_925d8226.pdf',
        overview:
          'Details the medical emergency of Status Epilepticus (>5 minutes continuous seizure or recurrent seizures without recovery), common triggers, 20% mortality rate, and time-critical staged treatment through ICU anaesthesia.',
        keyConcepts: [
          'Operational definition: >5 minutes continuous seizure',
          'Mortality ~20%; incidence 18–28/100,000',
          'Common precipitants (AED non-adherence, alcohol, stroke, CNS infection)',
          'Stage 1 ABC + Dextrose/Thiamine + Lorazepam/Diazepam',
          'Stage 2 IV Phenytoin / Fosphenytoin / Valproate / Levetiracetam',
          'Stage 3 ICU Anaesthesia (Propofol/Thiopental/Midazolam) + EEG',
        ],
        sections: [
          {
            heading: 'Definition, Epidemiology & Precipitants',
            bullets: [
              'Status Epilepticus: Continuous seizure activity lasting >5 minutes OR >=2 sequential seizures without full recovery of consciousness in between (historical 30-min definition replaced clinically by 5 min to prevent neuronal injury).',
              'Epidemiology: Incidence 18–28 per 100,000/year; overall mortality ~20% (higher in elderly and hypoxic/stroke aetiologies).',
              'Precipitants: Abrupt AED withdrawal or poor adherence (most common in known epilepsy), alcohol withdrawal, acute stroke, CNS infection (meningitis/encephalitis), metabolic derangement (hypoglycaemia, hyponatraemia), head trauma, tumour, overdose.',
            ],
          },
          {
            heading: 'Staged Emergency Management Protocol',
            bullets: [
              '0–5 min (Immediate Stabilisation): ABCDE, high-flow oxygen, secure IV access, check capillary glucose & send bloods (U&Es, Ca, Mg, glucose, LFTs, AED levels, toxicology). Give IV dextrose (50 mL 50% or 10%) if hypoglycaemic + IV thiamine (Pabrinex) if alcohol/malnutrition suspected.',
              '5–20 min (Early / Stage 1 — Benzodiazepines): IV Lorazepam 4 mg slow bolus (or IV Diazepam 10 mg; pre-hospital buccal midazolam 10 mg or rectal diazepam); repeat once after 5–10 min if seizing continues.',
              '20–40 min (Established / Stage 2 — Non-sedating IV AED): IV Phenytoin infusion (15–20 mg/kg with ECG/BP monitoring for arrhythmias/hypotension) OR Fosphenytoin OR IV Sodium Valproate OR IV Levetiracetam.',
              '>40–60 min (Refractory / Stage 3 — ICU General Anaesthesia): Intubate, ventilate, and infuse Propofol, Thiopental, or Midazolam titrated to burst-suppression on continuous ICU EEG monitoring.',
            ],
            callout: {
              variant: 'warning',
              title: 'Treat at 5 Minutes — Do Not Wait 30 Minutes',
              body: 'Every minute of convulsive status increases neuronal excitotoxicity, hyperthermia, rhabdomyolysis, and mortality (~20%).',
            },
          },
        ],
        examPearls: [
          'Give IV thiamine alongside glucose in suspected alcohol-related status epilepticus to prevent precipitating Wernicke’s encephalopathy.',
          'Refractory status (>40–60 min) requires ICU intubation, general anaesthesia (propofol/thiopental/midazolam), and continuous EEG monitoring.',
        ],
      },
      {
        id: 'epilepsy-6',
        moduleId: 'epilepsy-series',
        title: 'Epilepsy VI: Social Aspects, Driving, SUDEP & Women’s Health',
        subtitle: 'DVLA driving rules, SUDEP counselling, teratogenicity rates, folic acid, vitamin K, and contraception',
        sourcePdf: '9-_Epilepsy-VI_a618a5b6.pdf',
        overview:
          'Covers essential psychosocial and regulatory counselling in epilepsy: stigma/employment/bath-vs-shower safety, UK/DVLA driving restrictions, SUDEP risk, teratogenicity statistics by polytherapy, folic acid 5 mg, vitamin K, breastfeeding, and contraception interactions.',
        keyConcepts: [
          'Driving rules: 1yr car, 3yr sleep-only, 10yr off AEDs HGV, 6mo single',
          'SUDEP definition & risk reduction',
          'Teratogenicity: 1–3% baseline, 6% mono, 9% dual, 20% poly',
          'Foetal valproate syndrome & 5 mg folic acid',
          '1 mg IM Vitamin K newborn (enzyme-inducing AEDs)',
          'COCP >=50 mcg oestrogen / avoid POP with inducers',
        ],
        sections: [
          {
            heading: 'Lifestyle, Safety, Stigma & SUDEP',
            bullets: [
              'Psychosocial impact: Stigma, employment restrictions (working at heights, heavy machinery, armed forces), and mood comorbidity.',
              'Practical safety: Showers instead of baths (drowning risk!), avoid swimming alone, avoid unprotected heights.',
              'SUDEP (Sudden Unexpected Death in Epilepsy): Non-traumatic, non-drowning sudden death in a patient with epilepsy where post-mortem reveals no structural/toxicological cause. Risk factors: poorly controlled GTCS, nocturnal seizures, non-adherence; optimal seizure control reduces risk.',
            ],
          },
          {
            heading: 'UK Driving Regulations (Group 1 Car vs Group 2 HGV/Bus)',
            bullets: [
              'Single unprovoked seizure (Group 1 Car/Motorcycle): 6 months off driving (provided normal imaging/EEG; 12 months if high-risk structural/EEG abnormality).',
              'Established Epilepsy (Group 1 Car): Must be 1 year completely seizure-free (awake OR asleep).',
              'Sleep-only seizures exception (Group 1): Allowed to drive if seizures have occurred EXCLUSIVELY during sleep for >= 3 years.',
              'Group 2 (HGV / Bus): Must be 10 years seizure-free AND OFF all anti-epileptic medication (5 years for single unprovoked seizure off AEDs).',
            ],
          },
          {
            heading: 'Women with Epilepsy: Contraception & Pregnancy',
            bullets: [
              'Contraception: Enzyme-inducing AEDs (carbamazepine, phenytoin, phenobarbitone, topiramate high-dose) reduce oestrogen/progestogen levels. Avoid progestogen-only pill (POP) and implants; if using COCP, require >= 50 mcg ethinylestradiol + tricycling/barrier, or prefer IUD/IUS (Mirena) or depot medroxyprogesterone.',
              'Teratogenicity rates: General population baseline 1–3%; AED monotherapy ~6%; dual therapy ~9%; polytherapy (3+ drugs) up to ~20% (highest with Sodium Valproate -> neural tube defects, facial dysmorphism, neurodevelopmental delay).',
              'Pre-conception & Pregnancy care: Folic acid 5 mg/day pre-conception through first trimester; aim for lowest effective monotherapy dose (avoid valproate; lamotrigine/levetiracetam preferred); monitor lamotrigine levels (clearance increases in pregnancy); never stop AEDs abruptly (status risk to foetus > drug risk).',
              'Delivery & Postpartum: Give 1 mg IM Vitamin K to the newborn if mother takes enzyme-inducing AEDs to prevent haemorrhagic disease of the newborn. Breastfeeding is strongly encouraged (minor sedation monitored with phenobarbitone/benzodiazepines).',
            ],
          },
        ],
        tables: [
          {
            title: 'Epilepsy Driving Rules & Pregnancy Risk Summary',
            headers: ['Scenario', 'Rule / Risk Metric'],
            rows: [
              ['Group 1 Car — Established Epilepsy', '1 year seizure-free'],
              ['Group 1 Car — Exclusively Sleep Seizures', '3 years exclusively asleep'],
              ['Group 1 Car — Single Unprovoked Seizure', '6 months (if low recurrence risk)'],
              ['Group 2 HGV/Bus — Epilepsy', '10 years seizure-free OFF all AEDs'],
              ['Major Congenital Malformation Risk', 'Baseline 1–3% -> Mono ~6% -> Dual ~9% -> Poly ~20%'],
            ],
          },
        ],
        examPearls: [
          'Major malformation risk climbs steeply from 1–3% baseline to ~6% monotherapy, ~9% dual therapy, and ~20% polytherapy (highest with valproate).',
          'Group 1 driving requires 1 year seizure-free (or 3 years sleep-only); Group 2 HGV requires 10 years seizure-free OFF all AEDs.',
        ],
      },
    ],
  },
];
