import patientsData from '../data/patients';
import { NewPaitent, Patient, PatientWSsn } from '../types';
import { v1 as uuid } from 'uuid';

const patients = patientsData as Patient[];

const getAll = () : Patient[] => {
  return patients;
};

const getAllWSsn = () : PatientWSsn[] => {
  return patients.map(({name, dateOfBirth, id, occupation, gender}) => {
    return {name, id, dateOfBirth, occupation, gender};
  });
};

const addPatient = (patient : NewPaitent) : Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id : string = uuid();
  const newPatient : Patient = {...patient, id};
  patients.push(newPatient);
  return newPatient; 
};

const getOne = (id : string) : Patient => {
  const patient : Patient | undefined = patients.find(p => p.id === id);
  if(patient){
    return patient;
  }
  throw new Error(`Patient ${id} does not exist`);
};

export default { getAll, getAllWSsn, addPatient, getOne };