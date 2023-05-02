import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const anecdoteFormRef = useRef(null);

  const addAnecdotes = (event) => {
    console.log('event', event);
    event.preventDefault();
    console.log('form ref', anecdoteFormRef.current.anecdote.value);
    dispatch(addAnecdote(anecdoteFormRef.current.anecdote.value))
    dispatch(setNotification(`new anecdote has been created ${anecdoteFormRef.current.anecdote.value}`))
    setTimeout(() => {
      dispatch(setNotification(""))
    }, 5000)
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