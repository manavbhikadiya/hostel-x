import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import HostelDetailsScreen from "./HostelDetailScreen";
import LoginScreen from "./LoginScreen";
import FavouriteScreen from './FavouriteScreen';
import MapScreen from "./MapScreen";

const Stack = createNativeStackNavigator();

const RootStackScreen = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={HostelDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default RootStackScreen;
