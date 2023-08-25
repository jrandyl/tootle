import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

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
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
