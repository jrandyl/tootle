import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavCard from "../components/NavCard";
import RideOptionsCard from "../components/RideOptionsCard";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View>
      <View style={tw` h-1/2`}>
        <Map />
      </View>
      <View style={tw` h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="Navigation Card"
            component={NavCard}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Ride Option Card"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
