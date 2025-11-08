import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
  const [user , setUser] = useState(null)

  const googleLogin = () => {
    return signInWithPopup(auth , googleProvider)
  }

  const logOut = () => {
    return signOut(auth)
  }

  useEffect(()=> {
    onAuthStateChanged(auth , (currentUser) => {
      if(currentUser){
        setUser(currentUser)
      }
    })
  } , [])

  const authInfo = {
    googleLogin,
    user,
    logOut,
    setUser,
  }
  return <AuthContext value={authInfo}>
    {
      children
    }
  </AuthContext>
};

export default AuthProvider;