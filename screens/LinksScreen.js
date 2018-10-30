import React, { Component } from 'react';
import {View, FlatList, TouchableOpacity, Image, Linking} from 'react-native';
import styles from '../styles.js';

// Redux imports
import { connect } from 'react-redux';
import { watchBookShelfData } from '../redux/app-redux';

class LinksScreen extends Component {
  // this is the snapshot of the BookShelfData is loaded
  // my componentDidMount will now call the watchBookShelfData function
  // the watchBookShelfData will be dispatched to the middleware
  componentDidMount() {
    this.props.watchBookShelfData();
  }

  static navigationOptions = {
    title: 'Judge a Book By Its Cover',
  };

  // render function with the View and FlatList
  render() {
    return (
      <View style={styles.FlatListStyles}>
        <FlatList
          keyExtractor={(item) => item.isbn13}
          styles={styles.FlatListStyles}
          data={this.props.bookShelfData}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  // renderItem being encapsulated within its own component in order to
  // increase readability
  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => Linking.openURL(item.url)} underlayColor="grey"><Image
      source={{uri: item.image}} style={styles.FlatListImage}/></TouchableOpacity>
  );
}

// taking the state of bookShelf data and then connecting it to the local properties of
// this individual view.  Therefore taking the global state and making it a local
// state mapped to these properties
const mapStateToProps = (state) => {
  return {
    bookShelfData: state.bookShelfData
  };
};
// grabs the execution of watchBookShelfData function  and then dispatches it
// to the thunk middleware.
// maps the dispatch to the properties so it can be used here in the linksScreen
const mapDispatchToProps = (dispatch) => {
  return {
    watchBookShelfData: () => dispatch(watchBookShelfData())
  };
};
// this connect will connect all three of together (StateToProps, DispatchToProps, and LinksScreen)
export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen);
