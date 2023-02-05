import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar />
      <ImageBackground
        source={require("./assets/images/bg.jpg")}
        style={styles.imageBg}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.formWrapper,
              paddingBottom: isShowKeyboard ? 144 : 32,
            }}
          >
            <Text style={styles.formTitle}>Войти</Text>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
              />
            </View>
            <View style={{ marginBottom: 43 }}>
              <TextInput
                secureTextEntry={true}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                style={styles.input}
                onFocus={() => setIsShowKeyboard(true)}
              />
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.button}>
              <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
            <Text style={styles.activeText}>
              Нет аккаунта? Зарегистрироваться
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formWrapper: {
    paddingTop: 32,
    paddingHorizontal: 16,
    // paddingBottom: 144,
    width: "100%",
    height: "auto",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formTitle: {
    marginBottom: 33,
    // fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    // fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "none",
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    // fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  activeText: {
    // fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
