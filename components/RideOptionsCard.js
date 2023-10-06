import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import tailwind from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Motor-123",
    title: "Tootle Ride",
    price: 12,
    image: require("../assets/motor.png"),
  },
  {
    id: "Motor-523",
    title: "Delivery",
    price: 12,
    image: require("../assets/Delivery.png"),
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const traveTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <View style={tailwind`bg-white flex-grow`}>
      <TouchableOpacity
        style={tailwind`absolute top-3 left-5 p-3 rounded-full z-1`}
        onPress={() => navigation.navigate("Navigation Card")}
      >
        <Icon name="chevron-left" type="font-awesome" />
      </TouchableOpacity>
      <Text style={tailwind`text-center py-5 text-xl`}>
        Select a ride - {traveTimeInformation?.distance.text}
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, image, price }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tailwind` flex flex-row justify-between items-center px-10 ${
              id === selected?.id && "bg-sky-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={image}
            />
            <View style={tailwind`-ml-4`}>
              <Text style={tailwind`text-xl font-semibold`}>{title}</Text>
              <Text style={tailwind`text-gray-400`}>
                Travel time - {traveTimeInformation?.duration_in_traffic.text}
              </Text>
            </View>
            <Text style={tailwind`text-xl text-green-500 font-semibold`}>
              ₱{" "}
              {Math.round(
                (price * (traveTimeInformation?.distance.value - 2000)) / 1000 +
                  40
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tailwind`bg-blue-500 py-3 m-3 rounded-full ${
            !selected && "bg-gray-400"
          }`}
        >
          <Text style={tailwind`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
