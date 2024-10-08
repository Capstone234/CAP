import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#9AD3FF',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#003A67',
    textAlign: 'center',
  },
  centeredText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003A67',
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003A67',
  },
  symptomBox: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#003A67',
    borderWidth: 1,
  },
  symptomTextBox: {
    fontSize: 16,
    color: '#003A67',
    marginBottom: 5,
  },
  noSymptomText: {
    fontSize: 16,
    color: '#FF0000',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#003A67',
    marginBottom: 5,
    marginLeft: 10,
  },
  signatureContainer: {
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  signatureImage: {
    width: '100%',
    height: 80,
    borderColor: '#003A67',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#003A67',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#003A67',
    textDecorationLine: 'underline',
  },
});

export default styles;
