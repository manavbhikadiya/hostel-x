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
import * as Animatable from "react-native-animatable";
import axios from "axios";
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

const LoginScreen = ({ navigation }) => {
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

  const submitData = () => {
    setIsLoading(true);
    axios
      .post(`https://hosteldashboards.herokuapp.com/user/loginUser/${email}`, { password: password })
      .then((res) => {
        if (res) {
          setTimeout(() => {
            AsyncStorage.setItem("userToken", res.data._id)
              .then(() => {
                dispatch(login(res.data));
                navigation.navigate("Home");
              })
              .catch(() => {
                navigation.navigate("Login");
              });
            setIsLoading(false);
            setPassword(null);
            setEmail(null);
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
              onPress: () => navigation.navigate("Login"),
              style: "cancel",
            },
            { text: "OK", onPress: () => navigation.navigate("Login") },
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
        <Animatable.View style={styles.loginContainer} animation="flipInX">
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subText}>Login to your account</Text>
          <View style={styles.loginFields}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(val) => handleEmail(val)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(val) => handlePassword(val)}
              value={password}
            />
            <TouchableOpacity style={styles.registerTextContainer}>
              <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.registerText}>Register Now</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitData}>
              {isLoading ? (
                <Animated.View style={styles.loginButton}>
                  <ActivityIndicator color="#fff" size={30} />
                </Animated.View>
              ) : (
                <Animated.View style={styles.loginButton}>
                  <Text style={styles.signInText}>Sign in</Text>
                </Animated.View>
              )}
            </TouchableOpacity>
          </View>
        </Animatable.View>
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
    marginTop: 50,
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
    height: height * 1.1,
    backgroundColor: "rgba(0,0,0,1)",
    opacity: 0.4,
  },
  registerTextContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgotText: {
    color: "#000",
  },
  registerText: {
    color: "#ef5742",
    fontWeight: "bold",
    marginLeft: 50,
  },
});
