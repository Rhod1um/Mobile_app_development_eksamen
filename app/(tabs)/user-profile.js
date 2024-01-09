import { Stack, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../firebase-config";
import Toast from "react-native-root-toast";
import * as ImagePicker from "expo-image-picker";

export default function UserProfile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
  );
  const url = `https://expo-modal-tab-nav-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}.json`;
  // https://expo-post-app-49c88-default-rtdb.europe-west1.firebasedatabase.app/

  useEffect(() => {
    setMail(auth.currentUser.email);

    async function getUser() {
      const response = await fetch(url);
      const userData = await response.json();

      setName(userData?.name);
      setTitle(userData?.title);
      setImage(userData?.image);

      //console.log(image);
      //console.log(userData);
    }
    getUser();
  }, []);

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/sign-in");
  }
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


  async function handleSaveUser() {
    const user = { image, name, title, mail };
    const json = JSON.stringify(user);
    const response = await fetch(url, { method: "PUT", body: json });

    if (response.ok) {
      let toast = Toast.show("Changes saved", {
        duration: Toast.durations.LONG,
      });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title="Sign Out"
              color={Platform.OS === "ios" ? "#fff" : "#264c59"}
              onPress={handleSignOut}
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
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Type your name"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Type your title"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMail}
          value={mail}
          placeholder="Type your mail"
          autoCapitalize="none"
          editable={false}
        />
        <View style={styles.buttonContainer}>
          <Button title="Save" color="#264c59" onPress={handleSaveUser} />
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
