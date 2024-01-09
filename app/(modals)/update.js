import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  Text,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function Update() {
  const router = useRouter();
  const { id } = useSearchParams();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(
    "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
  );
  const API_URL = "https://expo-modal-tab-nav-default-rtdb.firebaseio.com";

  useEffect(() => {
    async function getPost() {
      const response = await fetch(`${API_URL}/posts/${id}.json`);
      const data = await response.json();
      setImage(data.image);
      setCaption(data.caption);
    }
    getPost();
  }, [id]);

  async function chooseImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      quality: 0.3,
    });

    if (!result.canceled) {
      const base64 = "data:image/jpeg;base64," + result.assets[0].base64;
      setImage(base64);
    }
  }

  async function handleUpdatePost() {
    const post = { image, caption };
    const json = JSON.stringify(post);
    const response = await fetch(`${API_URL}/posts/${id}.json`, {
      method: "PATCH",
      body: json,
    });
    if (response.ok) {
      router.back();
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Update post",
          headerRight: () => (
            <Button
              title="Sign Out"
              color={Platform.OS === "ios" ? "#fff" : "#264c59"}
            />
          ),
        }}
      />
      <View>
        <TouchableOpacity onPress={chooseImage}>
          <Image
            style={styles.image}
            source={{
              uri:
                image ||
                "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
            }}
          />
        </TouchableOpacity>
        <Text style={styles.label}>Caption</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCaption}
          value={caption}
          placeholder="Set caption"
          autoCapitalize="none"
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Update Post"
            color="#264c59"
            onPress={handleUpdatePost}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#acc6c9",
  },
  label: {
    fontSize: 25,
    color: "#264c59",
    marginTop: 30,
    marginBottom: 5,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginVertical: 10,
  },
  image: {
    aspectRatio: 1,
  },
  buttonContainer: {
    marginBottom: 50,
  },
});
