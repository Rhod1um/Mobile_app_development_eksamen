// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});