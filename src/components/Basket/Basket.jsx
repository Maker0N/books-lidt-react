import React from 'react'
import { useDispatch } from 'react-redux'
import { addBook } from '../../redux/booksReducer'
import store from '../../redux/store'

const Basket = () => {
  const dispatch = useDispatch()
  const deletedBook = JSON.parse(localStorage.getItem('deletedBooks'))
  if (deletedBook === null || deletedBook.length === 0) {
    return <div className="basket">Корзина пуста</div>
  }

  return (
    <div className="basket">
      Корзина
      {JSON.parse(localStorage.getItem('deletedBooks')).map((it) => (
        <div key={it.id}>
          <div>{it.id}</div>
          <div>{it.author}</div>
          <div>{it.title}</div>
          <div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                dispatch(addBook(it))
                localStorage.setItem(
                  'deletedBooks',
                  JSON.stringify(
                    JSON.parse(localStorage.getItem('deletedBooks')).filter((item) => (item.id === it.id ? null : item)),
                  ),
                )
                setTimeout(() => {
                  const localStore = store.getState()
                  localStorage.setItem('localStore', JSON.stringify(localStore))
                }, 1000)
              }}
            >
              ^
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                const deletedBooks = JSON.parse(localStorage.getItem('deletedBooks'))
                const newBasket = deletedBooks.filter((item) => item.id !== it.id)
                localStorage.setItem('deletedBooks', JSON.stringify(newBasket))
              }}
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Basket
