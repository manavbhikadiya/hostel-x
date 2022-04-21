import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import Screens from "./Screens";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const Drawer = createDrawerNavigator();

const RootStackScreen = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "slide",
        drawerStyle: {
          width: width / 1.6,
        },
        drawerContentContainerStyle: {
          flex: 1,
        },
        sceneContainerStyle: {
          backgroundColor: "#ffcc66",
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeDrawer" options={{ headerShown: false }}>
        {(props) => <Screens {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default RootStackScreen;
