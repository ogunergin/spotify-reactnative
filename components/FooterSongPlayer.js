import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const FooterSongPlayer = () => {
  const { bottomTabHeight, currentSong } = useContext(PlayerContext);
  console.log(currentSong?.track?.album?.artists)
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
        <View style={{ flexDirection: "column" }}>
          <Text style={[styles.textBase, { fontWeight: "700" }]}>
            {currentSong?.track?.name}
          </Text>
          <Text style={[styles.textBase, { fontWeight: "400" }]}>
            Ali Kınık
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
        <Pressable style={{ padding: 8 }}>
          <Entypo name="controller-play" size={24} color="white" />
        </Pressable>
      </View>
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
    height: 45,
    width: 45,
    borderRadius: 4,
  },
  textBase: {
    color: "white",
    fontSize: 13,
  },
});

export default FooterSongPlayer;
