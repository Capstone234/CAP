import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
  generalButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: (Dimensions.get('window').height)/100,
    marginTop: (Dimensions.get('window').height)/100,
  },
  detailsView: {
    flexDirection: 'row',
  },
  detailsButton: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width/3,
    height: Dimensions.get('window').height/18,
    borderRadius: 30,
    elevation: 3,
    padding: 10
  },
  detailsText: {
    color: '#003A67',
  },
  titleText: {
    color: '#003A67',
    fontSize: 35,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitleText: {
      color: '#003A67',
      fontSize: 20,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: Dimensions.get('window').width/23,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  containerText: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/10,
    alignItems: 'center',
    marginTop: (Dimensions.get('window').height)/40
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: '#349BEB',
  },
  containerButton: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/10,
    alignItems: 'center',
    marginTop: (Dimensions.get('window').height)/50
  },
});