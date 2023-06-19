import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const FooterSongPlayer = () => {
  const { bottomTabHeight, currentSong, progress, handlePlayPause, isPlaying } =
    useContext(PlayerContext);

  //* Müziğin sanatçı isimlerini birleştirme
  const artistNames = currentSong?.track?.artists
    .map((artist) => artist.name)
    .join(", ");

    useEffect(()=>{
      console.log("isPlaying", isPlaying)
    },[isPlaying])

  return (
    <View
      style={[
        styles.container,
        {
          bottom: bottomTabHeight + 0.5,
          position: "absolute",
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Image
          source={{
            uri: currentSong?.track?.album?.images[0].url,
          }}
          style={styles.image}
        />
        <View style={{ flexDirection: "column", maxWidth: "70%" }}>
          <Text
            numberOfLines={1}
            style={[styles.textBase, { fontWeight: "700" }]}
          >
            {currentSong?.track?.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.textBase, { fontWeight: "400" }]}
          >
            {artistNames}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Pressable style={{ padding: 8 }}>
          <Image
            source={require("../assets/icon/device.png")}
            style={{ height: 24, width: 24 }}
          />
        </Pressable>
        <Pressable onPress={handlePlayPause} style={{ padding: 8 }}>
          {isPlaying ? (
            <Ionicons name="pause" size={24} color="white" />
          ) : (
            <Entypo name="controller-play" size={24} color="white" />
          )}
        </Pressable>
      </View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "white",
          bottom: 0.5,
          height: 2,
          width: `${Math.min(progress * 100, 97)}%`,
          borderRadius: 2,
          marginLeft: "3%",
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "hsla(0,0%,100%,.3)",
          bottom: 0.5,
          height: 2,
          width: "97%",
          borderRadius: 2,
          marginLeft: "3%",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#12374f",
    width: "100%",
    height: 56,
    padding: 8,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
    width: width * 0.95,
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 4,
  },
  textBase: {
    color: "white",
    fontSize: 13,
  },
});

export default FooterSongPlayer;
