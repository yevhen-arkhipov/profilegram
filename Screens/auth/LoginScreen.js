import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  ImageBackground,
} from 'react-native';

import { authSignIn } from '../../redux/auth/authOperations';

const LoginScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pswdVisible, setPswdVisible] = useState(true);
  const dispatch = useDispatch();

  const onLoginHandle = () => {
    const credentials = { email, password };

    dispatch(authSignIn(credentials));

    setPassword('');
    setEmail('');
  };

  const pswdVisToggle = () => {
    setPswdVisible(!pswdVisible);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/photoBg.jpg')}
        style={styles.image}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginFormWrp}>
            <View
              style={{
                marginHorizontal: (width - 398) / 2,
              }}
            >
              <Text style={styles.loginHeader}>Войти</Text>
              <View
                style={{
                  paddingLeft: 16,
                  paddingVertical: 16,
                  paddingRight: 16,
                  backgroundColor: '#F6F6F6',
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: `#E8E8E8`,
                }}
              >
                <TextInput
                  style={styles.input}
                  value={email}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  onChangeText={setEmail}
                />
              </View>
              <View
                style={{
                  marginTop: 16,
                  paddingLeft: 16,
                  paddingVertical: 16,
                  paddingRight: 102,
                  backgroundColor: '#F6F6F6',
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: `#E8E8E8`,
                }}
              >
                <TextInput
                  style={styles.input}
                  value={password}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={pswdVisible}
                  onChangeText={setPassword}
                />
                {password && (
                  <TouchableOpacity
                    style={styles.pswdVisBtn}
                    onPress={pswdVisToggle}
                  >
                    <Text style={styles.pswdVisBtnText}>
                      {pswdVisible ? 'Показать' : 'Скрыть'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity style={styles.loginBtn} onPress={onLoginHandle}>
                <Text style={styles.btnText}>Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
              >
                <Text style={styles.registerText}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  loginFormWrp: {
    flex: 0.6,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 144,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  loginHeader: {
    marginBottom: 32,
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.01,
  },
  pswdVisBtn: {
    position: 'absolute',
    right: 16,
    top: 20,
  },
  pswdVisBtnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.01,
    color: '#1B4371',
  },
  loginBtn: {
    marginTop: 43,
    paddingVertical: 16,
    height: 51,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  btnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  registerText: {
    marginTop: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.01,
    textAlign: 'center',
    color: '#1B4371',
  },
});
