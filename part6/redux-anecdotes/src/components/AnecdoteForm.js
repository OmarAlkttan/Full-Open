import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const anecdoteFormRef = useRef(null);

  const addAnecdotes = (event) => {
    event.preventDefault();
    console.log('form ref', anecdoteFormRef.current.anecdote.value);
    dispatch({ type: 'ADD_ANECDOTE', payload: anecdoteFormRef.current.anecdote.value })
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