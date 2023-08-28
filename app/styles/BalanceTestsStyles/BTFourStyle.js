import {
  StyleSheet,
  Dimensions
} from "react-native";

export default StyleSheet.create({
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#69C93C",
  },
  startCheckText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/15,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
});