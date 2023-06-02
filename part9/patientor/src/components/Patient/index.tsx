import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';

import { Patient } from '../../types';
import patientService from "../../services/patients";


const PatientPage = () => {
  const match = useMatch('/patients/:id');
  const [patient, setPatient] = useState<Patient>()

  useEffect(() => {
    const fetchPatient = async () => {
      if(match?.params.id){
        const result = await patientService.getOne(match?.params.id);
        setPatient(result)
      }
    }
    fetchPatient();
  }, [match])
  if(patient){
    const p = patient;
    return (
      
      <div>
        Patient : {p.name}
      </div>
     );
  }else{
    return <div>Loading Patient Data...</div>
  }
}

 
export default PatientPage;