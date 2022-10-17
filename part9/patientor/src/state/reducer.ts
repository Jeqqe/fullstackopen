import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_ENTRY";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_INFO";
      payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_INFO":
      return {
        ...state,
        patientsInfo: {
          ...state.patientsInfo,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patients,
});

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSES_LIST",
  payload: diagnoses,
});

export const addPatient = (patient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: patient,
});

export const addPatientEntry = (patient: Patient): Action => ({
  type: "ADD_PATIENT_ENTRY",
  payload: patient,
});

export const addPatientInfo = (patient: Patient): Action => ({
  type: "ADD_PATIENT_INFO",
  payload: patient,
});