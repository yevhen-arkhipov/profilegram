import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Camera } from 'expo-camera';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';

import {
  collection,
  setDoc,
  doc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import {
  changeAvatarPhotoURL,
  authSignOut,
} from '../../redux/auth/authOperations';

import GalleryBtn from '../../components/GalleryBtn';
import CurrentProfileBtn from '../../components/CurrentProfileBtn';
import CreateGrayBtn from '../../components/CreateGrayBtn';

const ProfileScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [userPosts, setUserPosts] = useState([]);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isShowCamera, setIsShowCamera] = useState(false);
  const { name, avatURL, userId } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  if (!permission?.granted) {
    requestPermission();
  }

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const q = await query(
      collection(db, 'posts'),
      where('userId', '==', userId)
    );
    onSnapshot(q, querySnapshot => {
      setUserPosts([]);
      querySnapshot.forEach(doc => {
        setUserPosts(prevState => [
          ...prevState,
          { ...doc.data(), docId: doc.id },
        ]);
      });
    });
  };

  const takeAvatarPhoto = async () => {
    const photoShot = await camera.takePictureAsync();
    dispatch(changeAvatarPhotoURL(photoShot.uri));

    setPhoto(photoShot.uri);
    setIsShowCamera(false);
  };

  const changeAvatPhotoHandle = photo => {
    dispatch(changeAvatarPhotoURL(photo));
  };

  const renderUserPosts = ({ item }) => {
    const addLike = async postId => {
      const currArr = (await item.likes) ? item.likes : [];
      const likesArr = [...currArr, userId];

      setDoc(
        doc(db, 'posts', item.docId),
        { likes: likesArr },
        { merge: true }
      );
    };

    const removeLike = async postId => {
      const likesArr = item.likes.filter(value => value !== userId);

      setDoc(
        doc(db, 'posts', item.docId),
        { likes: likesArr },
        { merge: true }
      );
    };

    return (
      <View style={st.postCont}>
        <Image style={st.postPhoto} source={{ uri: item.downloadURl }} />
        <Text style={st.postDescr}>{item.postDescription}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SafeAreaView>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Comments', {
                      imgUri: item.downloadURl,
                      postId: item.docId,
                    })
                  }
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 6,
                  }}
                >
                  {item.comments ? (
                    <Image
                      source={require('../../assets/icon/messageDarkIcon.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/icon/messageIcon.png')}
                    />
                  )}
                </TouchableOpacity>
                <Text style={st.commNumber}>{item.comments?.length || 0}</Text>
              </View>
            </SafeAreaView>
            <SafeAreaView>
              {item.likes?.some(value => value === userId) || false ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 24,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => removeLike(item.docId)}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 6,
                    }}
                  >
                    <Image
                      source={require('../../assets/icon/likeDarkIcon.png')}
                    />
                  </TouchableOpacity>
                  <Text style={st.commNumber}>{item.likes?.length}</Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 24,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => addLike(item.docId)}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 6,
                    }}
                  >
                    <Image source={require('../../assets/icon/likeIcon.png')} />
                  </TouchableOpacity>
                  <Text style={st.commNumber}>{item.likes?.length}</Text>
                </View>
              )}
            </SafeAreaView>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Map', {
                locat: {
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                },
                photoTitle: item.postDescription,
              })
            }
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Image source={require('../../assets/icon/mapIcon.png')} />
            <Text style={st.locText}>{`${item.location.country}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={st.cont}>
      <ImageBackground
        source={require('../../assets/images/photoBg.jpg')}
        style={st.image}
      >
        <View style={st.profileCont}>
          <View style={st.avatCont}>
            {isShowCamera && (
              <Camera
                style={st.camera}
                ref={setCamera}
                type={Camera.Constants.Type.front}
              >
                <TouchableOpacity
                  onPress={async () => {
                    await takeAvatarPhoto();
                    setIsShowCamera(false);
                  }}
                  style={{ ...st.addPhotoBtn, borderColor: '#E8E8E8' }}
                >
                  <Image
                    source={require('../../assets/icon/cameraGreyIcon.png')}
                  />
                </TouchableOpacity>
              </Camera>
            )}
            {avatURL && (
              <Image
                source={{ uri: avatURL }}
                style={{ width: '100%', height: '100%', borderRadius: 16 }}
              ></Image>
            )}
            {!isShowCamera && avatURL === null && (
              <TouchableOpacity
                onPress={() => setIsShowCamera(true)}
                style={st.addPhotoBtn}
              >
                <Image source={require('../../assets/icon/plusIcon.png')} />
              </TouchableOpacity>
            )}
            {avatURL && (
              <TouchableOpacity
                onPress={() => changeAvatPhotoHandle(null)}
                style={{ ...st.addPhotoBtn, borderColor: '#E8E8E8' }}
              >
                <Image source={require('../../assets/icon/unionIcon.png')} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => dispatch(authSignOut())}
            style={st.logOutButton}
          >
            <Image source={require('../../assets/icon/logOutIcon.png')} />
          </TouchableOpacity>
          <Text style={st.profileName}>{name}</Text>
          <FlatList
            data={userPosts}
            renderItem={renderUserPosts}
            keyExtractor={(item, idx) => idx.toString()}
          />
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 8,
          paddingBottom: 5,
          width: '100%',
          height: 83,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: `#E8E8E8`,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginLeft: 51 }}
          onPress={() => navigation.navigate('Posts')}
        >
          <GalleryBtn />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={{ marginLeft: 84 }}>
          <CurrentProfileBtn />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginLeft: 89 }}
          onPress={() => navigation.navigate('Create')}
        >
          <CreateGrayBtn />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const st = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: `#E8E8E8`,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  profileCont: {
    alignItems: 'center',
    flex: 1,
    marginTop: 147,
    paddingHorizontal: 16,
    paddingTop: 92,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatCont: {
    position: 'absolute',
    top: -60,
    left: '38%',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  profileName: {
    marginBottom: 33,
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: 'center',
    color: '#212121',
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
  logOutButton: {
    position: 'absolute',
    top: 24,
    right: 19,
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
  },
  postCont: {
    marginBottom: 32,
    width: 343,
    flex: 1,
  },
  postPhoto: {
    marginBottom: 8,
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  postDescr: {
    marginTop: 8,
    marginLeft: 5,
    marginBottom: 8,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 15,
    color: '#212121',
  },
  commNumber: {
    fontStyle: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 15,
    color: '#212121',
  },
  locText: {
    marginLeft: 3,
    fontStyle: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
    textDecorationColor: '#212121',
  },
  camera: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});
