import React from 'react';
import { InteractiveLabId } from '../../types/neurology';
import {
  CranialNerveLab,
  SpinalTractsLab,
  VisualPathwayLab,
} from './PathwayLabs';
import {
  BrainstemAtlasLab,
  MotorReflexCerebellumLab,
} from './BrainstemAndMotorLabs';
import {
  NmjAndPeripheralLab,
  ParkinsonsPharmacologyLab,
  StrokeVascularLab,
} from './VascularAndPharmacologyLabs';
import { CsfMatrixLab, GcsAndReflexLab } from './ClinicalCalculatorsLab';

export const LAB_META: Record<InteractiveLabId, { title: string; subtitle: string }> = {
  'brainstem-atlas': {
    title: 'Brainstem & Axial CN Nuclei Atlas',
    subtitle: 'Anterior/Posterior brainstem, CN III–XII & crossed syndromes',
  },
  'motor-reflex-cerebellum': {
    title: 'Motor Pathway, Reflex Arc & Cerebellum',
    subtitle: 'Corticospinal decussation, α–γ coactivation & cerebellar lobes',
  },
  'visual-pathway': {
    title: 'Visual Pathway & Goldmann Perimetry',
    subtitle: 'Axial brain base, Meyer’s loop, chiasm & macular sparing',
  },
  'spinal-tracts': {
    title: 'Spinal Cord Cross-Section & Tracts',
    subtitle: 'Brown-Séquard, Syringomyelia, B12 SACD & ASA infarct',
  },
  'cranial-nerve-exam': {
    title: 'Ocular, Facial (VII) & Bulbar (X/XII) Exam',
    subtitle: 'Surgical CN III, INO, Horner’s, UMN vs LMN VII & deviation',
  },
  'csf-matrix': {
    title: 'Ventricular System, CSF Flow & LP Matrix',
    subtitle: 'Midsagittal cisterns, choroid plexus, hydrocephalus & LP profiles',
  },
  'stroke-vascular': {
    title: 'Circle of Willis & Cortical Territories',
    subtitle: 'ACA, MCA, PCA, Lacunar perforators & Berry aneurysms',
  },
  'parkinsons-bbb': {
    title: 'BBB & Striatal Dopaminergic Synapse',
    subtitle: 'Endothelial tight junctions, LAT1, L-Dopa/DCI, COMT & MAO-B',
  },
  'nmj-pns': {
    title: 'Neuromuscular Junction & Limb Nerves',
    subtitle: 'MG postsynaptic folds, AChR IgG & Median/Ulnar/Radial/CPN',
  },
  'gcs-reflex': {
    title: 'GCS, Coma Pupil Gauge & Reflex Roots',
    subtitle: 'E4 V5 M6 coma threshold & deep tendon reflex root levels',
  },
};

export function InteractiveLabRenderer({ labId }: { labId: InteractiveLabId }) {
  switch (labId) {
    case 'brainstem-atlas':
      return <BrainstemAtlasLab />;
    case 'motor-reflex-cerebellum':
      return <MotorReflexCerebellumLab />;
    case 'visual-pathway':
      return <VisualPathwayLab />;
    case 'spinal-tracts':
      return <SpinalTractsLab />;
    case 'cranial-nerve-exam':
      return <CranialNerveLab />;
    case 'stroke-vascular':
      return <StrokeVascularLab />;
    case 'parkinsons-bbb':
      return <ParkinsonsPharmacologyLab />;
    case 'nmj-pns':
      return <NmjAndPeripheralLab />;
    case 'csf-matrix':
      return <CsfMatrixLab />;
    case 'gcs-reflex':
      return <GcsAndReflexLab />;
  }
}
