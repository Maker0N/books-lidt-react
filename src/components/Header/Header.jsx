import React from 'react'
import { useDispatch } from 'react-redux'
import { showHideForm, isEdit } from '../../redux/booksReducer'
import store from '../../redux/store'

const Header = ({ books }) => {
  const dispatch = useDispatch()

  return (
    <header className="header">
      <div>Книжный каталог</div>
      <div>{`Книг в каталоге: ${books.length} шт.`}</div>
      <div
        className="formArea"
        role="button"
        tabIndex="-1"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          dispatch(showHideForm('formDown'))
          dispatch(isEdit(false))
          setTimeout(() => {
            const localStore = store.getState()
            localStorage.setItem('localStore', JSON.stringify(localStore))
          }, 1000)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            dispatch(showHideForm('formDown'))
            dispatch(isEdit(false))
            setTimeout(() => {
              const localStore = store.getState()
              localStorage.setItem('localStore', JSON.stringify(localStore))
            }, 1000)
          }
        }}
      >
        Добавить книгу
      </div>
    </header>
  )
}

export default Header
