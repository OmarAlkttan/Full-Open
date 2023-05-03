import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const anecdoteFormRef = useRef(null);

  const addAnecdotes = async (event) => {
    console.log('event', event);
    event.preventDefault();
    const content = anecdoteFormRef.current.anecdote.value;
    console.log('form ref', content);
    const createdAnecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(createdAnecdote))
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