import {StyleSheet} from "react-native";

export default StyleSheet.create({
  FlatListStyles: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: '#FEFBF6'
  },
  FlatListImage: {
    height: 350,
    width: 320,
    backgroundColor: '#FDF5E6',
    margin: 5,
    borderRadius: 3,
    borderColor: '#F4D6C8',
    padding: 0,
    borderWidth: 1,
    shadowColor: '#786B6D',

  },
});