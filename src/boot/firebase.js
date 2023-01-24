import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { useAuth } from '@vueuse/firebase/useAuth';

import {
  getFirestore,
  serverTimestamp
} from 'firebase/firestore';

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxfLpi12tx58wey3GyLAZa9ReoWfvU7Nw",
  authDomain: "auth-quasar-chat.firebaseapp.com",
  projectId: "auth-quasar-chat",
  storageBucket: "auth-quasar-chat.appspot.com",
  messagingSenderId: "301760681003",
  appId: "1:301760681003:web:87ded941ed87ac7fe1066e"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );

// DataBase
const db = getFirestore( app );
const serverTime = serverTimestamp();

// Auth
const auth = getAuth( app );

const { isAuthenticated, user } = useAuth( auth );

// Create new users
function createNewUser( username, password ) {
  return( new Promise( ( resolve, reject ) => {
    createUserWithEmailAndPassword( auth, username, password )
      .then( ( userCredentials ) => {
        resolve( userCredentials.user );
        console.log( 'User created!' );
      }, reject )
  } ) );
}

// Login user
function loginUser( username, password ) {
  return( new Promise( ( resolve, reject ) => {
    signInWithEmailAndPassword( auth, username, password )
      .then( ( userCredentials ) => {
        resolve( userCredentials.user );
      }, reject );
  } ) );
}

// Logout user
function logoutUser() {
  return( new Promise( ( resolve, reject ) => {
    signOut( auth )
      .then( () => {
        resolve( true );
      }, reject );
  } ) );
}

// Create user - database
function createUserDB() {
  db.collection( 'users' ).doc()
}

// EXPORT
export {
  db,
  // auth,
  // serverTime,
  isAuthenticated,
  user,
  createNewUser,
  loginUser,
  logoutUser
}

console.log( 'Firebase OK' )

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
