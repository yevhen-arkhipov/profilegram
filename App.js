import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  ImageBackground,
  StyleSheet,
} from "react-native";

const customFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
};

// import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";

const initialState = {
  email: "",
  password: "",
  login: "",
};

export default function App() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const [isDimensions, setIsDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const keyboardHide = () => {
    console.log(state);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  const _loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setIsFontsLoaded(true);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setIsDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    _loadFontsAsync();
  }, [_loadFontsAsync]);

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/images/bg.jpg")}
          style={styles.imageBg}
        >
          {/* <LoginScreen
            state={state}
            setState={setState}
            isShowKeyboard={isShowKeyboard}
            setIsShowKeyboard={setIsShowKeyboard}
            isDimensions={isDimensions}
            keyboardHide={keyboardHide}
          /> */}
          <RegistrationScreen
            state={state}
            setState={setState}
            isShowKeyboard={isShowKeyboard}
            setIsShowKeyboard={setIsShowKeyboard}
            isDimensions={isDimensions}
            keyboardHide={keyboardHide}
          />
        </ImageBackground>
        <StatusBar />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
});
