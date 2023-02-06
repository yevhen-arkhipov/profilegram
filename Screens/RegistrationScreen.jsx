import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function RegistrationScreen({
  state,
  setState,
  title,
  isShowKeyboard,
  setIsShowKeyboard,
  isDimensions,
  keyboardHide,
}) {
  const [isShowPassword, setIsShowPassword] = useState(true);

  console.log("Hello");
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-108}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.formWrapper}>
        <View style={styles.avatarWrapper}>
          <TouchableOpacity activeOpacity={0.5} style={styles.addImageButton}>
            <Image
              source={require("../assets/images/unionIcon.png")}
              style={styles.addImageIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.formTitle}>{title}</Text>
        <View
          style={{
            ...styles.form,
            marginBottom: isShowKeyboard ? 178 : 78,
            width: isDimensions,
          }}
        >
          <TextInput
            value={state.login}
            placeholder="Логин"
            placeholderTextColor="#BDBDBD"
            style={{ ...styles.input, marginBottom: 16 }}
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, login: value }))
            }
          />
          <TextInput
            value={state.email}
            placeholder="Адрес электронной почты"
            placeholderTextColor="#BDBDBD"
            style={{ ...styles.input, marginBottom: 16 }}
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, email: value }))
            }
          />
          <TextInput
            value={state.password}
            secureTextEntry={isShowPassword}
            placeholder="Пароль"
            placeholderTextColor="#BDBDBD"
            style={{
              ...styles.input,
              marginBottom: 43,
              paddingRight: 102,
            }}
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, password: value }))
            }
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
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.activeText}>
              Уже есть аккаунт? <Text>Войти</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    alignItems: "center",
    paddingTop: 92,
    height: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },
  avatarWrapper: {
    position: "absolute",
    top: -60,
    left: "54%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    transform: [{ translateX: -Dimensions.get("window").width * 0.18 }],
  },
  addImageButton: {
    position: "absolute",
    top: "65%",
    right: "-9%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  addImageIcon: {
    color: "#FF6C00",
  },
  form: {
    // paddingHorizontal: 16,
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
  input: {
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  btnShowPassword: {
    position: "absolute",
    right: 17,
    top: -83,
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  activeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
