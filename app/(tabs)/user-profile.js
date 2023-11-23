import { Stack, useRouter } from "expo-router";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View, Image } from "react-native";


export default function UserProfile() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(
      "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRoT6NNDUONDQmlthWrqIi_frTjsjQT4UZtsJsuxqxLiaFGNl5s3_pBIVxS6-VsFUP_"
    );
    const url = `https://expo-modal-tab-nav-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}.json`;
		//...

     useEffect(() => {
        setMail(auth.currentUser.email);

        async function getUser() {
            const response = await fetch(url);
            const userData = await response.json();

            setName(userData.name);
            setTitle(userData.title);
            setImage(userData.image);
            
            
            console.log(userData);
        }
        getUser();
    }, []);

    async function handleSignOut() {
      await signOut(auth);
      router.replace("/sign-in");
    }


    return (
      <View style={styles.list}>
        <View>
          <Text>{name}</Text>
          <Text>{mail}</Text>
          <Text>{title}</Text>
          <Image
            style={styles.image}
            source={{
              uri:
                image ||
                "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRoT6NNDUONDQmlthWrqIi_frTjsjQT4UZtsJsuxqxLiaFGNl5s3_pBIVxS6-VsFUP_",
            }}
          />
        </View>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
    ,
    image: {
        aspectRatio:1,
        flex:1
        ,width:100,
        height:100
    }
});