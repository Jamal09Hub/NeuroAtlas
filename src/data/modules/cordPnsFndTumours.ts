import { CurriculumModule } from '../../types/neurology';

export const cordPnsFndTumoursModules: CurriculumModule[] = [
  {
    id: 'cord-pns-muscle',
    title: 'Spinal Cord, Motor Neuron, NMJ, Nerve & Muscle',
    description:
      'Paraparesis/tetraparesis & Brown-Séquard syndrome, cerebellar vs sensory ataxia, MND, Myasthenia Gravis, peripheral neuropathy, upper/lower limb mononeuropathies, genetic/metabolic cord/muscle disorders, CMT, and syringomyelia.',
    accentColor: '#0D9488',
    lectures: [
      {
        id: 'paresis-cord',
        moduleId: 'cord-pns-muscle',
        title: 'Paraparesis, Tetraparesis & Brown-Séquard Syndrome',
        subtitle: 'Spinal cord localisation cases, absent reflex at cord level, hemiparesis, and T10 hemisection',
        sourcePdf: '13-_Paresis_106fd976.pdf',
        overview:
          'Applies long-tract neuroanatomy to clinical localisation cases: thoracic vs cervical spinal cord compression (spastic paraparesis vs tetraparesis with segmental LMN absent biceps reflex), hemiparesis, and Brown-Séquard hemisection at T10.',
        keyConcepts: [
          'Spastic paraparesis (thoracic/lumbar cord) vs Tetraparesis (cervical cord)',
          'Segmental LMN sign at lesion level (e.g. absent C5 biceps reflex) + UMN below',
          'Hemiparesis localization (cortex, internal capsule, brainstem)',
          'Brown-Séquard syndrome (T10): Ipsilateral UMN + Dorsal column, Contralateral Spinothalamic',
          'Common & uncommon causes of myelopathy',
        ],
        interactiveLabs: ['spinal-tracts'],
        dragDropId: 'pns-cord-lesions',
        sections: [
          {
            heading: 'Case-Based Cord Localisation: Paraparesis vs Tetraparesis',
            bullets: [
              'Case I (Spastic Paraparesis vs Tetraparesis): Bilateral leg UMN weakness (spasticity, brisk knee/ankle jerks, upgoing plantars) with a thoracic sensory level indicates a thoracic spinal cord lesion. Weakness in all 4 limbs (tetraparesis) with an ABSENT biceps reflex (C5 LMN at the lesion level) and brisk triceps/lower-limb reflexes (UMN below C5) precisely localises the lesion to the C5 cervical spinal cord segment!',
              'Case II (Hemiparesis): Unilateral arm + leg weakness (+/- face) localises ABOVE the foramen magnum/medullary decussation (contralateral cerebral cortex, internal capsule, or brainstem; brainstem lesions characteristically give crossed cranial nerve palsy + contralateral hemiparesis).',
              'Case III (Brown-Séquard Cord Hemisection at T10): Ipsilateral UMN leg weakness (corticospinal tract already crossed in medulla), Ipsilateral loss of vibration & joint position sense below T10 (dorsal columns uncrossed until medulla), and Contralateral loss of pain & temperature sensation 1–2 segments below T10 (spinothalamic tract already crossed in spinal cord), plus a narrow ipsilateral band of LMN/sensory loss at T10.',
            ],
            callout: {
              variant: 'localisation',
              title: 'Absent Reflex at Lesion Level + Brisk Below',
              body: 'In cervical spondylotic myelopathy at C5, anterior horn/root damage abolishes the C5 biceps jerk (LMN), while cord compression produces hyperreflexia in C7 triceps and legs (UMN) — even inverted biceps reflex!',
            },
          },
          {
            heading: 'Causes of Acute & Chronic Myelopathy',
            bullets: [
              'Common compressive causes: Cervical spondylosis / intervertebral disc prolapse, vertebral metastases (lung, breast, prostate, myeloma, lymphoma — emergency MRI spine + IV/oral dexamethasone!), spinal epidural abscess/haematoma, meningioma/neurofibroma.',
              'Non-compressive / medical causes: Transverse myelitis (MS, NMO, viral), spinal cord infarction (anterior spinal artery -> spares dorsal columns!), B12 subacute combined degeneration, hereditary spastic paraplegia, syringomyelia, MND, parasagittal meningioma (bilateral leg UMN weakness without sensory level!).',
            ],
          },
        ],
        tables: [
          {
            title: 'Brown-Séquard Syndrome (Right T10 Cord Hemisection Example)',
            headers: ['Pathway Damaged', 'Decussation Site', 'Clinical Deficit Below T10'],
            rows: [
              ['Right Lateral Corticospinal Tract', 'Lower Medulla', 'Right (Ipsilateral) UMN leg weakness, brisk reflexes, upgoing plantar'],
              ['Right Dorsal Column', 'Lower Medulla', 'Right (Ipsilateral) loss of proprioception & vibration sense'],
              ['Right Spinothalamic Tract', 'Spinal Cord (T10–T8)', 'Left (Contralateral) loss of pain & temperature sensation'],
            ],
          },
        ],
        examPearls: [
          'Always image the whole spine urgently with MRI when spastic paraparesis presents with back pain or sphincter disturbance to exclude malignant cord compression.',
          'Parasagittal meningioma compresses both medial motor cortices (ACA territory leg area), mimicking spinal paraparesis without a cord sensory level.',
        ],
      },
      {
        id: 'ataxia',
        moduleId: 'cord-pns-muscle',
        title: 'Cerebellar vs Sensory Ataxia & Differential Diagnosis',
        subtitle: 'IPSILATERAL cerebellar signs, Romberg’s test & pseudoathetosis, and genetic/toxic/paraneoplastic causes',
        sourcePdf: '14-_Ataxia_c8963ec7.pdf',
        overview:
          'Contrasts cerebellar ataxia (ipsilateral limb signs, scanning dysarthria, nystagmus) with sensory ataxia (dorsal column loss, positive Romberg’s, pseudoathetosis) and catalogues common acquired and inherited causes.',
        keyConcepts: [
          'Cerebellar hemisphere lesions cause IPSILATERAL limb signs',
          'DANISH signs: Dysdiadochokinesia, Ataxia, Nystagmus, Intention tremor, Dysarthria, Heel-shin',
          'Sensory ataxia: Romberg’s positive, pseudoathetosis, stamping gait',
          'Causes: MS, alcohol, phenytoin/CBZ/lithium, stroke, posterior fossa tumour',
          'Inherited/paraneoplastic/metabolic: SCA, Friedreich’s ataxia, hypothyroidism',
        ],
        interactiveLabs: ['motor-reflex-cerebellum'],
        sections: [
          {
            heading: 'Cerebellar Ataxia (Ipsilateral Control)',
            bullets: [
              'Rule: Because cerebellar pathways double-cross, a cerebellar hemisphere lesion produces IPSILATERAL limb signs; midline vermis lesions produce truncal and gait ataxia.',
              'Key signs: Nystagmus (fast phase toward affected cerebellar side), cerebellar scanning/staccato dysarthria, dysmetria ("past-pointing") and intention tremor on finger-to-nose test, dysdiadochokinesia (rapid alternating movements), impaired heel-to-shin test, broad-based drunken gait failing heel-to-toe tandem walking, pendular reflexes, hypotonia.',
            ],
          },
          {
            heading: 'Sensory Ataxia vs Cerebellar Ataxia',
            bullets: [
              'Sensory ataxia arises from severe dorsal column or large-fibre sensory neuropathy impairing proprioception.',
              'Key signs: POSITIVE Romberg’s test (patient stands steady with eyes OPEN using vision to compensate, then sways/falls immediately when eyes are CLOSED — note: cerebellar patients are unsteady even with eyes open!), pseudoathetosis (involuntary piano-playing finger movements with outstretched eyes closed), high-stepping/stamping gait, absent vibration/joint position sense.',
            ],
          },
          {
            heading: 'Aetiology & Investigations',
            bullets: [
              'Common acquired causes: Multiple Sclerosis, Chronic Alcoholism (vermis degeneration -> gait > limb ataxia; Wernicke’s encephalopathy), Drugs (Phenytoin toxicity, Carbamazepine, Lithium, Amiodarone), Cerebellar stroke (infarct/haemorrhage), Posterior fossa tumours (astrocytoma, medulloblastoma, haemangioblastoma, metastases).',
              'Metabolic / Immune / Inherited: Hypothyroidism, Coeliac/gluten ataxia, Paraneoplastic cerebellar degeneration (anti-Yo/Hu/Tr antibodies with breast/ovarian/SCLC), Spinocerebellar ataxias (SCA — autosomal dominant), Friedreich’s ataxia (autosomal recessive GAA repeat -> ataxia + absent ankle jerks + upgoing plantars + pes cavus + scoliosis + hypertrophic cardiomyopathy + diabetes).',
              'Investigations: MRI Brain (posterior fossa/cerebellum), Bloods (TFTs, B12, folate, coeliac/paraneoplastic antibodies, drug levels), Genetic panel, CXR/CT chest-abdo-pelvis if paraneoplastic suspected.',
            ],
          },
        ],
        examPearls: [
          'Romberg’s test tests dorsal column proprioception, NOT cerebellar function — cerebellar ataxia is unstable with eyes OPEN.',
          'Remember phenytoin, carbamazepine, lithium, and alcohol as classic reversible/toxic causes of cerebellar ataxia.',
        ],
      },
      {
        id: 'mnd',
        moduleId: 'cord-pns-muscle',
        title: 'Motor Neurone Disease (ALS, Progressive Bulbar Palsy & PMA)',
        subtitle: 'Combined UMN + LMN degeneration sparing sensory/bladder/ocular systems, EMG denervation, Riluzole, and NIV',
        sourcePdf: '7-_MND_0d3b081d.pdf',
        overview:
          'Defines the relentless degeneration of motor neurones in cortex, brainstem, and spinal cord across ALS, Progressive Bulbar Palsy, and Progressive Muscular Atrophy, emphasising key negative findings, EMG confirmation, Riluzole, PEG, and NIV.',
        keyConcepts: [
          'Amyotrophic Lateral Sclerosis (ALS): mixed UMN + LMN signs',
          'Progressive Bulbar Palsy & Progressive Muscular Atrophy (PMA)',
          'NO sensory loss, NO bladder/bowel, NO extraocular weakness',
          'NCS normal sensory; EMG widespread denervation (wasted + normal muscles)',
          'Riluzole (~3 mo survival benefit), PEG feeding, NIV',
          'Median survival ~3 years from symptom onset',
        ],
        dragDropId: 'umn-lmn-nmj',
        sections: [
          {
            heading: 'Subtypes & Cardinal Clinical Features',
            bullets: [
              'Epidemiology: Progressive neurodegenerative disorder (~2/100,000/yr, onset 50–70 yr, M > F); 5–10% familial (SOD1, C9orf72).',
              'Amyotrophic Lateral Sclerosis (ALS — ~80%): Combined UMN signs (spasticity, brisk reflexes, upgoing plantars) AND LMN signs (wasting, widespread fasciculations, weakness) in the SAME limb or across regions.',
              'Progressive Bulbar Palsy: Early dysarthria, dysphagia, nasal regurgitation, and mixed bulbar/pseudobulbar signs (wasted fasciculating tongue + brisk jaw jerk) — carries worst prognosis.',
              'Progressive Muscular Atrophy (PMA): Pure LMN distal-to-proximal wasting/weakness; Primary Lateral Sclerosis (PLS): rare pure UMN.',
              'CRITICAL EXCLUSION RULES (3 classic spares): MND produces NO objective sensory loss, NO sphincter/bladder involvement (Onuf’s nucleus spared), and NO extraocular muscle weakness (eye movements spared).',
            ],
            callout: {
              variant: 'pearl',
              title: 'Three Systems Spared in MND',
              body: 'Sensory pathways, bladder/bowel sphincters, and extraocular muscles remain intact — presence of sensory loss, early urinary incontinence, or diplopia points away from MND.',
            },
          },
          {
            heading: 'Investigations, Management & Prognosis',
            bullets: [
              'Diagnosis & Differential Exclusion: MRI brain/cervical spine mandatory to exclude treatable cervical myeloradiculopathy (which mimics ALS in arms/legs!) and brainstem lesion; bloods (CK mildly raised, anti-GM1 to exclude multifocal motor neuropathy, TFTs, B12).',
              'NCS & EMG: Sensory NCS completely NORMAL; Motor NCS normal or low amplitude; Needle EMG shows widespread active denervation (fibrillations, fasciculations) + chronic reinnervation in BOTH clinically wasted AND clinically normal muscles across multiple regions.',
              'Management: Disease-modifying Riluzole (glutamate release inhibitor — modest survival extension ~3 months); MDT support; PEG (percutaneous endoscopic gastrostomy) early before respiratory decline for safe nutrition in dysphagia; Non-Invasive Ventilation (NIV) significantly improves quality of life and survival when orthopnoea / nocturnal hypoventilation / falling FVC develops.',
              'Prognosis: Median survival ~3 years from onset (typically respiratory failure/aspiration pneumonia).',
            ],
          },
        ],
        examPearls: [
          'Combined UMN and LMN signs with normal sensory exam and preserved eye movements + bladder function = Motor Neurone Disease.',
          'Always perform MRI cervical spine to exclude compressive cervical myeloradiculopathy before diagnosing ALS.',
        ],
      },
      {
        id: 'myasthenia-gravis',
        moduleId: 'cord-pns-muscle',
        title: 'Myasthenia Gravis: Neuromuscular Junction & Crisis Management',
        subtitle: 'AChR antibodies, thymoma, fatigable ocular/bulbar/proximal weakness, diagnostic tests, and drug contraindications',
        sourcePdf: '6-_MG_62b33181.pdf',
        overview:
          'Covers postsynaptic AChR-antibody mediated NMJ transmission failure, bimodal age distribution, fatigable painless weakness, ice-pack/EMG/serology diagnosis, pyridostigmine/immunosuppression, thymectomy, FVC <1.5L crisis monitoring, and dangerous drugs.',
        keyConcepts: [
          'Postsynaptic AChR antibodies (~85%); thymus hyperplasia (65%) / thymoma (10–15%)',
          'Bimodal: young women (20–30s) & older men (60–70s)',
          'Fatigable painless ocular (ptosis/diplopia), bulbar, proximal limb weakness',
          'Tests: AChR/MuSK Ab, Repetitive EMG decrement, Ice pack, CT thorax',
          'Tx: Pyridostigmine (+ propantheline), Prednisolone (steroid dip!), Azathioprine, Thymectomy',
          'Myasthenic crisis: FVC <1.5L -> IVIg / Plasma Exchange; avoid aminoglycosides/beta-blockers/D-penicillamine',
        ],
        interactiveLabs: ['nmj-pns'],
        dragDropId: 'umn-lmn-nmj',
        sections: [
          {
            heading: 'Pathophysiology & Clinical Presentation',
            bullets: [
              'Autoimmune IgG attack against postsynaptic nicotinic Acetylcholine Receptors (AChR Ab positive in ~85% generalised, ~50% ocular; anti-MuSK in ~5–8%). Reduces functional AChRs and flattens postsynaptic junctional folds.',
              'Thymus association: Thymic follicular hyperplasia (~65% young patients) or Thymoma (~10–15% — screen all MG patients with CT thorax!).',
              'Bimodal demographics: Young adult women (20–30s) and older men (60–70s).',
              'Hallmark symptom: Fatigable, fluctuating PAINLESS muscle weakness worsening with sustained use and toward the end of the day, improving with rest.',
              'Distribution: Ocular first in >50% (asymmetrical ptosis, fluctuating diplopia), Bulbar (nasal speech, dysphagia, chewing fatigue, "myasthenic snarl"), Proximal limbs (neck flexors/extensors, deltoids), Respiratory muscles. Reflexes, sensation, and pupils remain completely NORMAL.',
            ],
          },
          {
            heading: 'Investigations, Management & Contraindicated Drugs',
            bullets: [
              'Diagnosis: Serum AChR (and MuSK) antibodies; Repetitive nerve stimulation / Single-fibre EMG (classic >10% decremental response / increased jitter); Bedside Ice-pack test (cooling inhibits AChE -> improves ptosis for 2 min) or historical Tensilon (edrophonium) test (risk of bradycardia/asystole -> keep atropine ready); CT Thorax for thymoma; TFTs (autoimmune overlap).',
              'Symptomatic therapy: Pyridostigmine (oral acetylcholinesterase inhibitor; add Propantheline if muscarinic abdominal colic/diarrhoea occurs). Excess dose can cause cholinergic crisis.',
              'Immunosuppression: Oral Prednisolone (start LOW and titrate UP slowly in hospital/supervised because high-dose steroids can cause transient initial worsening — "steroid dip"!) + steroid-sparing Azathioprine (or mycophenolate/tacrolimus).',
              'Thymectomy: Mandatory for thymoma; also improves remission rates in AChR+ generalised MG patients <45–65 years even without thymoma.',
              'Myasthenic Crisis (bulbar/respiratory failure): Monitor serial Forced Vital Capacity (FVC — NOT peak flow!); if FVC < 1.5 L (or <20 mL/kg) or dropping rapidly -> ICU intubation + urgent IV Immunoglobulin (IVIg) or Plasma Exchange (PLEX).',
              'Contraindicated / exacerbating drugs: Aminoglycosides (gentamicin), macrolides, fluoroquinolones, beta-blockers, magnesium sulphate, benzodiazepines/opioids, neuromuscular blockers; D-penicillamine can directly INDUCE autoimmune myasthenia gravis!',
            ],
            callout: {
              variant: 'warning',
              title: 'Monitor FVC — Not Peak Flow — in Myasthenic Crisis',
              body: 'Peak expiratory flow misses diaphragmatic weakness. Serial FVC <1.5 L (or <20 mL/kg) mandates urgent respiratory/ICU escalation alongside IVIg or plasma exchange.',
            },
          },
        ],
        examPearls: [
          'Normal reflexes, normal sensation, normal pupils + fatigable ptosis/diplopia/bulbar weakness = Myasthenia Gravis.',
          'Always image the thorax (CT) for thymoma, start steroids gradually ("steroid dip"), and avoid gentamicin, beta-blockers, and D-penicillamine.',
        ],
      },
      {
        id: 'peripheral-neuropathy',
        moduleId: 'cord-pns-muscle',
        title: 'Peripheral Neuropathy: Classification, Axonal vs Demyelinating & Approach',
        subtitle: 'Polyneuropathy vs mononeuritis multiplex, sensory/motor/autonomic phenotypes, and diagnostic workup',
        sourcePdf: '3-_Peripheral_neuropathy_69ebfd5b.pdf',
        overview:
          'Defines peripheral neuropathy patterns (symmetrical polyneuropathy, mononeuropathy, mononeuritis multiplex), contrasts axonal degeneration vs demyelination on NCS, details sensory/motor/autonomic signs, and structures investigations.',
        keyConcepts: [
          'Polyneuropathy (glove-and-stocking) vs Mononeuritis multiplex vs Radiculopathy',
          'Axonal (low amplitude, length-dependent) vs Demyelinating (slow velocity, often proximal + distal)',
          'Sensory vs Motor vs Autonomic symptoms and signs',
          'Common causes: Diabetes, Alcohol, B12, Drugs, Paraprotein, Vasculitis, GBS/CIDP, CMT',
          'Targeted blood, NCS, CSF & nerve biopsy investigations',
        ],
        sections: [
          {
            heading: 'Terminology & Pathological Mechanisms (Axonal vs Demyelinating)',
            bullets: [
              'Symmetrical Polyneuropathy: Length-dependent "glove-and-stocking" distal sensory loss and/or weakness (longest nerves affected first).',
              'Mononeuritis Multiplex: Asymmetric stepwise involvement of >=2 non-contiguous individual named nerves (classic cause: systemic VASCULITIS [PAN, Churg-Strauss/EGPA, GPA, rheumatoid], diabetes, leprosy, sarcoid).',
              'Axonal Neuropathy (e.g. diabetes, alcohol, B12, chemotherapy, uraemia): Primary axon dying-back -> NCS shows REDUCED action potential AMPLITUDE with near-normal conduction velocity; slow recovery.',
              'Demyelinating Neuropathy (e.g. Guillain-Barré syndrome, CIDP, CMT1): Segmental myelin loss -> NCS shows markedly SLOWED conduction velocity, prolonged distal/F-wave latencies, and conduction block; affects proximal and distal muscles (global areflexia).',
            ],
          },
          {
            heading: 'Sensory, Motor & Autonomic Features + Common Causes',
            bullets: [
              'Sensory symptoms/signs: Negative (numbness, walking on cotton wool) and positive (paraesthesia, burning dysaesthesia, allodynia); loss of ankle jerks, impaired vibration/pinprick in stocking distribution, sensory ataxia (Romberg’s +).',
              'Motor symptoms/signs: Distal foot drop / hand intrinsic weakness, wasting, fasciculations, reduced/absent reflexes.',
              'Autonomic features: Orthostatic hypotension, anhidrosis, gastroparesis, diarrhoea/constipation, erectile dysfunction, urinary retention (diabetes, amyloidosis, GBS).',
              'Key causes ("DANG THERAPIST"): Diabetes (most common worldwide), Alcohol, Nutritional (B12, B1/thiamine, B6 excess/deficiency), Guillain-Barré / CIDP, Toxins/Drugs (isoniazid, vincristine, cisplatin, amiodarone, nitrofurantoin, metronidazole), Hereditary (CMT), Endocrine (hypothyroidism), Renal/Hepatic failure, Amyloidosis/Autoimmune (SLE, vasculitis), Paraproteinaemia (MGUS, myeloma), Infection (HIV, Lyme, leprosy).',
              'Investigations: HbA1c/glucose, B12/folate, TFTs, U&Es, LFTs, ESR/CRP, serum protein electrophoresis (paraprotein), autoimmune/ANCA/vasculitic screen, Nerve Conduction Studies (NCS), LP (high protein + normal WCC = cytoalbuminologic dissociation in GBS/CIDP), and sural nerve biopsy (rarely, mainly suspected vasculitis/amyloid).',
            ],
          },
        ],
        tables: [
          {
            title: 'Axonal vs Demyelinating Peripheral Neuropathy',
            headers: ['Feature', 'Axonal Neuropathy', 'Demyelinating Neuropathy'],
            rows: [
              ['Primary Target', 'Axon (length-dependent dying back)', 'Schwann cell / Myelin sheath'],
              ['NCS Finding', 'Reduced amplitude; normal/near-normal velocity', 'Markedly slowed conduction velocity; conduction block'],
              ['Clinical Pattern', 'Distal "glove-and-stocking"; ankle jerks lost first', 'Often proximal + distal weakness; generalised areflexia'],
              ['Typical Causes', 'Diabetes, alcohol, B12, uraemia, vincristine', 'GBS (AIDP), CIDP, CMT Type 1, diphtheria'],
            ],
          },
        ],
        examPearls: [
          'Asymmetrical painful multiple nerve palsies (e.g. foot drop + wrist drop) = Mononeuritis multiplex -> check ANCA/ESR urgently for vasculitis.',
          'High CSF protein with normal white cell count (cytoalbuminologic dissociation) + ascending areflexic paralysis = Guillain-Barré syndrome.',
        ],
      },
      {
        id: 'peripheral-nerve-1',
        moduleId: 'cord-pns-muscle',
        title: 'Upper Limb Mononeuropathies I: Median (CTS) & Ulnar Nerves',
        subtitle: 'Carpal tunnel nocturnal symptoms, APB/thenar wasting, ulnar elbow entrapment, and C8/T1 differentiation',
        sourcePdf: '1-_Peripheral_nerves_lesions-I_68504d9b.pdf',
        overview:
          'Compares the two commonest upper-limb focal entrapment neuropathies: Carpal Tunnel Syndrome (Median nerve) and Cubital Tunnel / Elbow Ulnar Neuropathy, detailing exact sensory maps, motor tests, and T1 root differentiation.',
        keyConcepts: [
          'CTS: nocturnal palmar paraesthesia relieved by shaking hand',
          'Median motor: Abductor Pollicis Brevis (APB) + LOAF muscles; thenar wasting',
          'Tinel’s & Phalen’s tests; NCS diagnosis; wrist splint / steroid / decompression',
          'Ulnar nerve: elbow entrapment, 1st dorsal interosseous wasting (sparing thenar)',
          'Ulnar claw hand & sensory loss medial 1.5 fingers to wrist vs C8/T1 to elbow',
        ],
        interactiveLabs: ['nmj-pns'],
        dragDropId: 'pns-cord-lesions',
        sections: [
          {
            heading: 'Median Nerve & Carpal Tunnel Syndrome (CTS)',
            bullets: [
              'Anatomy: Compressed beneath flexor retinaculum at the wrist; palmar cutaneous branch arises proximal to tunnel (often spares central palm!). Supplies LOAF muscles: Lateral 2 lumbricals, Opponens pollicis, Abductor pollicis brevis (APB), Flexor pollicis brevis.',
              'Clinical features: Nocturnal burning pain/paraesthesia waking patient from sleep in thumb, index, middle, and radial half of ring finger (palmar 3.5 digits), characteristically relieved by shaking/hanging the hand out of bed ("flick sign"). Later: weakness of thumb abduction (APB — push thumb vertically up off flat palm) and thenar eminence wasting.',
              'Bedside tests: Tinel’s test (tapping over flexor retinaculum reproduces tingling) and Phalen’s test (sustained wrist flexion 60 sec reproduces symptoms).',
              'Causes: Idiopathic, pregnancy/fluid retention, hypothyroidism, rheumatoid arthritis, acromegaly, diabetes, amyloidosis, wrist fracture/OA.',
              'Investigations & Treatment: NCS confirms focal slowing across wrist. Treat with nocturnal neutral wrist splint, treat underlying endocrine cause, local corticosteroid injection, or surgical carpal tunnel decompression.',
            ],
          },
          {
            heading: 'Ulnar Nerve Lesion (Typically at the Elbow)',
            bullets: [
              'Common entrapment site: Cubital tunnel behind medial epicondyle at the elbow (or Guyon’s canal at wrist).',
              'Sensory distribution: Medial (ulnar) 1.5 digits (little finger and ulnar half of ring finger) stopping sharply at the WRIST crease (whereas a C8/T1 root or lower brachial plexus lesion extends up the medial forearm toward the elbow!).',
              'Motor signs: Wasting of the 1st dorsal interosseous (hollowing of dorsal thumb-index web) and hypothenar eminence while SPARING the thenar eminence; weak finger abduction/adduction ("card test"), positive Froment’s sign (flexing thumb IP joint via median FPL to compensate for weak ulnar adductor pollicis when pinching paper), and ulnar "claw hand" (hyperextension at MCP + flexion at IP joints of 4th/5th fingers — note: lower wrist lesions paradoxically claw MORE than high elbow lesions because FDP is preserved at the wrist!).',
            ],
          },
        ],
        tables: [
          {
            title: 'Median (CTS) vs Ulnar Nerve vs C8/T1 Root',
            headers: ['Feature', 'Carpal Tunnel (Median)', 'Ulnar Nerve (Elbow)', 'C8/T1 Root / Lower Plexus'],
            rows: [
              ['Sensory Loss', 'Palmar lateral 3.5 digits', 'Medial 1.5 digits (stops at wrist)', 'Medial hand + medial forearm'],
              ['Muscle Wasting', 'Thenar eminence (APB)', '1st dorsal interosseous & hypothenar', 'Both thenar AND interossei (global small hand muscles)'],
              ['Key Motor Test', 'Thumb abduction (APB)', 'Finger abduction (FDI) & Froment’s sign', 'All intrinsic hand muscles +/- Horner’s (T1)'],
            ],
          },
        ],
        examPearls: [
          'APB wasting with spared 1st dorsal interosseous = Median nerve (CTS); 1st dorsal interosseous wasting with spared thenar = Ulnar nerve; BOTH wasted = C8/T1 or MND!',
          'Sensory loss confined distal to the wrist favours ulnar nerve; extending up the medial forearm favours C8/T1 root/plexus.',
        ],
      },
      {
        id: 'peripheral-nerve-2',
        moduleId: 'cord-pns-muscle',
        title: 'Peripheral Nerve Lesions II: Radial & Common Peroneal Nerves',
        subtitle: 'Wrist drop & spiral groove localization; foot drop & CPN vs L5 vs Sciatic vs MND differential',
        sourcePdf: '2-_Peripheral_nerves_lesions-II_be7b5b85.pdf',
        overview:
          'Distinguishes spiral groove vs axillary radial nerve palsy (triceps sparing vs involvement) and walks through the essential clinical differential of Foot Drop (Common Peroneal Nerve vs L5 radiculopathy vs Sciatic vs MND).',
        keyConcepts: [
          'Radial nerve: wrist drop, weak MCP finger extension, 1st dorsal web space numbness',
          'Spiral groove (humeral fracture / Saturday night palsy) SPARES triceps',
          'Common Peroneal Nerve (CPN): foot drop + weak eversion, preserved ankle jerk',
          'EHL test, lateral calf + dorsum vs deep branch 1st web space',
          'Foot Drop D/D: CPN vs L5 (pain + weak inversion) vs Sciatic (absent ankle jerk) vs MND/cauda equina',
        ],
        interactiveLabs: ['nmj-pns'],
        dragDropId: 'pns-cord-lesions',
        sections: [
          {
            heading: 'Radial Nerve Palsy (Wrist Drop)',
            bullets: [
              'Motor signs: Wrist drop (paralysis of wrist extensors) and inability to extend fingers at the MCP joints (extensor digitorum — note: interossei via ulnar nerve can still extend IP joints if MCP is stabilised!).',
              'Sensory loss: Small patch over the anatomical snuffbox / 1st dorsal web space (dorsum of hand between thumb and index finger).',
              'Localising lesion height: Compression at the spiral groove of the humerus (mid-shaft humeral fracture or "Saturday night palsy" draping arm over chair) SPARES the triceps (branches given off higher in axilla), whereas an axillary lesion (crutch palsy) weakens triceps AND abolishes the triceps reflex.',
            ],
          },
          {
            heading: 'Common Peroneal Nerve (CPN) & Differential of Foot Drop',
            bullets: [
              'Anatomy & Causes: Common peroneal (fibular) nerve winds superficially around the neck of the fibula -> vulnerable to tight plaster casts, habitual leg crossing, prolonged squatting/bedrest, or fibular head trauma.',
              'Clinical features of CPN palsy: Foot drop (weak ankle dorsiflexion + weak toe/EHL extension) + weak foot EVERSION (peroneus longus/brevis) + preserved foot INVERSION (tibialis posterior is tibial nerve/L5!) + PRESERVED ankle jerk (S1)!',
              'Sensory map: Lateral lower calf and dorsum of the foot (superficial + deep branches); isolated Deep Peroneal branch lesion gives numbness restricted strictly to the 1st dorsal web space between hallux and 2nd toe.',
              'Critical Foot Drop Differential Diagnosis:',
              '• Common Peroneal Nerve: Painless, weak dorsiflexion + weak eversion, NORMAL inversion, NORMAL ankle jerk.',
              '• L5 Radiculopathy: Back/sciatic radiating pain, weak dorsiflexion + EHL + WEAK INVERSION (tibialis posterior) + weak hip abduction (gluteus medius); L5 dermatome loss.',
              '• Sciatic Nerve Lesion: Weak dorsiflexion AND weak plantarflexion (tibial division), weak hamstrings, ABSENT ankle jerk, loss of sensation below knee sparing medial saphenous strip.',
              '• MND / Distal Neuropathy (CMT) / Cauda Equina / Parasagittal cortex (rare UMN foot drop with brisk ankle jerk!).',
            ],
            callout: {
              variant: 'localisation',
              title: 'Inversion & Ankle Jerk Unlock Foot Drop Localization',
              body: 'Foot inversion intact + ankle jerk intact = Common Peroneal Nerve. Foot inversion weak + back/leg pain = L5 root. Plantarflexion weak + ankle jerk absent = Sciatic nerve.',
            },
          },
        ],
        tables: [
          {
            title: 'Bedside Differentiation of Foot Drop',
            headers: ['Lesion', 'Dorsiflexion & EHL', 'Eversion', 'Inversion', 'Plantarflexion & Ankle Jerk', 'Sensory Loss'],
            rows: [
              ['Common Peroneal Nerve', 'Weak', 'Weak', 'Normal (Tibial n.)', 'Normal (S1 spared)', 'Lateral calf + dorsum foot (or 1st web space)'],
              ['L5 Radiculopathy', 'Weak', 'Variable/Weak', 'Weak (L5 Tib. Post.)', 'Normal (ankle jerk intact)', 'L5 dermatome (lateral calf, big toe) + sciatica'],
              ['Sciatic Nerve', 'Weak', 'Weak', 'Weak', 'Weak + Ankle jerk ABSENT', 'All below knee except medial saphenous'],
              ['Motor Neurone Disease', 'Weak (+/- fasciculations)', 'Weak', 'Weak', 'Variable (often brisk/UMN)', 'NONE (pure motor)'],
            ],
          },
        ],
        examPearls: [
          'A mid-humeral spiral groove radial palsy causes wrist drop and 1st dorsal web numbness while sparing triceps power and reflex.',
          'Always test foot inversion and the ankle jerk in every patient with foot drop.',
        ],
      },
      {
        id: 'other-neuro-1',
        moduleId: 'cord-pns-muscle',
        title: 'Other Neurological Disorders I: Cauda Equina, HD, Myotonic Dystrophy, B12 & Narcolepsy',
        subtitle: 'Surgical L1/2 cord vs cauda equina emergency, trinucleotide repeats, B12 SACD, plexopathy, and orexin/narcolepsy',
        sourcePdf: '12-_Other_neurological_disorders_I_79cd3ff6.pdf',
        overview:
          'Covers five high-exam-frequency disorders: Spinal disc prolapse & Cauda Equina syndrome, Huntington’s disease, Myotonic Dystrophy, Vitamin B12 Subacute Combined Degeneration of the Cord, Plexopathy, and Narcolepsy.',
        keyConcepts: [
          'Cauda Equina Syndrome (below L1/2): saddle anaesthesia, sphincter loss, emergency MRI',
          'Huntington’s Disease: AD CAG repeat chr 4, chorea + dementia + behavioural change',
          'Myotonic Dystrophy: AD CTG repeat, ptosis/hatchet face, grip/percussion myotonia, cataracts, ECG block, DM',
          'B12 SACD: dorsal columns + corticospinal -> absent ankle jerks + upgoing plantars',
          'Brachial/Lumbosacral plexopathy; Narcolepsy (EDS, cataplexy, sleep paralysis, hypnagogic hallucinations)',
        ],
        interactiveLabs: ['spinal-tracts'],
        dragDropId: 'pns-cord-lesions',
        sections: [
          {
            heading: 'Spinal Disc Disease & Cauda Equina Syndrome',
            bullets: [
              'Spinal cord terminates at L1/L2; disc prolapse below L1/L2 compresses lumbosacral roots (LMN!).',
              'Cauda Equina Syndrome (Neurosurgical Emergency!): Typically massive central L4/5 or L5/S1 disc prolapse (or tumour/abscess). Red flags: Bilateral sciatica, SADDLE ANAESTHESIA (S2–S5 perineum/buttocks), urinary retention with overflow or incontinence, faecal incontinence/loss of anal tone, progressive bilateral leg LMN weakness and absent ankle jerks.',
              'Action: Immediate urgent MRI lumbosacral spine and emergency surgical decompression within hours to prevent permanent sphincter paralysis.',
            ],
          },
          {
            heading: 'Trinucleotide Repeat Disorders: Huntington’s & Myotonic Dystrophy',
            bullets: [
              'Huntington’s Disease (HD): Autosomal dominant CAG trinucleotide repeat expansion on chromosome 4 (huntingtin gene) showing genetic anticipation. Onset ~35–50 yr: Caudate nucleus atrophy -> progressive chorea (fidgety involuntary dance-like movements), behavioural/psychiatric disturbance (depression, irritability), and subcortical dementia.',
              'Myotonic Dystrophy (DM1): Autosomal dominant CTG repeat expansion (chromosome 19) with anticipation. Distinguishing feature: DISTAL-predominant myopathy (weak neck flexors, ptosis, temporalis wasting -> long "hatchet facies", frontal balding) PLUS Myotonia (delayed muscle relaxation — cannot release handshake grip; percussion myotonia of thenar eminence). Systemic associations: Posterior subcapsular cataracts, cardiac conduction defects/heart block (annual ECG mandatory!), diabetes mellitus, testicular atrophy/hypogonadism, hypersomnia.',
            ],
          },
          {
            heading: 'Subacute Combined Degeneration (B12), Plexopathy & Narcolepsy',
            bullets: [
              'Subacute Combined Degeneration of the Cord (SACD): Vitamin B12 deficiency (pernicious anaemia, malabsorption, vegan, nitrous oxide abuse) demyelinates BOTH Dorsal Columns (loss of vibration/proprioception, sensory ataxia) AND Lateral Corticospinal Tracts (spastic paraparesis, upgoing plantars), PLUS peripheral neuropathy! Classic exam triad: ABSENT ankle jerks (peripheral neuropathy) + BRISK knee jerks + UPGOING (extensor) plantars (UMN)!',
              'Plexopathy: Brachial (Erb’s C5/6 "waiter’s tip", Klumpke’s C8/T1 + Horner’s, neuralgic amyotrophy, radiation/Pancoast) or Lumbosacral (pelvic malignancy, retroperitoneal haematoma, diabetic amyotrophy) — deficits cross multiple nerve roots and peripheral nerve territories.',
              'Narcolepsy (Orexin/Hypocretin deficiency): Classic tetrad: 1) Excessive daytime sleepiness (EDS / irresistible sleep attacks), 2) Cataplexy (sudden transient loss of muscle tone triggered by emotion/laughter while fully conscious!), 3) Sleep paralysis, 4) Hypnagogic/hypnopompic hallucinations. Diagnosis: Polysomnography + Multiple Sleep Latency Test (MSLT). Tx: Modafinil (wakefulness) + TCA/SSRI/venlafaxine or sodium oxybate (cataplexy).',
            ],
          },
        ],
        examPearls: [
          'Absent ankle jerks + extensor (upgoing) plantars = Vitamin B12 Subacute Combined Degeneration (or Friedreich’s ataxia / taboparesis).',
          'Myotonic dystrophy is the exception to proximal myopathy: distal/facial weakness + myotonia + cataracts + heart block + diabetes.',
          'Cataplexy (emotion-triggered sudden muscle collapse with preserved awareness) is pathognomonic for narcolepsy.',
        ],
      },
      {
        id: 'other-neuro-2',
        moduleId: 'cord-pns-muscle',
        title: 'Muscle Disorders: Inflammatory, Endocrine, Drug, Genetic & Metabolic Myopathies',
        subtitle: 'Proximal waddling weakness, PM/DM/IBM, steroid/statin myopathy, dystrophies, and CK/EMG/biopsy',
        sourcePdf: '13-_Other_neurological_disorders_II_2afafd6a.pdf',
        overview:
          'Organizes skeletal muscle diseases around symmetrical proximal weakness with preserved sensation/reflexes, covering Polymyositis, Dermatomyositis, Inclusion Body Myositis, endocrine/drug causes, Duchenne/Becker, and metabolic myopathies.',
        keyConcepts: [
          'Symmetrical proximal weakness, waddling gait, preserved sensation/reflexes',
          'Polymyositis & Dermatomyositis (heliotrope/Gottron rash + occult malignancy)',
          'Inclusion Body Myositis (>50yr, finger flexors, quads, foot extensors)',
          'Endocrine (Cushing’s, thyrotoxicosis) & Drug (steroids, statins, lithium, amiodarone)',
          'Genetic (Duchenne/Becker Gower’s sign, limb-girdle) & Metabolic (mitochondrial, Pompe, McArdle)',
          'Investigations: Serum CK, EMG (short polyphasic MUPs), Muscle MRI & Biopsy',
        ],
        sections: [
          {
            heading: 'General Myopathy Features & Inflammatory Myopathies',
            bullets: [
              'Core clinical pattern: Symmetrical PROXIMAL weakness (difficulty rising from low chair/squat, climbing stairs, combing hair), waddling gait, NO sensory loss, preserved deep tendon reflexes until severe atrophy (exception: Myotonic dystrophy is distal!).',
              'Polymyositis (PM): Subacute painful/painless proximal muscle weakness, high CK, responds to steroids/immunosuppression.',
              'Dermatomyositis (DM): Proximal myopathy PLUS characteristic skin signs — purple heliotrope eyelid rash, periorbital oedema, Gottron’s papules over knuckles, photosensitive shawl/V-neck rash. CRITICAL: Strong association with occult internal malignancy (~25% in adults >40yr -> screen chest/abdo/pelvis!).',
              'Inclusion Body Myositis (IBM): Most common acquired myopathy >50 years (M > F). Distinctive asymmetric/selective pattern: Deep FINGER FLEXORS (weak grip), QUADRICEPS (frequent falls/knee buckling), and foot dorsiflexors; dysphagia common; poor response to steroids.',
            ],
          },
          {
            heading: 'Endocrine, Drug, Genetic & Metabolic Myopathies',
            bullets: [
              'Endocrine myopathies: Cushing’s syndrome, Hyperthyroidism (thyrotoxicosis) and Hypothyroidism (myxoedema + delayed relaxation of ankle jerks), Acromegaly, Osteomalacia/Vit D deficiency.',
              'Drug-induced myopathies: Corticosteroids (often normal CK!), Statins (myalgia to rhabdomyolysis with very high CK), Amiodarone, Lithium, Chloroquine, Alcohol, Zidovudine.',
              'Genetic muscular dystrophies: Duchenne (X-linked dystrophin absent, onset 2–5 yr, calf pseudohypertrophy, Gower’s sign climbing up legs to stand, wheelchair ~12 yr, cardiomyopathy) & Becker (milder dystrophin mutation, later onset); Limb-girdle & Facioscapulohumeral (FSHD) dystrophies.',
              'Metabolic myopathies: Mitochondrial myopathies (CPEO ophthalmoplegia, maternal inheritance, ragged-red fibres on biopsy, lactic acidosis), Glycogen storage (Acid maltase / Pompe disease -> respiratory failure; Myophosphorylase / McArdle’s -> painful cramps & "second wind" phenomenon on exercise), Lipid storage.',
              'Investigations: Serum Creatine Kinase (CK — very high in PM/DM/Duchenne/rhabdo, can be normal in steroid/thyroid myopathy), Needle EMG (small, short-duration, polyphasic motor unit potentials), Muscle MRI, Genetic testing, Muscle biopsy.',
            ],
          },
        ],
        examPearls: [
          'Adult Dermatomyositis warrants thorough screening for underlying malignancy (ovarian, lung, GI, breast).',
          'Inclusion Body Myositis (>50yr) uniquely targets deep finger flexors and quadriceps and resists corticosteroids.',
        ],
      },
      {
        id: 'other-neuro-3',
        moduleId: 'cord-pns-muscle',
        title: 'Charcot-Marie-Tooth Disease (HMSN) & Syringomyelia / Chiari I',
        subtitle: 'Champagne-bottle legs, pes cavus, PMP22 genetics; dissociated cape pain/temp loss and Chiari I',
        sourcePdf: '14-_Other_neurological_disorders_III_4202520c.pdf',
        overview:
          'Covers the two classic structural/hereditary entities in Lecture III: Charcot-Marie-Tooth disease (Hereditary Motor and Sensory Neuropathy) and Syringomyelia / Syringobulbia with Chiari I malformation.',
        keyConcepts: [
          'CMT (HMSN): Autosomal dominant PMP22 duplication (CMT1A)',
          'Distal "champagne bottle" / inverted stork legs, pes cavus, high steppage gait',
          'Relatively mild disability despite marked wasting; axonal & demyelinating types',
          'Syringomyelia: Chiari I malformation -> central cervical cord cavity',
          'Dissociated "cape" pain & temperature loss (painless burns) sparing proprioception',
          'Upper limb LMN wasting/areflexia + Lower limb UMN spasticity',
        ],
        interactiveLabs: ['spinal-tracts'],
        dragDropId: 'pns-cord-lesions',
        sections: [
          {
            heading: 'Charcot-Marie-Tooth Disease (CMT / HMSN)',
            bullets: [
              'Most common inherited peripheral neuropathy (~1 in 2,500), predominantly Autosomal Dominant (CMT1A caused by PMP22 gene duplication on chromosome 17 -> demyelinating; CMT2 -> axonal).',
              'Clinical signs: Progressive distal muscle wasting halting sharply mid-thigh ("inverted champagne bottle" / stork legs), Pes Cavus (high-arched feet + hammer toes), bilateral foot drop producing high-stepping gait, absent ankle jerks, mild glove-and-stocking sensory loss, thickened palpable nerves (peroneal/ulnar).',
              'Key clinical pearl: Patients often have surprisingly MINIMAL functional disability relative to dramatic distal leg wasting and foot deformity.',
            ],
          },
          {
            heading: 'Syringomyelia, Syringobulbia & Chiari I Malformation',
            bullets: [
              'Pathophysiology: Fluid-filled cavity (syrinx) expanding within the central canal of the cervical spinal cord, most commonly secondary to Arnold-Chiari Type I malformation (cerebellar tonsillar ectopia through foramen magnum obstructing CSF flow) or post-traumatic cord scarring.',
              'Classical Dissociated Sensory Loss: Expanding syrinx destroys decussating spinothalamic fibres in the anterior white commissure -> bilateral loss of PAIN and TEMPERATURE across the shoulders, neck, and arms in a "CAPE" or "shawl" distribution (patients present with painless cigarette burns/scalds on fingers!), while SPARING dorsal column vibration and joint position sense.',
              'Motor signs: Anterior horn damage at cervical level causes LMN wasting and areflexia in the small muscles of the hands/arms; lateral compression of descending corticospinal tracts causes UMN spastic paraparesis in the legs (+ often Horner’s syndrome from T1/sympathetic disruption).',
              'Syringobulbia: Syrinx extends upward into brainstem -> lower cranial nerve palsies (palate/tongue wasting, dysphagia, facial pain/temp loss, nystagmus).',
              'Diagnosis & Treatment: MRI Cervical Spine + Brain (shows syrinx cavity and cerebellar tonsillar herniation). Neurosurgical foramen magnum decompression (+/- syrinx shunting) arrests progression.',
            ],
          },
        ],
        examPearls: [
          'Inverted champagne bottle legs + pes cavus + high-stepping gait + positive family history = Charcot-Marie-Tooth disease.',
          'Painless hand burns + dissociated cape pain/temp loss + wasted hands + spastic legs = Cervical Syringomyelia (check MRI for Chiari I malformation).',
        ],
      },
    ],
  },
  {
    id: 'fnd-tumours',
    title: 'Functional Neurological Disorders & Neuro-Oncology',
    description:
      'Positive bedside diagnosis of Functional Neurological Disorders (FND), evidence-based communication & CBT/physio rehabilitation, and primary/secondary intracranial tumours.',
    accentColor: '#6D28D9',
    lectures: [
      {
        id: 'fnd-1',
        moduleId: 'fnd-tumours',
        title: 'Functional Neurological Disorders I: Recognition & Clinical Signs',
        subtitle: 'FND vs factitious/malingering, neurology clinic prevalence, and 5 positive bedside presentations',
        sourcePdf: '4-_Functional_neurological_disorders_I_1b9253de.pdf',
        overview:
          'Defines Functional Neurological Disorder (genuine involuntary dysfunction, not malingering), highlights its high prevalence in neurology clinics, and details the five hallmark clinical presentations with low misdiagnosis rates.',
        keyConcepts: [
          'FND vs Factitious (Munchausen) vs Malingering (conscious feigning)',
          'High prevalence in neurology outpatients (up to ~16–30% / Table 2.1 neuro ~62% medically unexplained)',
          '5 common presentations: NEAD, inconsistent weakness (Hoover’s), swaying gait, distractible tremor, split sensory loss',
          'Pathophysiology: stress, illness beliefs & abnormal attentional focus ("software vs hardware")',
          'Only ~2–3% turn out to have an underlying organic diagnosis on follow-up',
        ],
        sections: [
          {
            heading: 'Terminology, Differentiation & Epidemiology',
            bullets: [
              'Functional Neurological Disorder (FND / Conversion Disorder): Genuine, involuntary, distressing neurological symptoms (weakness, seizures, movement, sensory) caused by a reversible disturbance in nervous system signalling ("software problem rather than hardware damage").',
              'Crucial distinction from conscious deception: Factitious disorder (Munchausen syndrome) involves intentional feigning for the sick role without external gain; Malingering involves deliberate fabrication for external financial/legal gain — BOTH are rare compared to genuine FND.',
              'Epidemiology: One of the commonest reasons for neurology outpatient attendance (~15–30% of new referrals; cardiology/gastro/neuro clinics show high functional burden, ~62% unexplained symptoms in neurology surveys).',
              'Diagnostic accuracy: Modern longitudinal cohorts confirm only ~2–3% of rigorously diagnosed FND cases later turn out to have a missed organic neurological disease.',
            ],
          },
          {
            heading: 'Five Classic Presentations & Positive Bedside Signs',
            bullets: [
              '1) Non-Epileptic Attack Disorder (NEAD): Prolonged attacks, closed eyes resisting opening, fluctuating pelvic/thrashing movements, weeping, preserved post-ictal awareness or normal ictal video-EEG.',
              '2) Functional Limb Weakness: Inconsistent/collapsing ("give-way") weakness with positive Hoover’s sign (hip extension appears weak voluntarily, but returns to full normal power involuntarily when flexing the contralateral hip against resistance!).',
              '3) Functional Gait Disorder: Dramatic swaying, knee-buckling without falling ("astasia-abasia"), dragging monoplegic leg without circumduction, improved walking backwards.',
              '4) Functional Tremor: Sudden onset, variable frequency, ENTRIANMENT (tremor adopts the frequency of voluntary tapping by the unaffected hand) and distractibility.',
              '5) Functional Sensory Loss: Exact midline splitting of vibration sense across the sternum or forehead (physiologically impossible because bone conducts vibration bilaterally!), or non-anatomical stocking/angle-of-jaw loss.',
            ],
            callout: {
              variant: 'pearl',
              title: 'FND Is a Positive Rule-In Diagnosis',
              body: 'Modern neurology diagnoses FND on positive signs of internal inconsistency (e.g. Hoover’s sign, tremor entrainment, midline vibration split) — NOT merely as a diagnosis of exclusion.',
            },
          },
        ],
        examPearls: [
          'Hoover’s sign (weak voluntary hip extension normalising during contralateral hip flexion) is a positive bedside rule-in test for functional weakness.',
          'Only ~2–3% of carefully diagnosed FND patients are misdiagnosed; never conflate FND with malingering.',
        ],
      },
      {
        id: 'fnd-2',
        moduleId: 'fnd-tumours',
        title: 'Functional Neurological Disorders II: Communication & Rehabilitation',
        subtitle: 'Validating explanation, CHAMP CBT trial, specialist physiotherapy, neuromodulators, and nocebo avoidance',
        sourcePdf: '5-_Functional_neurological_disorders_II_1380e20c.pdf',
        overview:
          'Covers effective empathetic explanation of FND, multidisciplinary rehabilitation (specialist physiotherapy & CBT evidenced by CHAMP), pharmacological adjuncts for pain/mood, avoiding the Nocebo effect, and patient resources.',
        keyConcepts: [
          'Empathetic communication: validate symptoms ("software problem", avoid "all in your mind")',
          'Cognitive Behavioural Therapy (CBT — CHAMP trial)',
          'Specialist Physiotherapy (retraining automatic movement, distracting attention)',
          'Pharmacotherapy (antidepressants, gabapentin/pregabalin for pain/comorbidity)',
          'Nocebo effect & patient resource neurosymptoms.org',
        ],
        sections: [
          {
            heading: 'Therapeutic Communication & Avoiding the Nocebo Effect',
            bullets: [
              'Communication IS treatment: Clearly name the condition ("Functional Neurological Disorder"), affirm that symptoms are REAL and common (not "imagined" or "all in your head"), demonstrate positive physical signs transparently (e.g. Hoover’s sign shows nerve pathways are structurally intact and recovery is possible!), and use the "software vs hardware" analogy.',
              'Nocebo Effect: Negative, dismissive, or ambiguous medical phrasing ("nothing wrong with you", "tests are normal so it’s psychological", unnecessary repeated scans/polypharmacy/AEDs for NEAD) worsens disability and reinforces illness anxiety.',
              'Patient education resource: Direct patients to evidence-based self-help at neurosymptoms.org (developed by Jon Stone).',
            ],
          },
          {
            heading: 'Multidisciplinary Rehabilitation & Adjuncts',
            bullets: [
              'Cognitive Behavioural Therapy (CBT): Evidence-based (e.g., CHAMP / CODES trials) for addressing threat/attentional loops, illness beliefs, and triggers in NEAD and functional symptoms.',
              'Specialist Physiotherapy: Focuses on automatic movement retraining (weight-bearing, walking to rhythm, dual-task distraction) rather than effortful isolated muscle strengthening.',
              'Pharmacotherapy: No pill cures FND directly, but treat coexisting depression/anxiety (SSRIs/SNRIs) and chronic neuropathic/musculoskeletal pain (amitriptyline, gabapentin, pregabalin) while weaning inappropriate AEDs in confirmed NEAD.',
            ],
          },
        ],
        examPearls: [
          'Demonstrating Hoover’s sign kindly to the patient proves intact nerve wiring and helps build trust for specialist physiotherapy and CBT.',
          'Avoid calling FND "all in your mind" — explain it as a genuine, potentially reversible functional signalling/software disorder.',
        ],
      },
      {
        id: 'intracranial-tumours',
        moduleId: 'fnd-tumours',
        title: 'Intracranial Tumours: Gliomas, Meningioma, Metastases, Pituitary & Schwannoma',
        subtitle: 'Incidence, clinical syndromes, WHO glioma grades, prolactinoma cabergoline, dexamethasone, and prognosis',
        sourcePdf: '11-_Intracranial_tumours_16ad59f5.pdf',
        overview:
          'Covers intracranial tumour epidemiology (6/100k, median 56yr), focal/epileptic/raised ICP presentations, primary vs metastatic pathology (GBM, meningioma, pituitary adenoma, acoustic neuroma), steroid oedema control, and prognosis.',
        keyConcepts: [
          'Incidence ~6/100,000/yr; median age 56 yr',
          'Presentations: progressive focal deficit, new adult seizures, raised ICP',
          'Meningioma (dural tail, benign), Glioma Grade I–IV (GBM butterfly corpus callosum)',
          'Brain Metastases (lung, breast, melanoma, renal, colon — grey-white junction)',
          'Pituitary adenoma (bitemporal hemianopia; prolactinoma -> Cabergoline)',
          'Acoustic neuroma (CN VIII CPA) & Dexamethasone oedema Rx',
        ],
        sections: [
          {
            heading: 'Epidemiology & Clinical Presentations',
            bullets: [
              'Primary brain tumour incidence ~6 per 100,000/year; median age ~56 years (second most common childhood malignancy after leukaemia).',
              'Three classic modes of presentation: 1) Subacute/progressive focal neurological deficit (hemiparesis, dysphasia, personality change, visual field defect), 2) New-onset adult focal/secondary generalised seizures (especially slow-growing tumours), 3) Raised intracranial pressure (early morning/Valsalva headache, nausea/vomiting, papilloedema, false localising CN VI palsy, herniation/coning).',
            ],
          },
          {
            heading: 'Major Intracranial Tumour Types',
            bullets: [
              'Brain Metastases (most common intracranial tumour overall in adults): Multiple ring-enhancing lesions at the grey-white matter junction with marked surrounding oedema. Primary sources: Lung (commonest), Breast, Melanoma, Renal cell, Colorectal.',
              'Gliomas (Astrocytoma / Oligodendroglioma, WHO Grades I–IV): Grade IV Glioblastoma Multiforme (GBM) is the most common aggressive primary adult tumour -> heterogeneous ring-enhancing mass often crossing the corpus callosum ("butterfly glioma") with central necrosis and oedema; median survival ~12–15 months despite resection + temozolomide/radiotherapy.',
              'Meningioma: Benign extra-axial tumour arising from arachnoid cap cells (F > M); homogeneously enhancing dural-based mass with a "dural tail"; often asymptomatic incidental or focal seizures/parasagittal leg weakness; curable by surgical resection.',
              'Pituitary Adenoma: Non-functioning macroadenoma compresses optic chiasm -> BITEMPORAL HEMIANOPIA + hypopituitarism. Functioning prolactinoma causes amenorrhoea/galactorrhoea/impotence -> FIRST-LINE MEDICAL Rx with dopamine agonist CABERGOLINE (or bromocriptine) shrinks tumour without surgery!',
              'Acoustic Neuroma (Vestibular Schwannoma): Benign Schwann cell tumour at the Cerebellopontine Angle (CPA) -> progressive unilateral sensorineural hearing loss + tinnitus (CN VIII), later absent corneal reflex/facial numbness (CN V), facial weakness (CN VII), and ipsilateral cerebellar ataxia; bilateral in Neurofibromatosis Type 2 (NF2).',
            ],
          },
          {
            heading: 'Investigations, Acute Medical Control & Treatment',
            bullets: [
              'Imaging: MRI Brain with gadolinium contrast is investigation of choice (CT chest/abdo/pelvis if metastasis suspected to locate primary). NEVER perform LP if mass effect suspected!',
              'Acute medical therapy: High-dose Dexamethasone dramatically reduces peritumoural vasogenic oedema within 24–48 hours (improves headache & focal deficits rapidly); Anti-epileptic drugs ONLY if seizures have occurred (levetiracetam/lamotrigine preferred — no routine prophylactic AEDs).',
              'Definitive oncology: Stereotactic biopsy or maximal safe neurosurgical resection, focal radiotherapy, and chemotherapy (e.g. temozolomide for GBM). Prognosis varies widely from curative resection (meningioma/acoustic neuroma) to ~12–15 months (GBM) or months (multiple metastases).',
            ],
          },
        ],
        examPearls: [
          'Prolactinomas are treated first-line medically with Cabergoline (dopamine agonist), whereas non-functioning pituitary tumours compressing the chiasm undergo transsphenoidal resection.',
          'Dexamethasone treats vasogenic tumour oedema; do NOT prescribe prophylactic AEDs unless the patient has actually had a seizure.',
        ],
      },
    ],
  },
];
