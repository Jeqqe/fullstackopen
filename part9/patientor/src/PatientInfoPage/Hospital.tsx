import React from 'react';
import { HospitalEntry } from '../types';

export default function Hospital({entry}: {entry: HospitalEntry}) {
  return (
    <>
      <h4>{entry.date}</h4>
      <p>Description: {entry.description}</p>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Discharge criteria: {entry.discharge.criteria}</p>
      <p>Diagnosed by: {entry.specialist}</p>
    </>
  );
}
