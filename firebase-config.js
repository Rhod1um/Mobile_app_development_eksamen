
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCbG9hyyXFkNf0Zzb2THyziHMTeN2tpnT4",
  authDomain: "expo-modal-tab-nav.firebaseapp.com",
  databaseURL: "https://expo-modal-tab-nav-default-rtdb.firebaseio.com",
  projectId: "expo-modal-tab-nav",
  storageBucket: "expo-modal-tab-nav.appspot.com",
  messagingSenderId: "65218072400",
  appId: "1:65218072400:web:0e8bb4e54af66300ba6655",
  measurementId: "G-VMYZF8SB56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});