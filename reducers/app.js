import { ADD_BOOKS,CLEAR_BOOKS,SET_BOOKS } from '../constants/app';

const initialState = {
  books: []
}

export const app = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKS:
      return {books: state.books.concat(action.data)}
    case CLEAR_BOOKS:
      return {books: []}
    case SET_BOOKS:
      return {books: action.data}
    default:
      return state;
  }
}
