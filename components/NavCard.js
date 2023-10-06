import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import RecentRide from "./RecentRide";
import { Icon } from "react-native-elements";
import RideOptionsCard from "./RideOptionsCard";

const NavCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    // <SafeAreaView style={tailwind`bg-white flex-1`}>

    // </SafeAreaView>
    <View style={tailwind`bg-white flex-1`}>
      <Text style={tailwind`text-center py-5 text-xl`}>Hello there, User</Text>
      <View style={tailwind`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to ?"
            styles={styles}
            enablePoweredByContainer={false}
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            returnKeyType={"search"}
            fetchDetails
            query={{
              key: GOOGLE_MAPS_KEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("Ride Option Card");
            }}
          />
        </View>
        <RecentRide />
      </View>
      <View
        style={tailwind`flex-row bg-white justify-evenly py-2 mt-auto border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Ride Option Card")}
          style={tailwind`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="motorbike"
            type="material-community"
            color={"white"}
            size={22}
          />
          <Text style={tailwind`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind`flex flex-row justify-between w-24 px-4 py-3 rounded-full bg-white shadow-md`}
        >
          <Icon
            name="package-variant-closed"
            type="material-community"
            color={"black"}
            size={22}
          />
          <Text style={tailwind`text-center`}>Delivery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },

  textInput: {
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
});
