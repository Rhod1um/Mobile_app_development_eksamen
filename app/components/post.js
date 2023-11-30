import { useActionSheet } from "@expo/react-native-action-sheet";
import {Alert, Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Avatar from "./Avatar";
import { useRouter } from "expo-router";

export default function Post({ post, reload }) {
    const API_URL = "https://expo-modal-tab-nav-default-rtdb.firebaseio.com";
    const {showActionSheetWithOptions} = useActionSheet();
    const router = useRouter();

    function showEditMenu(){
        const options = ["Update Post", "Delete Post", "Cancel" ];
        const destructiveButtonIndex = 1;
        const cancelButton = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButton,
                destructiveButtonIndex,
                title: "Edit Post"
            },
            selectedIndex => {
                if (selectedIndex === 0) {
                    showUpdateModal();
                } else if (selectedIndex === destructiveButtonIndex) {
                    showDeleteDialog();
                }

            }
        );
    }
        function showUpdateModal(){
            router.push({
            pathname: "/update",
            params: {id: post.id}
        });
    }
    function showDeleteDialog() {
        Alert.alert("Delete Post", `Do you want to delete post '${post.caption}'?`, [
            {
                text: "No",
                style: "destructive"
            },
            {text: "Yes", onPress: deletePost}
        ]);
    }

    async function deletePost(){
        const response = await fetch(`${API_URL}/posts/${post.id}.json`, {method: "DELETE"});
        if (response.ok){
            reload();
        }
    }
    
    

  return (
    <View style={styles.postContainer}>
        <View style={styles.headerContainer}>
            <Avatar userId={post.uid} />
            <TouchableOpacity style={styles.dots} onPress={showEditMenu}>
                <Ionicons name="ellipsis-horizontal" size={28} color="#264c59" />
            </TouchableOpacity>
        </View>
      <Image style={styles.image} source={{ uri: post.image }} />
      <Text style={styles.caption}>{post.caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    minHeight: 320,
    paddingBottom: 30,
    borderBottomColor: "#acc6c9",
    borderBottomWidth: 0.5,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  caption: {
    fontSize: 22,
    padding: 15,
  },
  image: {
    aspectRatio: 1,
    flex: 1,
  },
  dots: {
    position: "absolute",
    right: 10,
  },
});

