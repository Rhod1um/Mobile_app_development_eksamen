import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View, Button, Platform, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { log } from "react-native-reanimated";

export default function Map() {
    const [posts, setPosts] = useState([]);
    const router = useRouter(); 

    const API_URL = "https://expo-modal-tab-nav-default-rtdb.firebaseio.com/";

    
    useEffect(() => {
      async function getPosts() {
        const response = await fetch(`${API_URL}/posts.json`); // Fetch posts data from the specified API endpoint
        const dataObj = await response.json(); // Parse the response data into an object

        // Convert the data object into an array of posts with 'id' properties
        const postsArray = Object.keys(dataObj).map((key) => ({ id: key, ...dataObj[key] })); // from object to array

        // Sort the posts in descending order based on their 'createdAt' property
        postsArray.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy

        setPosts(postsArray); // Set the sorted posts in your application's state
      }

    }, []);

    function renderPost(item) {
      const post = item.item;
      return (
        <View style={styles.postContainer}>
          <Image style={styles.image} source={{ uri: post.image }} />
          <Text style={styles.caption}>{post.caption}</Text>
        </View>
      );
    }

    



    function showCreateModal() {
        router.push("/create");
    }
   return (
        <View style={styles.list}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Button
                            title="Add New"
                            color={Platform.OS === "ios" ? "#fff" : "#264c59"}
                            onPress={() => router.push("/post-modal")}
                        />
                    )
                }}
            />

            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={post => post.id}
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
