import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import HostelDetailsScreen from "./HostelDetailScreen";
import LoginScreen from "./LoginScreen";
import FavouriteScreen from "./FavouriteScreen";
import MapScreen from "./MapScreen";
import SignUpScreen from "./SignUpScreen";
import ForgotPassword from "./ForgotPassword";
import Animated, { useSharedValue } from "react-native-reanimated";
import { useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";
import { useState } from "react";

const Stack = createNativeStackNavigator();
let ScreenStyle = {};

const Screens = (style) => {
  const isDrawerOpen = useDrawerStatus() === "open";
  const progress = useSharedValue(0);

  const borderRadius = Animated.interpolateNode(progress.value, {
    inputRange: [0, 1],
    outputRange: [0, 40],
  });
  const scale = Animated.interpolateNode(progress.value, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  ScreenStyle = { borderRadius, transform: [{ scale }] };

  //   if (isDrawerOpen) {
  //     const borderRadius = Animated.interpolateNode(1, {
  //       inputRange: [0, 1],
  //       outputRange: [0, 40],
  //     });
  //     const scale = Animated.interpolateNode(1, {
  //       inputRange: [0, 1],
  //       outputRange: [1, 0.8],
  //     });
  //     ScreenStyle = { borderRadius, transform: [{ scale }] };
  //   } else {
  //     const borderRadius = Animated.interpolateNode(0, {
  //       inputRange: [0, 1],
  //       outputRange: [0, 40],
  //     });
  //     const scale = Animated.interpolateNode(0, {
  //       inputRange: [0, 1],
  //       outputRange: [1, 0.8],
  //     });
  //     ScreenStyle = { borderRadius, transform: [{ scale }] };
  //   }

  return (
    <Animated.View
      style={[{ flex: 1, overflow: "hidden", elevation: 50 }, ScreenStyle]}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={HostelDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Animated.View>
  );
};
export default Screens;
