// import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

import PostsScreen from "../nestedScreens/PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

export default function Home() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
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
              onPress={() => console.log("Logout")}
              style={styles.logOutButton}
            >
              <Image
                source={require("../../assets/images/logoutIcon.png")}
                style={styles.logOutImageIcon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
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
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
    </NestedScreen.Navigator>
  );
}

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
});
