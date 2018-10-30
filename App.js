import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import firebase from "firebase";
import Provider from "react-redux/es/components/Provider";
import {store} from "./redux/app-redux";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  // Function that is run when the home screen is loaded
  componentDidMount() {

    // Firebase api details (connects to the specific Firebase instance)
    var config = {
      apiKey: "AIzaSyDGIS9pZndBP-YlQ9sENM-zkMWKXjbGffo",
      authDomain: "judgeabookbyitscover-76b16.firebaseapp.com",
      databaseURL: "https://judgeabookbyitscover-76b16.firebaseio.com",
      projectId: "judgeabookbyitscover-76b16",
      storageBucket: "judgeabookbyitscover-76b16.appspot.com",
      messagingSenderId: "500725517697"
    };
    firebase.initializeApp(config);
  }
  // App entry point
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      // If no longer loading return the Provider with the View inside
      return (
        // provides the connection between the middleware and the store
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
            <AppNavigator/>
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
