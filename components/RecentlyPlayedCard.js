import { Image, Text, View } from "react-native";
import React from "react";

const RecentlyPlayedCard = ({ item }) => {
  return (
    <View style={{ marginRight: 0 }}>
      <Image
        source={{ uri: item.track.album.images[0].url }}
        style={{
          width: 105,
          height: 105,
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
        {item.track.name}
      </Text>
    </View>
  );
};

export default RecentlyPlayedCard;
