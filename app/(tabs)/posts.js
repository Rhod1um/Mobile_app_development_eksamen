import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import { useState } from "react";
import { log } from "react-native-reanimated";

export default function Posts() {
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

    

    



    function showCreateModal() {
        router.push("/create");
    }
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Button
                            title="Add New"
                            color={Platform.OS === "ios" ? "#fff" : "#264c59"}
                            onPress={showCreateModal}
                        />
                    )
                }}
            />
            <View style={styles.main}>
                <Text style={styles.title}>Posts</Text>
                <Text style={styles.subtitle}>This is the first page of your app.</Text>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24
    },
    main: {
        flex: 1,
        justifyContent: "center",
        maxWidth: 960,
        marginHorizontal: "auto"
    },
    title: {
        fontSize: 64,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 36,
        color: "#38434D"
    }
});
