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

const DrawerContent = ({ navigation }) => {
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
            Manav Bhikadiya
          </Text>
          <Text style={styles.caption}>@manavbhikadiya</Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            label="Home"
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem label="LogOut" onPress={() => logout()} />
        </Drawer.Section>
      </View>
    </View>
  );
};
export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 25,
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
  row: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginLeft: 0,
    marginTop: 15,
  },
  bottomDrawerSection: {
    bottom: 0,
    marginLeft: 0,
  },
  preferences: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  container: {
    flex: 1,
    backgroundColor: "#ffcc66",
  },
  slider: {
    height: 125,
    backgroundColor: "#ffcc66",
    borderBottomRightRadius: 70,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "#ffcc66",
    borderTopLeftRadius: 70,
    // justifyContent:"center",
    alignItems: "center",
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
