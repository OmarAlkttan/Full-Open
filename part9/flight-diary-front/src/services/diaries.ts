import axios, { AxiosError } from "axios"
import { NewDiaryEntry } from "../types";

const localhost = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const response = await axios.get(localhost);
  return response.data;
}

const add = async (newDiary : NewDiaryEntry) => {
    const respose = await axios.post(localhost, newDiary);
    return respose.data;
  
}

export default { getAll, add }