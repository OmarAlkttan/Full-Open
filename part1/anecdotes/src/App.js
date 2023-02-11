import { useState } from 'react'

const Button = ({handleClick, text}) =>{
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Anecdote = ({text, votes}) => {
  return (
    <>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [max, setMax] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0));

  const nextAnecdote = () => {
    setSelected(()=>{
      return Math.floor(Math.random() * anecdotes.length)
    })
  }

  const vote = () =>{
    setVotes(()=> {
      const copy = [...votes]
      copy[selected]++;
      setMax((value)=>{
        if(copy[selected] > copy[value]){
          return selected
        }else{
          return value
        }
      })
      return copy;
    })
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" handleClick={() => vote()}/>
      <Button text="next anecdote" handleClick={() => nextAnecdote()}/>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[max]} votes={votes[max]} />
    </div>
  )
}

export default App