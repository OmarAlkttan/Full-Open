import { useState } from 'react'

const Button = ({handleClick, text}) =>{
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad, all, avg, positive}) =>{
  console.log(good == 0)
  if(good == 0 && neutral == 0 && bad == 0){
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }else{
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={(positive * 100) + " %"} />
          </tbody>
        </table>
        
      </>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => {
        setGood(() => {
          setAll(()=>{
            setAvg(()=>{
              setPositive(()=>{
                return (good+1) / (all+1)
              })
              return ((good+1) - bad) / (all + 1)
            })
            return all + 1
          })
          return good + 1})
      }
    } text='good'/>
      <Button handleClick={() => {
        setNeutral(() => {
          setAll(()=>{
            setAvg(()=>{
              setPositive(()=>{
                return good / (all+1)
              })
              return (good - bad) / (all + 1)
            })
            return all + 1
          })
          return neutral + 1})
        }} text='neutral'/>
      <Button handleClick={() => {
        setBad(() => {
          setAll(()=>{
            setAvg(()=>{
              setPositive(()=>{
                return good / (all+1)
              })
              return (good - (bad+1)) / (all + 1)
            })
            return all + 1
          })
          return bad + 1})
        }} text='bad'/>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} avg={avg} positive={positive}/>
    </div>
  )
}

export default App