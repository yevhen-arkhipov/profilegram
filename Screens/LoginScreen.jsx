import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginScreen({
  state,
  setState,
  title,
  isShowKeyboard,
  setIsShowKeyboard,
  isDimensions,
  keyboardHide,
}) {
  const [isShowPassword, setIsShowPassword] = useState(true);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-32}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.formWrapper}>
        <Text style={styles.formTitle}>{title}</Text>
        <View
          style={{
            ...styles.form,
            marginBottom: isShowKeyboard ? 244 : 144,
            width: isDimensions,
          }}
        >
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
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    alignItems: "center",
    paddingTop: 32,
    height: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
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
