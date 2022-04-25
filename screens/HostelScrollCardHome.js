import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
  Platform,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
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

const HostelScrollCardHome = (props) => {
  const navigation = useNavigation();
  const [heartColor,setHeartColor] = useState('#000');

  const goDetail = () => {
    navigation.navigate("Details", {
      college_id: props.college_id,
      hostel_id: props.hostel_id,
      college_name: props.college_name,
    });
  };

  const addFavourites = (hostelId) => {
    setIsLoading(true);
    axios
      .post(
        `https://hosteldashboards.herokuapp.com/user/addFavourite/626105b7d617fb1a97addd12/${hostelId}`
      )
      .then((res) => {
        setHeartColor('red');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <TouchableOpacity style={styles.hostelCard} onPress={() => goDetail()}>
        <View style={styles.hostelImageContainer}>
          <Image
            style={styles.hostelImage}
            source={{ uri: props.hostel_image }}
          />

          <View style={styles.heartContainer}>
            <TouchableOpacity onPress={()=>addFavourites(props.hostel_id)}>
              <FontAwesomeIcon icon={faHeart} color={heartColor}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.hostelDescription}>
          <Text style={styles.hostelDescriptionText}>{props.hostel_name}</Text>
          <View style={styles.locationPriceContainer}>
            <View style={styles.location}>
              <FontAwesomeIcon
                style={styles.locationImage}
                icon={faLocationDot}
              />
              <Text style={styles.locationText}>{props.location}</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceText}>{props.price}/year</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default HostelScrollCardHome;
const styles = StyleSheet.create({
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
});
