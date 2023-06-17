import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ArtistCard = ({ item }) => {
  return (
    <View style={{ marginRight: 0 }}>
      <Image
        source={{ uri: item.images[0].url }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 5,
        }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 13,
          fontWeight: "500",
          marginTop: 5,
        }}
      >
        {item.name}
      </Text>
    </View>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({});
