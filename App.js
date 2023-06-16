import { StatusBar } from "expo-status-bar";
import MainNavigator from "./navigation/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "expo-dev-client";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const checkExpirationDate = async () => {
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      if (!expirationDate) return;
      const now = new Date();
      if (new Date(expirationDate) > now) {
        setIsAuth(true);
      }
    };
    checkExpirationDate();
  }, []);
  return (
    <NavigationContainer>
      {isAuth ? <MainNavigator /> : <LoginScreen setIsAuth={setIsAuth} />}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
