import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { caculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) =>{
  res.send('Hello fullStack!');
});

app.get('/bmi', (req, res) =>{
  const params = req.query;
  console.log('params', params);
  if(!params.height || !params.weight || isNaN(Number(params.height)) || isNaN(Number(params.weight))){
    res.json({'error': 'malformatted parameters'});
  }
  const bmi = calculateBMI(Number(params.height), Number(params.weight));
  console.log('bmi', bmi);
  
  res.json({
    height: params.height,
    weight: params.weight,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises : number[] = req.body.daily_exercises, target : number = req.body.target;
  if(!daily_exercises || !target) return res.json({'error': 'parameters missing'}).end();
  
  if(!isArrayOfNumbers(daily_exercises) || isNaN(target)){
    return res.json({'error': 'malformatted parameters'}).end();
  }
  const results = caculateExercises(daily_exercises, target);
  return res.json({results});
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('Server running on port',PORT);
  
});

function isArrayOfNumbers(variable: any): boolean {
  if (!Array.isArray(variable)) {
    return false;
  }

  return variable.every((item: any) => {
    console.log('item type', typeof item);
    return typeof item === 'number';
  });
}