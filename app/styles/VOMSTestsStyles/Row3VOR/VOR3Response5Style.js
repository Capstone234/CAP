import {
  StyleSheet,
  Dimensions
} from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sliders: {
    width: '80%',
  },

  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height)/15,
    alignSelf: 'center',
  }
});
