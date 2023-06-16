import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.log("profil çekilemedi", error);
      }
    }
  };

  useEffect(() => {
    getProfile();
    console.log(profile);
  }, []);

  const greetingMessage = () => {
    const currentHour = new Date().getUTCHours();
    if (currentHour < 12) {
      return "Günaydın";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "İyi günler";
    } else {
      return "İyi akşamlar";
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#040306",
        flex: 1,
      }}
    >
      <ScrollView style={{ marginTop: 25 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: width * 0.055,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
            {greetingMessage()}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 25,
            }}
          >
            <Ionicons name="notifications-outline" size={25} color="white" />
            <Ionicons name="ios-time-outline" size={25} color="white" />
            <Feather name="settings" size={24} color="white" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
