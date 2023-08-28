import {
  StyleSheet,
  Dimensions
} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  dropdown: {
    width: 100,
  },
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/20,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  }
});
