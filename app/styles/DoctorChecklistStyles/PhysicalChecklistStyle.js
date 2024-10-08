import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#9AD3FF',
  },
  title: {
    color: '#003A67',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  symptomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 5,
  },
  symptomText: {
    color: '#003A67',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  resetButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 18,
    color: '#003A67',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 80,
      left: 70,
      right: 70,
    },
  actionButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  backButton: {
      position: 'absolute',
      top: 25,
      left: 20,
      zIndex: 10,
    },
});

export default styles;
