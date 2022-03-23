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
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import LikescreenCard from "./LikescreenCard";
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

const FavouriteScreen = ({ navigation }) => {
  const [hostel_data, setHostelData] = useState([]);
  const initialState = useSelector((state) => state.loginReducer);

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

  const getFavouriteHostel = () => {
    axios
      .get(
        `http://192.168.29.198:8000/getFavouritehostel/${initialState.userData._id}`
      )
      .then((data) => {
        setHostelData(data.data);
      })
      .catch(() => {
        console.log("Error occur");
      });
  };
  console.log("*************", hostel_data);
  useEffect(() => {
    getFavouriteHostel();
  }, []);

  return (
    <>
      <View style={styles.HomeScreenContainer}>
        <BottomBar anim={hideBottomBarAnim} />
        <View style={styles.nearBySectionContainer}>
          <View style={styles.NearByViewAll}>
            <Text style={styles.nearByText}>Favourites</Text>
          </View>
          {hostel_data.length != 0 ? (
            <ScrollView
              endFillColor="#fcfbfe"
              overScrollMode="never"
              onScroll={hideBottomBar}
              showsVerticalScrollIndicator={false}
            >
              {hostel_data.map((val) =>
                val.hostels.map((hostels, index) => (
                  <LikescreenCard
                    key={index}
                    college_id={val._id}
                    hostel_id={hostels._id}
                    hostel_name={hostels.hostel_name}
                    price={hostels.room_price}
                    rooms_available={hostels.rooms_available}
                  />
                ))
              )}
            </ScrollView>
          ) : (
            <View style={styles.nothingContainer}>
              <Image source={require("../assets/houseSearch.png")} style={styles.searchImage} />
              <TouchableOpacity style={styles.newSearchButton} onPress={()=>navigation.navigate('Home')} >
                <Text style={styles.newSearchText}>Start new search</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default FavouriteScreen;
const styles = StyleSheet.create({
  HomeScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
  nothingContainer: {
    height: height / 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  newSearchButton: {
    width: width / 2,
    height: 40,
    backgroundColor: "#ef5742",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop:8
  },
  newSearchText: {
    fontSize: normalize(14),
    fontWeight: "bold",
    color: "#fff",
  },
  searchImage:{
    width:150,
    height:100,
  }
});
