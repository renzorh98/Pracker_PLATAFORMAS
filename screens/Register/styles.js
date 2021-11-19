import { Dimensions } from 'react-native';
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%"
  },
  contain: {
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  screen: {
    flex: 1
  },
  image: {
    width: Dimensions.get('window').height * 0.18,
    height: Dimensions.get('window').height * 0.9,
    flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    top: Dimensions.get('window').height * 0.3 - Dimensions.get('window').height * 0.576,
    alignSelf: 'center'
  },
  name: {
    marginTop: 20,
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 30
  },
  jobTitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  bg: {
    position: 'absolute',
    backgroundColor: "#F5F5F5",
    width: '100%',
    transform: [{ translateY: Dimensions.get('window').height / 3.8 }],
    borderRadius: 32,
    height: '100%'
  },
  bg2: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: "#F5F5F5",
    transform: [{ translateY: Dimensions.get('window').height }],
    borderRadius: 32
  },
  image2: {
    width: Dimensions.get('window').height * 0.8,
    height: '80%',
    flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
});
