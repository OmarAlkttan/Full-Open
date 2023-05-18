interface BMIValues {
  height: number;
  weight: number;
}

export function calculateBMI(height: number, weight: number) : string{
  height = height / 100;
  const BMI : number = weight / (height * height);
  console.log('BMI', BMI);
  
  switch (true) {
    case (BMI < 16) : return 'Underweight (Severe thinness)';
    case (BMI < 17) : return 'Underweight (Moderate thinness)';
    case (BMI < 18.5) : return 'Underweight (Mild thinness)';
    case (BMI < 25) : return 'Normal range';
    case (BMI < 30) : return 'Overweight (Pre-obese)';
    case (BMI < 35) : return 'Overweight (Class I)';
    case (BMI < 40) : return 'Overweight (Class II)';
    case (BMI >= 40) : return 'Overweight (Class III)';
    default: return 'Unknown';
  }
}

const parseArguments = (args : string[]) : BMIValues=> {
  if(args.length > 4) throw new Error('too many arguments');
  if(args.length < 4) throw new Error('Not enough arguments');

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  }else{
    throw new Error('please enter numbers');
  }
};
try{
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBMI(height, weight));
}catch(error : unknown){
  let err = 'Something bad happened.';
  if(error instanceof Error){
    err += ' Error: ' + error.message;
  }
  console.log(err);
  
}