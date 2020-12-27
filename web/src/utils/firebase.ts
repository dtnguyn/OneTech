import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDanGXu_4nlk-GsuLRAxYuwBGrUG_43A8M",
  authDomain: "onetech-297117.firebaseapp.com",
  projectId: "onetech-297117",
  storageBucket: "onetech-297117.appspot.com",
  messagingSenderId: "581462365090",
  appId: "1:581462365090:web:791cccbead978d39d298fb",
  measurementId: "G-FXBJFG4D5V",
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage };
