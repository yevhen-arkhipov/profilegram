import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { modifyDate } from '../../../helpers/modifyDate';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';

const CommentsScreen = ({ route }) => {
  const [photoUri, setPhotoUri] = useState(null);
  const [commentInpValue, setCommentInpValue] = useState(null);
  const [commentsArr, setCommentsArr] = useState([]);
  const { userId, avatURL } = useSelector(state => state.auth);

  const { postId } = route.params;

  useEffect(() => {
    if (route.params.imgUri !== null) {
      setPhotoUri(route.params.imgUri);
    }

    getPostData();
  }, [route.params]);

  const getPostData = async () => {
    await onSnapshot(doc(db, 'posts', postId), doc =>
      setCommentsArr(doc.data().comments || [])
    );
  };

  const toMakePost = () => {
    if (commentInpValue) {
      const commentDate = new Date();
      const reqDate = modifyDate(commentDate);
      const comment = { text: commentInpValue, date: reqDate, userId, avatURL };

      setDoc(
        doc(db, 'posts', postId),
        { comments: [...commentsArr, comment] },
        { merge: true }
      );

      setCommentInpValue(null);
    }
  };

  const renderComments = ({ item }) => {
    return (
      <View
        style={userId === item.userId ? st.commentContCurrUsr : st.commentCont}
      >
        <View
          style={
            userId === item.userId ? st.commentAvtrCurrUsr : st.commentAvtr
          }
        >
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 14 }}
            resizeMode="cover"
            source={{ uri: item.avatURL }}
          ></Image>
        </View>
        <View
          style={
            userId === item.userId
              ? st.commentTextContCurrUser
              : st.commentTextCont
          }
        >
          <Text style={st.commentText}>{item.text}</Text>
          <Text
            style={
              userId === item.userId ? st.commentTimeCurrUsr : st.commentTime
            }
          >
            {item.date}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={st.cont}>
      <Image style={st.postPhoto} source={{ uri: photoUri }} />
      <FlatList
        style={{ marginBottom: 30 }}
        data={commentsArr}
        renderItem={renderComments}
        keyExtractor={(item, idx) => idx.toString()}
      />
      <View style={{ ...st.commInpCont, borderColor: '#E8E8E8' }}>
        <TextInput
          style={st.commInput}
          value={commentInpValue}
          onChangeText={setCommentInpValue}
          placeholder="Комментировать..."
        />
        <TouchableOpacity onPress={toMakePost} style={st.commInpBtn}>
          <Image source={require('../../../assets/icon/sendIcon.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsScreen;

const st = StyleSheet.create({
  cont: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: `#E8E8E8`,
    backgroundColor: '#fff',
  },
  postPhoto: {
    marginBottom: 32,
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  commentCont: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 'auto',
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  commentContCurrUsr: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  commentAvtr: {
    marginRight: 16,
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: '#E8E8E8',
  },
  commentAvtrCurrUsr: {
    marginLeft: 16,
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: '#E8E8E8',
  },
  commentTextCont: {
    flexGrow: 1,
    padding: 16,
    width: 52,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  commentTextContCurrUser: {
    flexGrow: 1,
    padding: 16,
    width: 52,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  commentText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
    marginBottom: 8,
  },
  commentTime: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    lineHeight: 12,
    color: '#bdbdbd',
    textAlign: 'right',
  },
  commentTimeCurrUsr: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    lineHeight: 12,
    color: '#bdbdbd',
    textAlign: 'left',
  },
  commInpCont: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingLeft: 16,
    paddingRight: 8,
    width: '100%',
    minHeight: 50,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: '#f6f6f6',
  },
  commInpBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#FF6C00',
  },
  commInput: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.01,
  },
});
