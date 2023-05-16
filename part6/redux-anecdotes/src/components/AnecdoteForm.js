import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const anecdoteFormRef = useRef(null);

  const addAnecdotes = (event) => {
    console.log('event', event);
    event.preventDefault();
    const content = anecdoteFormRef.current.anecdote.value;
    console.log('form ref', content);
    dispatch(createAnecdote(content))
    dispatch(setNotification(`new anecdote has been created ${anecdoteFormRef.current.anecdote.value}`, 5))
    anecdoteFormRef.current.anecdote.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdotes} ref={anecdoteFormRef}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )

}

export default AnecdoteForm;