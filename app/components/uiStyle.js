import { StyleSheet, Dimensions } from 'react-native';

// This file is for the UI of the test & reports. 
// UI for disclaimer page, home page, account management are in their individual file
const background = '#9AD3FF';
const test_background = '#9AD3FF';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background
  },

  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    // Title text for all Tests
    color: '#003A67',
    fontSize: Dimensions.get('window').width/13,
    marginTop: Dimensions.get('window').width/8,
    fontWeight: 'bold',
  },

  container_tests: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: test_background,
  },

  textNoAbsolute: {
    // text for instructions in the concussion check
    fontSize: 25,
    lineHeight: 25,
    letterSpacing: 0.3,
    marginHorizontal: 50,
    marginVertical: 10,
  },

  text: {
    // text for tests
     // text for long instructions
    color: '#003A67',
    fontWeight: '700',
    fontSize: Dimensions.get('window').width/20,
    lineHeight: Dimensions.get('window').width/15,
    letterSpacing: 0.3,
    marginHorizontal: Dimensions.get('window').width/10,
    marginVertical: Dimensions.get('window').width/15,
    textAlign: 'center',
  },

  stackedText: {
    // text for long instructions
    color: '#003A67',
    fontWeight: '700',
    fontSize: Dimensions.get('window').width/25,
    lineHeight: Dimensions.get('window').width/15,
    letterSpacing: 0.3,
    marginHorizontal: Dimensions.get('window').width/15,
    marginVertical: Dimensions.get('window').width/8,
    textAlign: 'center',
  },

  bottomButton: {
    // Buttom buttons in all tests (except the introduction page - FurtherTestsScreen)
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/11,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  buttonLabel: {
    // Buttom buttons in all tests
    color: '#003A67',
    fontSize: Dimensions.get('window').width/20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#003A67',
    marginLeft: (Dimensions.get('window').width)/3.8
  },
  
  startCheckText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },

  // Container for main contents of a screen excluding bottom navigation button
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

  contentContainerCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Circle used in voms tests
  vomsCircle: {
    width: 20,
    height: 20,
    // fontSize: 14,
    borderRadius: 50,
    backgroundColor: '#ff3333',
    transform: [{ scaleY: 0.76 }, { scaleX: 0.67 }],
  },

  // Shadow effect for all test buttoms
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
