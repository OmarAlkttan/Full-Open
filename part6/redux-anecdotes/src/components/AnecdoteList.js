import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(a => a.content.includes(filter))).sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch({ type: 'anecdotes/vote', payload: anecdote.id })
    dispatch({ type: 'notification/setNotification', payload: `you have ${anecdote.content}` })
    setTimeout(() => {
      dispatch({ type: 'notification/setNotification', payload: "" })
    }, 5000)
  }

  console.log('anecdotes', anecdotes);

  return (
    <>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList