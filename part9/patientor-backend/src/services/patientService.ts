import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients.json';
import { Patient, NewPatient, PatientDataWithoutSSN } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = () => {
  return patients;
};

const getPatientsWithoutSSN = (): PatientDataWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( newPattientData: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(), ...newPattientData
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getPatientsWithoutSSN
};