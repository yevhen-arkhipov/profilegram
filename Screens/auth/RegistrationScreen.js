import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Camera } from 'expo-camera';
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
  Image,
} from 'react-native';

import { authSignUp } from '../../redux/auth/authOperations';

const RegistrationScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { width } = useWindowDimensions();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pswdVisible, setPswdVisible] = useState(true);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isShowCamera, setIsShowCamera] = useState(false);
  const dispath = useDispatch();

  if (!permission?.granted) {
    requestPermission();
  }

  const takeAvatarPhoto = async () => {
    const photoShot = await camera.takePictureAsync();

    setPhoto(photoShot.uri);
  };

  const onLoginHandle = () => {
    const credentials = { name, email, password, photo };

    dispath(authSignUp(credentials));

    setName('');
    setEmail('');
    setPassword('');
    setPhoto(null);
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
                ...styles.imageCont,
                marginHorizontal: (width - 152) / 2,
              }}
            >
              {isShowCamera ? (
                <Camera
                  style={styles.camera}
                  ref={setCamera}
                  type={Camera.Constants.Type.front}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      await takeAvatarPhoto();
                      setIsShowCamera(false);
                    }}
                    style={{ ...styles.addPhotoBtn, borderColor: '#E8E8E8' }}
                  >
                    <Image
                      source={require('../../assets/icon/cameraGreyIcon.png')}
                    />
                  </TouchableOpacity>
                </Camera>
              ) : (
                <Image
                  style={{ width: '100%', height: '100%', borderRadius: 16 }}
                  source={{ uri: photo }}
                ></Image>
              )}
              {!isShowCamera && photo === null && (
                <TouchableOpacity
                  onPress={() => setIsShowCamera(true)}
                  style={styles.addPhotoBtn}
                >
                  <Image source={require('../../assets/icon/plusIcon.png')} />
                </TouchableOpacity>
              )}
              {photo && (
                <TouchableOpacity
                  onPress={() => setPhoto(null)}
                  style={{ ...styles.addPhotoBtn, borderColor: '#E8E8E8' }}
                >
                  <Image source={require('../../assets/icon/unionIcon.png')} />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.loginHeader}>Регистрация</Text>
            <View
              style={{
                marginTop: 32,
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
                value={name}
                placeholder="Логин"
                placeholderTextColor="#BDBDBD"
                onChangeText={setName}
              />
            </View>
            <View
              style={{
                marginTop: 16,
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
              <Text style={styles.btnText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerText}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default RegistrationScreen;

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
    flexShrink: 1,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imageCont: {
    position: 'absolute',
    top: -60,
    left: '5%',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  loginHeader: {
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
  addPhotoBtn: {
    position: 'absolute',
    top: '65%',
    right: '-9%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FF6C00',
  },
  camera: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});
