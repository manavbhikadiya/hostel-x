import { NavigationContainer } from "@react-navigation/native";
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
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BottomBar from "./BottomBar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import HostelScrollCardHome from "./HostelScrollCardHome";
import axios from "axios";
import { useSelector } from "react-redux";

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

const HomeScreen = ({ navigation }) => {
  const [hostel_data, setHostelData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const initialState = useSelector(state => state.loginReducer);
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

  const hostelData = () => {
    setIsLoading(true);
    axios
      .get("http://192.168.29.198:8000/hostels")
      .then((data) => {
        setHostelData(data.data);
        setIsLoading(false);
      })
      .catch(() => {
        Alert.alert(
          "Error occur",
          "Response timed out. Check your internet connection",
          [
            {
              text: "Cancel",
              onPress: () => {setIsLoading(false)},
              style: "cancel",
            },
            { text: "OK", onPress: () => {setIsLoading(false)} },
          ]
        );
      });
  };

  useEffect(() => {
    hostelData();
  }, []);



  return (
    <>
      <View style={styles.HomeScreenContainer}>
        <BottomBar anim={hideBottomBarAnim} />
        <ScrollView
          endFillColor="#fcfbfe"
          onScroll={hideBottomBar}
          overScrollMode="never"
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.menuIconContainer}
              onPress={() => navigation.openDrawer()}
            >
              <FontAwesomeIcon style={styles.menuIcon} icon={faBars} />
            </TouchableOpacity>
            <Animated.View style={styles.profile}>
              <Image
                style={styles.profileImage}
                source={require("../assets/profile_1.jpeg")}
              />
            </Animated.View>
          </View>
          <View style={styles.screenBody}>
            <View style={styles.screenBodyTop}>
              <View style={styles.titles}>
                <Text style={styles.greet}>Hi, {initialState.userData.name}</Text>
                <Text style={styles.screenHeading}>
                  Enjoy your Staying with us
                </Text>
              </View>
              <View style={styles.searchFilterContainer}>
                <View style={styles.searchBar}>
                  <FontAwesomeIcon style={styles.searchIcon} icon={faSearch} />
                  <Text
                    style={styles.searchText}
                    placeholder="Search"
                    keyboardType="numeric"
                  >
                    Search
                  </Text>
                </View>
                <View style={styles.filters}>
                  <FontAwesomeIcon style={styles.filterIcon} icon={faFilter} />
                </View>
              </View>
            </View>
            <View style={styles.hostelsListContainer}>
              {isLoading ? (
                <ActivityIndicator color="#ef5742" size={40} />
              ) : (
                <ScrollView
                  horizontal={true}
                  endFillColor="#fcfbfe"
                  indicatorStyle="black"
                  showsHorizontalScrollIndicator={false}
                  snapToAlignment="center"
                  overScrollMode="never"
                >
                  {hostel_data.map((val) =>
                    val.hostels.map((hostels, index) => (
                      <HostelScrollCardHome
                        key={index}
                        college_id={val._id}
                        hostel_id={hostels._id}
                        hostel_name={hostels.hostel_name}
                        location={val.location}
                        price={hostels.room_price}
                      />
                    ))
                  )}
                </ScrollView>
              )}
            </View>
            <View style={styles.nearBySectionContainer}>
              <View style={styles.NearByViewAll}>
                <Text style={styles.nearByText}>Nearby</Text>
                <Text style={styles.viewAllText}>View all </Text>
              </View>
              <View style={styles.nearbyCard}>
                <View style={styles.nearbyHostelImageContainer}>
                  <Image
                    style={styles.nearbyHostelImageContainer}
                    source={require("../assets/hostel_1.jpg")}
                  />
                </View>
                <View style={styles.nearBydescription}>
                  <Text style={styles.hostelName}>Roayal Ambarrukmo</Text>
                </View>
              </View>
              <View style={styles.nearbyCard}>
                <View style={styles.nearbyHostelImageContainer}>
                  <Image
                    style={styles.nearbyHostelImageContainer}
                    source={require("../assets/hostel_1.jpg")}
                  />
                </View>
                <View style={styles.nearBydescription}>
                  <Text style={styles.hostelName}>Roayal Ambarrukmo</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HomeScreenContainer: {
    flex: 1,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcfbfe",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  menuIconContainer: {
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
  profile: {
    backgroundColor: "#fff",
    width: "auto",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff8080",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
  },
  screenBody: {
    flex: 1,
  },
  screenBodyTop: {
    paddingHorizontal: 30,
  },
  titles: {
    marginTop: 25,
  },
  greet: {
    fontSize: normalize(17),
    fontStyle: "normal",
    color: "#232323",
  },
  screenHeading: {
    fontSize: normalize(21),
    fontStyle: "normal",
    color: "#232323",
    fontWeight: "bold",
  },
  searchFilterContainer: {
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  searchBar: {
    width: width - 130,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  searchIcon: {
    color: "#ef5742",
    marginTop: 1,
  },
  searchText: {
    width: wp(50),
    marginLeft: 12,
    borderWidth: 0,
    padding: 0,
    color: "#bfbfbf",
  },
  filters: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  filterIcon: {
    color: "#ef5742",
  },
  hostelsListContainer: {
    marginTop: 30,
    backgroundColor: "#fcfbfe",
  },
  hostelCard: {
    width: wp(50),
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  hostelImageContainer: {
    width: wp(47),
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  hostelImage: {
    width: wp(47),
    height: hp(20),
    borderRadius: 20,
  },
  heartContainer: {
    width: wp(8),
    height: wp(8),
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  heartIcon: {
    zIndex: 1,
  },
  hostelDescription: {
    marginTop: 10,
    width: "auto",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  hostelDescriptionText: {
    color: "#232323",
    fontWeight: "bold",
  },
  locationPriceContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
  },
  location: {
    flexDirection: "row",
  },
  locationImage: {
    color: "#ef5742",
  },
  locationText: {
    color: "#bfbfbf",
    marginLeft: 10,
  },
  price: {
    //   backgroundColor:"orange"
  },
  priceText: {
    marginLeft: 10,
    fontSize: normalize(14),
    fontWeight: "bold",
  },

  //Nearby section container
  nearBySectionContainer: {
    marginTop: 30,
    paddingHorizontal: 30,
    marginBottom: 100,
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
    width: wp(20),
    height: hp(10),
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
    fontSize: normalize(18),
    fontStyle: "normal",
    color: "#232323",
    fontWeight: "bold",
  },
});
