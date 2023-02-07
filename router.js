import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

import LoginScreen from "./Screens/authScreen/LoginScreen";
import RegistrationScreen from "./Screens/authScreen/RegistrationScreen";
import Home from "./Screens/mainScreen/Home";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

export default useRoute = (isAuth) => {
  const [login, setLogin] = useState(isAuth);
  if (!login) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: "ffffff",
            },
            headerTitleAlign: "center",
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              fontSize: 17,
              lineHeight: 22,
            },
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{ tabBarStyle: { paddingBottom: 24, height: 83 } }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <TouchableOpacity style={styles.activeButton}>
                <MaterialIcons name="grid-view" size={24} color="#ffffff" />
              </TouchableOpacity>
            ) : (
              <MaterialIcons name="grid-view" size={24} color={color} />
            ),
          title: "Публикации",
          tabBarActiveBackgroundColor: {
            backgroundColor: "ffffff",
          },
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setLogin(false)}
              style={styles.logOutButton}
            >
              <Image
                source={require("./assets/images/logoutIcon.png")}
                style={styles.logOutImageIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <TouchableOpacity style={styles.activeButton}>
                <Ionicons name="add-sharp" size={24} color="#ffffff" />
              </TouchableOpacity>
            ) : (
              <Ionicons name="add-sharp" size={24} color={color} />
            ),
          title: "Создать публикацию",
          tabBarActiveBackgroundColor: {
            backgroundColor: "ffffff",
          },
          headerTitleAlign: "center",
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
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <TouchableOpacity style={styles.activeButton}>
                <Feather name="user" size={24} color="#ffffff" />
              </TouchableOpacity>
            ) : (
              <Feather name="user" size={24} color={color} />
            ),
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  logOutButton: {
    position: "absolute",
    top: "25%",
    right: "10%",
    width: 24,
    height: 24,
    backgroundColor: "#ffffff",
  },
  logOutImageIcon: {
    color: "#BDBDBD",
  },
  activeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
