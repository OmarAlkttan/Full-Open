export type Diagnose =  {
  code: string;
  name: string;
  lating?: string;
};

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type PatientWSsn = Omit<Patient, 'ssn'>;

export type NewPaitent = Omit<Patient, 'id'>;