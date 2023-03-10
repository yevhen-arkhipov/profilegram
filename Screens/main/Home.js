import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GalleryBtn from '../../components/GalleryBtn';
import CreateBtn from '../../components/CreateBtn';
import ProfileBtn from '../../components/ProfileBtn';
import CreatePostsScreen from './CreatePostsScreen';
import PostsScreen from './PostsScreen';
import ProfileScreen from './ProfileScreen';

import { AntDesign } from '@expo/vector-icons';

const MainTab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
  const navToPosts = () => {
    navigation.navigate('Posts');
  };

  return (
    <MainTab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        tabBarShowLabel: false,
        tabBarStyle: { height: 83 },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: () => <GalleryBtn />,
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Comments') {
              return { display: 'none' };
            }
            return { height: 83 };
          })(route),
        })}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerShown: true,
          title: 'Создать публикацию',
          headerLeft: () => (
            <AntDesign
              onPress={navToPosts}
              name="arrowleft"
              size={24}
              color="black"
            />
          ),
          tabBarIcon: () => <CreateBtn />,
          tabBarStyle: { display: 'none' },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <ProfileBtn />,
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Profile') {
              return { display: 'none' };
            }
            return { height: 83 };
          })(route),
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;
