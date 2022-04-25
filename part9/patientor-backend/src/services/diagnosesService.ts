import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData;

const getDiagnoses = () => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};