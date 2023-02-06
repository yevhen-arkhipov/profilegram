import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ImageBackground,
  Dimensions,
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
} from "react-native";

const postsList = [
  {
    id: "45k6-j54k-4jth",
    url: "https://img.freepik.com/free-photo/road-forest-covered-trees-sunlight-autumn_181624-57621.jpg?w=1380&t=st=1675716404~exp=1675717004~hmac=5621a26e7726e26f689b664df87c7313eec9ca48c99b3c9320cd8c95321045ba",
    text: "Photo",
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: "4116-jfk5-43rh",
    url: "https://img.freepik.com/free-photo/road-forest-covered-trees-sunlight-autumn_181624-57621.jpg?w=1380&t=st=1675716404~exp=1675717004~hmac=5621a26e7726e26f689b664df87c7313eec9ca48c99b3c9320cd8c95321045ba",
    text: "Photo",
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: "4d16-5tt5-4j55",
    url: "https://img.freepik.com/free-photo/road-forest-covered-trees-sunlight-autumn_181624-57621.jpg?w=1380&t=st=1675716404~exp=1675717004~hmac=5621a26e7726e26f689b664df87c7313eec9ca48c99b3c9320cd8c95321045ba",
    text: "Photo",
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: "LG16-ant5-0J25",
    url: "https://img.freepik.com/free-photo/road-forest-covered-trees-sunlight-autumn_181624-57621.jpg?w=1380&t=st=1675716404~exp=1675717004~hmac=5621a26e7726e26f689b664df87c7313eec9ca48c99b3c9320cd8c95321045ba",
    text: "Photo",
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
];

export default function Home() {
  const [posts, setPosts] = useState(postsList);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isDimensions, setIsDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setIsDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg.jpg")}
          style={styles.imageBg}
        >
          <KeyboardAvoidingView
            keyboardVerticalOffset={-108}
            behavior={Platform.OS == "android" ? "height" : "padding"}
          >
            <View style={styles.formWrapper}>
              <Text style={styles.formTitle}>THIS IS HOMEPAGE</Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 78 : 78,
                  width: isDimensions,
                }}
              >
                <FlatList
                  data={posts}
                  renderItem={({ item }) => (
                    <View>
                      {/* <Image source={item.url} style={styles.image} /> */}
                      <Text>{item.text}</Text>
                      <Text>{item.location}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                />
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
    justifyContent: "center",
    resizeMode: "cover",
  },
  formWrapper: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  form: {
    //
  },
  formTitle: {
    marginBottom: 33,
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  image: {
    // width: "100px",
    // height: "100px",
  },
});
