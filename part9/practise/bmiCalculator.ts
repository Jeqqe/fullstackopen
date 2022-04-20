const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight) / ((height/100)**2);
  
  if (bmi < 16) return 'Underweight (Severe thinness)';
  if (bmi < 16.9) return 'Underweight (Moderate thinness)';
  if (bmi < 18.4) return 'Underweight (Mild thinness)';
  if (bmi < 24.9) return 'Normal range';
  if (bmi < 29.9) return 'Overweight (Pre-obese)';
  if (bmi < 34.9) return 'Obese (Class I)';
  if (bmi < 39.9) return 'Obese (Class II)';
  if (bmi >= 40.0) return 'Obese (Class III)';

  throw new Error('Could not calculate BMI with the given values.');
  
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

try {
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}

export default calculateBmi;