import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { activeBookID } from '../../redux/booksReducer'
import store from '../../redux/store'

const Nav = ({ books, activeBook }) => {
  const dispatch = useDispatch()
  const [activeStyle, setActiveStyle] = useState(activeBook)

  return (
    <section className="nav">
      {books.map((it) => (
        <div
          className={activeStyle !== it.id || activeBook === null ? 'nav-item' : 'nav-item active'}
          role="button"
          tabIndex="-1"
          key={it.id}
          onClick={(e) => {
            e.preventDefault()
            setActiveStyle(it.id)
            dispatch(activeBookID(it.id))
            setTimeout(() => {
              const localStore = store.getState()
              localStorage.setItem('localStore', JSON.stringify(localStore))
            }, 1000)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActiveStyle(it.id)
            }
          }}
        >
          <div className="card">
            <div>{it.id}</div>
            <div>
              <div>{it.author}</div>
              <div>{it.title}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Nav
