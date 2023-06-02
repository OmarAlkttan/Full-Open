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

export interface Entry {
  text: string;
  description: string;
  creationDate: string;
  createdBy: string;
  diagnoseCode: number;
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type PatientWSsn = Omit<Patient, 'ssn' | 'entries'>;

export type NewPaitent = Omit<Patient, 'id'>;