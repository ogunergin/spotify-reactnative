import { StatusBar } from "expo-status-bar";
import MainNavigator, { BottomTabs } from "./navigation/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "expo-dev-client";
import LoginScreen from "./screens/LoginScreen";
import { PlayerContextProvider } from "./context/PlayerContext";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const checkExpirationDate = async () => {
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      if (!expirationDate) return;
      const now = new Date();
      if (new Date(expirationDate) > now) {
        //* token süresi dolmamış.
        setIsAuth(true);
      } else {
        setIsAuth(false);
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("expirationDate");
      }
    };
    checkExpirationDate();
  }, []);
  return (
    <PlayerContextProvider>
      <NavigationContainer>
        {/* //* isAuth true ise MainNavigator açılır, false ise LoginScreen açılır. */}
         {isAuth ? <BottomTabs /> : <LoginScreen setIsAuth={setIsAuth} />} 
        {/* <BottomTabs /> */}
        <StatusBar style="light" />
      </NavigationContainer>
    </PlayerContextProvider>
  );
}
