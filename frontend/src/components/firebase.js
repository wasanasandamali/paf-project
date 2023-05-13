import firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyCLgopVZaC3aNDO2enZEOB5-k67EJAzZsk",
    authDomain: "foodies-7c1f2.firebaseapp.com",
    projectId: "foodies-7c1f2",
    storageBucket: "foodies-7c1f2.appspot.com",
    messagingSenderId: "127506420697",
    appId: "1:127506420697:web:afaae2f6045bc8f3e47fc8"
});

const auth=firebase.auth();
const storage=firebase.storage();

export {storage,auth};