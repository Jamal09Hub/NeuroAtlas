import { CurriculumModule } from '../../types/neurology';

export const cranialNervesModule: CurriculumModule = {
  id: 'cranial-nerves',
  title: 'Cranial Nerves & Brainstem Pathways',
  description:
    'Complete anatomical localization, pupillary & visual field defects, ocular motor palsies, facial UMN vs LMN, lower CN syndromes, Horner’s, and INO.',
  accentColor: '#0369A1',
  lectures: [
    {
      id: 'cn-2-optic',
      moduleId: 'cranial-nerves',
      title: 'Optic Nerve (CN II): Pupils, Visual Fields & Optic Disc Pathology',
      subtitle: 'Swinging light test (RAPD), perimetry lesions, papilloedema vs optic neuritis vs optic atrophy',
      sourcePdf: '6-_II_nerve_57b00deb.pdf',
      overview:
        'Covers visual pathway anatomy from retina to occipital cortex, pupillary light reflex afferent/efferent limbs, Relative Afferent Pupillary Defect (RAPD), systematic visual field defect localization, optic disc swelling differentials, and primary vs secondary optic atrophy.',
      keyConcepts: [
        'RAPD & swinging flashlight test',
        'Monocular blindness vs Bitemporal vs Homonymous hemianopia',
        'Absent venous pulsation & disc margins',
        'Papillitis vs Retrobulbar neuritis vs Papilloedema',
        'Primary vs Secondary optic atrophy',
      ],
      interactiveLabs: ['visual-pathway'],
      dragDropId: 'cranial-nerves',
      sections: [
        {
          heading: 'Pupillary Light Reflex & Relative Afferent Pupillary Defect (RAPD)',
          bullets: [
            'Afferent limb: CN II (optic nerve) carries light impulse bilaterally to pretectal nuclei -> Edinger-Westphal nuclei.',
            'Efferent limb: CN III (parasympathetic fibres) mediates both direct and consensual pupillary constriction.',
            'Swinging light test for RAPD: Shining light into the affected optic nerve causes LESS constriction than shining into the normal eye; when swinging from normal eye to affected eye, BOTH pupils paradoxically appear to dilate.',
            'Classic cause of RAPD: Optic neuritis (strongly associated with Multiple Sclerosis) or severe asymmetric retinal/optic nerve ischaemia.',
          ],
        },
        {
          heading: 'Visual Field Defect Localization',
          bullets: [
            'Optic nerve lesion (pre-chiasmal): Ipsilateral monocular blindness (or central scotoma).',
            'Optic chiasm compression: Bitemporal hemianopia (loss of nasal retinal fibres crossing in chiasm). Classic causes: Pituitary adenoma, craniopharyngioma, suprasellar meningioma, internal carotid artery aneurysm.',
            'Optic tract, optic radiations, or occipital cortex lesion (retro-chiasmal): Contralateral homonymous hemianopia (e.g., stroke or tumour). Note: Temporal radiations ("Meyer’s loop") affect contralateral superior quadrant ("pie in the sky"); parietal radiations affect contralateral inferior quadrant.',
          ],
        },
        {
          heading: 'Optic Disc Swelling: Papilloedema vs Optic Neuritis',
          bullets: [
            'Early signs of disc swelling: Loss of spontaneous retinal venous pulsation, blurring of optic disc margins, hyperaemia, and elevated optic cup.',
            'Papilloedema: Bilateral optic disc swelling secondary to raised intracranial pressure (ICP). Typically preserves visual acuity initially, causing enlarged blind spot and peripheral visual field constriction; late severe papilloedema causes secondary optic atrophy and blindness.',
            'Optic neuritis (Papillitis vs Retrobulbar): Usually unilateral, acute/subacute painful visual loss (pain worse on eye movement), reduced colour vision (red desaturation), and RAPD. In papillitis the disc is swollen; in retrobulbar neuritis ("the patient sees nothing and the doctor sees nothing") the disc appears completely normal.',
          ],
          callout: {
            variant: 'pearl',
            title: 'Distinguishing Papilloedema from Papillitis at the Bedside',
            body: 'Papilloedema is typically bilateral with preserved central visual acuity early on and no eye-movement pain; optic neuritis is typically unilateral with marked early visual acuity loss, dyschromatopsia, RAPD, and pain on ocular movement.',
          },
        },
        {
          heading: 'Primary vs Secondary Optic Atrophy',
          bullets: [
            'Primary optic atrophy: Pale/white optic disc with SHARP, well-defined margins (e.g., MS/optic neuritis, ischaemic optic neuropathy, optic nerve compression, Leber’s hereditary optic neuropathy, toxins [tobacco/methyl alcohol], Vitamin B1 or B12 deficiency).',
            'Secondary optic atrophy: Pale optic disc with ILL-DEFINED, blurred margins resulting from preceding chronic optic disc swelling (chronic papilloedema).',
          ],
        },
      ],
      tables: [
        {
          title: 'Visual Pathway Lesion Localization',
          headers: ['Lesion Site', 'Visual Field Defect', 'Typical Causes'],
          rows: [
            ['Optic Nerve (CN II)', 'Ipsilateral monocular blindness / scotoma (+ RAPD)', 'Optic neuritis (MS), ION, nerve compression'],
            ['Optic Chiasm', 'Bitemporal hemianopia', 'Pituitary tumour, craniopharyngioma, meningioma, ICA aneurysm'],
            ['Optic Tract / Radiations / Occipital Cortex', 'Contralateral homonymous hemianopia', 'Cerebral infarction (MCA/PCA), intracranial tumour'],
          ],
        },
      ],
      examPearls: [
        'Bitemporal hemianopia localises strictly to the optic chiasm; always think pituitary macroadenoma, craniopharyngioma, suprasellar meningioma, or ICA aneurysm.',
        'Retrobulbar optic neuritis presents with normal fundoscopy, painful eye movements, decreased visual acuity, and RAPD.',
      ],
    },
    {
      id: 'cn-3-6-oculomotor-abducent',
      moduleId: 'cranial-nerves',
      title: 'Oculomotor (CN III) & Abducent (CN VI) Nerves',
      subtitle: 'Extraocular muscle actions, surgical vs medical III palsy, and false localising VI palsy',
      sourcePdf: '7-_III___VI_17f4f635.pdf',
      overview:
        'Details extraocular muscle innervation (LR6 SO4 all others 3), the classic presentation and surgical vs medical causes of CN III palsy, and horizontal diplopia with false localising raised ICP in CN VI palsy.',
      keyConcepts: [
        'LR6 SO4, all other muscles CN III',
        'CN III palsy: ptosis, down-and-out eye, pupil involvement',
        'Medical (pupil-sparing) vs Surgical (PCom aneurysm) CN III palsy',
        'Tentorial herniation / coning compression of CN III',
        'CN VI palsy & false localising sign in raised ICP',
      ],
      interactiveLabs: ['cranial-nerve-exam'],
      dragDropId: 'cranial-nerves',
      sections: [
        {
          heading: 'Extraocular Muscle Innervation Rule',
          bullets: [
            'CN VI (Abducent): Lateral rectus (abducts the eye).',
            'CN IV (Trochlear): Superior oblique (intorts and depresses the adducted eye).',
            'CN III (Oculomotor): Levator palpebrae superioris, superior rectus, inferior rectus, medial rectus, inferior oblique, PLUS parasympathetic pupillary sphincter and ciliary muscle.',
          ],
        },
        {
          heading: 'Oculomotor (CN III) Palsy: Clinical Features & Aetiology',
          bullets: [
            'Clinical triad: Severe/complete ptosis (unopposed orbicularis oculi), eye resting "down and out" (unopposed lateral rectus [VI] and superior oblique [IV]), and impaired adduction/elevation/depression.',
            'Pupil-involving ("surgical") CN III palsy: Fixed, dilated pupil with loss of light and accommodation reflexes because superficial parasympathetic fibres are compressed first. Key causes: Posterior communicating (PCom) artery aneurysm (painful!) and uncal/tentorial herniation (coning).',
            'Pupil-sparing ("medical") CN III palsy: Pupil normal/reactive because microvascular ischaemia (diabetes mellitus, hypertension) affects the central core of the nerve while sparing superficial parasympathetic fibres; often painless or mild ache.',
            'Other anatomical sites: Brainstem infarct/tumour, cavernous sinus / superior orbital fissure lesion (often with IV, VI, V1), basal meningitis.',
          ],
          callout: {
            variant: 'warning',
            title: 'Painful Pupil-Involving CN III Palsy = Emergency',
            body: 'An acute painful CN III palsy with a dilated unreactive pupil indicates Posterior Communicating (PCom) artery aneurysm compression until excluded by urgent CTA/MRA/angiography.',
          },
        },
        {
          heading: 'Abducent (CN VI) Nerve Palsy',
          bullets: [
            'Clinical features: Horizontal diplopia worse on ipsilateral lateral gaze (far distance) and failure of eye abduction (convergent squint / esotropia).',
            'Causes: Microvascular ischaemia (DM/HTN), brainstem stroke/demyelination (pons), cavernous sinus/SOF pathology, basal meningitis.',
            'False localising sign: Because CN VI has a long intracranial course over the petrous temporal ridge, raised intracranial pressure stretches and compresses CN VI — producing unilateral or bilateral VI palsy without a direct pontine lesion.',
          ],
        },
      ],
      tables: [
        {
          title: 'Surgical vs Medical CN III Palsy',
          headers: ['Feature', 'Surgical (Compressive) CN III Palsy', 'Medical (Microvascular) CN III Palsy'],
          rows: [
            ['Pupil Status', 'Dilated, unreactive (parasympathetic fibres compressed)', 'Spared (normal size & light reactivity)'],
            ['Pain', 'Often severely painful (especially PCom aneurysm)', 'Usually painless or mild periorbital ache'],
            ['Primary Causes', 'PCom artery aneurysm, uncal herniation (coning)', 'Diabetes mellitus, hypertension, atherosclerosis'],
            ['Action', 'Urgent CTA / MRA / Neurosurgery', 'Vascular risk control; typically recovers in weeks-months'],
          ],
        },
      ],
      examPearls: [
        'CN III palsy puts the eye "down and out" with complete ptosis; pupil dilation signals external compression (PCom aneurysm or tentorial herniation).',
        'CN VI palsy causes horizontal diplopia and is the classic false localising sign of raised intracranial pressure.',
      ],
    },
    {
      id: 'cn-4-5-trochlear-trigeminal',
      moduleId: 'cranial-nerves',
      title: 'Trochlear (CN IV) & Trigeminal (CN V) Nerves',
      subtitle: 'Superior oblique vertical diplopia, compensatory head tilt, and trigeminal sensory/motor examination',
      sourcePdf: '9-IV_V_nerve_ed0c25b3.pdf',
      overview:
        'Explains the unique dorsal brainstem exit and action of CN IV (vertical diplopia looking down/reading, contralateral head tilt) alongside CN V pontine nuclei, cavernous sinus course of V1/V2, angle-of-jaw sparing, and corneal reflex testing.',
      keyConcepts: [
        'CN IV innervates superior oblique (depresses adducted eye)',
        'Vertical diplopia & head tilt to opposite shoulder',
        'CN V V1/V2/V3 distribution sparing angle of jaw',
        'Corneal reflex (afferent V1, efferent VII)',
        'Masseter/temporalis motor sparing in most lesions',
      ],
      interactiveLabs: ['cranial-nerve-exam'],
      sections: [
        {
          heading: 'Trochlear Nerve (CN IV)',
          bullets: [
            'Supplies the superior oblique muscle, which depresses the eye when it is adducted (and intorts it in abduction).',
            'Clinical presentation: Vertical diplopia, characteristically worse when looking down and inward (e.g., walking down stairs or reading in bed).',
            'Compensatory posture: Patient tilts their head to the OPPOSITE (contralateral) shoulder to minimise diplopia (Bielschowsky head-tilt sign worsens diplopia when tilted toward affected side).',
            'Common causes: Closed head trauma (long slender dorsal exit makes it vulnerable), microvascular ischaemia (DM/HTN), and idiopathic/cavernous sinus lesions.',
          ],
        },
        {
          heading: 'Trigeminal Nerve (CN V)',
          bullets: [
            'Nucleus located in the pons; V1 (ophthalmic) and V2 (maxillary) traverse the lateral wall of the cavernous sinus before exiting via SOF and foramen rotundum; V3 (mandibular) carries motor fibres to muscles of mastication.',
            'Sensory examination: Tests forehead (V1), cheek (V2), and chin/jaw (V3). Crucially, CN V SPARES the angle of the jaw (which is innervated by C2/C3 greater auricular nerve) — loss over the angle of the jaw suggests a non-organic/functional sensory loss.',
            'Corneal reflex: Afferent limb = V1 (nasociliary); Efferent limb = CN VII (bilateral blink via orbicularis oculi). An absent corneal reflex is often the earliest objective sign of a CN V lesion (e.g., CPA acoustic neuroma).',
            'Motor examination: Palpate masseter and temporalis while clenching teeth; jaw deviates TOWARD the weak side on opening (unopposed contralateral lateral pterygoid). Motor involvement is relatively rare compared to sensory symptoms.',
          ],
          callout: {
            variant: 'localisation',
            title: 'Angle of Jaw Rule',
            body: 'The trigeminal nerve stops anterior to the angle of the mandible (supplied by C2/C3). Sensory loss covering the angle of the jaw or extending behind the hairline points away from a pure CN V lesion.',
          },
        },
      ],
      examPearls: [
        'CN IV palsy patients tilt their head AWAY from the affected eye and complain of double vision descending stairs.',
        'Loss of the corneal reflex (V1 afferent -> VII efferent) is an important early sign of cerebellopontine angle tumours compressing V.',
      ],
    },
    {
      id: 'cn-7-facial',
      moduleId: 'cranial-nerves',
      title: 'Facial Nerve (CN VII): Anatomy, UMN vs LMN & Bilateral Palsy',
      subtitle: 'Intracranial loop around CN VI, facial canal course, forehead sparing, and Bell’s palsy',
      sourcePdf: '8-_VII_nerve_6614b658.pdf',
      overview:
        'Traces CN VII from the pons (looping around the VI nucleus) through the internal auditory meatus and Z-shaped facial canal to its 5 terminal branches, distinguishing UMN forehead sparing from LMN complete ipsilateral paralysis and bilateral facial palsy.',
      keyConcepts: [
        'CN VII loops around VI nucleus in pons',
        'Course: IAM (w/ VIII) -> Z-shaped canal -> stylomastoid foramen',
        '5 branches: Temporal, Zygomatic, Buccal, Mandibular, Cervical',
        'Bell’s phenomenon & facial asymmetry signs',
        'UMN forehead sparing vs LMN complete weakness',
        'Bilateral LMN palsy (GBS, neurosarcoid, Lyme)',
      ],
      interactiveLabs: ['cranial-nerve-exam'],
      dragDropId: 'cranial-nerves',
      sections: [
        {
          heading: 'Anatomical Course & Terminal Branches',
          bullets: [
            'Emerges at the pontomedullary junction after looping internally around the CN VI nucleus in the pons.',
            'Enters the internal auditory meatus (IAM) alongside CN VIII, traverses the Z-shaped facial canal within the petrous temporal bone (giving off nerve to stapedius and chorda tympani for anterior 2/3 taste), and exits via the stylomastoid foramen.',
            'Divides within the parotid gland into 5 motor branches: Temporal, Zygomatic, Buccal, Mandibular, Cervical ("To Zanzibar By Motor Car").',
          ],
        },
        {
          heading: 'Clinical Signs of Facial Nerve Palsy',
          bullets: [
            'Reduced or absent forehead wrinkles (frontalis).',
            'Incomplete eye closure with upward rolling of the eyeball on attempted closure (Bell’s phenomenon).',
            'Obliterated nasolabial fold and drooping of the corner of the mouth.',
            'Associated features depending on canal level: Hyperacusis (loss of nerve to stapedius) and loss of taste on anterior 2/3 of tongue (chorda tympani).',
          ],
        },
        {
          heading: 'UMN vs LMN & Bilateral Facial Palsy',
          bullets: [
            'UMN facial palsy (e.g., contralateral cerebral hemisphere stroke): SPARES the forehead/upper face because the upper facial motor nucleus receives BILATERAL corticobulbar cortical innervation; lower face alone is weak.',
            'LMN facial palsy: Paralyses BOTH upper and lower ipsilateral face equally. Causes by site: Pons (vascular/MS — often with CN VI), Cerebellopontine angle (acoustic neuroma/meningioma — with CN VIII/V), Middle ear/Mastoid (otitis media, cholesteatoma, Ramsay Hunt zoster vesicles in ear canal), Parotid (tumour/sarcoid), Idiopathic (Bell’s palsy — acute LMN facial weakness +/- oral prednisolone within 72h + eye protection).',
            'Bilateral LMN facial palsy: Clinically deceptive because facial symmetry is preserved! Always test eye closure strength and forehead elevation. Classic causes: Guillain-Barré syndrome, Neurosarcoidosis, Lyme disease.',
          ],
          callout: {
            variant: 'pearl',
            title: 'Beware Bilateral Facial Palsy',
            body: 'Bilateral LMN CN VII palsy looks symmetric at rest and can easily be missed unless you actively test resisted eye closure, cheek puffing, and forehead raising (think GBS, Sarcoidosis, Lyme).',
          },
        },
      ],
      tables: [
        {
          title: 'UMN vs LMN Facial Weakness',
          headers: ['Feature', 'UMN Facial Palsy', 'LMN Facial Palsy'],
          rows: [
            ['Forehead Wrinkling', 'Preserved (bilateral cortical input)', 'Lost on ipsilateral side'],
            ['Eye Closure / Bell’s Sign', 'Usually preserved or mild weakness', 'Incomplete closure; Bell’s phenomenon visible'],
            ['Lower Face (Mouth/Nasolabial)', 'Contralateral weakness', 'Ipsilateral weakness'],
            ['Common Causes', 'Hemisphere stroke, intracranial tumour', 'Bell’s palsy, Ramsay Hunt (VZV), CPA tumour, middle ear disease, parotid mass'],
          ],
        },
      ],
      examPearls: [
        'Check the external ear canal and palate for vesicles (Ramsay Hunt syndrome / Herpes zoster oticus) in every acute LMN facial palsy.',
        'A pontine lesion affecting CN VII often produces a coexisting ipsilateral CN VI palsy because VII fibres loop around the VI nucleus.',
      ],
    },
    {
      id: 'lower-cn',
      moduleId: 'cranial-nerves',
      title: 'Lower Cranial Nerves (IX, X, XII): Bulbar vs Pseudobulbar Palsy',
      subtitle: 'Palatal/uvular deviation, tongue deviation, gag reflex, and UMN vs LMN brainstem syndromes',
      sourcePdf: '10-_Lower_CN_8c81b142.pdf',
      overview:
        'Clarifies the motor and sensory examination of CN IX, X, and XII, lateralizing rules for uvula and tongue deviation, and the critical clinical differentiation between Bulbar Palsy (LMN) and Pseudobulbar Palsy (UMN).',
      keyConcepts: [
        'CN IX/X palate & pharynx; CN XII tongue',
        'Uvula deviates AWAY from CN X lesion',
        'Tongue deviates TOWARD CN XII lesion',
        'Gag reflex: afferent IX, efferent X',
        'Bulbar (LMN) vs Pseudobulbar (UMN) vs Mixed (MND)',
      ],
      interactiveLabs: ['brainstem-atlas', 'cranial-nerve-exam'],
      dragDropId: 'cranial-nerves',
      sections: [
        {
          heading: 'Individual Lower Cranial Nerve Examination',
          bullets: [
            'CN IX (Glossopharyngeal) & CN X (Vagus): Innervate soft palate and pharynx. In a unilateral CN X lesion, the ipsilateral palatal arch droops and on saying "Ahh" the uvula deviates AWAY from the side of the lesion (pulled by the intact contralateral side). Watching symmetry of the soft palate rising in the midline is even more reliable than uvular tip tilt.',
            'Gag reflex: Sensory afferent limb = CN IX; Motor efferent limb = CN X.',
            'CN XII (Hypoglossal): Innervates intrinsic/extrinsic tongue muscles. In a unilateral LMN CN XII lesion, inspect at rest inside the mouth for ipsilateral wasting and fasciculations; on protrusion, the tongue deviates TOWARD the side of the lesion (pushed by the intact contralateral genioglossus).',
          ],
          callout: {
            variant: 'localisation',
            title: 'Lateralization Mnemonic',
            body: 'Uvula points AWAY from the weak vagus (CN X) — "palate pulls away". Tongue points TOWARD the weak hypoglossal nerve (CN XII) — "licks the lesion".',
          },
        },
        {
          heading: 'Bulbar Palsy vs Pseudobulbar Palsy',
          bullets: [
            'Bulbar palsy: Bilateral LMN lesion of cranial nerves IX, X, XII (medulla nuclei or peripheral nerves). Features: Wasted, flaccid, fasciculating tongue; depressed/absent jaw jerk and gag reflex; nasal, indistinct dysarthria; normal emotional control. Causes: MND, GBS, myasthenia/brainstem stroke/poliomyelitis.',
            'Pseudobulbar palsy: Bilateral UMN lesion of corticobulbar tracts above the brainstem nuclei (single unilateral stroke does NOT cause it because bulbar nuclei have bilateral cortical input!). Features: Small, tight, spastic, slow-moving tongue without wasting/fasciculations; BRISK jaw jerk and brisk gag; "hot-potato" spastic slurred dysarthria; emotional lability (pathological laughing/crying). Causes: Bilateral lacunar strokes (small vessel disease), MND, MS.',
            'Mixed Bulbar + Pseudobulbar features (e.g. wasted fasciculating tongue PLUS brisk jaw jerk) are pathognomonic for Motor Neurone Disease (ALS).',
          ],
        },
      ],
      tables: [
        {
          title: 'Bulbar vs Pseudobulbar Palsy',
          headers: ['Feature', 'Bulbar Palsy (Bilateral LMN)', 'Pseudobulbar Palsy (Bilateral UMN)'],
          rows: [
            ['Lesion Site', 'Medullary nuclei (IX–XII) or lower CNs', 'Bilateral corticobulbar tracts'],
            ['Tongue Appearance', 'Wasted, flaccid, fasciculating', 'Small, stiff, spastic, slow movement (no wasting)'],
            ['Speech Quality', 'Nasal, hoarse, quiet', 'Slurred, strained, spastic ("Donald Duck")'],
            ['Jaw Jerk & Gag Reflex', 'Absent or depressed', 'Brisk / Exaggerated'],
            ['Emotional Lability', 'Normal affect', 'Present (pseudobulbar affect / crying)'],
            ['Classic Causes', 'MND, GBS, brainstem lesion, syringobulbia', 'Bilateral cerebrovascular disease, MND, MS'],
          ],
        },
      ],
      examPearls: [
        'A unilateral hemisphere lesion does not produce dysphagia/dysarthria from pseudobulbar palsy because lower cranial nuclei receive bilateral corticobulbar projections.',
        'Finding a wasted fasciculating tongue together with a brisk jaw jerk diagnoses mixed bulbar/pseudobulbar palsy — classic for Motor Neurone Disease.',
      ],
    },
    {
      id: 'other-cn',
      moduleId: 'cranial-nerves',
      title: 'Olfactory (I), Vestibulocochlear (VIII), Accessory (XI) & Jugular Foramen',
      subtitle: 'Anosmia, Rinne/Weber tuning fork testing, peripheral vertigo causes, SCM testing, and IX/X/XI palsy',
      sourcePdf: '11-_Other_CN_9618d35a.pdf',
      overview:
        'Covers the remaining cranial nerves: CN I anosmia causes, CN VIII cochlear vs vestibular syndromes (BPPV, vestibular neuronitis, Ménière’s, CPA), tuning fork interpretation (256/512 Hz), CN XI sternocleidomastoid opposite-side action, and Jugular Foramen Syndrome.',
      keyConcepts: [
        'Anosmia: local nasal disease vs head trauma',
        'CN VIII course: Pons -> CPA -> IAM',
        'Rinne’s & Weber’s tests (256/512 Hz)',
        'BPPV vs Vestibular neuronitis vs Ménière’s vs CPA',
        'CN XI: SCM turns head to OPPOSITE side',
        'Jugular Foramen Syndrome (CN IX, X, XI)',
      ],
      sections: [
        {
          heading: 'Olfactory Nerve (CN I)',
          bullets: [
            'Most common cause of anosmia is local nasal/sinus disease (rhinitis, nasal polyps) rather than neurological pathology.',
            'Neurological causes: Closed head trauma (shearing of olfactory filaments across the cribriform plate) and rarely subfrontal/olfactory groove meningioma (Foster Kennedy syndrome: ipsilateral anosmia + optic atrophy + contralateral papilloedema).',
          ],
        },
        {
          heading: 'Vestibulocochlear Nerve (CN VIII): Hearing & Vertigo',
          bullets: [
            'Course: Pons -> Cerebellopontine Angle (CPA) -> Internal Auditory Meatus (IAM) alongside CN VII. Divides into Cochlear (hearing) and Vestibular (balance) divisions.',
            'Tuning fork tests (use 256 Hz or 512 Hz — NOT 128 Hz used for vibration): Rinne’s test compares air conduction (AC) vs bone conduction (BC). Normal = AC > BC (Rinne positive). Conductive deafness = BC > AC (Rinne negative). Sensorineural deafness = AC > BC (Rinne positive, both reduced). Weber’s test places fork on vertex: Conductive loss lateralises to the AFFECTED ear; Sensorineural loss lateralises to the NORMAL ear.',
            'Peripheral vertigo syndromes: Vestibular neuronitis / Labyrinthitis (acute prolonged vertigo lasting days, +/- hearing loss in labyrinthitis); BPPV (brief <1 min positional vertigo triggered by rolling over/looking up, Hallpike test); Ménière’s disease (episodic vertigo + fluctuating hearing loss + tinnitus + aural fullness); CPA tumour / Acoustic neuroma (progressive unilateral sensorineural hearing loss + tinnitus + absent corneal reflex [V] + facial weakness [VII]).',
          ],
        },
        {
          heading: 'Spinal Accessory Nerve (CN XI) & Jugular Foramen Syndrome',
          bullets: [
            'CN XI innervates trapezius (shoulder shrug) and sternocleidomastoid (SCM).',
            'Crucial anatomy: The RIGHT SCM contracts to turn the chin to the LEFT (OPPOSITE side). Therefore, a right CN XI palsy causes weakness turning the head toward the LEFT.',
            'Jugular Foramen Syndrome: Combined palsy of CN IX, X, and XI exiting together through the jugular foramen. Causes: Glomus jugulare tumour, neurofibroma, meningioma, skull-base carcinoma/metastases, sarcoidosis, and complicated middle ear infection.',
          ],
        },
      ],
      tables: [
        {
          title: 'Rinne’s & Weber’s Tuning Fork Interpretation (256/512 Hz)',
          headers: ['Hearing Status', 'Rinne’s Test (Affected Ear)', 'Weber’s Test (Vertex)'],
          rows: [
            ['Normal', 'Positive (AC > BC)', 'Central (heard equally both ears)'],
            ['Conductive Deafness', 'Negative (BC > AC)', 'Lateralises TO affected ear'],
            ['Sensorineural Deafness', 'Positive (AC > BC, both reduced)', 'Lateralises TO normal ear'],
          ],
        },
      ],
      examPearls: [
        'Use a 256 Hz or 512 Hz tuning fork for Rinne/Weber testing (128 Hz is for dorsal column vibration sense).',
        'Right SCM turns the head to the left — test right CN XI by resisting left head rotation.',
        'Jugular foramen lesions affect CN IX, X, and XI simultaneously.',
      ],
    },
    {
      id: 'not-cn-horner-ino',
      moduleId: 'cranial-nerves',
      title: 'Not Cranial Nerves: Horner’s Syndrome & Internuclear Ophthalmoplegia',
      subtitle: 'Oculosympathetic 3-neurone pathway and MLF conjugate gaze lesion',
      sourcePdf: '12-_Not_CN_975cac91.pdf',
      overview:
        'Distinguishes two high-yield brainstem/autonomic eye syndromes that mimic cranial nerve palsies: Horner’s syndrome (sympathetic pathway) and Internuclear Ophthalmoplegia (medial longitudinal fasciculus lesion).',
      keyConcepts: [
        'Horner’s tetrad: partial ptosis, miosis, enophthalmos, anhidrosis',
        'Pupil remains reactive to light & accommodation in Horner’s',
        '3-neurone sympathetic pathway & painful carotid dissection',
        'INO: MLF lesion connecting VI and contralateral III nuclei',
        'Impaired adduction + abducting jerk nystagmus',
        'INO in young = MS; elderly = brainstem stroke',
      ],
      interactiveLabs: ['brainstem-atlas', 'cranial-nerve-exam'],
      sections: [
        {
          heading: 'Horner’s Syndrome (Oculosympathetic Palsy)',
          bullets: [
            'Classic clinical signs: Partial ptosis (loss of Müller’s smooth muscle — unlike CN III complete ptosis), Miosis (small pupil that REMAINS reactive to light and accommodation), apparent Enophthalmos, and ipsilateral facial Anhidrosis (sweating loss depends on lesion level relative to carotid bifurcation).',
            '3-neurone pathway: Central (1st order) hypothalamus -> brainstem -> C8–T2 spinal cord (ciliospinal centre); Preganglionic (2nd order) T1 root -> lung apex -> superior cervical ganglion; Postganglionic (3rd order) ascends along internal carotid artery -> cavernous sinus -> orbit.',
            'Key causes by site: Brainstem (lateral medullary syndrome / PICA stroke), Cervical cord (syringomyelia, trauma), Thoracic apex/neck (Pancoast apical lung tumour, thoracic outlet syndrome, trauma/neck surgery), Carotid/intracranial (internal carotid artery dissection, cluster headache/migraine).',
          ],
          callout: {
            variant: 'warning',
            title: 'Acute Painful Horner’s Syndrome = Carotid Dissection',
            body: 'Sudden neck/head pain + ipsilateral Horner’s syndrome (especially after trivial neck trauma) is internal carotid artery dissection until proven otherwise by CTA/MRA.',
          },
        },
        {
          heading: 'Internuclear Ophthalmoplegia (INO)',
          bullets: [
            'Pathophysiology: Lesion of the Medial Longitudinal Fasciculus (MLF), the brainstem tract connecting the ipsilateral CN VI nucleus (horizontal gaze centre in pons) to the contralateral CN III medial rectus subnucleus (midbrain).',
            'Clinical signs on lateral gaze AWAY from the lesion side: Failure or slowing of ADDUCTION of the eye on the side of the MLF lesion, accompanied by horizontal jerk NYSTAGMUS in the contralateral ABDUCTING eye. Convergence (mediated separately) is typically preserved!',
            'Diagnostic rule by age: Young adult (especially bilateral INO) = Multiple Sclerosis; Older vascular patient = Brainstem stroke (pontine/midbrain infarct).',
          ],
        },
      ],
      tables: [
        {
          title: 'Ptosis & Pupil Differential: CN III Palsy vs Horner’s Syndrome',
          headers: ['Clinical Sign', 'CN III (Oculomotor) Palsy', 'Horner’s Syndrome'],
          rows: [
            ['Ptosis Severity', 'Complete / severe (levator palpebrae)', 'Partial / mild (Müller’s muscle)'],
            ['Pupil Size', 'Dilated (mydriasis) if surgical/compressive', 'Constricted (miosis)'],
            ['Pupil Reactivity', 'Absent light & accommodation reflexes', 'Preserved (reactive to light & accommodation)'],
            ['Eye Position', 'Down and out', 'Normal ocular alignment / extraocular movements'],
            ['Associated Sweating', 'Normal', 'Ipsilateral anhidrosis (central/preganglionic)'],
          ],
        },
      ],
      examPearls: [
        'In Horner’s syndrome, the small pupil still reacts briskly to light and accommodation; ptosis is only partial.',
        'Bilateral INO in a young patient is almost pathognomonic for Multiple Sclerosis; unilateral INO in an older patient suggests brainstem infarction.',
      ],
    },
  ],
};
