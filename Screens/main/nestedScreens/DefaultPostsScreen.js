import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { collection, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';

const DefaultPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { name, email, avatURL, userId } = useSelector(state => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await onSnapshot(collection(db, 'posts'), querySnapshot => {
      setPosts([]);

      querySnapshot.forEach(doc =>
        setPosts(prevState => [...prevState, { ...doc.data(), docId: doc.id }])
      );
    });
  };

  const renderPosts = ({ item }) => {
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
                      source={require('../../../assets/icon/messageDarkIcon.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/icon/messageIcon.png')}
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
                      source={require('../../../assets/icon/likeDarkIcon.png')}
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
                    <Image
                      source={require('../../../assets/icon/likeIcon.png')}
                    />
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
            <Image source={require('../../../assets/icon/mapIcon.png')} />
            <Text
              style={st.locText}
            >{`${item.location.region}, ${item.location.country}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={st.cont}>
      <View style={st.userCont}>
        <View style={st.photoCont}>
          {avatURL && (
            <Image
              style={{ width: '100%', height: '100%', borderRadius: 8 }}
              source={{ uri: avatURL }}
            ></Image>
          )}
        </View>
        <View>
          <Text style={st.userName}>{name}</Text>
          <Text style={st.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(item, idx) => idx.toString()}
      />
    </View>
  );
};

export default DefaultPostsScreen;

const st = StyleSheet.create({
  cont: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    borderColor: `#E8E8E8`,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  photoCont: {
    marginRight: 8,
    width: 60,
    height: 60,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  userCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: 'background: rgba(33, 33, 33, 0.8)',
  },
  postCont: {
    marginBottom: 32,
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
});
