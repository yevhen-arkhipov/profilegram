import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { authSignOut } from '../../redux/auth/authOperations';

import DefaultPostsScreen from './nestedScreens/DefaultPostsScreen';
import CommentsScreen from './nestedScreens/CommentsScreen';
import MapScreen from './nestedScreens/MapScreen';

import { AntDesign } from '@expo/vector-icons';

const PostsStack = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <PostsStack.Navigator
      initialRouteName="DefaultPosts"
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
      }}
    >
      <PostsStack.Screen
        name="DefaultPosts"
        component={DefaultPostsScreen}
        options={{
          title: 'Публикации',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => dispatch(authSignOut())}
              style={st.logOutButton}
            >
              <Image source={require('../../assets/icon/logOutIcon.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <PostsStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: 'Комментарии',
          headerLeft: () => (
            <AntDesign
              onPress={() => navigation.navigate('DefaultPosts')}
              name="arrowleft"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <PostsStack.Screen name="Map" component={MapScreen} />
    </PostsStack.Navigator>
  );
};

export default PostsScreen;

const st = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  logOutButton: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
  },
});
