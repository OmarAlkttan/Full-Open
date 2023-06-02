import { useState, useEffect } from 'react';
import { DiaryEntry, Visibility, Weather } from './types';
import diariesService from './services/diaries';
import { AxiosError } from 'axios';

const Diary = ({ diary } : { diary : DiaryEntry}) => {
  return (
    <div>
      <h4>{diary.date}</h4>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
    </div>
  )
}

const DiaryList = ({ diaries } : { diaries : DiaryEntry[]}) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(d => <Diary key={d.id} diary={d} /> )}
    </div>
  )
}

const AddDiaryForm = () => {

  const [date, setDate] = useState<string>(new Date(Date.now()).toISOString().split('T')[0]);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [selectedVisibility, setSelectedVisibility] = useState('great');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [selectedWeather, setSelectedWeather] = useState('sunny')
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>();

  const addDiary = (event : React.SyntheticEvent) => {
    event.preventDefault();
    const v = visibility as Visibility;
    const w = weather as Weather;
    diariesService.add({date, visibility: v, weather: w, comment}).then((data) => {
      console.log('after add', data);
      setError('');
    }).catch((err) => {
      console.log(err);
      const error = err as AxiosError;
      console.log('hello', error.response?.data);
      setError(error.response?.data as string);
    })
    setDate('');
    setComment('');
    setSelectedVisibility('great');
    setSelectedWeather('sunny');
  }

  const handleVisibilityChange = (event : React.FormEvent<HTMLInputElement>) => {
    console.log("value", event.currentTarget.value);
    setSelectedVisibility(event.currentTarget.value)
    switch (event.currentTarget.value) {
      case 'great' : setVisibility(Visibility.Great); break;
      case 'good' : setVisibility(Visibility.Good); break;
      case 'ok' : setVisibility(Visibility.Ok); break;
      case 'poor' : setVisibility(Visibility.Poor); break;
    }
  }

  const handleWeatherChange = (event : React.FormEvent<HTMLInputElement>) => {
    setSelectedWeather(event.currentTarget.value);
    switch (event.currentTarget.value) {
      case 'sunny' : setWeather(Weather.Sunny); break;
      case 'rainy' : setWeather(Weather.Rainy); break;
      case 'cloudy' : setWeather(Weather.Cloudy); break;
      case 'stormy' : setWeather(Weather.Stormy); break;
      case 'windy' : setWeather(Weather.Windy); break;
    }
  }

  return (
    <div>
      <h2>Add new Diary</h2>
      {error && <h4 style={{color: 'red'}}>{error}</h4>}
      <form onSubmit={addDiary}>
        <div>
          <label htmlFor="date">date</label>
          <input type="date" id='date' name='date' min="1950-01-01" max={new Date(Date.now()).toISOString().split('T')[0]} value={date} onChange={(event)=> {setDate(event.target.value)}} />
        </div>
        <div>
          <label htmlFor="visibility" style={{marginRight: '10px'}}>visibility</label>
          <label htmlFor="great">great</label>
          <input type="radio" id="great" name="visibility" value="great"
             checked={selectedVisibility === 'great'} onChange={handleVisibilityChange} />
          <label htmlFor="good">good</label>
          <input type="radio" id="good" name="visibility" value="good" checked={selectedVisibility === 'good'} onChange={handleVisibilityChange} />
          <label htmlFor="ok">ok</label>
          <input type="radio" id="ok" name="visibility" value="ok" checked={selectedVisibility === 'ok'} onChange={handleVisibilityChange} />
          <label htmlFor="poor">poor</label>
          <input type="radio" id="poor" name="visibility" value="poor" checked={selectedVisibility === 'poor'} onChange={handleVisibilityChange} />
        </div>
        <div>
          <label htmlFor="weather" style={{marginRight: '10px'}}>weather</label>
          <label htmlFor="sunny">sunny</label>
          <input type="radio" id="sunny" name="weather" value="sunny"
             checked={selectedWeather === 'sunny'} onChange={handleWeatherChange} />
          <label htmlFor="rainy">rainy</label>
          <input type="radio" id="rainy" name="weather" value="rainy" checked={selectedWeather === 'rainy'} onChange={handleWeatherChange} />
          <label htmlFor="cloudy">cloudy</label>
          <input type="radio" id="cloudy" name="weather" value="cloudy" checked={selectedWeather === 'cloudy'} onChange={handleWeatherChange} />
          <label htmlFor="stormy">stormy</label>
          <input type="radio" id="stormy" name="weather" value="stormy" checked={selectedWeather === 'stormy'} onChange={handleWeatherChange} />
          <label htmlFor="windy">windy</label>
          <input type="radio" id="windy" name="weather" value="windy" checked={selectedWeather === 'windy'} onChange={handleWeatherChange} />
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input type="text" id='comment' name='comment' value={comment} onChange={(event)=> {setComment(event.target.value)}} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

function App() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    diariesService.getAll().then((result) => {
      setDiaries(result);
      console.log(result);
      
    })
  }, [])

  return (
    <div>
      <AddDiaryForm />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;
