import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.formWrapper}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.91341597862049,
          longitude: 24.68678269917184,
          latitudeDelta: 0.001,
          longitudeDelta: 0.009,
        }}
      >
        <Marker
          coordinate={{
            latitude: 48.91341597862049,
            longitude: 24.68678269917184,
          }}
          title="Your photo was taken here"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
  },
});
