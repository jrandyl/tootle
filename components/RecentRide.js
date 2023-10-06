import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const RecentRide = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const data = [
    {
      id: "123",
      orderType: "Ride",
      origin: "Home",
    },

    {
      id: "2323",
      orderType: "Ride",
      origin: "Work",
    },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      //   ItemSeparatorComponent={() => (
      //     <View style={[tailwind`bg-gray-200`, { height: 0.8 }]} />
      //   )}
      renderItem={({ item: { origin, orderType } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5 shadow-md border-gray-700 my-2 mx-2 rounded-xl bg-slate-100`}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-2`}
            name="clock-outline"
            type="material-community"
            color={"white"}
            size={22}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{orderType}</Text>
            <Text style={tw`text-gray-500`}>{origin}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default RecentRide;

const styles = StyleSheet.create({});
