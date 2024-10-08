import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#9AD3FF',
  },
  titleText: {
    fontSize: 25,
    color: '#003A67',
    fontSize: Dimensions.get('window').width/14,
    fontWeight: 'bold',
    textAlign:'center',
  },
  titleTextBox: {
      backgroundColor: '#fff',
      borderRadius: 30,
      width: Dimensions.get('window').width / 1.1,
      padding: 10,
      textAlign: 'center',
      marginTop: height * 0.14,
    },
    stackedText: {
        color: '#003A67',
        fontWeight: '600',
        fontSize: Dimensions.get('window').width/25,
        lineHeight: Dimensions.get('window').width/15,
        letterSpacing: 0.3,
        marginHorizontal: Dimensions.get('window').width/15,
        marginVertical: Dimensions.get('window').width/8,
        textAlign: 'center',
    },
    stackedTextBox: {
       backgroundColor: '#fff',
       borderRadius: 30,
       width: Dimensions.get('window').width/1.1,
       height: Dimensions.get('window').width/1,
       marginTop: 10,
       marginBottom: 10,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: Dimensions.get('window').width/4,
        alignItems: 'center',
    },
    buttonLabel: {
       color: '#fff',
       fontSize: Dimensions.get('window').width/20,
       fontWeight: 'bold',
       textAlign: 'center',
       textAlignVertical: 'center',
    },
    startBox: {
        borderWidth: 1,
        width: Dimensions.get('window').width / 1.6,
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#003A67',
    },
});

export default styles;


