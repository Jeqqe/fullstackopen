import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddEntryModal from '../AddEntryModal';
import { apiBaseUrl } from '../constants';
import { addPatientEntry, addPatientInfo, useStateValue } from '../state';
import { Entry, NewEntry, Patient } from '../types';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

function EntryDetail ({ entry }: { entry: Entry }) {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
}

export default function PatientInfoPage() {
  const { id } = useParams<{ id: string }>(); 
  const [{ patientsInfo }, dispatch] = useStateValue();
  const [ patientInfo, setPatientInfo ] = useState<Patient>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    if (!id) return;
    if (patientsInfo[id]) {
      setPatientInfo(patientsInfo[id]);
      return;
    }

    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatientInfo(patientInfoFromApi));
        setPatientInfo(patientInfoFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientInfo();
  }, [dispatch]);

  const submitNewEntry = async (values: NewEntry) => {
    if (!id) return;
		try {
			const { data: newPatientInfoFromApi } = await axios.post<Patient>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			dispatch(addPatientEntry(newPatientInfoFromApi));
      setPatientInfo(newPatientInfoFromApi);
			closeModal();
		} catch (e) {
			console.log(e);
		}
	};

  if (!id || !patientInfo) return <h2>Patient not found.</h2>;
  return (
    <div>
      <h2>
        Name: {patientInfo.name}
      </h2>
      <p>Ssn: {patientInfo.ssn}</p>
      <p>Gender: {patientInfo.gender}</p>
      <p>Occupation: {patientInfo.occupation}</p>
      
      <h3>Entries</h3>
      {
        patientInfo.entries.map((entry, index) => (
          <EntryDetail key={index} entry={entry} />
        ))
      }
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Hospital Entry
      </Button>
    </div>
  );
}
