import { useState } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/images/bg.jpg")}
        style={styles.imageBg}
      >
        <TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "margin" : "height"}
          >
            <View style={styles.formWrapper}>
              <Text style={styles.formTitle}>Войти</Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 32 : 144,
                }}
              >
                <TextInput
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  style={{ ...styles.input, marginBottom: 16 }}
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TextInput
                  secureTextEntry={isShowPassword}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  style={{
                    ...styles.input,
                    marginBottom: 43,
                    paddingRight: 102,
                  }}
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TouchableOpacity
                  onPressIn={() => setIsShowPassword(false)}
                  onPressOut={() => setIsShowPassword(true)}
                >
                  <Text style={styles.btnShowPassword}>Показать</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.button}
                  onPress={keyboardHide}
                >
                  <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.activeText}>
                    Нет аккаунта? <Text>Зарегистрироваться</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
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
    justifyContent: "flex-end",
  },
  formWrapper: {
    paddingTop: 32,
    height: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },
  form: {
    paddingHorizontal: 16,
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
    borderRadius: 8,
    borderColor: "#E8E8E8",
    // fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "none",
  },
  btnShowPassword: {
    position: "absolute",
    right: 17,
    top: -83,
    // fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 16,
    height: 51,
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
