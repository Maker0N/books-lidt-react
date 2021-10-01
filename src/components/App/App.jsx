import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Nav from '../Nav/Nav'
import Form from '../Form/Form'
import Basket from '../Basket/Basket'
import { showHideForm } from '../../redux/booksReducer'
import '../../styles/main.css'

const App = () => {
  const dispatch = useDispatch()
  const {
    formVisible, books, activeBook, isEdit,
  } = useSelector((s) => s.booksReducer)

  return (
    <div
      className="container"
      role="button"
      tabIndex="-3"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(showHideForm('formUp'))
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          dispatch(showHideForm('formUp'))
        }
      }}
    >
      <Header formVisible={formVisible} books={books} />
      <Form formVisible={formVisible} books={books} activeBook={activeBook} isEdit={isEdit} />
      <div className="main-nav">
        <Nav books={books} activeBook={activeBook} />
        <Basket />
        <Main books={books} activeBook={activeBook} />
      </div>
    </div>
  )
}

export default App
