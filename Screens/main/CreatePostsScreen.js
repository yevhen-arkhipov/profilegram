import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { uploadPhoto } from '../../firebase/storageUse';

const CreatePostsScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [errorMsg, setErrorMsg] = useState(null);
  const [locatPos, setLocatPos] = useState({});
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [postDescr, setPostDescr] = useState('');
  const [isShowCamera, setIsShowCamera] = useState(true);
  const { userId, name } = useSelector(state => state.auth);

  const isReadyToPubl = postDescr && photo;

  if (!permission?.granted) {
    requestPermission();
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();

    let { coords } = await Location.getCurrentPositionAsync();
    let place = await Location.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    let positionData = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      region: place[0].region,
      country: place[0].country,
    };

    setPhoto(photo.uri);
    setLocatPos(positionData);
    setIsShowCamera(true);
  };

  const onPublishHandle = async () => {
    const downloadURl = await uploadPhoto(photo, userId);
    const docRef = await addDoc(collection(db, 'posts'), {
      downloadURl,
      postDescription: postDescr,
      location: locatPos,
      userId,
      name,
      likes: [],
    });

    if (isReadyToPubl) {
      navigation.navigate('Posts', {
        screen: 'DefaultPosts',
      });
    }

    setPhoto(null);
    setLocatPos({});
    setPostDescr(null);

    return docRef;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={st.cont}>
        {isShowCamera ? (
          <View style={st.camera}>
            {photo && (
              <Image style={st.photoImg} source={{ uri: photo }}></Image>
            )}
            {photo ? null : (
              <TouchableOpacity
                onPress={() => setIsShowCamera(false)}
                style={st.btnCont}
              >
                <Image
                  source={require('../../assets/icon/cameraGreyIcon.png')}
                />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <Camera style={st.camera} ref={setCamera}>
            <TouchableOpacity
              onPress={() => {
                takePhoto();
              }}
              style={{
                ...st.btnCont,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <Image
                source={require('../../assets/icon/cameraWhiteIcon.png')}
              />
            </TouchableOpacity>
          </Camera>
        )}
        {photo ? (
          <Text style={st.cameraText}>Редактировать фото</Text>
        ) : (
          <Text style={st.cameraText}>Загрузите фото</Text>
        )}
        <TextInput
          style={st.postDescr}
          value={postDescr}
          onChangeText={setPostDescr}
          placeholder="Название..."
        />
        <View style={st.locatCont}>
          <Image source={require('../../assets/icon/mapIcon.png')} />
          <Text
            style={{
              ...st.locatText,
              color: locatPos.region ? '#212121' : '#BDBDBD',
            }}
          >
            {locatPos.region && locatPos.country
              ? `${locatPos.region}, ${locatPos.country}`
              : 'Местность...'}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            ...st.publBtn,
            backgroundColor: isReadyToPubl ? '#FF6C00' : '#F6F6F6',
          }}
        >
          <Text
            onPress={() => onPublishHandle()}
            style={{
              ...st.publBtnText,
              color: isReadyToPubl ? '#fff' : '#BDBDBD',
            }}
          >
            Опубликовать
          </Text>
        </TouchableOpacity>
        <View style={st.clearBtnCont}>
          <TouchableOpacity
            onPress={() => {
              setPhoto(null), setPostDescr(''), setLocatPos({});
            }}
            style={st.clearBtn}
          >
            <Image source={require('../../assets/icon/bucketIcon.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const st = StyleSheet.create({
  cont: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: `#E8E8E8`,
    backgroundColor: '#fff',
  },
  camera: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    width: '100%',
    height: 240,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
  },
  photoImg: {
    flex: 1,
    width: '100%',
  },
  btnCont: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  cameraText: {
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  postDescr: {
    marginTop: 32,
    paddingVertical: 16,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  locatCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  locatText: {
    marginLeft: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },
  publBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    height: 51,
    borderRadius: 100,
  },
  publBtnText: {
    ontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  clearBtnCont: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 42,
    marginBottom: 22,
  },
  clearBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f6f6f6',
  },
});
