import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import RecentRide from "../components/RecentRide";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5 mx-auto`}>
        <Image
          style={{
            width: 200,
            height: 100,
            resizeMode: "contain",
          }}
          source={require("../assets/TOOTLE.png")}
        />
      </View>

      <View style={tw`p-5`}>
        <GooglePlacesAutocomplete
          placeholder="Where From ?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          styles={{
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
          }}
          minLength={2}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: "en",
          }}
          fetchDetails
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
        />
        <NavOptions />
        <View style={[tw`bg-gray-200 my-4`, { height: 0.8 }]} />
        <Text style={tw`text-gray-400`}>Recent Rides</Text>
        <RecentRide style={tw`text-gray-200`} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
});
