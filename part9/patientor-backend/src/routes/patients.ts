import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('fetching all patients');
  res.send(patientService.getPatientsWithoutSSN());
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

export default router;