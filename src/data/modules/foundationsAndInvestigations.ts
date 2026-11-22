import { CurriculumModule } from '../../types/neurology';

export const foundationsAndInvestigationsModules: CurriculumModule[] = [
  {
    id: 'foundations-neuroanatomy',
    title: 'Foundations & Neurological Examination',
    description:
      'Core CNS/PNS architecture, cerebral lobes, ascending/descending tracts, UMN vs LMN localization, and essential bedside examination technique.',
    accentColor: '#1E40AF',
    lectures: [
      {
        id: 'basic-neuroanatomy-1',
        moduleId: 'foundations-neuroanatomy',
        title: 'Basic Neuroanatomy I: CNS/PNS, Lobes, Cord & UMN vs LMN',
        subtitle: 'Structural organization of the nervous system and motor pathway localization',
        sourcePdf: '1-_Basic_neuroanatomy__I_fcd84818.pdf',
        overview:
          'Establishes the anatomical division between central and peripheral nervous systems, cerebral lobe functions, brainstem organization, spinal cord levels, nerve roots, and the foundational distinction between Upper Motor Neurone (UMN) and Lower Motor Neurone (LMN) lesions.',
        keyConcepts: [
          'CNS vs PNS components',
          'Cerebral lobes & functions',
          'Brainstem divisions & CN origins',
          'Spinal cord termination at L1',
          'Dorsal vs Ventral roots',
          'UMN vs LMN syndrome differentiation',
        ],
        interactiveLabs: ['brainstem-atlas', 'spinal-tracts'],
        dragDropId: 'umn-lmn-nmj',
        sections: [
          {
            heading: 'Central vs Peripheral Nervous System Divisions',
            summary:
              'Accurate neurological localization starts by separating central structures from peripheral effector pathways.',
            bullets: [
              'Central Nervous System (CNS): Brain (cerebral hemispheres, brainstem, cerebellum), spinal cord, and covering meninges.',
              'Peripheral Nervous System (PNS): Cranial and spinal nerve roots (including the cauda equina below L1), nerve plexuses (brachial and lumbosacral), peripheral nerves, the neuromuscular junction (NMJ), and skeletal muscles.',
              'Brainstem divides into Midbrain, Pons, and Medulla oblongata; cranial nerves I–XII emerge sequentially across the forebrain and brainstem.',
            ],
          },
          {
            heading: 'Cerebral Lobes & Functional Localization',
            bullets: [
              'Frontal lobe: Voluntary motor control (precentral gyrus / primary motor cortex), expressive speech (Broca’s area in the inferior frontal gyrus of the dominant hemisphere), executive judgment, and emotion/personality.',
              'Parietal lobe: Somatosensory processing (postcentral gyrus), spatial awareness, and cortical sensory integration.',
              'Temporal lobe: Memory consolidation (hippocampus), auditory processing, and language comprehension (Wernicke’s area in the superior temporal gyrus).',
              'Occipital lobe: Primary and associative visual processing.',
            ],
            callout: {
              variant: 'localisation',
              title: 'Hemispheric Contralateral Rule',
              body: 'Primary motor and sensory cortices represent the contralateral half of the body; damage above the medullary pyramidal decussation produces contralateral weakness.',
            },
          },
          {
            heading: 'Spinal Cord & Nerve Root Anatomy',
            bullets: [
              'Spinal cord segments: Cervical (8), Thoracic (12), and Lumbar/Sacral; the adult spinal cord terminates at the conus medullaris around vertebral level L1.',
              'Cauda equina: Collection of lumbosacral nerve roots descending below L1 within the lumbar cistern.',
              'Dorsal (posterior) root: Sensory fibres entering the posterior horn of the spinal cord (cell bodies in dorsal root ganglion).',
              'Ventral (anterior) root: Motor fibres exiting the anterior horn to innervate skeletal muscle.',
            ],
          },
          {
            heading: 'Upper Motor Neurone (UMN) vs Lower Motor Neurone (LMN)',
            summary:
              'Distinguishing UMN (brain/spinal cord corticospinal tract) from LMN (anterior horn cell to muscle) lesions is the cornerstone of motor localisation.',
            bullets: [
              'UMN pathway runs from motor cortex through internal capsule and brainstem to synapse on anterior horn cells (or cranial nerve nuclei).',
              'LMN pathway runs from anterior horn cell (or brainstem motor nucleus) via ventral root, plexus, and peripheral nerve to muscle.',
              'UMN lesions yield increased tone (spasticity/clasp-knife), brisk deep tendon reflexes, extensor (upgoing) plantar responses (Babinski+), and NO significant muscle wasting or fasciculations (disuse atrophy only late).',
              'LMN lesions yield reduced tone (flaccidity), absent or reduced reflexes, marked muscle wasting, visible fasciculations, and flexor (downgoing) or absent plantar responses.',
            ],
          },
        ],
        tables: [
          {
            title: 'UMN vs LMN Clinical Signs Comparison',
            headers: ['Clinical Sign', 'Upper Motor Neurone (UMN)', 'Lower Motor Neurone (LMN)'],
            rows: [
              ['Anatomical Site', 'Motor cortex, internal capsule, brainstem, spinal cord tracts', 'Anterior horn cell, root, plexus, peripheral nerve'],
              ['Muscle Bulk', 'Normal (mild late disuse atrophy only)', 'Marked wasting / atrophy'],
              ['Fasciculations', 'Absent', 'Present (especially anterior horn cell e.g. MND)'],
              ['Muscle Tone', 'Increased (spasticity; velocity-dependent)', 'Decreased (flaccid / hypotonia)'],
              ['Deep Tendon Reflexes', 'Brisk / Hyperreflexia (+/- clonus)', 'Reduced or absent (hyporeflexia / areflexia)'],
              ['Plantar Response', 'Extensor (Upgoing / Babinski positive)', 'Flexor (Downgoing) or absent'],
            ],
          },
        ],
        examPearls: [
          'Spinal cord ends at L1 in adults: lesions below L1 compress nerve roots (cauda equina = LMN), whereas lesions at or above L1 compress the cord (UMN signs below level).',
          'Both UMN and LMN signs co-existing in the same limb strongly point toward Motor Neurone Disease (ALS) or combined cervical myelopathy + radiculopathy.',
        ],
      },
      {
        id: 'basic-neuroanatomy-2',
        moduleId: 'foundations-neuroanatomy',
        title: 'Basic Neuroanatomy II: Major Tracts, Homunculus & Reflex Arc',
        subtitle: 'Decussation levels of corticospinal, spinothalamic, and dorsal column pathways',
        sourcePdf: '2-_Basic_neuroanatomy__II_707c7063.pdf',
        overview:
          'Maps the exact anatomical trajectories and crossing (decussation) levels of the three essential long tracts, explains the somatotopic motor/sensory homunculus, and details the monosynaptic knee-jerk reflex arc.',
        keyConcepts: [
          'Corticospinal tract decussation in medulla',
          'Spinothalamic tract immediate spinal crossing',
          'Dorsal column-medial lemniscus crossing in medulla',
          'Internal capsule limb organization',
          'Motor & sensory homunculus somatotopy',
          'Knee-jerk reflex arc (L3/L4, femoral nerve)',
        ],
        interactiveLabs: ['motor-reflex-cerebellum', 'spinal-tracts', 'gcs-reflex'],
        sections: [
          {
            heading: 'Corticospinal (Pyramidal) Motor Tract',
            bullets: [
              'Origin: Precentral gyrus (primary motor cortex).',
              'Descent: Passes through the anterior/genu-posterior limb interface of the internal capsule (anterior aspect relative to sensory fibres), midbrain cerebral peduncles, and pons.',
              'Decussation: Crosses to the contralateral side in the lower medulla (pyramidal decussation) and descends in the lateral corticospinal tract of the spinal cord.',
              'Termination: Synapses on anterior horn LMN cells, which exit via ventral roots to skeletal muscles.',
            ],
          },
          {
            heading: 'Spinothalamic Tract (Pain, Temperature & Crude Touch)',
            bullets: [
              'First-order neurone: Enters dorsal root and synapses immediately in the dorsal horn.',
              'Decussation: Second-order neurone crosses the midline within 1–2 spinal cord segments (anterior white commissure) to ascend in the contralateral spinothalamic tract.',
              'Relay & Cortex: Synapses in the thalamus (VPL), ascends through the posterior limb of the internal capsule, and terminates in the postcentral gyrus.',
              'Clinical implication: A unilateral spinal cord lesion causes CONTRALATERAL loss of pain and temperature starting just below the lesion level.',
            ],
            callout: {
              variant: 'localisation',
              title: 'Why Syringomyelia Causes Cape-Like Pain/Temp Loss',
              body: 'Expanding fluid within the central canal damages spinothalamic fibres decussating across the anterior white commissure, selectively abolishing pain and temperature bilaterally while sparing dorsal columns.',
            },
          },
          {
            heading: 'Dorsal Column–Medial Lemniscus Pathway (Vibration, Proprioception, Fine Touch)',
            bullets: [
              'First-order neurone: Enters dorsal root and ascends IPSILATERALLY in the dorsal columns (fasciculus gracilis for lower limb, fasciculus cuneatus for upper limb).',
              'Decussation: Synapses in the dorsal column nuclei of the lower medulla, then crosses as internal arcuate fibres to form the contralateral medial lemniscus.',
              'Relay & Cortex: Projects to the thalamus, passes through the posterior internal capsule, and terminates in the postcentral gyrus.',
              'Clinical implication: A unilateral spinal cord lesion produces IPSILATERAL loss of vibration and joint position sense.',
            ],
          },
          {
            heading: 'Cortical Homunculus & Knee-Jerk Reflex Arc',
            bullets: [
              'Motor and sensory homunculi map body parts contralaterally with disproportionately large cortical territory for face, lips, tongue, and hand.',
              'Medial surface of hemisphere (ACA territory) represents the contralateral leg and foot; lateral convexity (MCA territory) represents face and upper limb.',
              'Knee-jerk reflex (L3/L4, femoral nerve): Tapping the patellar tendon stretches muscle spindles in the quadriceps femoris -> Ia sensory afferents enter dorsal root -> monosynaptic excitation of alpha motor neurones contracts quadriceps (extending knee), while inhibitory interneurones simultaneously relax the antagonist biceps femoris (hamstrings).',
            ],
          },
        ],
        tables: [
          {
            title: 'Long Tracts Summary: Modality, Decussation & Lesion Side',
            headers: ['Tract', 'Function / Modality', 'Level of Decussation', 'Cord Lesion Deficit Side'],
            rows: [
              ['Corticospinal Tract', 'Voluntary skilled motor control', 'Lower Medulla (Pyramids)', 'Ipsilateral UMN weakness below lesion'],
              ['Dorsal Columns', 'Joint position, vibration, fine touch', 'Lower Medulla (Internal arcuate fibres)', 'Ipsilateral proprioception/vibration loss'],
              ['Spinothalamic Tract', 'Pain, temperature, coarse touch', 'Spinal Cord (within 1–2 segments)', 'Contralateral pain/temperature loss'],
            ],
          },
        ],
        examPearls: [
          'Spinothalamic fibres cross in the spinal cord; dorsal column and corticospinal fibres cross in the medulla — this explains every feature of Brown-Séquard hemisection.',
          'All deep tendon reflexes test an intact afferent sensory arc, spinal synapse, and efferent motor nerve, modulated by descending UMN inhibition.',
        ],
      },
      {
        id: 'points-to-remember',
        moduleId: 'foundations-neuroanatomy',
        title: 'Points to Remember: History, Examination & Localisation',
        subtitle: 'Clinical reasoning rules, MRC grading, reflex technique, plantar & sensory testing',
        sourcePdf: '3-_Points_to_remember_68f4f551.pdf',
        overview:
          'Synthesizes the practical bedside rules of clinical neurology: why history guides the diagnosis, temporal onset patterns, avoiding common examination pitfalls, MRC power grading, accurate reflex elicitation, and the structured diagnostic triad (Where -> What -> Why).',
        keyConcepts: [
          'History primacy & temporal onset patterns',
          'MRC Power Scale (0–5)',
          'Deep tendon reflex roots & reinforcement',
          'Plantar response technique',
          'Pinprick testing with eyes open',
          'Four paroxysmal neurological disorders',
        ],
        interactiveLabs: ['gcs-reflex'],
        sections: [
          {
            heading: 'History Taking: The Primacy of Time Course',
            bullets: [
              'In neurology, the history provides ~80% of the diagnosis; the examination tests and refines hypotheses generated from the history.',
              'Temporal profile reveals pathology: Sudden/acute onset (seconds-minutes) = Vascular (stroke/TIA/SAH); Subacute (days-weeks) = Inflammatory/Infective/Neoplastic; Gradual progressive (months-years) = Degenerative; Paroxysmal/episodic = Epilepsy, Migraine, Syncope, Trigeminal neuralgia.',
              'Always take an eyewitness account for episodes of altered consciousness, plus thorough family history, alcohol intake, and full medication/drug history.',
            ],
          },
          {
            heading: 'Motor Examination & MRC Power Scale',
            bullets: [
              'Always assess maximal power, compare left vs right side-by-side, and perform a focused exam rather than an unfocused checklist.',
              'Heel-to-shin testing must be demonstrated clearly to the patient first so failure is not due to misunderstanding.',
              'MRC Scale: 0 = No contraction; 1 = Flicker/trace contraction; 2 = Active movement with gravity eliminated; 3 = Active movement against gravity; 4 = Active movement against gravity and resistance; 5 = Normal power.',
              'Avoid routine omission of key proximal/distal muscle groups or failing to inspect for wasting and fasciculations first.',
            ],
          },
          {
            heading: 'Reflexes, Reinforcement & Plantar Response',
            bullets: [
              'Key nerve roots: C5 = Biceps, C6 = Supinator (brachioradialis), C7 = Triceps, L3/L4 = Knee, S1 = Ankle.',
              'Technique: Hold the tendon hammer at the end and use a full relaxed swing; LOOK directly at the muscle belly for contraction rather than just distal limb movement.',
              'Reinforcement: Ask patient to clench teeth (for upper limb reflexes) or interlock hooked fingers and pull apart (Jendrassik manoeuvre for lower limbs) before declaring a reflex absent.',
              'Grade simply as Absent, Reduced, Normal, or Brisk — asymmetry between sides is far more clinically significant than symmetric briskness.',
              'Plantar response: Use a blunt orange stick or blunt neurotip (never a sharp pin) stroking up the lateral border of the sole and curving medially across the ball toward the base of the big toe.',
            ],
          },
          {
            heading: 'Sensory Testing & Diagnostic Hierarchy',
            bullets: [
              'Teach the pinprick stimulus first on the sternum or forehead ("This is sharp — tell me if it feels just as sharp on your limbs").',
              'Keep the patient’s eyes OPEN during pinprick testing (eyes closed is only needed for joint position sense); skip redundant light-touch cotton wool testing when pinprick/vibration suffices.',
              'Localisation hierarchy: 1) Is there a lesion? 2) Where is the lesion (muscle, NMJ, nerve, plexus, root, cord, brainstem, cortex)? 3) What is the pathology (vascular, inflammatory, infective, neoplastic, degenerative, metabolic/toxic, functional)?',
              'Remember the 4 classic paroxysmal neurological disorders: Epilepsy, Migraine, Syncope/TIA, and Trigeminal Neuralgia (plus BPPV/MS paroxysms).',
            ],
          },
        ],
        tables: [
          {
            title: 'MRC Muscle Power Grading & Reflex Roots',
            headers: ['MRC Grade', 'Definition', 'Reflex', 'Root Level'],
            rows: [
              ['0 / 5', 'No visible muscle contraction', 'Biceps jerk', 'C5 (C6)'],
              ['1 / 5', 'Flicker or trace contraction only', 'Supinator (Brachioradialis)', 'C6'],
              ['2 / 5', 'Active movement with gravity eliminated', 'Triceps jerk', 'C7'],
              ['3 / 5', 'Active movement against gravity only', 'Knee jerk', 'L3 / L4'],
              ['4 / 5', 'Active movement against gravity + resistance', 'Ankle jerk', 'S1'],
              ['5 / 5', 'Normal full power', 'Plantar response', 'L5 / S1 (UMN screen)'],
            ],
          },
        ],
        examPearls: [
          'Sudden-onset focal deficit = vascular until proven otherwise; recurrent stereotyped episodes with full recovery = paroxysmal (epilepsy, migraine, TIA, syncope).',
          'Never call a reflex "absent" without performing Jendrassik / teeth-clench reinforcement.',
        ],
      },
    ],
  },
  {
    id: 'neurological-investigations',
    title: 'Neurological Investigations',
    description:
      'Selecting and interpreting CT, MRI, cerebral angiography, EEG, nerve conduction studies, EMG, lumbar puncture, genetics, and neuroimmunology.',
    accentColor: '#0F766E',
    lectures: [
      {
        id: 'neurological-investigations',
        moduleId: 'neurological-investigations',
        title: 'Neurological Investigations: Imaging, Neurophysiology, CSF & Labs',
        subtitle: 'Indications, contraindications, and diagnostic yield across modern neurodiagnostics',
        sourcePdf: '4-_Neurological_investigations_f18aea86.pdf',
        overview:
          'Covers the selection, strengths, limitations, and risks of CT/CTA/CTV, MRI/MRA/MRV, catheter angiography, EEG, NCS/EMG, lumbar puncture with CSF analysis, genetic testing, and autoantibody panels.',
        keyConcepts: [
          'CT vs MRI indications & contraindications',
          'Catheter cerebral angiography',
          'EEG types & diagnostic limits',
          'NCS (axonal vs demyelinating) & EMG',
          'Lumbar puncture contraindications & coning',
          'Post-LP headache & CSF OCB/spectrophotometry',
        ],
        interactiveLabs: ['csf-matrix'],
        sections: [
          {
            heading: 'Structural & Vascular Neuroimaging (CT, MRI, Angiography)',
            bullets: [
              'CT Head (plus CTA/CTV): Fast, widely available, first-line in emergencies (acute haemorrhage, trauma, acute stroke exclusion of bleed). Uses ionising radiation; poor resolution of posterior fossa, brainstem, MS plaques, and spinal cord.',
              'MRI Brain/Spine (plus MRA/MRV): Superior soft-tissue contrast without ionising radiation; test of choice for demyelinating plaques (MS), spinal cord compression, brainstem lesions, posterior fossa, and encephalitis. Limitations: claustrophobia, slow acquisition; CONTRAINDICATED with non-MRI-conditional cardiac pacemakers, cochlear implants, or intraocular metallic foreign bodies.',
              'Digital Subtraction Cerebral Angiography: Invasive gold standard for intracranial aneurysms, AVMs, and vasculitis; enables therapeutic endovascular aneurysm coiling or mechanical thrombectomy.',
            ],
          },
          {
            heading: 'Clinical Neurophysiology (EEG, NCS, EMG)',
            bullets: [
              'EEG: Records cortical electrical rhythms. Variants include routine (20–30 min), sleep-deprived, ambulatory, and inpatient video-telemetry. Aids epilepsy classification and encephalopathy/status monitoring (cannot rule out epilepsy on a single normal trace).',
              'Nerve Conduction Studies (NCS): Surface electrical stimulation of motor and sensory peripheral nerves measuring conduction velocity and action potential amplitude. Distinguishes demyelinating (slow velocity) from axonal (low amplitude) neuropathy and localises entrapments (e.g. carpal tunnel).',
              'Electromyography (EMG): Fine concentric needle inserted into muscle to detect spontaneous resting activity (fibrillations, positive sharp waves in MND/denervation), motor unit potential (MUP) morphology (myopathic vs neurogenic), and decremental response on repetitive stimulation (Myasthenia Gravis).',
            ],
          },
          {
            heading: 'Lumbar Puncture (LP) & CSF Analysis',
            bullets: [
              'Indications: Suspected CNS infection (meningitis/encephalitis), subarachnoid haemorrhage (when CT is negative), demyelinating disease (MS oligoclonal bands), idiopathic intracranial hypertension (opening pressure), and Guillain-Barré syndrome (cytoalbuminologic dissociation).',
              'CRITICAL CONTRAINDICATION: Raised intracranial pressure with mass lesion or midline shift (risk of transtentorial herniation and medullary coning). Always perform CT before LP if focal signs, reduced GCS, seizures, papilloedema, or immunocompromised state are present.',
              'CSF Tests: Opening pressure, cell count (WBC/RBC), protein, glucose (paired with serum glucose), Gram stain/culture/viral PCR, spectrophotometry for bilirubin/xanthochromia (SAH >=6–12h post-onset), and oligoclonal bands (OCBs, paired with serum to confirm intrathecal IgG synthesis in MS).',
              'Post-LP headache: Caused by low CSF pressure from persistent dural leak; characteristically worse upright/standing and relieved lying flat; typically resolves spontaneously within 7–10 days (hydration/analgesia or epidural blood patch if refractory).',
            ],
            callout: {
              variant: 'warning',
              title: 'Never Perform LP Before CT in Suspected Mass Lesion',
              body: 'Removing lumbar CSF when supratentorial pressure is elevated creates a pressure gradient that drives downward tentorial herniation and fatal brainstem coning.',
            },
          },
          {
            heading: 'Neurogenetics & Neuroimmunology',
            bullets: [
              'Genetic testing: Confirms inherited trinucleotide repeat and single-gene disorders such as Huntington’s disease (CAG repeat, chr 4) and Myotonic dystrophy (CTG repeat).',
              'Immunological panels: Anti-acetylcholine receptor (AChR) & MuSK antibodies for Myasthenia Gravis; Anti-NMDA receptor and voltage-gated potassium channel complex antibodies for autoimmune encephalitis; Aquaporin-4 (AQP4) for Neuromyelitis Optica.',
            ],
          },
        ],
        tables: [
          {
            title: 'CT vs MRI Comparison in Neurology',
            headers: ['Feature', 'CT / CTA / CTV', 'MRI / MRA / MRV'],
            rows: [
              ['Physical Basis', 'X-ray attenuation (ionising radiation)', 'Magnetic fields & radiofrequency (no radiation)'],
              ['Primary Strength', 'Emergency acute haemorrhage, skull fracture, rapid triage', 'White matter/MS plaques, spinal cord, brainstem, posterior fossa'],
              ['Key Limitations', 'Radiation; misses early ischaemia, cord & MS plaques', 'Slow, claustrophobia, high cost'],
              ['Absolute Contraindications', 'Relative in pregnancy', 'Metallic intraocular foreign bodies, non-compatible pacemakers/implants'],
            ],
          },
        ],
        examPearls: [
          'Post-LP headache is postural (worse standing, better lying flat) due to low CSF pressure and usually resolves over 7–10 days.',
          'Paired CSF and serum oligoclonal bands are required to prove intrathecal IgG synthesis rather than passive blood-brain barrier spillover.',
        ],
      },
    ],
  },
];
