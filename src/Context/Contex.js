import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'


const auth = getAuth(app)
export const AuthContex = createContext()

const Contex = ({children}) => {
    const [user, setUser] = useState(null)
    const [dark, setDark] = useState(true)
    
    const registar = (email, password)=>{
       return createUserWithEmailAndPassword(auth, email, password)
    }

    const login =(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile =(profile)=>{
      return  updateProfile(auth.currentUser, profile)
    }

    const googleSignin = ()=>{
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }


    const logout = ()=>{
      return  signOut(auth)
    }


    useEffect(()=>{
        const unsubcriber = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        })

        return ()=> unsubcriber()
    },[])

    const authInfo ={user, registar, login, updateUserProfile, googleSignin, logout, dark, setDark }
    return (
        <div>
            <AuthContex.Provider value={authInfo}>
                {children}
            </AuthContex.Provider>
        </div>
    );
};

export default Contex;