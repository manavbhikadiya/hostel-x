import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faSignOut } from "@fortawesome/free-solid-svg-icons";

const DrawerContent = ({ props, navigation }) => {
  const initialState = useSelector((state) => state.loginReducer);

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View
        style={{ justifyContent: "center", alignItems: "center", marginTop: 0 }}
      >
        <Animatable.View style={styles.circle} animation="bounceIn">
          <Image
            style={styles.profileImage}
            source={require("../assets/profile_1.jpeg")}
          />
        </Animatable.View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={[styles.title, { marginRight: -10 }]}>
            {initialState.userData.name}
          </Text>
          <Text style={styles.caption}>{initialState.userData.email}</Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => <FontAwesomeIcon icon={faHome} />}
            label="Home"
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => <FontAwesomeIcon icon={faSignOut} />}
            label="LogOut"
            onPress={() => logout()}
          />
        </Drawer.Section>
      </View>
    </View>
  );
};
export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    marginTop: 0,
    fontWeight: "bold",
    color: "#3f3d56",
    marginRight: 10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  drawerSection: {
    marginLeft: 0,
    marginTop: 15,
  },
  bottomDrawerSection: {
    bottom: 0,
    marginLeft: 0,
  },
  circle: {
    width: 85,
    height: 85,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginTop: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
});
