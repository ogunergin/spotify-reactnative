import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const SongCard = ({ item }) => {
  return (
    <Pressable style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: item?.track?.album?.images[0].url }}
          style={styles.image}
        />
        <View style={{ flexDirection: "column", maxWidth: width * 0.7 }}>
          <Text numberOfLines={1} style={styles.songName}>
            {item?.track?.name}
          </Text>
          <Text style={styles.albumName}>10 NUMARA</Text>
        </View>
      </View>
      <Pressable style={{ padding: 2 }}>
        <Entypo name="dots-three-horizontal" size={18} color="#a7a7a7" />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  songName: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  albumName: {
    color: "#a7a7a7",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default SongCard;
