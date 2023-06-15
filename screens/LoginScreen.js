import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#040306",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          marginBottom: 35,
        }}
      >
        <Entypo
          name="spotify"
          size={50}
          color="white"
          style={{ textAlign: "center", marginTop: 80 }}
        />
        <Text style={[styles.sloganText, { marginTop: 10 }]}>
          Milyonlarca şarkı.
        </Text>
        <Text style={[styles.sloganText, { marginBottom: 40 }]}>
          Spotify'da ücretsiz.
        </Text>
        <Pressable
          style={[styles.pressable, { backgroundColor: colors.green }]}
        >
          <Text style={[styles.pressableText, { color: "black" }]}>
            Ücretsiz Kaydol
          </Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Image
            source={require("../assets/icon/google.png")}
            style={styles.icon}
          />
          <Text style={styles.pressableText}>Google ile devam et</Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Image
            source={require("../assets/icon/facebook.png")}
            style={styles.icon}
          />
          <Text style={styles.pressableText}>Facebook ile devam et</Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Image
            source={require("../assets/icon/apple.png")}
            style={styles.icon}
          />
          <Text style={styles.pressableText}>Apple ile devam et</Text>
        </Pressable>
        <Pressable>
          <Text
            style={{
              color: "white",
              marginTop: 25,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Oturum aç
          </Text>
        </Pressable>
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
  icon: {
    width: 22,
    height: 22,
  },
  pressable: {
    marginTop: 11,
    width: width * 0.85,
    height: 45,
    paddingHorizontal: 13,
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
  },
  pressableText: {
    fontWeight: "600",
    fontSize: 15,
    color: "white",
    flex: 1,
    textAlign: "center",
  },
});
