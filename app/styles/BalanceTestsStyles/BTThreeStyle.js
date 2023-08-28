import {
  StyleSheet,
} from "react-native";

const title = "#000000";
const text = "#fff";
const background = "#fff";
const buttons = "#ff0000";
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
});
