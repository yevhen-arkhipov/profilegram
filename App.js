import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";

import LoginScreen from "./Screens/authScreen/LoginScreen";
import RegistrationScreen from "./Screens/authScreen/RegistrationScreen";
import Home from "./Screens/mainScreen/Home";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const customFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
};

export default function App() {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  useEffect(() => {
    _loadFontsAsync();
  }, [_loadFontsAsync]);

  const _loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setIsFontsLoaded(true);
  };

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <MainTab.Navigator initialRouteName="PostsScreen">
          {/* <MainTab.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              headerStyle: {
                backgroundColor: "ffffff",
              },
              headerTintColor: "#212121",
              headerTitleStyle: {
                fontFamily: "Roboto-Medium",
                fontSize: 17,
                lineHeight: 22,
              },
            }}
          /> */}
          <MainTab.Screen
            name="PostsScreen"
            component={PostsScreen}
            options={{
              title: "Публикации",
              headerStyle: {
                backgroundColor: "ffffff",
              },
              headerTintColor: "#212121",
              headerTitleStyle: {
                fontFamily: "Roboto-Medium",
                fontSize: 17,
                lineHeight: 22,
              },
            }}
          />
          <MainTab.Screen
            name="CreatePostsScreen"
            component={CreatePostsScreen}
            options={{
              title: "Создать публикацию",
              headerStyle: {
                backgroundColor: "ffffff",
              },
              headerTintColor: "#212121",
              headerTitleStyle: {
                fontFamily: "Roboto-Medium",
                fontSize: 17,
                lineHeight: 22,
              },
            }}
          />
          <MainTab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              headerShown: false,
            }}
          />
        </MainTab.Navigator>
      </NavigationContainer>
    </>
  );
}

// auth

// <AuthStack.Navigator initialRouteName="Login">
//   <AuthStack.Screen
//     name="Login"
//     component={LoginScreen}
//     options={{
//       headerShown: false,
//     }}
//   />
//   <AuthStack.Screen
//     name="Registration"
//     component={RegistrationScreen}
//     options={{
//       headerShown: false,
//     }}
//   />
// </AuthStack.Navigator>;
