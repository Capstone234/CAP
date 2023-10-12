import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
  allCheckboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    marginTop: 10,
    width: '95%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
    width: '95%',
    height: 100,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 20,
    marginTop: (Dimensions.get('window').height)/42
  },

  checkboxBase: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#003A67',
    backgroundColor: 'white',
    marginRight: 10,
    marginLeft: 10
  },

  checkboxChecked: {
    backgroundColor: '#003A67',
  },

  checkboxLabel: {
    marginLeft: 20,
    marginRight: 8,
    fontWeight: '500',
    fontSize: 17,
    flexWrap: 'wrap',
    color: '#003A67',
    fontWeight: 'bold',
    width: '70%'
  },
});
