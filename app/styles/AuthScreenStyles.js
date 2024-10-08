import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9AD3FF',
  },
  titleText: {
    color: '#003A67',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    width: '80%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#9AD3FF',
    elevation: 5,
  },
  button: {
    backgroundColor: '#003A67',
    padding: 15,
    width: '60%',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButtonText: {
    color: '#003A67',
    textDecorationLine: 'underline',
    marginTop: 20,
    fontSize: 16,
  },
});

export default styles;
