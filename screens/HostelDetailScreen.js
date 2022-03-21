import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  PixelRatio,
  Platform,
  TouchableOpacity,
  Animated,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BottomBar from "./BottomBar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faHome,
  faUserGroup,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
// import {} from '@fortawesome/free-regular-svg-icons';

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

const HostelDetailScreen = ({ navigation }) => {
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

  return (
    <>
      <View style={styles.detailsScreenContainer}>
        <BottomBar anim={hideBottomBarAnim} />
        <ScrollView
          endFillColor="#fcfbfe"
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          onScroll={hideBottomBar}
        >
          <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButtoncontainer}>
            <FontAwesomeIcon
              style={styles.backIcon}
              icon={faAngleLeft}
              size={24}
            />
          </TouchableOpacity>
          <View style={styles.hostelImageContainer}>
            <View style={styles.hostelImage}>
              <ImageBackground
                style={styles.hImage}
                imageStyle={{ borderRadius: 20 }}
                source={require("../assets/hostel_1.jpg")}
              >
                <BlurView intensity={100} style={styles.hostelDescription}>
                  <Text style={styles.hostelName}>Dreams Luxury Suites</Text>
                  <Text style={styles.hostelLocation}>
                    Santorini Island, Greece
                  </Text>
                  <Text style={styles.price}>$1890/year</Text>
                  <View style={styles.heartContainer}>
                    <FontAwesomeIcon style={styles.heartIcon} icon={faHeart} />
                  </View>
                </BlurView>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.NearByViewAll}>
            <Text style={styles.nearByText}>About</Text>
          </View>
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </Text>
          </View>
          <View style={styles.NearByViewAll}>
            <Text style={styles.nearByText}>Description</Text>
          </View>
          <View style={styles.facilityMainContainer}>
            <View style={styles.facilityContainer}>
              <View style={styles.facilityIcon}>
                <FontAwesomeIcon style={styles.menuIcon} icon={faHome} />
              </View>
              <Text style={styles.facilityText}>8 Rooms available</Text>
            </View>
            <View style={styles.facilityContainer}>
              <View style={styles.facilityIcon}>
                <FontAwesomeIcon style={styles.menuIcon} icon={faUserGroup} />
              </View>
              <Text style={styles.facilityText}>Boy's Hostel</Text>
            </View>
          </View>
          <View style={styles.mapBookButtonContainer}>
            <TouchableOpacity style={styles.mapButton}>
              <Text style={styles.mapText}>View on Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BookButton}>
              <Text style={styles.bookText}>Book now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HostelDetailScreen;
const styles = StyleSheet.create({
  detailsScreenContainer: {
    flex: 1,
    // backgroundColor: "red",
    paddingTop: 50,
  },
  backButtoncontainer: {
    // backgroundColor:"red",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backIcon: {
    color: "#666666",
  },
  hostelImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  hostelImage: {
    width: wp(88),
    height: height - 350,
    borderRadius: 20,
  },
  hImage: {
    width: wp(88),
    height: height - 350,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  hostelDescription: {
    position: "absolute",
    width: wp(80),
    bottom: 20,
    borderRadius: 20,
    padding: 10,
  },
  hostelName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: normalize(23),
    marginTop: 10,
  },
  hostelLocation: {
    color: "#f2f2f2",
    fontSize: 14,
    marginTop: 20,
  },
  price: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
  },
  heartContainer: {
    width: wp(8),
    height: wp(8),
    borderRadius: 50,
    backgroundColor: "#ff8080",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  heartIcon: {
    color: "#fff",
  },
  NearByViewAll: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  nearByText: {
    fontSize: 23,
    fontStyle: "normal",
    color: "#232323",
    fontWeight: "bold",
  },
  aboutContainer: {
    marginTop: 10,
    paddingHorizontal: 30,
  },
  aboutText: {
    color: "#333333",
  },
  facilityMainContainer: {
    marginTop: 10,
    paddingHorizontal: 30,
  },
  facilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  facilityIcon: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  menuIcon: {
    color: "#ef5742",
  },
  facilityText: {
    marginLeft: 12,
    color: "#232323",
    fontWeight: "bold",
    fontSize: normalize(13),
  },

  mapBookButtonContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  mapButton: {
    backgroundColor: "#ef5742",
    width: wp(35),
    height: hp(5),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  mapText: {
    color: "#fff",
    fontSize: normalize(12),
    fontWeight: "bold",
  },
  BookButton: {
    backgroundColor: "#54b9c5",
    width: wp(35),
    height: hp(5),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  bookText: {
    color: "#fff",
    fontSize: normalize(12),
    fontWeight: "bold",
  },
});
