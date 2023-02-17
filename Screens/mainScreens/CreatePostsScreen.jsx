import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ImageBackground,
  Dimensions,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";

const initialState = {
  title: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isDimensions, setIsDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setIsDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    const { title, location } = state;
    if (title === "" || location === "") {
      return;
    }
    setIsShowKeyboard(false);
    setState(initialState);
    navigation.navigate("PostsScreen", { photo, state });
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    let location = await Location.getCurrentPositionAsync();
    // console.log("latitude", location.coords.latitude);
    // console.log("longitude", location.coords.longitude);

    setPhoto(photo.uri);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg.jpg")}
          style={styles.imageBg}
        >
          <KeyboardAvoidingView
            keyboardVerticalOffset={10}
            behavior={Platform.OS == "android" ? "height" : "padding"}
          >
            <View style={styles.sectionWrapper}>
              <View
                style={{
                  ...styles.cameraWrapper,
                  marginBottom: isShowKeyboard ? 144 : 144,
                  width: isDimensions,
                }}
              >
                <Camera style={styles.camera} ref={setCamera}>
                  {photo && (
                    <View style={styles.photoContainer}>
                      <Image
                        source={{ uri: photo }}
                        style={{ width: "100%", height: 200 }}
                      />
                    </View>
                  )}
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.cameraButton}
                    onPress={takePhoto}
                  >
                    <Image
                      source={require("../../assets/images/cameraIcon.png")}
                      style={styles.cameraButtonIcon}
                    />
                  </TouchableOpacity>
                </Camera>
                {photo ? (
                  <Text style={styles.modeText}>Редактировать фото</Text>
                ) : (
                  <Text style={styles.modeText}>Загрузите фото</Text>
                )}
                <TextInput
                  value={state.title}
                  placeholder="Название..."
                  placeholderTextColor="#BDBDBD"
                  style={{
                    ...styles.input,
                    marginBottom: 17,
                    fontFamily: "Roboto-Medium",
                  }}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => {
                    if (!value) {
                      return;
                    }
                    return setState((prevState) => ({
                      ...prevState,
                      title: value,
                    }));
                  }}
                />
                <TextInput
                  value={state.location}
                  placeholder="Местность..."
                  placeholderTextColor="#BDBDBD"
                  style={{ ...styles.input, marginBottom: 32, paddingLeft: 29 }}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => {
                    if (!value) {
                      return;
                    }
                    return setState((prevState) => ({
                      ...prevState,
                      location: value,
                    }));
                  }}
                />
                <Image
                  source={require("../../assets/images/pointIcon.png")}
                  style={styles.locationIcon}
                />
                {photo ? (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.submitButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Опубликовать</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      ...styles.submitButton,
                      backgroundColor: "#F6F6F6",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.buttonText,
                        color: "#BDBDBD",
                      }}
                    >
                      Опубликовать
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
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
    resizeMode: "cover",
  },
  sectionWrapper: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderTopColor: "#E8E8E8",
  },
  cameraWrapper: { paddingTop: 32 },
  camera: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  cameraButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "background: rgba(255, 255, 255, 0.3)",
    borderRadius: 100,
  },
  cameraButtonIcon: {
    color: "#000",
  },
  photoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderColor: "#fff",
    borderWidth: 1,
  },
  modeText: {
    marginTop: 8,
    marginBottom: 33,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationIcon: {
    position: "absolute",
    top: "82%",
    left: 0,
    color: "#BDBDBD",
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
