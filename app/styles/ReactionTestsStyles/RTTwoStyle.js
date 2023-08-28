import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  reactionButton: {
    width: 300,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
  },
  startButton: {
    backgroundColor: '#69C93C',
  },
  startText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 35,
  },
  waitButton: {
    backgroundColor: '#1788E0',
  },
  pressButton: {
    backgroundColor: '#FF9E0C',
  },

  screenContainer: {
    padding: 10,
  },
  btnView: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
