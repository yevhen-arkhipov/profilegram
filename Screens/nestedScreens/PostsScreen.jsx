import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const [isDimensions, setIsDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setIsDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const handleComments = () => navigation.navigate("CommentsScreen");

  const handleMap = () => navigation.navigate("Map");

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg.jpg")}
          style={styles.imageBg}
        >
          <View style={styles.sectionWrapper}>
            <View style={styles.userProfile}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={require("../../assets/images/userPhoto.png")}
                  style={styles.avatar}
                />
              </View>
              <View>
                <Text style={styles.userName}>Natali Romanova</Text>
                <Text style={styles.userEmal}>email@example.com</Text>
              </View>
            </View>
            <FlatList
              data={posts}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    ...styles.postWrapper,
                    width: isDimensions,
                  }}
                >
                  <Image
                    source={{ uri: item.photo }}
                    style={styles.postPhoto}
                  />
                  <View style={styles.descrWrapper}>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.titleText}>Island</Text>
                      <View style={styles.commentsWrapper}>
                        <TouchableOpacity onPress={handleComments}>
                          <Image
                            source={require("../../assets/images/commentsIcon.png")}
                            style={styles.commentsIcon}
                          />
                        </TouchableOpacity>
                        <Text style={styles.commentsText}>0</Text>
                      </View>
                    </View>
                    <View style={styles.locationWrapper}>
                      <Image
                        source={require("../../assets/images/pointIcon.png")}
                        style={styles.locationIcon}
                      />
                      <TouchableOpacity onPress={handleMap}>
                        <Text style={styles.locationText}>Kyiv</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </ImageBackground>
        <StatusBar />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBg: {
    flex: 1,
    resizeMode: "cover",
  },
  sectionWrapper: {
    paddingHorizontal: 16,
    height: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderTopColor: "#E8E8E8",
  },
  userProfile: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    marginRight: 8,
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmal: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "background: rgba(33, 33, 33, 0.8)",
  },
  postWrapper: {
    marginTop: 32,
    width: "100%",
    height: 299,
  },
  postPhoto: {
    marginBottom: 8,
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  descrWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  titleWrapper: {
    justifyContent: "space-between",
  },
  titleText: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsIcon: {
    marginRight: 6,
    color: "#BDBDBD",
  },
  commentsText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 4,
    color: "#BDBDBD",
  },
  locationText: {
    marginRight: 2,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
