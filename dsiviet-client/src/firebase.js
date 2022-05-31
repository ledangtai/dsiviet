import firebase from 'firebase'

// var firebaseConfig = {
//   apiKey: "AIzaSyDOm2BSbZwg6d3eUrovoZ4C7ozfZP-umyQ",
//   authDomain: "noreply@dangtai-2ad65.firebaseapp.com",
//   projectId: "dangtai-2ad65",
//   storageBucket: "dangtai-2ad65.appspot.com",
//   messagingSenderId: "336950757036",
//   appId: "1:549956102914:web:ae8151bd6599f4de3e301b"
// };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOm2BSbZwg6d3eUrovoZ4C7ozfZP-umyQ",
  authDomain: "dangtai-2ad65.firebaseapp.com",
  projectId: "dangtai-2ad65",
  storageBucket: "dangtai-2ad65.appspot.com",
  messagingSenderId: "549956102914",
  appId: "1:549956102914:web:ae8151bd6599f4de3e301b",
  measurementId: "G-60845KGW4D"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  export const store =  firebase.storage()
  export const auth = firebase.auth();
  export default firebase
  