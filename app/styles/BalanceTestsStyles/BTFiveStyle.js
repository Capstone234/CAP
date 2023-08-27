import {
  StyleSheet
} from "react-native";

const title = "#000000";
const text = "#fff";
const background = "#fff";
const buttons = "#ff3333";
export default StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: background,
    justifyContent: "center",
  },
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: buttons,
  },
  startCheckText: {
    color: text,
    fontWeight: "bold",
    fontSize: 20,
  },
  titleText: {
    color: title,
    fontSize: 30,
    position: "absolute",
    top: 60,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 24,
  },
  resultImg: {
    resizeMode: "contain",
    height: 24,
    width: 24,
  },
  rowContainer: {
    flexDirection: "row",
  },
  centerValueText: {
    textAlign: "center",
  },
  homeButton: {
    // consistent with "View History" button on Home screen, i.e long red button on bottom
    width: 300,
    height: 50,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#008000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 20,
    alignSelf: 'center',
  },
});
