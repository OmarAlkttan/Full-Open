import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

async function getAll(){
  const request = axios.get(baseUrl);
  return request.then(response => {
    console.log('get response data', response.data)
    return response.data;
  });
}

function update(id, newPerson){
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then(response => response.data);
}

function add(newPerson){
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data);
}

function remove(id){
  const request = axios.delete(`${baseUrl}/${id}`);
  
  return request.then(response => {
    console.log("delete status", response.status);
  });
}

export default {getAll, update, add, remove};