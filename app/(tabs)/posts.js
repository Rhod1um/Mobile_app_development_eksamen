import { Stack, useRouter, useFocusEffect } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  FlatList,
  Image,
} from "react-native";
import { useState, useEffect, useCallback } from "react"; //vi skal bruge state til at håndtere posts
import Post from "../components/post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const API_URL = "https://expo-modal-tab-nav-default-rtdb.firebaseio.com/";
  //const API_URL = "https://expo-modal-tab-nav-default-rtdb.firebaseio.com/";
  // https://expo-post-app-49c88-default-rtdb.europe-west1.firebasedatabase.app/
  //https://expo-post-app-49c88-default-rtdb.europe-west1.firebasedatabase.app/
  //https://post-rest-api-default-rtdb.firebaseio.com
  //const API_URL = "https://{your-firebase-db-name}.firebaseio.com";

  useEffect(() => {
    getPosts();
  }, []);
  // Sometimes we want to run side-effects when a screen is focused.
  // https://reactnavigation.org/docs/use-focus-effect/
  useFocusEffect(
    // If you don't wrap your effect in React.useCallback, the effect will run every render if the screen is focused.
    useCallback(() => {
      getPosts();
    }, [])
  ); // at hente posts sker ved mounting øverst og når brugeren interagere, nederst (useFocusEffect)

  async function getPosts() {
    const response = await fetch(`${API_URL}/posts.json`); // Fetch posts data from the specified API endpoint
    const dataObj = await response.json(); // Parse fra json til javascript objekt

    // Convert the data object into an array of posts with 'id' properties
    const postsArray = Object.keys(dataObj).map((key) => ({
      id: key,
      ...dataObj[key],
    })); // from object to array

    // Sort the posts in descending order based on their 'createdAt' property
    postsArray.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy

    setPosts(postsArray);
  }

  function showCreateModal() {
    router.push("/create");
  }

  function renderPost(item) {
    const post = item.item;
    return <Post post={post} reload={getPosts} />;
  }

  return (
    <View style={styles.list}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title="Add New"
              color={Platform.OS === "ios" ? "#fff" : "#264c59"}
              onPress={() => router.push("/create")}
            />
          ),
        }}
      />

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(post) => post.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
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
});
