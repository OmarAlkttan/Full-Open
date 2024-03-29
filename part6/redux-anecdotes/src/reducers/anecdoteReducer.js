import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case 'VOTE':
//       state = state.map(anecdote => {
//         console.log(anecdote);
//         console.log(action.payload);
//         return anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote;
//       });
//       break
//     case 'ADD_ANECDOTE':
//       state = [...state, asObject(action.payload)]
//       break
//     default: state = [...state]
//   }

//   return state.sort((a, b) => b.votes - a.votes);
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      console.log('state', state);
      return state.map(anecdote => {
        console.log('anecdote', anecdote);
        return anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote;
      })
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { setAnecdotes, vote, addAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dipatch => {
    const anecdotes = await anecdoteService.getAll()
    dipatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const cretedAnecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(cretedAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(vote(anecdote.id))
  }
}


export default anecdoteSlice.reducer