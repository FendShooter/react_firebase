import { useState, useEffect } from 'react';

import './App.css';
import {
  signInWithGoogle,
  auth,
  createUserProfile,
  logOutUser,
} from './firebase';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (val) => {
      if (val) {
        const userRef = await createUserProfile(val);
        userRef.onSnapshot((snapshot) => {
          setUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setUser({ user: val });
      }
    });
  }, []);

  console.log(user);
  return (
    <div className='App'>
      <button onClick={signInWithGoogle}>Sign in with google</button>
      <button onClick={logOutUser}>Logout</button>
    </div>
  );
}

export default App;
