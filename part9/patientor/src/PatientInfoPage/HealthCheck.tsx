import React from 'react';
import { HealthCheckEntry, HealthCheckRating } from '../types';

export default function HealthCheck({entry}: {entry: HealthCheckEntry}) {
  return (
    <>
      <h4>{entry.type} | {entry.date}</h4>
      <p>Description: {entry.description}</p>
      <p>Health rating: {HealthCheckRating[entry.healthCheckRating]}</p>
      <p>Diagnosed by: {entry.specialist}</p>
    </>
  );
}
