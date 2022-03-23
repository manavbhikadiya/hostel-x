import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import RootStackScreen from "./screens/RootStackScreen";
import MainScreen from "./screens/MainScreen";
import { Provider } from "react-redux";
import Store from "./screens/redux/store";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (token != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Provider store={Store}>
      <NavigationContainer>
        {isLoggedIn ? <MainScreen /> : <RootStackScreen />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
