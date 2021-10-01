const SHOW_HIDE_FORM = 'SHOW_HIDE_FORM'
const ADD_BOOK = 'ADD_BOOK'
const ACTIVE_BOOK_ID = 'ACTIVE_BOOK_ID'
const DELETE_BOOK = 'DELETE_BOOK'
const EDIT_BOOK = 'EDIT_BOOK'
const IS_EDIT = 'IS_EDIT'

const initialState = {
  books: [
    { id: 1, author: 'Jack London', title: 'White Fang' },
    { id: 2, author: 'Лю Цысинь', title: 'Задача трёх тел' },
  ],
  formVisible: 'formUp',
  activeBook: null,
  isEdit: false,
}

if (JSON.parse(localStorage.getItem('localStore')) === null) {
  localStorage.setItem('localStore', JSON.stringify(initialState))
}
const localState = JSON.parse(localStorage.getItem('localStore')).booksReducer

const booksReducer = (state = localState, action) => {
  switch (action.type) {
    case SHOW_HIDE_FORM:
      return { ...state, formVisible: action.payload }

    case ADD_BOOK:
      return {
        ...state,
        books: [
          ...state.books,
          {
            id: !state.books.length
              ? 1
              : state.books[state.books.length - 1].id + 1,
            author: action.payload.author,
            title: action.payload.title,
          },
        ],
      }

    case DELETE_BOOK:
      return {
        ...state,
        ...state,
        books: state.books.filter((it) => it.id !== action.payload),
      }

    case ACTIVE_BOOK_ID:
      return { ...state, activeBook: action.payload }

    case EDIT_BOOK:
      return {
        ...state,
        books: state.books.map((it) => (it.id === action.payload.id
          ? { ...it, author: action.payload.author, title: action.payload.title }
          : it)),
      }

    case IS_EDIT:
      return {
        ...state,
        isEdit: action.payload,
      }

    default:
      return state
  }
}

export function showHideForm(payload) {
  return { type: SHOW_HIDE_FORM, payload }
}

export function addBook(payload) {
  return { type: ADD_BOOK, payload }
}

export function activeBookID(payload) {
  return { type: ACTIVE_BOOK_ID, payload }
}

export function deleteBook(payload) {
  return { type: DELETE_BOOK, payload }
}

export function editBook(payload) {
  return { type: EDIT_BOOK, payload }
}

export function isEdit(payload) {
  return { type: IS_EDIT, payload }
}

export default booksReducer
