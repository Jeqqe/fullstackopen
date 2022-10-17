import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('fetching all patients');
  res.send(patientService.getPatientsWithoutSSN());
});

router.get('/:id', (req, res) => {
  console.log('fetching patient information');
  res.send(patientService.getPatientDetails(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
	const patient = patientService.getPatientDetails(req.params.id);
  if (typeof patient === 'string') {
    res.status(404).send({ error: patient });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entry = toNewEntry(req.body);
    const updatedPatient = patientService.addNewEntry(patient, entry);
    
    res.json(updatedPatient);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong';
  if (err instanceof Error) {
    errorMessage += ' Error: ' + err.message;
  }

  res.status(400).send(errorMessage);
  }
});

export default router;