import {
  StyleSheet,
  Dimensions
} from 'react-native';


export default StyleSheet.create({
  allCheckboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 1,
  },

  checkboxBase: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: '#C4C4C4',
  },

  checkboxLabel: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 14,
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
    marginBottom: (Dimensions.get('window').height)/10,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  }
});
