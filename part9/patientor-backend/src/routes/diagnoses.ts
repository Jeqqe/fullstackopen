import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('fetching all diagnoses');
  res.send(diagnosesService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving diagnose!');
});

export default router;