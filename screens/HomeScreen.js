import {
  ScrollView,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import { useNavigation } from "@react-navigation/native";


const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [recentlySongs, setRecentlySongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  const navigation = useNavigation();

  // const getRecentlyPlayedSongs = async () => {
  //   const token = await AsyncStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const response = await axios.get(
  //         "https://api.spotify.com/v1/me/player/recently-played",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const tracks = response.data.items;
  //       setRecentlySongs(tracks);
  //     } catch (error) {
  //       console.log("recently çekilemedi", error);
  //     }
  //   }
  // };

  // const getTopItems = async (type, setItem) => {
  //   const token = await AsyncStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const response = await axios.get(
  //         `https://api.spotify.com/v1/me/top/${type}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const data = response.data.items;
  //       setItem(data);
  //     } catch (error) {
  //       console.log(`${type} çekilemedi --`, error);
  //     }
  //   }
  // };

  const getData = async (url, setItem) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (url === "browse/featured-playlists") {
          setItem(response.data.playlists.items);
        } else {
          setItem(response.data.items);
        }
      } catch (error) {
        console.log(`${url} çekilemedi`, error);
      }
    }
  };

  useEffect(() => {
    // getRecentlyPlayedSongs(); //* kod temizliği

    getData("me/player/recently-played", setRecentlySongs);
    getData("me/top/artists", setTopArtists);
    getData("browse/featured-playlists", setFeaturedPlaylists);
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
      edges={["right", "left", "top"]} //* PaddingBottom 0 yapmak için
      style={{
        backgroundColor: colors.black,
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

        <View
          style={{
            marginTop: 25,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: width * 0.03,
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("Liked")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              flex: 1,
              marginVertical: 5,
              backgroundColor: colors.gray,
              borderRadius: 4,
              elevation: 3,
              maxWidth: width * 0.46,
            }}
          >
            <Image
              source={require("../assets/likedsongs.png")}
              style={{ width: 60, height: 60 }}
            />
            <Text style={{ color: "white", fontSize: 13, fontWeight: "600" }}>
              Beğeniler Şarkılar
            </Text>
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginVertical: 5,
              backgroundColor: colors.gray,
              borderRadius: 4,
              elevation: 3,
              maxWidth: width * 0.46,
            }}
          >
            <Image
              source={require("../assets/randomcoverimage.jpeg")}
              style={{ width: 60, height: 60 }}
            />
            <Text style={{ color: "white", fontSize: 13, fontWeight: "600" }}>
              Beğeniler şarkılar
            </Text>
          </Pressable>
        </View>
        <FlatList
          scrollEnabled={false} //* ScrollView ile flatlist kullanıldığında scrollEnabled={false} yapılmalı
          data={recentlySongs.slice(0, 4)}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: width * 0.03,
          }}
        />
        <View
          style={{ marginTop: 25, paddingHorizontal: width * 0.04, gap: 10 }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Önerilen Çalma Listeleri
          </Text>
          <ScrollView
            contentContainerStyle={{ gap: 12 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {featuredPlaylists.map((artist, index) => (
              <ArtistCard key={index} item={artist} />
            ))}
          </ScrollView>
        </View>
        <View
          style={{ marginTop: 25, paddingHorizontal: width * 0.04, gap: 10 }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            En Sevdiğin Sanatçılar
          </Text>
          <ScrollView
            contentContainerStyle={{ gap: 12 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {topArtists.map((artist, index) => (
              <ArtistCard key={index} item={artist} />
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            marginVertical: 25,
            paddingHorizontal: width * 0.04,
            gap: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            En Sevdiğin Sanatçılar
          </Text>
          <ScrollView
            contentContainerStyle={{ gap: 12 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {recentlySongs.map((artist, index) => (
              <RecentlyPlayedCard key={index} item={artist} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const renderItem = ({ item }) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
        marginVertical: 5,
        backgroundColor: colors.gray,
        borderRadius: 4,
        elevation: 3,
        maxWidth: width * 0.46,
      }}
    >
      <Image
        source={{ uri: item.track.album.images[0].url }}
        style={{ width: 60, height: 60 }}
      />
      <Text
        numberOfLines={1}
        style={{ color: "white", fontSize: 13, fontWeight: "600" }}
      >
        {item.track.name}
      </Text>
    </Pressable>
  );
};
