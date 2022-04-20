interface ExcerciseResult { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
  number: number,
  string: string
}

const exerciseCalculator = (excercises: Array<number>, target: number): ExcerciseResult => {

  if (excercises.some(isNaN) || !target) {
    throw new Error('Invalid arguments passed.');
  }

  const getRatings = (): Rating => {
    const successRatio: number = excercises.filter(amount => amount < target).length / excercises.length;
    if (successRatio < 0.33) return {number: 1, string: 'Poor performance'};
    if (successRatio < 0.66) return {number: 2, string: 'Decent performance'};
    return {number: 3, string: 'Good performance'};
  };

  const trainingDays: number = excercises.filter(amount => amount !== 0).length;
  const success = !excercises.some(amount => amount < target);
  const rating: Rating = getRatings();
  const average: number = excercises.reduce((a, b) => a + b, 0) / excercises.length;

  return { 
    periodLength: excercises.length,
    trainingDays,
    success,
    rating: rating.number,
    ratingDescription: rating.string,
    target,
    average, 
  };
};

const args: Array<number> = process.argv.slice(2).map(arg => parseInt(arg));

const excercises= args.slice(1);
const target = args.shift()!; 

try {
  console.log(exerciseCalculator(excercises, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}

export default exerciseCalculator;