// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcbyB81L2dAkZrt1qJFuFUvhFTQSco7PY",
  authDomain: "expo-post-app-49c88.firebaseapp.com",
  databaseURL: "https://expo-post-app-49c88-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "expo-post-app-49c88",
  storageBucket: "expo-post-app-49c88.appspot.com",
  messagingSenderId: "933152781966",
  appId: "1:933152781966:web:712478e4518b35107d7bdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const auth = initializeAuth(app, storage, {
  persistence: getReactNativePersistence(AsyncStorage),
});
