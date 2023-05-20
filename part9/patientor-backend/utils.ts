import { Gender, NewPaitent } from "./types";

const toNewPatientEntry = (object : unknown) : NewPaitent => {

  if( !object || typeof object !== "object"){
    throw new Error("Incorrect or missing data");
  }

  if('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object && 'occupation' in object){
    const newPatient : NewPaitent = {
      name: parseName(object.name),
      gender: parseGender(object.gender),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation)
    };

    return newPatient;
  }

  throw new Error("Incorrect or missing data");
};

const parseName = (name : unknown) : string =>{
  if(!isString(name)) throw new Error("Incorrect name");
  return name;
};

const parseSsn = (ssn: unknown) : string =>{
  if(!isString(ssn)) throw new Error("Incorrect ssn");
  return ssn;
};

const parseOccupation = (occupation: unknown) : string =>{
  if(!isString(occupation)) throw new Error("Incorrect occupation");
  return occupation;
};

const parseGender = (gender: unknown) : Gender =>{
  if(!isString(gender) || !isGender(gender)) throw new Error("Incorrect gender");
  return gender;
};

const parseDateOfBirth = (date: unknown) : string =>{
  if(!isString(date) || !isDate(date)) throw new Error("Incorrect date");
  return date;
};

const isGender = (gender : string) : gender is Gender =>{
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const isString = (str : unknown) : str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isDate = (date : string) : boolean => {
  return Boolean(Date.parse(date));
};

export default toNewPatientEntry;
