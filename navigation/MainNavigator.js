import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import LikedSongsScreen from "../screens/LikedSongsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="white" />
            ) : (
              <AntDesign name="home" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="white" />
            ) : (
              <Ionicons name="person-outline" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Liked"
        component={LikedSongsScreen}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "black",
    shadowOpacity: 4,
    shadowRadius: 4,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    borderTopWidth: 0,
  },
});

export default MainNavigator;
