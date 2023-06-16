import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#040306",
        flex: 1,
      }}
    >
      <Text style={{ color: "white" }}>HomeScreens</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
