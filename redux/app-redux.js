import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';
import Book from '../Models/Book'
import {Alert} from "react-native";

//
// Initial States...
//
const initialState = {
  newBookData: [], bookShelfData: []
};

//
// Reducer...
//
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "setNewBookData":
      return { ...state, newBookData: action.value };
    case "setBookShelfData":
      return { ...state, bookShelfData: action.value };
    default:
      return state;
  }
};

//
// Store...
//
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

function parseBooksToArray(jsonBooks) {
  const returnArr = [];

  //foreach child within snapshot store the value within the variable item and the key as the key of the item for the array
  jsonBooks.forEach(function (jsonBook) {

    const book = new Book(jsonBook.title, jsonBook.isbn13, jsonBook.url, jsonBook.image);

    // adding the book to the returnarr
    returnArr.push(book);
  });

  //return the array which was a series of objects, but is now an array
  return returnArr;
}

//
// Actions...
//
const setNewBookData = (newBookData) => {
  return {
    type: "setNewBookData",
    value: newBookData
  };
};

const fetchNewBooks = () => {
  return function (dispatch) {
    fetch("https://api.itbook.store/1.0/new")
      .then((response) => response.json())
      .then((responseJson) => {
        const books = parseBooksToArray(responseJson.books);
        console.log(books);
        const actionSetNewBookData = setNewBookData(books);
        dispatch(actionSetNewBookData);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

// BOOKSHELF ACTION CREATORS
const setBookShelfData = (bookShelfData) => {
  return {
    type: "setBookShelfData",
    value: bookShelfData
  };
};

function snapshotToArray(snapshot) {
  const returnArr = [];

  //foreach child within snapshot store the value within the variable item and the key as the key of the item for the array
  snapshot.forEach(function (childSnapshot) {

    const item = childSnapshot.val();
    const book = new Book(item.title, item.isbn13, item.url, item.image);

    // adding the book to the returnarr
    returnArr.push(book);
  });

  //return the array which was a series of objects, but is now an array
  return returnArr;
}

const watchBookShelfData = () => {
  return function(dispatch) {
    firebase.database().ref("books").on("value", function(snapshot)
    {
      const bookShelfData = snapshotToArray(snapshot);
      const actionSetBookShelfData = setBookShelfData(bookShelfData);
      dispatch(actionSetBookShelfData);
    }, function(error) { console.log(error); });
  }
};

export { setBookShelfData, watchBookShelfData, setNewBookData, fetchNewBooks };