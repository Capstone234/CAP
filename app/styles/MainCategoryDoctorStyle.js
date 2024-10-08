import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9AD3FF',
  },
  button: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 30,
    borderRadius: 40,
    elevation: 5,
  },
  buttonText: {
    color: '#003A67',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextButton: {
    width: '50%',
    paddingVertical: 15,
    backgroundColor: '#696969',
    borderRadius: 80,
    alignItems: 'center',
    marginVertical: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#003A67',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  selectionText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#003A67',
  },
  badge: {
    position: 'absolute',
    top: -20,
    right: 20,
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default styles;


