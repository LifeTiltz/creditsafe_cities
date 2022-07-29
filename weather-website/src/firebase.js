import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCJ4b9x2ERSw1r_C0EVTDmdF7kDKMgQhRM",
    authDomain: "auth-3f2f5.firebaseapp.com",
    projectId: "auth-3f2f5",
    storageBucket: "auth-3f2f5.appspot.com",
    messagingSenderId: "64866578991",
    appId: "1:64866578991:web:e14f4463c200ca4e730cda"
})


export const auth = app.auth();
export default app; 