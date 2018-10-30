import * as firebase from "firebase";
import {Alert} from "react-native";

// decided to separate this within Service layer rather than redux because
// we are not dispatching anything or updating state with it.  We are already
// monitoring the data within bookshelf in the watchBookShelfData action.
// This is business logic and does not need to be within the view.
function saveBook(item) {
  console.log("in saveBook");
  firebase.database().ref('books/' + item.isbn13).set ( {
    title: (item.title),
    isbn13: (item.isbn13),
    url: (item.url),
    image: (item.image)
  }).then(() => {
    console.log('Inserted');
    //this alert shows the user that their book was added to their book shelf
    Alert.alert(item.title + ' was added to your Book Shelf!');
  });
}

export { saveBook };