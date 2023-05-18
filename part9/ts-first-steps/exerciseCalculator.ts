interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const caculateExercises = (trainingValues: number[], target : number ) : exerciseResult => {
  const trainingDays = trainingValues.reduce( (total, num)=> num > 0 ? total + 1 : total, 0);
  const average = trainingValues.reduce((total, num) => total + num, 0) / trainingValues.length;
  let rating = 1;
  let ratingDescription = '';
  switch (true) {
    case (average < 1) : {
      ratingDescription = 'too low, you must work harder';
    }
    break;
    case (average < 1.5) : {
      ratingDescription = 'low, dig deeper';
    }
    break;
    case (average < 2) : {
      ratingDescription = 'not too bad but could be improved';
      rating = 2;
    }
    break;
    case (average < 2.5) : {
      ratingDescription = 'good good, right on the top';
      rating = 2;
    }
    break;
    case (average < 3) : {
      ratingDescription = 'very good, you doing so well';
      rating = 3;
    }
    break;
    case (average > 3) : {
      ratingDescription = 'unstoppable!!!';
      rating = 3;
    }
  }
  const success = average >= target;
  return {
    periodLength : trainingValues.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseArguments2 = (args : string[]) : number [] =>{
  const input : number[] = args.slice(3).map(s => {
    if(isNaN(Number(s))){
      throw new Error('enter a number');
    }
    return Number(s);
  });
  return input;
};

try{
  const trainingValues : number[] = parseArguments2(process.argv.slice(3));
  const target = process.argv[2];
  if(isNaN(Number(target))) throw new Error('enter a nunber');
  console.log(caculateExercises(trainingValues, Number(target)));
}catch(err){
  let errMsg = 'Something went wrong.';
  if(err instanceof Error){
    errMsg += ' Error: ' + err.message;
  }
  console.log(errMsg);
}
