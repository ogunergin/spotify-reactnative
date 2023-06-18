import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SongCard from "../components/SongCard";
import { PlayerContext } from "../context/PlayerContext";
import { Audio } from "expo-av";

const { width } = Dimensions.get("window");

const LikedSongsScreen = () => {
  const navigation = useNavigation();

  const [likedSongs, setLikedSongs] = useState([]);

  const getLikedSongs = async () => {
    //  await AsyncStorage.removeItem("token");
    // await AsyncStorage.removeItem("expirationDate");
    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/tracks?offset=0&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLikedSongs(response.data.items);
      } catch (error) {
        console.log("liked songs çekilemedi", error);
      }
    }
  };

  useEffect(() => {
    getLikedSongs();
  }, []);

  const { currentSong, setCurrentSong,progress ,setProgress } =
    useContext(PlayerContext);
  const [currentSound, setCurrentSound] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const playTrack = async () => {
    if (likedSongs.length > 0) {
      setCurrentSong(likedSongs[0]);
    }
    await play(likedSongs[0]);
  };

  const play = async (song) => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
      });
      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: song?.track?.preview_url,
        },
        {
          shouldPlay: true,
          isLooping: false,
        },
        onPlayBackStatusUpdate
      );
      onPlayBackStatusUpdate(status);
      setCurrentSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("şarkı çalınamadı --", error);
    }
  };

  const onPlayBackStatusUpdate = async (status) => {
    if (status.isLoaded && status.isPlaying) {
      const calculatedProgress = status.positionMillis / status.durationMillis;
      setProgress(calculatedProgress);
      setCurrentTime(calculatedProgress.positionMillis);
      setTotalDuration(status.durationMillis);
    }
  };


  return (
    <LinearGradient colors={["#583582", "#1b3175"]} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          paddingHorizontal: width * 0.05,
          flex: 1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginTop: 10 }}
        >
          {/* Back Button */}
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={20} color="white" />
          </Pressable>

          {/* Search Section */}
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                backgroundColor: "#42275a",
                height: 40,
                paddingHorizontal: 8,
                flex: 1,
                borderRadius: 5,
              }}
            >
              <AntDesign name="search1" size={17} color="white" />
              <TextInput
                placeholder="Beğenilen şarkılarda bul"
                placeholderTextColor={"white"}
                style={{
                  fontWeight: "600",
                  fontSize: 13,
                  flex: 1,
                  textAlignVertical: "center",
                }}
              />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#42275a",
                height: 40,
                paddingHorizontal: 20,
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 13 }}>
                Sırala
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "column",
              gap: 8,
              marginTop: 23,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 23,
                fontWeight: "800",
              }}
            >
              Beğenilen Şarkılar
            </Text>
            <Text style={{ color: "white", opacity: 0.7 }}>141 şarkı</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Feather
                name="arrow-down-circle"
                size={24}
                color="white"
                style={{ opacity: 0.6 }}
              />
              <View
                style={{ flexDirection: "row", gap: 15, alignItems: "center" }}
              >
                <Image
                  source={require("../assets/icon/mix.png")}
                  style={{ opacity: 0.7, height: 28, width: 28 }}
                />
                <Pressable
                  onPress={playTrack}
                  style={{
                    backgroundColor: colors.green,
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Entypo name="controller-play" size={32} color="black" />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.gray,
                  width: 50,
                  height: 50,
                  borderRadius: 3,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="plus" size={27} color="white" />
              </View>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Şarkı Ekle
              </Text>
            </Pressable>
            {likedSongs.map((song, index) => (
              <SongCard key={index} item={song} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LikedSongsScreen;

const styles = StyleSheet.create({});
