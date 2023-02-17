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
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isDimensions, setIsDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const [isShowPassword, setIsShowPassword] = useState(true);
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

  const handleSubmit = () => {
    const { email, password } = state;
    if (email === "" || password === "") {
      return;
    }
    setIsShowKeyboard(false);
    setState(initialState);
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg.jpg")}
          style={styles.imageBg}
        >
          <KeyboardAvoidingView
            keyboardVerticalOffset={-10}
            behavior={Platform.OS == "android" ? "height" : "padding"}
          >
            <View style={styles.formWrapper}>
              <Text style={styles.formTitle}>Войти</Text>

              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 144 : 144,
                  width: isDimensions,
                }}
              >
                <TextInput
                  value={state.email}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  style={{ ...styles.input, marginBottom: 16 }}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) => {
                    if (!value) {
                      return;
                    }
                    return setState((prevState) => ({
                      ...prevState,
                      email: value,
                    }));
                  }}
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
                  onChangeText={(value) => {
                    if (!value) {
                      return;
                    }
                    return setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }));
                  }}
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
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.activeText}>
                    Нет аккаунта? <Text>Зарегистрироваться</Text>
                  </Text>
                </TouchableOpacity>
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
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  formWrapper: {
    alignItems: "center",
    paddingTop: 32,
    height: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },
  form: {
    //
  },
  formTitle: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
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
    fontFamily: "Roboto-Regular",
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
