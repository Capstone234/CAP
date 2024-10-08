import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9AD3FF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#003A67',
  },
  signatureContainer: {
    width: '95%',
    height: 300,
    borderWidth: 1,
    borderColor: '#9AD3FF',
    backgroundColor: '#9AD3FF',
    borderRadius: 30,
    padding: 5,
    zIndex: 1,
  },
  signatureCanvas: {
    width: '100%',
    height: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#003A67',
    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButtonText: {
    marginTop: 20,
    color: '#003A67',
    textDecorationLine: 'underline',
  }
});

export default styles;