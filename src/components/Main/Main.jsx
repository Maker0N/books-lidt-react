import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBook, showHideForm, isEdit } from '../../redux/booksReducer'
import store from '../../redux/store'

const Main = ({ books, activeBook }) => {
  const dispatch = useDispatch()

  const [book] = books.filter((it) => it.id === activeBook)

  if (activeBook === null) {
    return (
      <main className="main">
        <div>Выберите книгу</div>
      </main>
    )
  }

  if (books.length === 0) {
    return <main className="main">Каталог пуст</main>
  }

  if (typeof book === 'undefined') {
    return <main className="main">{`Книга ${activeBook} удалена!`}</main>
  }

  return (
    <main className="main">
      <div>Выбранная книга</div>
      <div>{`Номер по каталогу: ${activeBook}`}</div>
      <div>{`Автор: ${book.author}`}</div>
      <div>{`Название: ${book.title}`}</div>
      <div className="mainButtonsArea">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            dispatch(showHideForm('formDown'))
            dispatch(isEdit('true'))
            setTimeout(() => {
              const localStore = store.getState()
              localStorage.setItem('localStore', JSON.stringify(localStore))
            }, 1000)
          }}
        >
          Редактировать
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            dispatch(deleteBook(activeBook))
            if (JSON.parse(localStorage.getItem('deletedBooks')) === null) {
              localStorage.setItem('deletedBooks', JSON.stringify([book]))
            } else {
              localStorage.setItem('localFlash', JSON.stringify(true))
              setTimeout(() => {
                localStorage.setItem('localFlash', JSON.stringify(false))
              }, 1200)
              const deletedBooks = JSON.parse(localStorage.getItem('deletedBooks'))
              const deletedID = deletedBooks.map((it) => it.id)
                .reduce((acc, rec) => (rec > acc ? rec : acc), 0) + 1
              book.id = deletedID
              localStorage.setItem('deletedBooks', JSON.stringify([...deletedBooks, book]))
            }
            setTimeout(() => {
              const localStore = store.getState()
              localStorage.setItem('localStore', JSON.stringify(localStore))
            }, 1000)
          }}
        >
          Удалить
        </button>
      </div>
    </main>
  )
}

export default Main
