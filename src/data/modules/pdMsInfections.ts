import { CurriculumModule } from '../../types/neurology';

export const pdMsInfectionsModules: CurriculumModule[] = [
  {
    id: 'movement-disorders-pd',
    title: 'Movement Disorders & Parkinson’s Disease',
    description:
      'Basal ganglia anatomy, Lewy body pathology, cardinal Parkinsonism features, Essential Tremor & Parkinson’s plus differentials, DaTscan, and dopaminergic/MDT pharmacology.',
    accentColor: '#0F766E',
    lectures: [
      {
        id: 'pd-1',
        moduleId: 'movement-disorders-pd',
        title: 'Parkinson’s Disease I: Basal Ganglia, Pathology & Clinical Features',
        subtitle: 'Substantia nigra Lewy bodies, cardinal motor tetrad, asymmetry, and non-motor symptoms',
        sourcePdf: '10-_PD_I_0bd40663.pdf',
        overview:
          'Covers James Parkinson’s 1817 essay, basal ganglia nuclei, epidemiology (2% >65yr), nigrostriatal depigmentation with Lewy bodies, environmental/genetic links, and full motor and non-motor manifestations.',
        keyConcepts: [
          'James Parkinson 1817 "An Essay on the Shaking Palsy"',
          'Basal ganglia nuclei (caudate, putamen, globus pallidus, STN, SN)',
          '2% >65yr, onset 55–65yr, 60% male',
          'Substantia nigra depigmentation + alpha-synuclein Lewy bodies',
          'Bradykinesia + Rigidity (lead-pipe/cogwheel) + 4–6Hz pill-rolling tremor + Postural instability',
          'Asymmetrical onset, micrographia, shuffling gait, non-motor features',
        ],
        interactiveLabs: ['parkinsons-bbb'],
        sections: [
          {
            heading: 'History, Anatomy & Pathology',
            bullets: [
              'Described by James Parkinson in 1817 ("An Essay on the Shaking Palsy").',
              'Basal ganglia nuclei: Caudate nucleus & Putamen (striatum), Globus Pallidus (interna/externa), Subthalamic nucleus (STN), and Substantia Nigra (pars compacta — dopaminergic projection to striatum).',
              'Epidemiology: Affects ~2% of population aged >65 years; typical onset 55–65 years; ~60% male.',
              'Pathology: Degeneration and depigmentation of dopaminergic neurones in the substantia nigra pars compacta + intracytoplasmic eosinophilic alpha-synuclein inclusions (Lewy bodies).',
              'Aetiological clues: Post-encephalitic Parkinsonism (1918 von Economo encephalitis lethargica), MPTP toxin (selective nigral toxicity), genetic mutations (~5–10% monogenic, e.g., LRRK2, Parkin, alpha-synuclein/SNCA).',
            ],
          },
          {
            heading: 'Cardinal Motor & Non-Motor Features',
            bullets: [
              'Bradykinesia (essential for diagnosis!): Progressive fatiguing/decrement in speed AND amplitude on repetitive finger/foot tapping; causes hypomimia (mask-like face, reduced blink), micrographia (progressively smaller handwriting), hypophonia (monotonous soft voice), and slowness of daily tasks.',
              'Rigidity: Uniform velocity-independent resistance throughout passive movement ("lead-pipe rigidity"); when superimposed with tremor produces "cogwheel rigidity".',
              'Resting tremor (70% initial symptom): 4–6 Hz asymmetrical "pill-rolling" tremor of thumb/index finger, maximal at rest and diminishing during purposeful action.',
              'Postural instability & Gait: Flexed stooped posture, difficulty initiating walking (freezing), short shuffling steps, festination (hurrying forward to catch centre of gravity), reduced asymmetrical arm swing, turning en bloc; falls typically occur later.',
              'Non-motor features (often precede motor symptoms by years!): Anosmia/hyposmia, REM sleep behaviour disorder (acting out dreams), constipation, orthostatic hypotension, depression/anxiety, cognitive impairment/dementia, seborrhoeic dermatitis, sialorrhoea (reduced swallow).',
            ],
          },
        ],
        examPearls: [
          'Asymmetrical onset (one hand pill-rolling tremor + reduced arm swing) with bradykinesia strongly favours idiopathic Parkinson’s disease over vascular or drug-induced mimics.',
          'Bradykinesia with progressive decrement in amplitude/speed on finger tapping is mandatory for diagnosing Parkinsonism.',
        ],
      },
      {
        id: 'pd-2',
        moduleId: 'movement-disorders-pd',
        title: 'Parkinson’s Disease II: Differential Diagnosis & DaTscan',
        subtitle: 'Essential tremor vs PD, vascular & drug-induced Parkinsonism, PSP, MSA, and SPECT imaging',
        sourcePdf: '11-_PD_II_404c535e.pdf',
        overview:
          'Contrasts Essential Tremor (6–8x more common than PD) with Parkinsonian tremor, outlines secondary Parkinsonism (vascular, neuroleptics/antiemetics), defines Parkinson’s-plus syndromes (PSP, MSA), and explains DaTscan SPECT.',
        keyConcepts: [
          'Essential Tremor: 6–8x PD, bilateral postural/action, alcohol relieves',
          'ET treatment: Propranolol, Primidone, Alprazolam, DBS',
          'Vascular ("lower-body") Parkinsonism',
          'Drug-induced Parkinsonism (neuroleptics, metoclopramide, valproate, salbutamol tremor)',
          'Parkinson’s Plus: PSP (vertical gaze, early falls) & MSA (autonomic/cerebellar)',
          'DaTscan (123I-FP-CIT SPECT) differentiates presynaptic PD from ET/drug-induced',
        ],
        interactiveLabs: ['parkinsons-bbb'],
        sections: [
          {
            heading: 'Essential Tremor (ET) vs Parkinson’s Disease',
            bullets: [
              'Essential Tremor is 6–8 times more common than PD (~50% autosomal dominant family history).',
              'ET clinical profile: Symmetrical, bilateral postural and kinetic/action tremor (6–12 Hz) affecting outstretched hands, head ("yes/no" titubation), and voice; classically IMPROVES with small amounts of alcohol; Archimedian spiral shows directional tremor axes without micrographia; normal tone, no bradykinesia, normal gait.',
              'ET treatment: Propranolol (first-line beta-blocker), Primidone (barbiturate), Topiramate/Gabapentin, Alprazolam (short-term/situational), Thalamic (VIM) Deep Brain Stimulation (DBS) in severe refractory cases.',
            ],
          },
          {
            heading: 'Secondary Parkinsonism & Parkinson’s-Plus Syndromes',
            bullets: [
              'Vascular Parkinsonism: Multi-infarct basal ganglia disease -> symmetrical "lower-body Parkinsonism" (broad-based shuffling gait, postural instability) with preserved upper limb dexterity, absent resting tremor, UMN signs, and poor L-Dopa response.',
              'Drug-induced Parkinsonism: Symmetrical bradykinesia/rigidity caused by dopamine D2-receptor blockers — antipsychotics/neuroleptics (haloperidol, chlorpromazine), antiemetics (metoclopramide, prochlorperazine), and sodium valproate (note: salbutamol, lithium, thyroxine cause benign fine postural tremor).',
              'Progressive Supranuclear Palsy (PSP): Early backward falls, vertical supranuclear gaze palsy (cannot look down -> messy eating/descending stairs), axial rigidity, pseudobulbar palsy, poor L-Dopa response.',
              'Multiple System Atrophy (MSA): Parkinsonism poorly responsive to L-Dopa combined with prominent early autonomic failure (severe orthostatic hypotension, urinary incontinence/erectile dysfunction) and/or cerebellar ataxia.',
              'Other rare causes: Wilson’s disease (young <40yr, Kayser-Fleischer rings, low caeruloplasmin), Dementia with Lewy Bodies (early dementia + visual hallucinations + fluctuating cognition).',
            ],
          },
          {
            heading: 'DaTscan (Dopamine Transporter SPECT)',
            bullets: [
              '123I-ioflupane SPECT images presynaptic striatal dopamine transporter terminals.',
              'Abnormal (reduced asymmetrical comma -> dot uptake in putamen): Confirms presynaptic nigrostriatal degeneration (idiopathic PD, PSP, MSA, DLB).',
              'Normal (symmetrical bright comma shapes): Rules out nigrostriatal loss -> supports Essential Tremor, Drug-induced Parkinsonism, or Functional tremor.',
            ],
          },
        ],
        tables: [
          {
            title: 'Essential Tremor vs Idiopathic Parkinson’s Disease',
            headers: ['Feature', 'Essential Tremor', 'Parkinson’s Disease'],
            rows: [
              ['Prevalence', '6–8x more common than PD', '~2% over age 65'],
              ['Tremor Type', 'Bilateral symmetrical postural & action tremor', 'Asymmetrical resting ("pill-rolling") tremor'],
              ['Body Distribution', 'Hands, head (titubation), voice', 'Hand, leg, jaw (rarely isolated head tremor)'],
              ['Alcohol Effect', 'Marked temporary improvement', 'No significant effect'],
              ['Bradykinesia & Rigidity', 'Absent; normal tone & handwriting size', 'Present; cogwheel rigidity & micrographia'],
              ['DaTscan SPECT', 'Normal symmetrical uptake', 'Reduced asymmetrical striatal uptake'],
            ],
          },
        ],
        examPearls: [
          'DaTscan distinguishes Essential Tremor and Drug-induced Parkinsonism (normal scan) from true degenerative Parkinsonism (abnormal scan), though it cannot separate PD from PSP/MSA.',
          'Early falls + vertical gaze palsy = PSP; early severe orthostatic hypotension/incontinence + Parkinsonism = MSA.',
        ],
      },
      {
        id: 'pd-3',
        moduleId: 'movement-disorders-pd',
        title: 'Parkinson’s Disease III: Pharmacology, MDT & Advanced Care',
        subtitle: 'BBB dopamine transport, L-Dopa + DCI, COMT/MAO-B inhibitors, dopamine agonists, dyskinesias, and DBS',
        sourcePdf: '12-_PD_III_c65649a1.pdf',
        overview:
          'Explains why dopamine cannot cross the blood-brain barrier, details every dopaminergic drug class and side-effect profile, addresses motor fluctuations and non-motor symptoms, and outlines MDT and palliative care.',
        keyConcepts: [
          'Dopamine cannot cross BBB -> L-Dopa + peripheral DCI (Madopar/Sinemet)',
          'COMT inhibitors (Entacapone, Opicapone; combo Stalevo/Sastravi)',
          'Dopamine agonists (Ropinirole, Pramipexole — impulse control/hallucinations)',
          'MAO-B inhibitors (Selegiline, Rasagiline, Safinamide)',
          'Motor fluctuations / dyskinesias (Amantadine, Apomorphine, DBS)',
          'Non-motor Tx & Contraindicated dopamine blockers',
        ],
        interactiveLabs: ['parkinsons-bbb'],
        sections: [
          {
            heading: 'Blood-Brain Barrier & Core Dopaminergic Classes',
            bullets: [
              'Dopamine itself CANNOT cross the blood-brain barrier (BBB); giving peripheral dopamine causes nausea/vomiting and hypotension without central benefit.',
              'Levodopa (L-Dopa) + Peripheral Dopa-Decarboxylase Inhibitor (DCI): L-Dopa crosses the BBB and is converted centrally to dopamine. Always co-formulated with a DCI that does NOT cross the BBB to block peripheral breakdown -> Co-beneldopa (L-Dopa + benserazide = Madopar) or Co-careldopa (L-Dopa + carbidopa = Sinemet). Most effective symptomatic drug, but long-term use (>5 yr) causes "wearing-off" and peak-dose choreiform dyskinesias.',
              'COMT Inhibitors (Entacapone, Opicapone): Block peripheral catechol-O-methyltransferase conversion of L-Dopa to 3-OMD, extending L-Dopa plasma half-life and smoothing "wearing-off" fluctuations (triple combo tablet = Stalevo/Sastravi; entacapone turns urine harmlessly orange-brown).',
              'Dopamine Agonists (Ropinirole, Pramipexole, Rotigotine patch): Directly stimulate striatal D2/D3 receptors; often used early in younger patients to delay L-Dopa dyskinesias. Key side effects: Sudden sleep attacks, ankle oedema, hallucinations/confusion (avoid in elderly/dementia!), and IMPULSE CONTROL DISORDERS (pathological gambling, hypersexuality, binge shopping/eating). Ergot agonists (bromocriptine/cabergoline) rarely used due to retroperitoneal/cardiac valve fibrosis.',
              'MAO-B Inhibitors (Selegiline, Rasagiline, Safinamide): Inhibit central monoamine oxidase-B breakdown of dopamine in the synaptic cleft; mild monotherapy effect or adjunct to reduce wearing-off.',
            ],
            callout: {
              variant: 'warning',
              title: 'Impulse Control Disorders & Sudden Antiemetic Error',
              body: 'Always counsel patients starting Dopamine Agonists about gambling/hypersexuality/compulsive shopping. Never give metoclopramide or prochlorperazine to a PD patient (use domperidone or ondansetron for nausea).',
            },
          },
          {
            heading: 'Managing Motor Complications, Non-Motor Symptoms & MDT',
            bullets: [
              'Dyskinesias & Severe Motor Fluctuations: Fractionate L-Dopa doses, add COMT-i or MAOB-i; Amantadine specifically reduces L-Dopa-induced dyskinesias (NMDA antagonist); Subcutaneous Apomorphine (rescue pen or continuous pump — potent dopamine agonist causing severe nausea -> pre-treat with domperidone); Levodopa-carbidopa intestinal gel (Duodopa); Deep Brain Stimulation (DBS) of the subthalamic nucleus (STN) or GPi for L-Dopa-responsive patients without dementia.',
              'Non-Motor Management: Dementia -> Rivastigmine; Psychosis/Hallucinations -> reduce agonists/anticholinergics, use Quetiapine or Clozapine (never haloperidol!); Depression -> SSRIs; REM sleep behaviour disorder -> Clonazepam/Melatonin; Orthostatic hypotension -> Fludrocortisone or Midodrine; Sialorrhoea -> Glycopyrrolate or parotid Botox; Constipation -> Macrogol laxatives; Bladder urgency -> Urology/anticholinergics (avoid CNS-penetrant ones in dementia).',
              'Multidisciplinary Team (MDT) & Palliative Care: PD specialist nurse, physiotherapy (cueing strategies), occupational therapy, speech & language therapy (LSVT for hypophonia + swallow safety), dietitian, and timely advance care planning.',
            ],
          },
        ],
        examPearls: [
          'L-Dopa is always paired with a peripheral DCI (carbidopa or benserazide) to prevent peripheral conversion to dopamine and enable BBB entry.',
          'Amantadine treats L-Dopa-induced dyskinesias; Quetiapine or Clozapine treats PD psychosis without worsening motor Parkinsonism.',
        ],
      },
    ],
  },
  {
    id: 'demyelinating-ms',
    title: 'Demyelinating Diseases: Multiple Sclerosis',
    description:
      'Immunopathology, latitude & migration epidemiology, clinical syndromes, RRMS/PPMS/SPMS courses, McDonald criteria, MRI/OCB mimics, relapse steroids, DMTs, NMO, and ADEM.',
    accentColor: '#0284C7',
    lectures: [
      {
        id: 'ms-1',
        moduleId: 'demyelinating-ms',
        title: 'Multiple Sclerosis I: Epidemiology, Pathology & Clinical Features',
        subtitle: 'CNS white matter demyelination, migration risk, optic neuritis, INO, spastic paraparesis, and CIS',
        sourcePdf: '13-_MS_I_6430403f.pdf',
        overview:
          'Introduces MS prevalence (1/800–1000 UK), age/sex distribution (20–40yr, F>M), latitude/migration <15yr and HLA-DR15 risk, myelin + axonal pathology, typical white-matter syndromes, and Clinically Isolated Syndrome.',
        keyConcepts: [
          'Prevalence 1 in 800–1000 (UK); onset 20–40 yr; F:M ~2–3:1',
          'Latitude gradient, migration before age 15, HLA-DR15, Vit D/EBV',
          'Immune CNS myelin demyelination + secondary axonal loss',
          'Optic neuritis (retrobulbar vs papillitis), Uhthoff’s & Lhermitte’s',
          'Spastic paraparesis (LL > UL), INO, ataxia, fatigue, bladder',
          'Clinically Isolated Syndrome (CIS): monofocal vs multifocal',
        ],
        sections: [
          {
            heading: 'Epidemiology, Risk Factors & Pathophysiology',
            bullets: [
              'Prevalence: ~1 in 800–1,000 in northern Europe/UK; typical onset 20–40 years; Female:Male ~2–3:1.',
              'Environmental & Genetic drivers: Higher prevalence at temperate latitudes away from equator; migrating before age 15 transfers the host country’s risk (early-life Vitamin D / sunlight / EBV exposure); genetic susceptibility (HLA-DRB1*1501, ~25–30% monozygotic twin concordance, ~2–4% first-degree relative risk).',
              'Pathology: Autoimmune T-cell/B-cell mediated inflammation causing CNS white-matter DEMYELINATION (oligodendrocyte injury) with perivenular plaques, accompanied by secondary AXONAL LOSS (which drives irreversible progressive disability). Note: MS affects CNS myelin ONLY — peripheral nerves are spared.',
              'Predilection sites: Optic nerves, periventricular white matter, corpus callosum, brainstem (MLF/pons), cerebellum, and cervical spinal cord.',
            ],
          },
          {
            heading: 'Clinical Presentations & Clinically Isolated Syndrome (CIS)',
            bullets: [
              'Optic neuritis (~25% initial presentation): Subacute unilateral painful visual loss (worse on eye movement), reduced colour vision (red desaturation), central scotoma, RAPD; fundus normal (retrobulbar) or swollen (papillitis).',
              'Sensory symptoms: Numbness, tingling, band-like torso tightness ("MS hug"), Lhermitte’s phenomenon (electric shock down spine on neck flexion — cervical dorsal column plaque).',
              'Motor weakness: UMN spastic paraparesis (lower limbs typically affected earlier/worse than upper limbs), brisk reflexes, upgoing plantars.',
              'Brainstem/Cerebellar: Internuclear ophthalmoplegia (INO), diplopia (CN VI), trigeminal neuralgia (<40yr), cerebellar ataxia, scanning dysarthria, nystagmus.',
              'Other prominent symptoms: Severe disabling fatigue, neurogenic bladder urgency/frequency/retention, bowel/sexual dysfunction, depression, Uhthoff’s phenomenon (temporary worsening of symptoms with heat/exercise/fever due to slowed demyelinated conduction).',
              'Clinically Isolated Syndrome (CIS): First acute clinical demyelinating episode lasting >=24h — may be monofocal (e.g. isolated optic neuritis or transverse myelitis) or multifocal.',
            ],
          },
        ],
        examPearls: [
          'Migrating before age 15 years adopts the MS risk of the destination latitude, pointing to an early-life environmental trigger (EBV/Vitamin D).',
          'Uhthoff’s phenomenon (heat worsening) and Lhermitte’s sign (neck flexion electric shock) are classic MS clinical clues.',
        ],
      },
      {
        id: 'ms-2',
        moduleId: 'demyelinating-ms',
        title: 'Multiple Sclerosis II: Disease Courses, Diagnosis, MRI & CSF',
        subtitle: 'RRMS, PPMS, SPMS, PRMS, dissemination in time and space, and MRI/OCB differential mimics',
        sourcePdf: '14-_MS_II_ad0a98da.pdf',
        overview:
          'Defines the 4 clinical phenotypes of MS, explains the diagnostic requirement for dissemination in both time and space (McDonald principles), and details MRI (95%) and CSF oligoclonal band (95%) interpretation plus false-positive mimics.',
        keyConcepts: [
          '4 MS Courses: RRMS (~85%), SPMS, PPMS (~10–15%), PRMS',
          'Dissemination in Space (DIS) & Dissemination in Time (DIT)',
          'Brain MRI positive in ~95% (periventricular/juxtacortical/infratentorial/cord; gadolinium = active)',
          'CSF Oligoclonal Bands (OCB) positive in ~95%',
          'MRI mimics (ischaemia, migraine, vasculitis) & CSF OCB mimics (infections, SLE, neurosarcoid)',
        ],
        interactiveLabs: ['csf-matrix'],
        sections: [
          {
            heading: 'Four Clinical Phenotypes of Multiple Sclerosis',
            bullets: [
              'Relapsing-Remitting MS (RRMS — ~85% at onset): Clearly defined acute relapses (new/worsening symptoms >24h without fever) followed by full or partial recovery with stable intervals.',
              'Secondary Progressive MS (SPMS): Follows initial RRMS after ~10–15 years in many patients -> steady progressive accumulation of disability independent of relapses.',
              'Primary Progressive MS (PPMS — ~10–15%): Steady progressive neurological decline (typically spastic paraparesis) from onset without clear acute relapses; older onset (~40–50yr), equal sex ratio.',
              'Progressive-Relapsing MS (PRMS — rare): Progressive decline from onset punctuated by superimposed acute relapses.',
            ],
          },
          {
            heading: 'Diagnostic Criteria: Dissemination in Time & Space',
            bullets: [
              'Core rule: Evidence of CNS demyelinating lesions disseminated in SPACE (DIS — >=2 distinct CNS anatomical sites) AND disseminated in TIME (DIT — >=2 episodes separated by >=1 month, or simultaneous gadolinium-enhancing AND non-enhancing MRI plaques), after excluding alternative diagnoses.',
              'Brain & Cervical Spine MRI (~95% sensitive): T2/FLAIR hyperintense ovoid plaques perpendicular to lateral ventricles ("Dawson’s fingers"), corpus callosum, juxtacortical, infratentorial (pons/cerebellum), and spinal cord (<3 vertebral segments long). Gadolinium contrast enhancement marks active blood-brain barrier breakdown (acute plaque).',
              'CSF Oligoclonal Bands (~95% sensitive in definite MS): Isoelectric focusing detects IgG bands present in CSF but ABSENT in paired serum (proving intrathecal antibody synthesis). Normal or mild lymphocytic pleocytosis (<50 cells) and mildly raised protein.',
              'Visual Evoked Potentials (VEP): Delayed P100 latency detects clinically silent prior optic nerve demyelination.',
            ],
            callout: {
              variant: 'pearl',
              title: 'Gadolinium Enhancement Proves Time Dissemination on One Scan',
              body: 'A single MRI showing both gadolinium-enhancing (new/active) and non-enhancing T2 (older) lesions simultaneously satisfies Dissemination in Time.',
            },
          },
          {
            heading: 'Important MRI & CSF Mimics',
            bullets: [
              'White-matter MRI hyperintensity mimics: Small-vessel cerebrovascular ischaemia (older vascular patients), migraine, CNS vasculitis / SLE / antiphospholipid syndrome, neurosarcoidosis, Lyme disease, B12 deficiency, CADASIL.',
              'Positive CSF Oligoclonal Band mimics: CNS infections (neurosyphilis, Lyme, viral encephalitis, SSPE), Neurosarcoidosis, SLE/CNS vasculitis, Guillain-Barré syndrome (if systemic bands spill over — why paired serum is essential), ADEM (~30%), paraneoplastic syndromes.',
            ],
          },
        ],
        examPearls: [
          'Both brain MRI and CSF oligoclonal bands are positive in ~95% of MS patients, but neither is 100% specific — exclude vascular, infective, and vasculitic mimics.',
          'MS requires Dissemination in Space and Time after ruling out better explanations.',
        ],
      },
      {
        id: 'ms-3',
        moduleId: 'demyelinating-ms',
        title: 'Multiple Sclerosis III: Management, Prognosis, NMO & ADEM',
        subtitle: 'Relapse high-dose steroids, DMT efficacy/risks, symptomatic care, NMO (AQP4), and ADEM',
        sourcePdf: '15-_MS_III_fec0bff0.pdf',
        overview:
          'Covers comprehensive MS care (counselling, MDT, symptomatic drugs, IV methylprednisolone for relapses, Disease-Modifying Therapies), long-term prognosis statistics, and differentiates Neuromyelitis Optica (NMO) and ADEM.',
        keyConcepts: [
          'Relapse Rx: IV Methylprednisolone 1g x 3 days (or oral 500mg x 5d)',
          'Symptomatic Rx: Baclofen/Tizanidine, Amantadine/Modafinil, Gabapentin/Amitriptyline, Oxybutynin',
          'DMTs reduce RRMS relapses by ~1/3 to >60% (not effective in pure progressive)',
          'Prognosis: 1/3 mild, 50% walking aid at 15yr, -5–10yr life expectancy',
          'NMO: ON + LETM (>=3 cord segments), normal brain MRI, AQP4 Ab+, OCB usually neg',
          'ADEM: monophasic post-infectious children, encephalopathy + multifocal, 1/3 OCB+',
        ],
        sections: [
          {
            heading: 'Relapse, Symptomatic & Disease-Modifying Management',
            bullets: [
              'Counselling & MDT: Empathetic disclosure, MS specialist nurse, physiotherapy, OT, bladder/continence team.',
              'Acute Relapse Treatment: Exclude pseudo-relapse (infection/UTI/fever triggering Uhthoff’s!). Treat disabling acute relapses with high-dose Corticosteroids — IV Methylprednisolone 1 g daily for 3 days (or high-dose oral methylprednisolone 500 mg daily for 5 days). Speeds recovery but does NOT alter final disability.',
              'Symptomatic Therapies: Spasticity -> Baclofen or Tizanidine (gabapentin/botox/cannabinoid spray); Fatigue -> Amantadine, Modafinil, graded exercise; Neuropathic pain/trigeminal neuralgia -> Amitriptyline, Gabapentin, Pregabalin, Carbamazepine; Bladder detrusor overactivity -> Oxybutynin, Solifenacin, Mirabegron (check post-void residual first; intermittent self-catheterisation if retention).',
              'Disease-Modifying Therapies (DMTs) for RRMS: Traditional injectables (Interferon-beta, Glatiramer acetate) reduce relapse rate by ~1/3 (30%). Higher-efficacy oral/infusion agents: Dimethyl fumarate, Teriflunomide, Fingolimod (bradycardia/macular oedema), Natalizumab (JCV -> PML risk), Alemtuzumab, Ocrelizumab (anti-CD20; modest benefit in early active PPMS too).',
            ],
          },
          {
            heading: 'Prognosis in Multiple Sclerosis',
            bullets: [
              'Roughly 1/3 follow a mild/benign course with minimal disability after 15–20 years.',
              '~50% require a walking aid by 15 years from onset; life expectancy is reduced by ~5–10 years on average.',
              'Favourable prognostic indicators: Female sex, younger onset, sensory/optic neuritis onset, complete relapse recovery, low baseline MRI lesion load, long interval to second relapse.',
              'Poor prognostic indicators: Older male onset, primary progressive course, early motor/cerebellar/sphincter involvement, frequent early relapses, high MRI lesion burden.',
            ],
          },
          {
            heading: 'Neuromyelitis Optica (NMO / NMOSD) & ADEM',
            bullets: [
              'Neuromyelitis Optica (Devic’s disease): Autoimmune astrocytopathy targeting Aquaporin-4 (AQP4-IgG positive in ~70–80%). Causes severe (often bilateral) Optic Neuritis PLUS Longitudinally Extensive Transverse Myelitis (LETM spanning >= 3 vertebral segments — vs short <1–2 segment plaques in MS). Brain MRI is typically NORMAL (or hypothalamic/area postrema intractable hiccups/vomiting); CSF oligoclonal bands usually NEGATIVE (~15–20% only). Avoid MS beta-interferons (worsen NMO!); treat with steroids + PLEX acutely and azathioprine/rituximab long-term.',
              'ADEM (Acute Disseminated Encephalomyelitis): Acute MONOPHASIC immune demyelinating illness typically affecting children/young adults days-to-weeks after viral infection or immunisation. Key differentiator from MS: Acute ENCEPHALOPATHY (confusion, drowsiness, seizures, fever) + multifocal white matter/deep grey lesions; CSF OCBs positive in only ~1/3 (often disappear on recovery). Treat with high-dose IV steroids.',
            ],
          },
        ],
        tables: [
          {
            title: 'MS vs NMO (NMOSD) vs ADEM',
            headers: ['Feature', 'Multiple Sclerosis (RRMS)', 'Neuromyelitis Optica (NMO)', 'ADEM'],
            rows: [
              ['Course', 'Relapsing-remitting / progressive', 'Severe relapsing (no secondary progression)', 'Monophasic (post-infectious/vaccine)'],
              ['Typical Age', '20–40 years', '30–50 years (F >> M)', 'Children / young adults'],
              ['Encephalopathy', 'Absent at onset', 'Absent (area postrema hiccups possible)', 'Present (confusion, coma, seizures)'],
              ['Spinal Cord MRI', 'Short eccentric plaques (<2 segments)', 'Longitudinally extensive (>=3 segments)', 'Variable multifocal cord lesions'],
              ['Brain MRI', 'Abnormal (~95% Dawson’s fingers)', 'Often normal initially', 'Large bilateral ill-defined white/deep grey lesions'],
              ['CSF OCBs / Biomarker', 'OCBs + (~95%)', 'OCBs usually negative; AQP4-IgG +', 'OCBs + in ~1/3 only; transient'],
            ],
          },
        ],
        examPearls: [
          'Always check for UTI/infection before giving IV methylprednisolone for a suspected MS relapse (pseudo-relapse from Uhthoff’s).',
          'Cord lesion >=3 segments + severe optic neuritis + normal brain MRI + negative OCBs = Neuromyelitis Optica (check Aquaporin-4 antibody).',
        ],
      },
    ],
  },
  {
    id: 'cns-infections',
    title: 'Central Nervous System Infections',
    description:
      'Meningitis, viral encephalitis, brain abscess, Kernig’s/Brudzinski’s signs, full CSF diagnostic matrix, empirical ceftriaxone + acyclovir + dexamethasone, TB meningitis, and cryptococcal meningitis.',
    accentColor: '#059669',
    lectures: [
      {
        id: 'cns-infection-1',
        moduleId: 'cns-infections',
        title: 'CNS Infections I: Meningitis, Encephalitis & Brain Abscess',
        subtitle: 'Clinical syndromes, bacterial/viral pathogens, meningism signs, and abscess predispositions',
        sourcePdf: '9-_Infection_I_9da32d33.pdf',
        overview:
          'Separates Meningitis (meningeal irritation with preserved parenchymal awareness early) from Encephalitis (altered consciousness/behaviour/seizures) and Cerebral Abscess (focal mass lesion), detailing pathogens and bedside signs.',
        keyConcepts: [
          'Meningitis vs Encephalitis vs Meningoencephalitis vs Abscess',
          'Bacterial: Strep pneumoniae, Neisseria meningitidis, H. influenzae, Listeria',
          'Viral meningitis: Enteroviruses (benign, intact consciousness)',
          'Encephalitis: HSV-1 (temporal lobe haemorrhage/seizures)',
          'Abscess sources: sinus/ear, dental, trauma, bronchiectasis, R->L shunt',
          'Kernig’s sign, Brudzinski’s sign & meningococcal purpuric rash',
        ],
        sections: [
          {
            heading: 'Syndrome Differentiation & Pathogens',
            bullets: [
              'Meningitis: Inflammation of pia/arachnoid meninges -> fever, severe headache, neck stiffness, photophobia, vomiting, WITH preserved consciousness early.',
              'Encephalitis: Direct brain parenchyma inflammation -> fever + headache PLUS altered mental state (confusion, personality change, drowsiness, coma), focal deficits, or seizures (HSV-1 classically targets frontotemporal lobes!).',
              'Meningoencephalitis: Combined meningeal irritation and parenchymal brain dysfunction.',
              'Cerebritis & Brain Abscess: Focal suppurative mass -> subacute headache, fever (absent in up to 50%!), focal deficit, seizures, papilloedema. Sources: contiguous spread from paranasal sinusitis (frontal), otitis media/mastoiditis (temporal/cerebellar), dental sepsis, penetrating head trauma/neurosurgery, or haematogenous spread (bronchiectasis, infective endocarditis, cyanotic right-to-left cardiac shunts).',
              'Major Pathogens: Acute Bacterial Meningitis -> Streptococcus pneumoniae (most common adult), Neisseria meningitidis (young adults, petechial/purpuric non-blanching rash), Haemophilus influenzae, Listeria monocytogenes (neonates, >55yr, pregnant, immunocompromised — requires ampicillin/amoxicillin!). Viral Meningitis -> Enteroviruses (Echovirus, Coxsackie — benign self-limiting with intact consciousness), Mumps, HSV-2.',
            ],
          },
          {
            heading: 'Clinical Examination Signs',
            bullets: [
              'Neck stiffness: Resistance to passive neck flexion (lateral rotation often preserved).',
              'Kernig’s sign: With hip and knee flexed 90 degrees, passive knee extension causes pain/hamstring spasm.',
              'Brudzinski’s sign: Passive neck flexion causes involuntary hip and knee flexion.',
              'Non-blanching petechial/purpuric rash ("glass test"): Hallmark of meningococcal septicaemia (Neisseria meningitidis) — treat immediately with IV/IM benzylpenicillin or ceftriaxone!',
            ],
          },
        ],
        examPearls: [
          'Preserved consciousness with fever/neck stiffness suggests meningitis; confusion, behavioural change, or temporal lobe seizures indicate encephalitis (suspect HSV-1).',
          'Always inspect behind the ears and inside the nose/mouth/chest for source of a brain abscess (otitis, sinusitis, bronchiectasis).',
        ],
      },
      {
        id: 'cns-infection-2',
        moduleId: 'cns-infections',
        title: 'CNS Infections II: CSF Matrix, Empirical Therapy, TB & Cryptococcus',
        subtitle: 'CT-before-LP rules, bacterial/viral/TB/fungal CSF profiles, dexamethasone timing, and chronic meningitis',
        sourcePdf: '10_-_Infection_II_f81519e1.pdf',
        overview:
          'Provides the complete CSF diagnostic matrix across Normal, Bacterial, Viral, TB, and Fungal meningitis, details empirical IV ceftriaxone + acyclovir + dexamethasone protocols, and covers Tuberculous and Cryptococcal meningitis.',
        keyConcepts: [
          'CT before LP indications & absolute CI in brain abscess',
          'Full CSF comparison table (WBC, Protein, Glucose ratio)',
          'Empirical Tx: IV Ceftriaxone + IV Acyclovir + IV Dexamethasone x 4d',
          'Bacterial meningitis ~20% mortality; abscess Abx + drainage',
          'TB meningitis: subacute, basal meningeal enhancement, tuberculomas, ZN/60% culture',
          'Cryptococcal meningitis: immunocompromised, India ink (~50%), Amphotericin B + Flucytosine / Fluconazole',
        ],
        interactiveLabs: ['csf-matrix'],
        sections: [
          {
            heading: 'Diagnostic Workup & CT-Before-LP Safety',
            bullets: [
              'Immediate blood cultures (positive in >50% bacterial meningitis — take BEFORE or alongside antibiotics, NEVER delay antibiotics for CT or LP!), FBC, CRP, U&Es, clotting, viral throat/stool swabs, meningococcal PCR.',
              'Perform CT Head BEFORE LP if ANY of: reduced GCS (<12), focal neurological signs, new seizures, papilloedema, severe immunocompromise, or suspected brain abscess. LP is CONTRAINDICATED in brain abscess (high coning risk).',
              'Brain MRI & EEG in suspected HSV encephalitis: MRI shows bilateral/asymmetric T2 hyperintensity in medial temporal & inferior frontal lobes; CSF HSV PCR is diagnostic.',
            ],
          },
          {
            heading: 'Empirical & Specific Antimicrobial Therapy',
            bullets: [
              'Acute Bacterial Meningitis: IV Ceftriaxone 2 g BD (add IV Amoxicillin 2 g 4-hourly if age >55, pregnant, or immunocompromised to cover Listeria!). Mortality remains ~20% (higher in pneumococcal).',
              'Adjunctive Steroids: IV Dexamethasone (10 mg QDS for 4 days) given WITH or BEFORE the first dose of antibiotics — reduces mortality and neurological sequelae (deafness) in pneumococcal meningitis.',
              'Suspected Encephalitis: Start IV Acyclovir (10 mg/kg TDS for 14–21 days) immediately alongside empirical cover until HSV PCR returns.',
              'Brain Abscess: Broad-spectrum IV antibiotics (e.g. ceftriaxone + metronidazole) PLUS neurosurgical stereotactic aspiration/excision.',
            ],
            callout: {
              variant: 'warning',
              title: 'Give Antibiotics & Dexamethasone Immediately',
              body: 'Never delay IV Ceftriaxone (+ IV Dexamethasone) waiting for a CT scan or Lumbar Puncture in suspected bacterial meningitis.',
            },
          },
          {
            heading: 'Tuberculous (TBM) & Cryptococcal Meningitis',
            bullets: [
              'Tuberculous Meningitis (TBM): Subacute onset over 1–4 weeks (headache, malaise, low-grade fever, confusion, cranial nerve palsies [VI, III, VII] due to thick basal exudate, hydrocephalus, tuberculomas, stroke from endarteritis). Investigations: MRI with contrast shows basal meningeal enhancement +/- tuberculomas; CXR (miliary/pulmonary TB); CSF shows lymphocytic predominance, VERY HIGH protein, VERY LOW glucose; Ziehl-Neelsen stain low sensitivity (~10–20%), CSF TB culture ~60% (takes weeks) -> start quadruple anti-TB therapy (RIPE) + Dexamethasone immediately on clinical/CSF suspicion.',
              'Cryptococcal Meningitis: Subacute fungal meningitis in immunocompromised hosts (advanced HIV/AIDS with CD4 <100, transplant, steroids). Headache, fever, raised ICP/papilloedema with minimal neck stiffness. CSF: High opening pressure, mild lymphocytosis, low glucose, high protein; India ink stain ~50% sensitive (cryptococcal antigen CrAg >95% sensitive!). Treat with IV Liposomal Amphotericin B + Flucytosine induction followed by Fluconazole maintenance.',
            ],
          },
        ],
        tables: [
          {
            title: 'CSF Diagnostic Profile Across CNS Infections',
            headers: ['Parameter', 'Normal', 'Bacterial', 'Viral', 'Tuberculous (TB)', 'Fungal (Cryptococcus)'],
            rows: [
              ['Appearance', 'Crystal clear', 'Turbid / purulent', 'Clear', 'Clear / fibrin cobweb', 'Clear'],
              ['Opening Pressure', '10–20 cm H2O', 'Elevated', 'Normal / mildly raised', 'Elevated', 'Markedly elevated'],
              ['WBC Count & Type', '0–5 lymphocytes', '100–5,000+ Neutrophils', '10–500 Lymphocytes', '50–500 Lymphocytes', '20–300 Lymphocytes'],
              ['Protein', '0.15–0.45 g/L', 'High (1–5 g/L)', 'Normal–mildly high (<1 g/L)', 'Very high (1–6+ g/L)', 'High (0.5–3 g/L)'],
              ['Glucose (vs Serum)', '>60% (>2.5 mmol/L)', 'Very low (<40%)', 'Normal (>60%)', 'Very low (<40%)', 'Low (<50%)'],
              ['Special Test', '—', 'Gram stain / culture / PCR', 'Viral PCR (HSV, Entero)', 'ZN stain / TB culture (~60%)', 'India ink (~50%) / CrAg'],
            ],
          },
        ],
        examPearls: [
          'Lymphocytic CSF with VERY high protein and VERY low glucose = Tuberculous meningitis until proven otherwise.',
          'Give IV Dexamethasone for 4 days starting with or just before the first antibiotic dose in acute bacterial meningitis.',
        ],
      },
    ],
  },
];
