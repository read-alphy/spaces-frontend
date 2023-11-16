"use client"
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {HOST} from './constants';

const firebaseConfig = {
    apiKey: "AIzaSyDsPFuT_3Iivi8iqgT6uaWnOTcOQwDrzMs",
    authDomain: "spaces-downloader.firebaseapp.com",
    projectId: "spaces-downloader",
    storageBucket: "spaces-downloader.appspot.com",
    messagingSenderId: "417827102640",
    appId: "1:417827102640:web:047ef0c31c287f97d50075",
    measurementId: "G-ZPXZ2ECXBK"
  };

const firebase = initializeApp(firebaseConfig);

export default firebase;

export const auth = getAuth(firebase);

export const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      // console.log('User signed in: ', result.user, "idToken: ", idToken);
      return idToken;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error ${errorCode}: ${errorMessage}`);
    }
};

export const signOut = () => {
  auth.signOut().then(() => {
    console.log('User signed out');
  }).catch((error) => {
    console.log(error);
  });
}

export const login = async () => {
  const idToken = await googleSignIn();
  // post idToken to backend
  const resp = await fetch(`${HOST}/login`, {
    method: 'POST',
    body: idToken,
    credentials: 'include',
  })
  // status)
  console.log("login resp", resp)
  console.log("login resp.status", resp.status)
  console.log(resp.headers.getSetCookie())
  console.log(idToken)
  if (resp.status === 200) {
    console.log('Login successful');
  } else {
    throw new Error('Login failed');
  }
}