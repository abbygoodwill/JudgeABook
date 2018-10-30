import React, { Component } from 'react';
import {View, FlatList, TouchableOpacity, Image, Alert} from 'react-native';
import firebase from "firebase";
import styles from '../styles.js';

// Services imports
import { saveBook } from '../Services/firebaseServices.js';

// Redux imports
import { connect } from 'react-redux';
import { fetchNewBooks } from '../redux/app-redux';

class HomeScreen extends Component {
  // this is where the new books are loaded
  // my ComponentsDidMount will now call the fetchNewBooks that will be dispatched to
  // the middleware
  componentDidMount() {
    this.props.fetchNewBooks()
  };

  static navigationOptions = {
    title: 'Judge a Book By Its Cover',
  };

  // Called when a book is long pressed, writes to Firebase database
  _onLongPressButton(item) {
    saveBook(item);
    console.log('in LongPressButton function');
  };

  // render function with the View and FlatList
  render() {
    return (
      <View style={styles.FlatListStyles}>
        <FlatList
          keyExtractor={(item) => item.isbn13}
          styles={styles.FlatListStyles}
          data={this.props.newBookData}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  // renderItem is encapsulated within its own component for readability
  renderItem = ({item}) => (
    <TouchableOpacity onLongPress={() => this._onLongPressButton(item)} underlayColor="grey"><Image
      source={{uri: item.image}} style={styles.FlatListImage}/></TouchableOpacity>
  );
}

// state being mapped to property newBookData
// taking state and connecting it to the local properties of this view
// global var to local
const mapStateToProps = (state) => {
  return {
    newBookData: state.newBookData
  };
};

// maps the dispatch to the properties
// this dispatch hands the actual execution of the fetchNewBooks function to the thunk
// middleware
const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewBooks: () => dispatch(fetchNewBooks())
  };
};

// connects all three together (the mapStateToProps, mapDispatchToProps, and the HomeScreen)
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

