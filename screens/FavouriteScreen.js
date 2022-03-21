import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomBar from "./BottomBar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHomeLg,
  faHeart,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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

const FavouriteScreen = ({ navigation }) => {
  const hideBottomBarAnim = new Animated.Value(15);

  const hideBottomBar = (e) => {
    if (e.nativeEvent.contentOffset.y > 0) {
      Animated.timing(hideBottomBarAnim, {
        toValue: -100,
        duration: 800,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(hideBottomBarAnim, {
        toValue: 20,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  };

  const gotoDetail = () => {
    navigation.navigate("Details");
  };

  return (
    <>
      <View style={styles.HomeScreenContainer}>
        <BottomBar anim={hideBottomBarAnim} />
        <View style={styles.nearBySectionContainer}>
          <View style={styles.NearByViewAll}>
            <Text style={styles.nearByText}>Favourites</Text>
          </View>
          <ScrollView
            endFillColor="#fcfbfe"
            overScrollMode="never"
            onScroll={hideBottomBar}
            showsVerticalScrollIndicator={false}
          >
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
                  <Text style={styles.hostelName}>Roayal Ambarrukmo</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>$1890 / Year</Text>
                  </View>
                  <View style={styles.roomsAvailableContainer}>
                    <Text style={styles.roomsAvailableText}>
                      8 Rooms Available
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default FavouriteScreen;
const styles = StyleSheet.create({
  HomeScreenContainer: {
    flex: 1,
    backgroundColor: "#fcfbfe",
    paddingTop: 50,
  },
  //Nearby section container
  nearBySectionContainer: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  NearByViewAll: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nearByText: {
    fontSize: normalize(21),
    fontStyle: "normal",
    color: "#232323",
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#bfbfbf",
    fontSize: normalize(16),
    fontStyle: "normal",
  },
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
  heartIcon:{
    color:"#ff8080"
  }
});
