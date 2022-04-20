import express from 'express';
import calculateBmi from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const height: number = parseInt(req.query.height as string);
  const weight: number = parseInt(req.query.weight as string);

  try {
    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight)
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json({error: error.message});
    }
  }
});

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: { daily_exercises: Array<number>; target: number }  = req.body;

  if (!daily_exercises || !target) {
    return res.send({
      error: "parameters missing"
    }).status(400);
  }

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some(isNaN)) {
    return res.send({
      error: "malformatted parameters"
    }).status(400);
  }

  const result = exerciseCalculator(daily_exercises, target);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});