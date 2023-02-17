import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function ProfileScreen(isAuth) {
  return (
    <View style={styles.formWrapper}>
      <Text style={styles.formTitle}>ProfileScreen</Text>
      <TouchableOpacity
        // onPress={() => setLogin(false)}
        style={styles.logOutButton}
      >
        <Image
          source={require("../../assets/images/logoutIcon.png")}
          style={styles.logOutImageIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  formTitle: {
    marginBottom: 33,
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
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
