import { Stack, useRouter } from "expo-router";
import * as Location from "expo-location";
import { auth } from "../../firebase-config";
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
import Toast from "react-native-root-toast";
import * as ImagePicker from "expo-image-picker";

export default function Create() {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(
    "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRoT6NNDUONDQmlthWrqIi_frTjsjQT4UZtsJsuxqxLiaFGNl5s3_pBIVxS6-VsFUP_"
  );
  const url = `https://expo-modal-tab-nav-default-rtdb.firebaseio.com/posts.json`;

  useEffect(() => {
    async function locationPermission() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    }
    //calling the locationPermission
    locationPermission();
  }, []);

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

  async function handleCreatePost() {
    const locationObj = await Location.getCurrentPositionAsync({});
    const location = {
      longitude: locationObj.coords.longitude,
      latitude: locationObj.coords.latitude,
    };
    //Creates new Date object and gets the current time
    const createdAt = new Date().getTime();
    const uid = auth.currentUser?.uid;
    const post = { image, caption, location, createdAt, uid };
    const json = JSON.stringify(post);
    const response = await fetch(url, { method: "POST", body: json });

    if (response.ok) {
      let toast = Toast.show("Changes saved", {
        duration: Toast.durations.LONG,
      });
      //Redirrects to the post tab
      router.back();
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create Post",
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
            title="Create Post"
            color="#264c59"
            onPress={handleCreatePost}
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
