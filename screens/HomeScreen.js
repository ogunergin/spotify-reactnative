import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";
import axios from "axios";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [recentlySongs, setRecentlySongs] = useState([]);

  const getRecentlyPlayedSongs = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const response = await axios({
          method: "GET",
          url: "https://api.spotify.com/v1/me/player/recently-played?limit=4",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const tracks=response.data.items;
         setRecentlySongs(tracks);
      } catch (error) {
        console.log("recently çekilemedi", error);
      }
    }
  };

  useEffect(() => {
    getRecentlyPlayedSongs();
    console.log(recentlySongs);
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

        <View
          style={{
            marginTop: 20,
            paddingLeft: width * 0.06,
            flexDirection: "row",
            gap: 12,
          }}
        >
          <Pressable
            style={{
              backgroundColor: colors.gray,
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 30,
            }}
          >
            <Text style={{ color: "white" }}>Müzik</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: colors.gray,
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 30,
            }}
          >
            <Text style={{ color: "white" }}>Podcast'ler ve Programlar</Text>
          </Pressable>
        </View>

            


      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
