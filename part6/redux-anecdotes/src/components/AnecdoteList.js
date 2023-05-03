import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(a => a.content.includes(filter))).sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you have ${anecdote.content}`, 5))
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