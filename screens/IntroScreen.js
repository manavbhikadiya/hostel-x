import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");

const IntroScreen = ({ navigation }) => {
  const goHome = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <View style={styles.introView}>
        <Image source={require("../assets/4056364.jpg")} style={styles.image} />
        <Text style={styles.greet}>Good day,</Text>
        <Text style={styles.pageHeading}>
          Find the best place to stay for you.
        </Text>
        <TouchableOpacity style={styles.homeButton} onPress={() => goHome()}>
          <Text style={styles.buttonText}>Explore Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default IntroScreen;
const styles = StyleSheet.create({
  introView: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor:"#fff"
  },
  greet: {
    marginTop: 70,
    fontSize: 30,
    fontStyle: "normal",
    color: "#232323",
  },
  pageHeading: {
    marginTop: 15,
    fontSize: 33,
    fontStyle: "normal",
    color: "#232323",
    fontWeight: "bold",
  },
  homeButton: {
    marginTop: 20,
    width: 150,
    height: 40,
    backgroundColor: "#ff8080",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    width: width,
    height: height,
    opacity:0.5,
    marginTop:height/5
  },
});
