import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#9AD3FF'
  },
  sliders: {
    width: '80%',
  },

  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: '#003A67',
    fontWeight: '700',
    fontSize: Dimensions.get('window').width/20,
    marginHorizontal: Dimensions.get('window').width/500,
    marginVertical: Dimensions.get('window').width/15,
    textAlign: 'left',
  },
  bottomButton: {
    elevation: 3,
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height)/20,
    alignSelf: 'center',
  }
});