import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDaiBgznAMimMWNJQy3qOkQmcf2poF5YsQ',
  authDomain: 'react-firebase-auth-2a017.firebaseapp.com',
  projectId: 'react-firebase-auth-2a017',
  storageBucket: 'react-firebase-auth-2a017.appspot.com',
  messagingSenderId: '402296550770',
  appId: '1:402296550770:web:0bfdd4e54008ed1d0859eb',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const logOutUser = () => auth.signOut();

export const createUserProfile = async (userAuth, others) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/1212154`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const createAt = new Date();
    const { displayName, email } = userAuth;
    await userRef.set({
      displayName,
      email,
      createAt,
      ...others,
    });
  }
  return userRef;
};
