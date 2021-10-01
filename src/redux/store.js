import { createStore, combineReducers } from 'redux'
import booksReducer from './booksReducer'

const reducers = combineReducers({
  booksReducer,
})

const store = createStore(reducers)

export default store
