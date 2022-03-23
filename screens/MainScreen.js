import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import HostelDetailsScreen from "./HostelDetailScreen";
import LoginScreen from "./LoginScreen";
import FavouriteScreen from './FavouriteScreen';
import MapScreen from "./MapScreen";
import SignUpScreen from "./SignUpScreen";
import ForgotPassword from "./ForgotPassword";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

const RootStackScreen = () => {
  return (
    
      <Drawer.Navigator
      drawerContent={props=>(<DrawerContent {...props} />)}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
        name="Details"
        component={HostelDetailsScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      </Drawer.Navigator>
  );
};

export default RootStackScreen;
