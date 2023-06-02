import express from 'express';
import patientService from '../services/patientService';
import { NewPaitent } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getAllWSsn());
});

router.get('/:id', (req, res) =>{
  res.json(patientService.getOne(req.params.id));
});

router.post('/', (req, res) => {
  try{
    const patient : NewPaitent = toNewPatientEntry(req.body);
    const newPatient = patientService.addPatient(patient);
    res.json(newPatient);
  }catch(err : unknown){
    let errorMsg = "Something went wrong.";
    if(err instanceof Error){
      errorMsg += " Error: " + err.message;
    }
    res.status(400).json({message: errorMsg});
  }
});

export default router;