import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import { useState, useEffect } from "react";
import { log } from "react-native-reanimated";
import MapView, { Marker } from "react-native-maps";

export default function Map() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const API_URL = "https://expo-modal-tab-nav-default-rtdb.firebaseio.com/";

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`${API_URL}/posts.json`); // Fetch posts data from the specified API endpoint
      const dataObj = await response.json(); // Parse the response data into an object

      // Convert the data object into an array of posts with 'id' properties
      const postsArray = Object.keys(dataObj).map((key) => ({
        id: key,
        ...dataObj[key],
      })); // from object to array

      // Sort the posts in descending order based on their 'createdAt' property
      postsArray.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy

      setPosts(postsArray); // Set the sorted posts in your application's state
    }
    getPosts();
  }, []);

  console.log(posts);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {posts.map((post) => (
          
          <Marker
            key={post.id}
            coordinate={post?.location}
            title={post.caption}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  postContainer: {
    flex: 1,
    minHeight: 320,
    paddingBottom: 30,
    borderBottomColor: "#acc6c9",
    borderBottomWidth: 0.5,
  },
  caption: {
    fontSize: 22,
    padding: 15,
  },
  image: {
    aspectRatio: 1,
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
