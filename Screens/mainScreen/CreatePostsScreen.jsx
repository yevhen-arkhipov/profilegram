import { View, Text, StyleSheet } from "react-native";

export default function CreatePostsScreen() {
  return (
    <View style={styles.formWrapper}>
      <Text style={styles.formTitle}>CreatePostsScreen</Text>
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
});
