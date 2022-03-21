import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  PixelRatio,
  Platform,
  Dimensions,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width, height } = Dimensions.get("window");

const scale = width / 320;

const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const LoginScreen = ({ navigation }) => {
 
  const submitData = () => {
    AsyncStorage.setItem('token',"hello")
    .then(()=>{
      navigation.navigate('Home');
    })
    .catch((e)=>{
      navigation.navigate('Login');
    })
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subText}>Login to your account</Text>
          <View style={styles.loginFields}>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Password" />
            <TouchableOpacity onPress={submitData}>
              <Animated.View
                style={styles.loginButton}
              >
                <Text style={styles.signInText}>Sign in</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    backgroundColor: "#fff",
    width: wp(80),
    height: hp(50),
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16.0,

    elevation: 24,
  },
  welcomeText: {
    fontSize: normalize(23),
    fontWeight: "bold",
    color: "#006666",
    marginLeft: 12,
  },
  subText: {
    marginTop: 5,
    color: "#cccccc",
    fontSize: normalize(14),
    marginLeft: 12,
  },
  loginFields: {
    marginTop: 20,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: wp(65),
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    color: "#737373",
  },
  loginButton: {
    width: wp(60),
    height: hp(4.8),
    backgroundColor: "#006666",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    shadowColor: "#999999",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  signInText: {
    color: "#fff",
    fontSize: normalize(14.5),
    fontWeight: "bold",
  },
});
