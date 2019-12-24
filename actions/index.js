import { ADD_BOOKS,CLEAR_BOOKS,SET_BOOKS } from '../constants/app';

export function addBooks(jsonData) {
  return {
    type: ADD_BOOKS,
    data: jsonData
  };
}
export function clearBooks() {
  return {
    type: CLEAR_BOOKS,
    data: null
  };
}
export function setBooks(data) {
  return {
    type: SET_BOOKS,
    data: data
  };
}
