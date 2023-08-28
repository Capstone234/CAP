import {
  StyleSheet,
  Dimensions
} from "react-native";

export default StyleSheet.create({
  inputAreaContainer: {
    alignItems: 'center',
    backgroundColor: '#9AD3FF',
    marginBottom: (Dimensions.get('window').height),
    marginTop: (Dimensions.get('window').height)/45,
  },
  input: {
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').width / 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: (Dimensions.get('window').height) / 80,
    marginTop: (Dimensions.get('window').height) / 80,
    borderRadius: 20,
    padding: Dimensions.get('window').width / 50,
    backgroundColor: '#FFFFFF',
  },
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/3.5,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  }
});
