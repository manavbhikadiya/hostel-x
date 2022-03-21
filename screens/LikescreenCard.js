import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import BottomBar from "./BottomBar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBars,
  faFilter,
  faSearch,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import HostelScrollCardHome from "./HostelScrollCardHome";
import axios from "axios";

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

const LikescreenCard = (props) => {
  const navigation = useNavigation();

  const gotoDetail = () => {
    navigation.navigate("Details", {
      college_id: props.college_id,
      hostel_id: props.hostel_id,
    });
  };

  return (
    <>
      <TouchableOpacity onPress={() => gotoDetail()}>
        <View style={styles.nearbyCard}>
          <View style={styles.heartContainer}>
            <FontAwesomeIcon style={styles.heartIcon} icon={faHeart} />
          </View>
          <View style={styles.nearbyHostelImageContainer}>
            <Image
              style={styles.nearbyHostelImageContainer}
              source={require("../assets/hostel_1.jpg")}
            />
          </View>
          <View style={styles.nearBydescription}>
            <Text style={styles.hostelName}>{props.hostel_name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>${props.price} / Year</Text>
            </View>
            <View style={styles.roomsAvailableContainer}>
              <Text style={styles.roomsAvailableText}>
                {props.rooms_available} Rooms Available
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default LikescreenCard;
const styles = StyleSheet.create({
  nearbyCard: {
    marginTop: 25,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 20,
  },
  nearbyHostelImageContainer: {
    width: wp(30),
    height: hp(15),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  nearbyHostelImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  nearBydescription: {
    width: wp(50),
    height: hp(10),
    padding: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  hostelName: {
    fontSize: normalize(16),
    fontStyle: "normal",
    color: "#242424",
    fontWeight: "bold",
  },
  priceContainer: {
    marginTop: 20,
  },
  priceText: {
    fontSize: normalize(14),
    fontWeight: "bold",
    color: "#737373",
  },
  roomsAvailableContainer: {
    marginTop: 10,
  },
  roomsAvailableText: {
    color: "#333333",
  },
  heartContainer: {
    width: wp(8),
    height: wp(8),
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  heartIcon: {
    color: "#ff8080",
  },
});
