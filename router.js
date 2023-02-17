import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet } from "react-native";

import LoginScreen from "./Screens/authScreens/LoginScreen";
import RegistrationScreen from "./Screens/authScreens/RegistrationScreen";
import Home from "./Screens/mainScreens/Home";
import CreatePostsScreen from "./Screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreens/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

export default useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
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
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { paddingBottom: 24, height: 83 },
      }}
    >
      <MainTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <TouchableOpacity style={styles.activeButton}>
                <MaterialIcons name="grid-view" size={24} color="#ffffff" />
              </TouchableOpacity>
            ) : (
              <MaterialIcons name="grid-view" size={24} color={color} />
            ),
          headerShown: false,
          tabBarLabel: "",
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
          tabBarLabel: "",
          tabBarHideOnKeyboard: true,
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
          tabBarLabel: "",
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
