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
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const LikedSongsScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={["#583582", "#1b3175"]} style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          paddingHorizontal: width * 0.05,
          flex: 1,
        }}
      >
        <ScrollView style={{ flex: 1, marginTop: 10 }}>
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
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LikedSongsScreen;

const styles = StyleSheet.create({});
