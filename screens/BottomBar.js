import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  PixelRatio,
  Platform,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHomeLg,
  faHeart,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const { width, height } = Dimensions.get("window");

const BottomBar = (props) => {
  const [homeFocus, setHomeFocus] = useState("home");

  const navigation = useNavigation();

  const goHome = () => {
    setHomeFocus("home");
    navigation.navigate("Home");
  };
  const goFavourite = () => {
    setHomeFocus("fav");
    navigation.navigate("Favourite");
  };

  const goMap = () => {
    setHomeFocus("Map");
    navigation.navigate("Map");
  };

  if (props.anim) {
    return (
      <>
        <Animated.View
          style={[styles.bottomBarContainer, { bottom: props.anim }]}
        >
          <View style={styles.bottomBar}>
            <TouchableOpacity
              onPress={goHome}
              style={[styles.tabIcon, styles.focus]}
            >
              <FontAwesomeIcon style={styles.menuIcon} icon={faHomeLg} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goFavourite}
              style={[styles.tabIcon, styles.focus]}
            >
              <FontAwesomeIcon style={styles.menuIcon} icon={faHeart} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goMap}
              style={[styles.tabIcon, styles.focus]}
            >
              <FontAwesomeIcon style={styles.menuIcon} icon={faLocationDot} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goHome}
              style={[styles.tabIcon, styles.focus]}
            >
              <FontAwesomeIcon style={styles.menuIcon} icon={faUser} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </>
    );
  } else {
    return (
      <>
        <Animated.View style={[styles.bottomBarContainer, { bottom: 20 }]}>
          <View style={styles.bottomBar}>
            <TouchableOpacity onPress={goHome} style={styles.tabIcon}>
              <Text>H</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goFavourite} style={styles.tabIcon}>
              <Text>F</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goMap} style={styles.tabIcon}>
              <Text>H</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goHome} style={styles.tabIcon}>
              <Text>H</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </>
    );
  }
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomBarContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    // bottom: 20,
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  bottomBar: {
    width: wp(85),
    height: hp(7),
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#999999",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  tabIcon: {
    width: wp(10),
    height: hp(4.5),
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  // focus: {
  //   backgroundColor: "#ef5742",
  // },
  menuIcon: {
    color: "#ef5742",
  },
});
