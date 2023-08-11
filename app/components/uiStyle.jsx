import { StyleSheet } from 'react-native';

const title = '#000000';
const text = '#fff';
const background = '#fff';
const buttons = '#ff3333';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#000000',
    fontSize: 30,
    marginTop: 20,
    fontWeight: 'bold',
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
    // text for questions in the concussion check
    fontSize: 25,
    lineHeight: 25,
    letterSpacing: 0.3,
    marginHorizontal: 30,
    marginVertical: 20,
  },

  stackedText: {
    // text for long instructions
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.3,
    marginHorizontal: 30,
    marginVertical: 30,
  },

  bottomButton: {
    // consistent with "View History" button on Home screen, i.e long red button on bottom
    width: 300,
    height: 50,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ff3333',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonLabel: {
    // consistent with "View History" button on Home screen, i.e. white text in the button
    color: '#fff',
    fontSize: 18,
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
    backgroundColor: buttons,
    margin: 10,
  },
  startCheckText: {
    color: text,
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
});
