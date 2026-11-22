import { CurriculumModule } from '../../types/neurology';

export const strokeAndHeadacheModules: CurriculumModule[] = [
  {
    id: 'stroke-vascular',
    title: 'Cerebrovascular Disease & Stroke',
    description:
      'Complete 4-part stroke curriculum covering ischaemic vs haemorrhagic subtypes, Circle of Willis territories, lacunar syndromes, thrombolysis/thrombectomy, secondary prevention, CVST, dissection, and subdural/extradural haematomas.',
    accentColor: '#B91C1C',
    lectures: [
      {
        id: 'stroke-1',
        moduleId: 'stroke-vascular',
        title: 'Stroke I: Definitions, Epidemiology, Subtypes & Risk Factors',
        subtitle: 'Stroke vs TIA vs non-disabling stroke, ischaemic mechanisms, and modifiable risk',
        sourcePdf: '16-_Stroke_I_b4771021.pdf',
        overview:
          'Defines clinical stroke (>24h), TIA (<24h tissue definition without infarction), and non-disabling stroke, details global mortality/incidence, and classifies ischaemic (80%) vs haemorrhagic (20%) mechanisms.',
        keyConcepts: [
          '2nd leading cause of death; ~250/100,000/yr incidence',
          'Stroke (>24h) vs TIA (<24h without infarction)',
          'Ischaemic (80%: thrombosis, embolism, lacunar)',
          'Haemorrhagic (20%: ICH vs SAH)',
          'Modifiable vs Non-modifiable vascular risk factors',
        ],
        interactiveLabs: ['stroke-vascular'],
        dragDropId: 'stroke-haemorrhage',
        sections: [
          {
            heading: 'Definitions & Epidemiology',
            bullets: [
              'Stroke: Rapidly developing clinical signs of focal (or global) disturbance of cerebral function lasting >24 hours (or leading to death), with no apparent cause other than vascular origin.',
              'Transient Ischaemic Attack (TIA): Brief episode of neurological dysfunction caused by focal brain, spinal cord, or retinal ischaemia WITHOUT acute infarction (clinically resolving completely within 24 hours, typically <1 hour).',
              'Non-disabling stroke: Mild persistent focal deficit beyond 24h without functional disability (managed along urgent TIA/secondary prevention pathways).',
              'Burden: 2nd leading cause of death globally and leading cause of adult neurological disability; incidence ~250 per 100,000/year.',
            ],
          },
          {
            heading: 'Pathological Subtypes & Risk Factors',
            bullets: [
              'Ischaemic Stroke (80%): Large-artery atherosclerosis/thrombosis (carotid/basilar plaque rupture), Cardioembolism (AF, valvular disease, mural thrombus, endocarditis), Small-vessel lipohyalinosis (lacunar infarcts), and other causes (dissection, vasculitis, thrombophilia).',
              'Haemorrhagic Stroke (20%): Intracerebral haemorrhage (ICH, ~15%) and Subarachnoid haemorrhage (SAH, ~5%).',
              'Non-modifiable risk factors: Age, male sex, ethnicity, family history/prior stroke.',
              'Modifiable risk factors: Hypertension (single strongest modifiable risk factor!), atrial fibrillation, diabetes mellitus, hyperlipidaemia, smoking, obesity/inactivity, carotid stenosis, excessive alcohol.',
            ],
          },
        ],
        examPearls: [
          '80% of strokes are ischaemic (thrombotic, embolic, lacunar) and 20% are haemorrhagic (ICH or SAH).',
          'Hypertension is the single most important modifiable risk factor for both ischaemic and haemorrhagic stroke.',
        ],
      },
      {
        id: 'stroke-2',
        moduleId: 'stroke-vascular',
        title: 'Stroke II: Vascular Territories, Lacunar Syndromes, ICH & SAH',
        subtitle: 'Circle of Willis, anterior vs posterior circulation, 4 classic lacunar syndromes, and SAH workup',
        sourcePdf: '17-_Stroke_II_d57f4cd7.pdf',
        overview:
          'Maps anterior (50%), posterior (25%), and lacunar (25%) syndromes alongside Intracerebral Haemorrhage sites and Subarachnoid Haemorrhage diagnosis (CT + delayed LP spectrophotometry).',
        keyConcepts: [
          'Circle of Willis collateral anastomoses',
          'Anterior circulation (50%): amaurosis fugax, hemiparesis, hemianopia, dysphasia',
          'Posterior circulation (25%): vertigo, diplopia, ataxia, cortical blindness, tetraparesis',
          '4 Lacunar syndromes (25%)',
          'ICH clinically indistinguishable from ischaemic stroke without CT',
          'SAH thunderclap, CT + LP >=6–8h xanthochromia/spectrophotometry',
        ],
        interactiveLabs: ['stroke-vascular', 'csf-matrix'],
        dragDropId: 'stroke-haemorrhage',
        sections: [
          {
            heading: 'Circle of Willis & Arterial Territories',
            bullets: [
              'Circle of Willis links internal carotid (anterior) and vertebrobasilar (posterior) systems via anterior communicating (ACom) and bilateral posterior communicating (PCom) arteries.',
              'Anterior circulation (Carotid/ACA/MCA — ~50% of ischaemic strokes): Ipsilateral monocular blindness (amaurosis fugax / retinal TIA), contralateral hemiparesis and hemisensory loss (MCA: face/arm > leg; ACA: leg > arm), contralateral homonymous hemianopia, dysphasia (dominant hemisphere) or visuospatial neglect (non-dominant parietal).',
              'Posterior circulation (Vertebrobasilar/PCA — ~25%): Crossed sensory/motor signs, vertigo, diplopia, dysarthria, dysphagia, cerebellar ataxia, bilateral/tetraparesis ("locked-in" basilar), and cortical blindness (bilateral PCA occipital infarct with preserved pupillary reflexes!).',
            ],
          },
          {
            heading: 'The 4 Classic Lacunar Syndromes (25% of Ischaemic Strokes)',
            bullets: [
              'Small deep perforating artery infarcts (internal capsule, thalamus, pons, corona radiata) WITHOUT cortical signs (no aphasia, no hemianopia, no neglect):',
              '1) Pure Motor Hemiparesis (posterior limb internal capsule / basis pontis) — most common.',
              '2) Pure Hemisensory Stroke (ventral posterolateral thalamus).',
              '3) Sensorimotor Stroke (thalamocapsular).',
              '4) Ataxic Hemiparesis (corona radiata / pons — ipsilateral weakness + dysmetria).',
            ],
          },
          {
            heading: 'Intracerebral (ICH) & Subarachnoid Haemorrhage (SAH)',
            bullets: [
              'Intracerebral Haemorrhage (ICH): Causes include chronic hypertension (Charcot-Bouchard microaneurysms in basal ganglia/putamen, thalamus, pons, cerebellum), lobar cerebral amyloid angiopathy (elderly), AVMs, anticoagulants, and sympathomimetic drugs. CRITICAL: ICH is clinically INDISTINGUISHABLE from ischaemic stroke at the bedside — urgent CT head is mandatory before any aspirin/thrombolysis!',
              'Subarachnoid Haemorrhage (SAH): ~85% due to ruptured saccular (berry) aneurysm around the Circle of Willis (ACom, PCom, MCA bifurcation) or AVM. Presents with sudden "thunderclap" occipital headache ("worst headache of life", peaking instantaneously), vomiting, photophobia, neck stiffness, collapse, or third nerve palsy (PCom).',
              'SAH Diagnosis: Urgent non-contrast CT head (>95% sensitive within 6h, drops over days). If CT is negative, perform Lumbar Puncture >= 6–12 hours after headache onset for CSF spectrophotometry detecting bilirubin/xanthochromia (allows RBC breakdown time).',
              'Major SAH complications: Early rebleeding (prevented by urgent endovascular coiling/clipping), cerebral vasospasm / delayed cerebral ischaemia (day 3–14, prevented with nimodipine + hydration), hydrocephalus, hyponatraemia (SIADH/CSWS), seizures.',
            ],
          },
        ],
        tables: [
          {
            title: 'Ischaemic Vascular Syndromes Comparison',
            headers: ['Territory / Syndrome', 'Share', 'Key Clinical Features'],
            rows: [
              ['Anterior (Carotid / MCA / ACA)', '~50%', 'Amaurosis fugax, contralateral hemiparesis/sensory loss, homonymous hemianopia, aphasia or neglect'],
              ['Posterior (Vertebrobasilar / PCA)', '~25%', 'Vertigo, diplopia, ataxia, cranial nerve palsies, tetraparesis, cortical blindness'],
              ['Lacunar (Deep Perforators)', '~25%', 'Pure motor, pure sensory, sensorimotor, or ataxic hemiparesis (NO cortical signs)'],
            ],
          },
        ],
        examPearls: [
          'You cannot reliably distinguish ischaemic stroke from intracerebral haemorrhage on clinical exam alone — always CT first.',
          'Wait at least 6–12 hours post-thunderclap onset before performing LP for xanthochromia spectrophotometry when CT is negative.',
        ],
      },
      {
        id: 'stroke-3',
        moduleId: 'stroke-vascular',
        title: 'Stroke III: Acute Management, Secondary Prevention & Prognosis',
        subtitle: 'Stroke mimics, <=4.5h thrombolysis & thrombectomy, stroke unit MDT, carotid endarterectomy, and Framingham outcomes',
        sourcePdf: '18-_Stroke_III_e3986b67.pdf',
        overview:
          'Covers urgent CT exclusion of stroke mimics/bleed, reperfusion windows (IV alteplase <=4.5h, mechanical thrombectomy), 300 mg aspirin protocol, swallow screening, secondary prevention (AF anticoagulation, >70% CEA), SAH/ICH neurosurgery, and Framingham prognosis.',
        keyConcepts: [
          'Stroke mimics: tumour, subdural, brain abscess, hypoglycaemia',
          'Early CT can be normal in acute ischaemia',
          'IV alteplase <=4.5h & mechanical thrombectomy (large vessel)',
          '>4.5h: CT <=24h + 300mg aspirin once bleed excluded',
          'Stroke Unit MDT, swallow screen, early mobilisation',
          'Secondary prevention: >70% carotid endarterectomy, AF anticoagulation, BP/statins',
        ],
        interactiveLabs: ['stroke-vascular'],
        sections: [
          {
            heading: 'Acute Assessment, Mimics & Reperfusion',
            bullets: [
              'Always exclude stroke mimics: Hypoglycaemia (check capillary glucose STAT!), brain tumour, chronic/acute subdural haematoma, brain abscess, Todd’s paresis, hemiplegic migraine.',
              'Early CT Head: Purpose is primarily to EXCLUDE haemorrhage or mimic — early ischaemic CT is often completely NORMAL in the first 6–12 hours!',
              '<= 4.5 hours from onset (or last known well): Eligible for IV thrombolysis with Alteplase (tPA) once haemorrhage and contraindications (recent surgery/bleed, high INR, uncontrolled BP) are excluded.',
              'Large-vessel proximal anterior occlusion (CTA confirmed): Mechanical thrombectomy (typically <= 6 hours, or up to 24h with salvageable penumbra on perfusion imaging).',
              'Presenting >4.5h or ineligible for thrombolysis: Perform CT within 24h; once bleed excluded, give Aspirin 300 mg daily for 2 weeks before switching to long-term antiplatelet (e.g., Clopidogrel 75 mg).',
            ],
          },
          {
            heading: 'Stroke Unit Care & Systemic Workup',
            bullets: [
              'Admit to a dedicated Stroke Unit with Multidisciplinary Team (physio, OT, SLT, nursing) — independently reduces mortality and dependency.',
              'Mandatory bedside swallow assessment BEFORE any oral food, drink, or oral medication to prevent aspiration pneumonia.',
              'Early mobilisation, DVT prophylaxis (intermittent pneumatic compression stockings; avoid early anticoagulation in acute phase), glucose/temperature control.',
              'Aetiological workup: 12-lead ECG & 24h Holter (paroxysmal AF), Transthoracic/TOE Echocardiogram, Carotid Duplex Doppler ultrasound.',
            ],
          },
          {
            heading: 'Secondary Prevention, Haemorrhage Mx & Prognosis',
            bullets: [
              'Antiplatelets (Clopidogrel 75 mg) for non-cardioembolic ischaemic stroke/TIA; Oral Anticoagulation (DOAC or Warfarin) for Atrial Fibrillation (delayed ~1–2 weeks after large infarct to reduce haemorrhagic transformation).',
              'Blood pressure control (typically ACE inhibitor + thiazide-like diuretic, e.g. perindopril + indapamide), high-intensity Statin, smoking cessation, glycaemic control.',
              'Carotid Endarterectomy (CEA): Indicated urgently for symptomatic ipsilateral internal carotid artery stenosis >70% (NASCET criteria; considered 50–69%).',
              'ICH management: Reverse anticoagulants immediately, control BP cautiously, conservative medical management unless cerebellar haematoma (>3 cm with brainstem compression/hydrocephalus) or superficial lobar deterioration requiring neurosurgical evacuation.',
              'SAH management: Nimodipine (60 mg 4-hourly for 21 days) + IV fluids to prevent vasospasm; urgent CTA/angiography + endovascular coiling (preferred) or neurosurgical clipping.',
              'Framingham Stroke Prognosis: ~20% die within 1 month (higher in ICH/SAH); among survivors, roughly 1/3 recover well/independently, 1/3 have moderate persistent disability, and 1/3 remain severely dependent.',
            ],
          },
        ],
        examPearls: [
          'A normal CT head within hours of symptom onset does NOT rule out ischaemic stroke — it rules out intracerebral haemorrhage so thrombolysis or 300 mg aspirin can proceed.',
          'Symptomatic carotid stenosis >70% is the threshold for Carotid Endarterectomy.',
          'Nimodipine reduces delayed ischaemic deficit from vasospasm in Subarachnoid Haemorrhage.',
        ],
      },
      {
        id: 'stroke-4',
        moduleId: 'stroke-vascular',
        title: 'Stroke IV: CVST, Arterial Dissection, Subdural & Extradural',
        subtitle: 'Cerebral venous sinus thrombosis, carotid/vertebral dissection, and SDH vs EDH differentiation',
        sourcePdf: '19-_Stroke_IV_87e2f5d4.pdf',
        overview:
          'Covers four high-yield non-atherosclerotic cerebrovascular/intracranial emergencies: Cerebral Venous Sinus Thrombosis (CVST), Cervicocerebral Arterial Dissection, Subdural Haematoma (SDH), and Extradural Haematoma (EDH).',
        keyConcepts: [
          'CVST: headache/IIH mimic, focal seizures, CTV/MRV, anticoagulation',
          'CVST risk: pregnancy, OCP, thrombophilia, otitis/mastoiditis',
          'Dissection: trivial neck trauma, neck pain, Horner’s, CTA/MRA',
          'Subdural (bridging veins, crescent, elderly, lucid/fluctuating)',
          'Extradural (MMA, skull fracture, lucid interval, biconvex emergency)',
        ],
        dragDropId: 'stroke-haemorrhage',
        sections: [
          {
            heading: 'Cerebral Venous Sinus Thrombosis (CVST)',
            bullets: [
              'Pathology: Thrombosis of dural venous sinuses (superior sagittal or transverse/sigmoid) impairing venous drainage and CSF absorption.',
              'Risk factors: Pregnancy/puerperium, combined oral contraceptive pill (OCP), inherited/acquired thrombophilia, dehydration, local infection (otitis media, mastoiditis, sinusitis), malignancy.',
              'Clinical presentations: Severe subacute headache mimicking IIH (papilloedema + raised ICP), focal deficits or bilateral signs, and early focal/generalised SEIZURES (much more common than in arterial stroke; often with venous haemorrhagic infarction).',
              'Diagnosis & Treatment: CT Venography (CTV) or MR Venography (MRV) showing "empty delta sign" / absent sinus flow. Treat with therapeutic Anticoagulation (LMWH -> warfarin/DOAC) EVEN if venous haemorrhagic transformation is present!',
            ],
          },
          {
            heading: 'Cervicocerebral Arterial Dissection (Carotid / Vertebral)',
            bullets: [
              'Leading cause of stroke in young adults (<45 years). Tear in arterial intima creates intramural haematoma.',
              'Triggers: Often preceded by trivial neck trauma (chiropractic manipulation, coughing, yoga/hyperextension, sports) or connective tissue disease (Marfan, Ehlers-Danlos).',
              'Carotid dissection features: Unilateral neck/head/periorbital pain + ipsilateral painful Horner’s syndrome (sympathetic fibres in carotid sheath) + delayed retinal/hemispheric ischaemic stroke.',
              'Vertebral dissection features: Occipital/neck pain + posterior circulation/lateral medullary stroke.',
              'Diagnosis & Treatment: CTA or fat-suppressed T1 MRA neck vessels ("crescent sign"). Treat with antiplatelets (aspirin) or anticoagulation per stroke specialist.',
            ],
          },
          {
            heading: 'Subdural (SDH) vs Extradural (EDH) Haematoma',
            bullets: [
              'Subdural Haematoma: Venous bleeding from torn cortical bridging veins between dura and arachnoid. Commonly elderly, alcohol misuse, anticoagulated, or cerebral atrophy after minor (sometimes forgotten) head trauma weeks-to-months earlier. Fluctuating drowsiness, headache, confusion, hemiparesis. CT: CRESCENT-shaped (concave) collection crossing suture lines.',
              'Extradural (Epidural) Haematoma: Arterial bleeding from ruptured Middle Meningeal Artery beneath the pterion (temporal bone skull fracture) between skull and periosteal dura. Classic "lucid interval" after transient concussive loss of consciousness, followed by rapid deterioration, ipsilateral fixed dilated pupil (CN III uncal herniation/coning), and contralateral hemiparesis. CT: BICONVEX (lentiform) hyperdensity limited by suture lines — neurosurgical emergency!',
            ],
            callout: {
              variant: 'warning',
              title: 'Anticoagulate CVST Even With Venous Bleed',
              body: 'Unlike arterial ICH, cerebral venous sinus thrombosis requires therapeutic anticoagulation to recanalise the obstructed sinus even when secondary venous petechial haemorrhage is visible on scan.',
            },
          },
        ],
        tables: [
          {
            title: 'Subdural vs Extradural Haematoma',
            headers: ['Feature', 'Subdural Haematoma (SDH)', 'Extradural Haematoma (EDH)'],
            rows: [
              ['Vessel Injured', 'Cortical bridging veins (low pressure)', 'Middle meningeal artery (high pressure)'],
              ['Typical Patient / Trigger', 'Elderly, alcoholic, anticoagulated; trivial trauma', 'Young adult; temporal skull fracture at pterion'],
              ['Timeline', 'Acute, subacute, or chronic (weeks–months)', 'Acute with classic transient "lucid interval"'],
              ['CT Morphology', 'Crescent-shaped (concave); crosses suture lines', 'Biconvex (lentiform); bounded by suture lines'],
              ['Management', 'Burr-hole drainage if symptomatic/chronic', 'Immediate emergency craniotomy'],
            ],
          },
        ],
        examPearls: [
          'Always obtain CTV or MRV in a young woman on OCP/postpartum presenting with headache, papilloedema, or seizures to exclude CVST.',
          'SDH = bridging veins + crescent CT crossing sutures; EDH = middle meningeal artery + biconvex CT + lucid interval.',
        ],
      },
    ],
  },
  {
    id: 'headaches-facial-pain',
    title: 'Headaches & Craniofacial Pain',
    description:
      'Traffic-light diagnostic approach, secondary red flags, migraine, tension-type, medication overuse, cluster headache, trigeminal neuralgia, post-traumatic, IIH, and giant cell arteritis.',
    accentColor: '#D97706',
    lectures: [
      {
        id: 'headache-1',
        moduleId: 'headaches-facial-pain',
        title: 'Headache I: Approach, Red Flags & Migraine',
        subtitle: 'Traffic-light triage, raised ICP nuances, non-discriminating features, and acute/preventive migraine therapy',
        sourcePdf: '1-_Headache-I_0f7ee1b1.pdf',
        overview:
          'Structures headache evaluation around Green (primary), Yellow, and Red-flag secondary syndromes, clarifies features that do NOT distinguish benign from serious headaches, and covers migraine pathophysiology and acute/preventive therapeutics.',
        keyConcepts: [
          'Red / Yellow / Green headache triage',
          'Secondary red flags (thunderclap, focal, systemic, >50yr)',
          'Non-discriminating features (severity, throbbing, response to analgesia)',
          '6 primary headache types',
          'Migraine: 1 in 8, 7th global disability, 4h–3d, aura 20–30m',
          'Acute triptans vs Preventives (>=4 days/month)',
        ],
        dragDropId: 'headache-syndromes',
        sections: [
          {
            heading: 'Diagnostic Triage & Red Flags',
            bullets: [
              'Traffic-light triage: Green = clear long-standing primary pattern (migraine/tension); Yellow = atypical/changing pattern needing review; Red = acute/progressive secondary emergency requiring urgent imaging/LP/ESR.',
              'Key Red Flags: Thunderclap onset (SAH, CVST, RCVS), new headache age >50 years (GCA, tumour), fever/neck stiffness/rash (meningitis), focal neurological signs or papilloedema (mass, IIH, CVST), immunosuppression or active cancer history, positional aggravation (worse lying/Valsalva/coughing = raised ICP; worse upright = low CSF pressure).',
              'Non-discriminating pitfalls: Headache severity (10/10 pain can be migraine!), throbbing quality, unilateral site, or partial response to simple analgesia/triptans do NOT reliably exclude serious secondary pathology.',
              'Raised ICP headache nuance: Typically dull, bursting, worse on waking, bending forward, coughing/straining (Valsalva), and progressively worsening over weeks — unlike migraine which is episodic (4h–3d) with full recovery between attacks.',
            ],
          },
          {
            heading: 'The 6 Primary Headaches & Migraine Deep Dive',
            bullets: [
              'Primary headaches covered across series: Migraine, Tension-type, Cluster, Paroxysmal hemicrania / TACs, Primary stabbing/cough/exertional, New daily persistent headache.',
              'Migraine epidemiology: Affects ~1 in 8 adults (F > M ~3:1); 7th leading cause of years lived with disability globally.',
              'Clinical features: Episodic attacks lasting 4 hours to 3 days; unilateral (60%) or bilateral throbbing pain, moderate-to-severe, aggravated by routine physical activity, accompanied by nausea/vomiting, photophobia, and phonophobia (patient prefers lying still in a dark quiet room).',
              'Migraine Aura (~25–30%): Fully reversible neurological symptoms developing gradually over >=5 min and lasting 20–30 minutes (typically <60 min) before or during headache — classic fortication spectra/zig-zag lines, scotoma, spreading sensory paraesthesia, or dysphasia.',
            ],
          },
          {
            heading: 'Migraine Acute & Preventive Management',
            bullets: [
              'Acute therapy (take early at onset!): High-dose NSAID (ibuprofen/naproxen) or aspirin 900 mg + antiemetic (metoclopramide/domperidone for gastric stasis) +/- Triptan (sumatriptan, zolmitriptan, rizatriptan — 5-HT1B/1D agonists; CONTRAINDICATED in ischaemic heart disease, cerebrovascular disease, uncontrolled HTN). Avoid opioids/codeine (triggers medication overuse headache!).',
              'Preventive therapy (offer if >= 4 migraine days/month or severe disability): Propranolol (avoid in asthma), Amitriptyline (useful if coexisting tension/insomnia), Candesartan, Topiramate (avoid in pregnancy/childbearing potential without contraception), Pizotifen (weight gain/sedation), Erenumab / CGRP monoclonal antibodies, and OnabotulinumtoxinA (Botox) for chronic migraine (>=15 headache days/mo).',
            ],
          },
        ],
        examPearls: [
          'Pain severity and response to analgesia do NOT distinguish migraine from subarachnoid haemorrhage — thunderclap time-to-peak does.',
          'Never prescribe codeine/opiates for migraine; use early NSAID + antiemetic + triptan, and start prophylaxis at >=4 headache days/month.',
        ],
      },
      {
        id: 'headache-2',
        moduleId: 'headaches-facial-pain',
        title: 'Headache II: Tension-Type, Medication Overuse & Cluster Headache',
        subtitle: 'Band-like tension pain, analgesic rebound cycle, and autonomic nocturnal cluster attacks',
        sourcePdf: '2-_Headache-II_9b37640e.pdf',
        overview:
          'Contrasts Tension-Type Headache (most common, 42% lifetime prevalence) and Medication Overuse Headache (codeine/analgesia rebound) with the excruciating Trigeminal Autonomic Cephalalgia — Cluster Headache.',
        keyConcepts: [
          'Tension headache: 42% lifetime, band/vice, no GI/visual, doesn’t wake',
          'Medication Overuse Headache (MOH): daily codeine/triptan withdrawal',
          'Cluster headache: men 4x, 4–8wk clusters, 15m–3h nocturnal 1–2am',
          'Ipsilateral lacrimation, conjunctival injection, nasal congestion, Horner’s',
          'Acute SC sumatriptan + 100% high-flow O2; Prophylaxis verapamil/steroids',
        ],
        dragDropId: 'headache-syndromes',
        sections: [
          {
            heading: 'Tension-Type Headache (TTH)',
            bullets: [
              'Lifetime prevalence ~42% (most common primary headache).',
              'Features: Bilateral pressing/tightening ("tight band or vice" around the head), mild-to-moderate intensity, NOT aggravated by routine exertion, NO nausea/vomiting, NO visual aura, and characteristically does NOT wake the patient from sleep.',
              'Management: Reassurance, stress/posture address, simple intermittent analgesia; if chronic/frequent, low-dose Amitriptyline.',
            ],
          },
          {
            heading: 'Medication Overuse Headache (MOH)',
            bullets: [
              'Occurs in patients with underlying migraine/tension headache taking acute analgesics >= 10–15 days/month (especially codeine/opiate combinations, triptans, or paracetamol/NSAIDs daily).',
              'Presents as a daily or near-daily refractory morning headache unresponsive to preventive drugs while overuse continues.',
              'Management: Abrupt or supported withdrawal of the overused analgesic (warn patient headache temporarily worsens for 1–2 weeks before improving) + start Amitriptyline (or migraine preventive).',
            ],
          },
          {
            heading: 'Cluster Headache',
            bullets: [
              'Epidemiology: Strong male predominance (Men ~4x more common than women), typically onset age 20–40, strong association with smoking.',
              'Pattern: Strikes in 4–8 week "clusters" (often seasonal) with 1–8 attacks/day lasting 15 minutes to 3 hours, famously waking the patient at the exact same time at night (e.g. 1–2 am).',
              'Clinical signs: Excruciating unilateral orbital/supraorbital/temporal pain causing extreme restlessness/agitation (pacing/head-banging — opposite of migraine!) + ipsilateral cranial autonomic features: eye tearing (lacrimation), redness (conjunctival injection), nasal blockage/rhinorrhoea, and transient/partial Horner’s syndrome (ptosis/miosis).',
              'Acute treatment: Subcutaneous Sumatriptan (6 mg) AND/OR 100% High-Flow Oxygen (12–15 L/min via non-rebreather mask for 15–20 min). Oral tablets are too slow.',
              'Prophylaxis: Verapamil (high-dose — requires baseline & serial ECG for PR/AV block!), short bridging course of Oral Prednisolone to break the cluster, Topiramate, Pizotifen, or Lithium.',
            ],
            callout: {
              variant: 'pearl',
              title: 'Cluster vs Migraine Behaviour',
              body: 'A migraineur lies motionless in a dark quiet room; a cluster headache patient paces restlessly, rocks, or presses their fist into the eye during a 15 min–3 h nocturnal attack.',
            },
          },
        ],
        tables: [
          {
            title: 'Migraine vs Tension-Type vs Cluster Headache',
            headers: ['Feature', 'Migraine', 'Tension-Type', 'Cluster Headache'],
            rows: [
              ['Sex Ratio', 'Female 3:1', 'Equal / slight F', 'Male 4:1'],
              ['Duration', '4 hours – 3 days', '30 min – 7 days', '15 min – 3 hours'],
              ['Location & Quality', 'Unilateral/bilateral throbbing', 'Bilateral tight band / pressure', 'Strictly unilateral boring periorbital'],
              ['Patient Behaviour', 'Lies still in dark quiet room', 'Continues normal activity', 'Agitated, paces restlessly, nocturnal (1–2 am)'],
              ['Associated Signs', 'Nausea, photo/phonophobia, +/- aura', 'None (no GI or visual signs)', 'Ipsilateral tearing, red eye, blocked nose, Horner’s'],
              ['First-line Acute / Prev', 'NSAID + Triptan / Propranolol, Amitriptyline', 'Reassurance, simple analgesia / Amitriptyline', 'SC Sumatriptan + 100% O2 / Verapamil, Steroids'],
            ],
          },
        ],
        examPearls: [
          'Daily codeine or triptan use turns episodic migraine into refractory Medication Overuse Headache — stopping the offending analgesic is mandatory.',
          'Cluster headache responds acutely to 100% high-flow oxygen and SC sumatriptan, with Verapamil (+ ECG monitoring) for cluster prevention.',
        ],
      },
      {
        id: 'headache-3',
        moduleId: 'headaches-facial-pain',
        title: 'Headache III: Trigeminal Neuralgia, Post-Traumatic, IIH & GCA',
        subtitle: 'Electric-shock V2/V3 neuralgia, concussion headache, and vision-threatening IIH & Temporal Arteritis',
        sourcePdf: '3-_Headache-III_e25a8c5a.pdf',
        overview:
          'Covers paroxysmal Trigeminal Neuralgia, Post-Traumatic Headache, and the two urgent vision-threatening headaches every medical student must never miss: Idiopathic Intracranial Hypertension (IIH) and Giant Cell (Temporal) Arteritis.',
        keyConcepts: [
          'Trigeminal neuralgia: >40yr, V2/V3 shocks, ectatic loop or MS, Carbamazepine',
          'Post-traumatic headache: <2wk trauma, concussion syndrome, Amitriptyline',
          'IIH: obese young female, papilloedema, normal MRI + CTV/MRV, acetazolamide',
          'GCA: >50yr, temple tenderness, absent pulse, ESR >60, immediate steroids + TAB',
        ],
        dragDropId: 'headache-syndromes',
        sections: [
          {
            heading: 'Trigeminal Neuralgia',
            bullets: [
              'Demographics & Aetiology: Typically age >40 years; caused by neurovascular compression of the trigeminal nerve root entry zone by an ectatic/aberrant arterial loop (e.g. superior cerebellar artery). In patients <40 years or bilateral disease, always suspect Multiple Sclerosis (demyelinating plaque) or CPA tumour!',
              'Clinical features: Brief (seconds) excruciating unilateral "electric-shock" or lancinating pains restricted to V2 (maxillary) and/or V3 (mandibular) divisions, triggered by light touch, chewing, shaving, brushing teeth, or cold wind.',
              'Management: Carbamazepine is first-line medical therapy (oxcarbazepine/lamotrigine/gabapentin alternatives). Refractory cases: Microvascular decompression (MVD — definitive surgical separation of vessel loop) or percutaneous glycerol rhizotomy / stereotactic radiosurgery.',
            ],
          },
          {
            heading: 'Post-Traumatic Headache',
            bullets: [
              'Develops within 2 weeks of head injury as part of post-concussion syndrome (headache, dizziness, poor concentration, irritability, fatigue).',
              'Important to exclude subdural haematoma if progressive or focal signs exist; otherwise reassurance and Amitriptyline if persistent.',
            ],
          },
          {
            heading: 'Idiopathic Intracranial Hypertension (IIH)',
            bullets: [
              'Classic patient: Young woman with obesity (also associated with tetracyclines, vitamin A/retinoids, steroid withdrawal).',
              'Features: Chronic daily headache worse morning/Valsalva, transient visual obscurations (brief greying out on bending/straining), diplopia (CN VI false localising sign), pulsatile tinnitus, and bilateral PAPILLOEDEMA.',
              'Diagnosis: MRI brain normal (no mass/hydrocephalus) + CTV/MRV mandatory to EXCLUDE Cerebral Venous Sinus Thrombosis (CVST!) -> followed by Lumbar Puncture showing elevated CSF opening pressure (>25 cm H2O) with normal CSF constituents.',
              'Management: Urgent serial visual field perimetry monitoring (risk of permanent blindness from secondary optic atrophy!), weight loss, Acetazolamide (carbonic anhydrase inhibitor reducing CSF production), therapeutic LP/CSF shunting (LP/VP shunt) or optic nerve sheath fenestration if vision threatened.',
            ],
          },
          {
            heading: 'Giant Cell (Temporal) Arteritis (GCA)',
            bullets: [
              'Ophthalmic & neurological emergency in elderly patients (>50 years; rare <50). Medium/large-vessel granulomatous vasculitis.',
              'Clinical features: New-onset unilateral or bilateral temporal/occipital headache, marked scalp tenderness (pain combing hair), thickened/tender/pulseless superficial temporal artery, jaw claudication (pain chewing), systemic polymyalgia rheumatica (proximal shoulder/hip stiffness, fever, weight loss), and sudden irreversible visual loss (anterior ischaemic optic neuropathy).',
              'Investigations & Urgent Treatment: Markedly elevated ESR (>50–60 mm/h) and CRP; Temporal Artery Biopsy (TAB — skip lesions possible, perform within ~1–2 weeks). NEVER delay steroids waiting for biopsy: start HIGH-DOSE ORAL PREDNISOLONE immediately (40–60 mg/day; IV methylprednisolone if visual symptoms already present). Rapid dramatic symptom resolution within 24–48 hours is diagnostically characteristic!',
            ],
            callout: {
              variant: 'warning',
              title: 'Treat GCA Immediately Before Biopsy',
              body: 'In suspected Giant Cell Arteritis, start high-dose steroids the same day — waiting for temporal artery biopsy risks irreversible bilateral blindness.',
            },
          },
        ],
        examPearls: [
          'In IIH, always perform CTV or MRV before diagnosing "idiopathic" raised ICP so Cerebral Venous Sinus Thrombosis is not missed.',
          'Carbamazepine is first-line for Trigeminal Neuralgia; think MS if the patient is under 40.',
          'A dramatic 24-hour response to high-dose prednisolone with ESR >60 confirms Giant Cell Arteritis.',
        ],
      },
    ],
  },
];
