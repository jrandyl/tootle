import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "1",
    title: "Get a ride",
    image: require("../assets/motor.png"),
    screens: "MapScreen",
  },
  {
    id: "2",
    title: "Delivery",
    image: require("../assets/Delivery.png"),
    screens: "",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      style={tw`mx-auto`}
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screens)}
          style={tw`px-6 pb-8 pt-4 bg-slate-100 m-2 w-40 rounded-3xl shadow-md`}
          disabled={!origin}
        >
          <View style={tw`${!origin ? "opacity-30" : ""}`}>
            <Image
              source={item.image}
              style={{ resizeMode: "contain", width: 100, height: 100 }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-blue-300 rounded-full w-10 mt-4`}
              type="antdesign"
              name="arrowright"
              color={"white"}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({});
