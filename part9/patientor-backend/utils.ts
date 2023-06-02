import { Entry, Gender, NewPaitent } from "./types";

const toNewPatientEntry = (object : unknown) : NewPaitent => {
  if( !object || typeof object !== "object"){
    throw new Error("Incorrect or missing data");
  }

  if('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object && 'occupation' in object && 'entries' in object){
    const newPatient : NewPaitent = {
      name: parseName(object.name),
      gender: parseGender(object.gender),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    };

    return newPatient;
  }

  throw new Error("Incorrect or missing data");
};

const parseString = (str : unknown, field : string) : string => {
  if(!isString(str)) throw new Error (`Incorrect ${field}`);
  return str;
};

const parseDate = (date : unknown, field : string) : string => {
  if(!isString(date) || !isDate(date)) throw new Error(`Incorrect ${field}`);
  return date;
};

const parseNumber = (number : unknown, field : string) : number => {
  if(!isNumber(number)) throw new Error(`Incorrect ${field}`);
  return number;
};

const isNumber = (number : unknown) : number is number => {
  return typeof number === 'number' || number instanceof Number;
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

const parseEntries = (entries : unknown): Entry[] => {
  if(!entries || typeof entries !== 'object' || !(entries instanceof Array)) throw new Error('Incorrect entries');
  
  const newEntries : Entry[] = entries.map((entry: unknown) => {
    return toEntry(entry);
  });
  return newEntries;
};

const toEntry = (object : unknown) : Entry => {
  if( !object || typeof object !== "object"){
    throw new Error("Incorrect or missing data");
  }

  if('text' in object && 'description' in object && 'creationDate' in object && 'createdBy' in object && 'diagnoseCode' in object){
    const newEntry : Entry = {
      text: parseString(object.text, "text"),
      description: parseString(object.description, "description"),
      creationDate: parseDate(object.creationDate, "creationDate"),
      createdBy: parseString(object.createdBy, 'createdBy'),
      diagnoseCode: parseNumber(object.diagnoseCode, 'diagnoseCode'),
    };

    return newEntry;
  }

  throw new Error("Incorrect or missing Entry data");
};

export default toNewPatientEntry;
