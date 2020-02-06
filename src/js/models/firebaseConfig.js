 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDW6AplanXETIyDRNSnWKAom-0Sl6odP1Q",
    authDomain: "danbo-memo-system.firebaseapp.com",
    databaseURL: "https://danbo-memo-system.firebaseio.com",
    projectId: "danbo-memo-system",
    storageBucket: "danbo-memo-system.appspot.com",
    messagingSenderId: "785491988370",
    appId: "1:785491988370:web:fd42520655df983f7abb4b",
    measurementId: "G-FY296XLLKD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();