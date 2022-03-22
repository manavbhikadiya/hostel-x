import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import RootStackScreen from "./screens/RootStackScreen";
import MainScreen from "./screens/MainScreen";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (token != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainScreen /> : <RootStackScreen />}
    </NavigationContainer>
  );
};

export default App;
