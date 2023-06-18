import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";

const FooterSongPlayer = () => {
  const { bottomTabHeight } = useContext(PlayerContext);
  return (
    <View style={[styles.container,{
        bottom:bottomTabHeight+2
    }]}>
      <Text style={{ color: "white" }}>FooterSongPlayer {bottomTabHeight}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    position: "absolute",
    width: "100%",
    height: 100,
  },
});

export default FooterSongPlayer;
