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
  Alert,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";
import { login } from "./redux/actions/index";

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

const SignUpScreen = ({ navigation }) => {
  const [username, setUserName] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEmail = (email) => {
    setEmail(email);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const handleuserName = (userName) => {
    setUserName(userName);
  };

  const handleMobile = (mobile) => {
    setMobile(mobile);
  };

  const submitData = () => {
    setIsLoading(true);
    axios
      .post(`https://hosteldashboards.herokuapp.com/user`, {
        name: username,
        email: email,
        password: password,
        mobile: mobile,
      })
      .then((res) => {
        if (res) {
          setTimeout(() => {
            dispatch(login(res.data));
            AsyncStorage.setItem("userToken", res.data._id)
              .then(() => {
                navigation.navigate("Home");
              })
              .catch(() => {
                navigation.navigate("Login");
              });
            setIsLoading(false);
          }, 3000);
        }
      })
      .catch(() => {
        Alert.alert(
          "Authenticaion Error",
          "Unable to login. Please try again later.",
          [
            {
              text: "Cancel",
              onPress: () => navigation.navigate("SignUp"),
              style: "cancel",
            },
            { text: "OK", onPress: () => navigation.navigate("SignUp") },
          ]
        );
        setIsLoading(false);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../assets/loginBack.jpg")}
          style={styles.image}
        />
        <Animatable.View style={styles.loginContainer} animation="flipInY">
          <Text style={styles.welcomeText}>Register Now</Text>
          <Text style={styles.subText}>Connect with us securely</Text>
          <View style={styles.loginFields}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={(val) => handleuserName(val)}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(val) => handleEmail(val)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile"
              onChangeText={(val) => handleMobile(val)}
              value={mobile}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(val) => handlePassword(val)}
              value={password}
            />
            <TouchableOpacity style={styles.LoginTextContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginText}>Already have an Account?</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitData}>
              {isLoading ? (
                <Animated.View style={styles.loginButton}>
                  <ActivityIndicator color="#fff" size={30} />
                </Animated.View>
              ) : (
                <Animated.View style={styles.loginButton}>
                  <Text style={styles.signInText}>Sign Up</Text>
                </Animated.View>
              )}
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </>
  );
};
export default SignUpScreen;

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
    height: hp(60),
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
    color: "#ef5742",
    marginLeft: 12,
    marginTop: 15,
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
    backgroundColor: "#ef5742",
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
    marginTop: 15,
  },
  signInText: {
    color: "#fff",
    fontSize: normalize(14.5),
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    width: width,
    height: height,
    height: height * 1.1,
    backgroundColor: "rgba(0,0,0,1)",
    opacity: 0.4,
  },
  LoginTextContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgotText: {
    color: "#000",
  },
  loginText: {
    color: "#ef5742",
    fontWeight: "bold",
  },
});
