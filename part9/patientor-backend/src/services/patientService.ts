import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';
import { Patient, NewPatient, PatientDataWithoutSSN, Gender, Entry, NewEntry } from '../types';

const getGenderFromString = (genderString: string): Gender => {
  switch (genderString.toLowerCase()) {
    case Gender.Female:
      return Gender.Female;
    case Gender.Male:
      return Gender.Male;
    default:
      return Gender.Other;
  }
};

const patients: Array<Patient> = patientData.map((patient) => ({
  ...patient,
  gender: getGenderFromString(patient.gender),
}));

const getPatients = () => {
  return patients;
};

const getPatientsWithoutSSN = (): PatientDataWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const getPatientDetails = (id: string): Patient | string => {
  return patients.find((patient) => patient.id === id) ?? 'Patient not found';
};

const addPatient = ( newPattientData: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(), ...newPattientData
  };

  patients.push(newPatient);
  return newPatient;
};

const addNewEntry = (patient: Patient, entryData: NewEntry): Patient => {
	const newEntry: Entry = {
		...entryData,
		id: uuid()
	};

	patient.entries.push(newEntry);
	return patient;
};

export default {
  getPatients,
  addPatient,
  getPatientsWithoutSSN,
  getPatientDetails,
  addNewEntry
};