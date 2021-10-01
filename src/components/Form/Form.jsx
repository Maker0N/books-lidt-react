import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  addBook, showHideForm, editBook,
} from '../../redux/booksReducer'
import store from '../../redux/store'

const Form = ({
  formVisible, books, activeBook, isEdit,
}) => {
  const dispatch = useDispatch()

  const [book, setBook] = useState({ id: null, author: '', title: '' })

  useEffect(() => {
    setBook({ ...book, id: activeBook })
  }, [activeBook])

  return (
    <div
      className={formVisible}
      role="button"
      tabIndex="-2"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(showHideForm('formDown'))
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          dispatch(showHideForm('formDown'))
        }
      }}
    >
      {isEdit
        ? `Редактирование книги ${activeBook}!`
        : `Будет присвоен номер по каталогу: ${books.length === 0 ? 1 : books[books.length - 1].id + 1}`}
      <span>Автор</span>
      <input
        id="autor"
        type="text"
        onChange={(e) => {
          setBook({ ...book, author: e.target.value })
        }}
      />
      <span>Название</span>
      <input
        id="title"
        type="text"
        onChange={(e) => {
          setBook({ ...book, title: e.target.value })
        }}
      />
      {isEdit
        ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              dispatch(editBook(book))
              dispatch(showHideForm('formUp'))
              setTimeout(() => {
                const localStore = store.getState()
                localStorage.setItem('localStore', JSON.stringify(localStore))
              }, 1000)
            }}
          >
            Редактировать
          </button>
        )
        : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (book.author !== '' && book.title !== '') {
                dispatch(addBook(book))
              }
              dispatch(showHideForm('formUp'))
              setTimeout(() => {
                const localStore = store.getState()
                localStorage.setItem('localStore', JSON.stringify(localStore))
              }, 1000)
            }}
          >
            Добавить
          </button>
        )}
    </div>
  )
}
export default Form
