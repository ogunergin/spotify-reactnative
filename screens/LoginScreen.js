import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const LoginScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#040306",
        justifyContent:"flex-end",
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "column",marginBottom:25 }}>
        <Entypo
          name="spotify"
          size={50}
          color="white"
          style={{ textAlign: "center", marginTop: 80 }}
        />
        <Text style={[styles.sloganText, { marginTop: 10 }]}>
          Milyonlarca şarkı.
        </Text>
        <Text style={styles.sloganText}>Spotify'da ücretsiz.</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  sloganText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
});

// 040306
