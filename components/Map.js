import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "./mapStyle";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    let initialRegion;
    if (destination.location) {
      initialRegion = {
        latitude: (origin.location.lat + destination.location.lat) / 2,
        longitude: (origin.location.lng + destination.location.lng) / 2,
        latitudeDelta:
          Math.abs(origin.location.lat - destination.location.lat) + 0.01,
        longitudeDelta:
          Math.abs(origin.location.lng - destination.location.lng) + 0.01,
      };

      // Calculate edge padding based on the map view dimensions
      const edgePadding = {
        top: 200,
        right: 200,
        bottom: 200,
        left: 200,
      };

      // Animate to the calculated initial region with edge padding
      mapRef.current.fitToCoordinates(
        [
          { latitude: origin.location.lat, longitude: origin.location.lng },
          {
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          },
        ],
        {
          edgePadding,
          animated: true,
        }
      );
    } else {
      initialRegion = {
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
    }

    mapRef.current.animateToRegion(initialRegion, 1000); // Animate to the calculated initial region
  }, [origin, destination]);

  useEffect(() => {
    if (!origin && !destination) {
      return;
    }
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?departure_time=now&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_KEY}`;
      try {
        const response = await fetch(URL);
        const data = await response.json();
        const durationText = data.rows[0].elements[0].duration.text;
        const distanceValue = data.rows[0].elements[0].distance.value;
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        // console.log(data.rows[0].elements[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_KEY]);

  return (
    <MapView
      ref={mapRef}
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      style={tw`flex-1`}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="#48BBFF"
          strokeWidth={3}
          onError={(error) =>
            console.error("Error fetching directions:", error)
          }
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Starting Location"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Drop Location"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
