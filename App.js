import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import useRoute from "./router";

const customFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
};

export default function App() {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  const routing = useRoute(true);

  useEffect(() => {
    _loadFontsAsync();
  }, [_loadFontsAsync]);

  const _loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setIsFontsLoaded(true);
  };

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>{routing}</NavigationContainer>
    </>
  );
}
