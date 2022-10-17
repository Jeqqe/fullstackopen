import React from 'react';
import { OccupationalHealthcareEntry } from '../types';

export default function OccupationalHealthcare({entry}: {entry: OccupationalHealthcareEntry}) {
  return (
    <>
      <h4>{entry.date}</h4>
      <p>Description: {entry.description}</p>
      <p>Employer name: {entry.employerName}</p>
      <p>Diagnosed by: {entry.specialist}</p>
    </>
  );
}
