import{ initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import {useEffect, useState} from "react";

var firebaseConfig = {
    apiKey: "AIzaSyCyjJAPW_YSuO1P8U5wOxT8MrxU8XO4laQ",
    authDomain: "lahacks2022-teamup.firebaseapp.com",
    projectId: "lahacks2022-teamup",
    storageBucket: "lahacks2022-teamup.appspot.com",
    messagingSenderId: "460866276325",
    appId: "1:460866276325:web:3bad16f7acd01c15c0bd0c"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = ()=>{
    signInWithPopup(auth,provider).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
}

export const useAuth = ()=>{
    const[currentUser, setCurrentUser] = useState()
    useEffect(()=>{
       return onAuthStateChanged(auth, user => setCurrentUser(user))
    },[])
    
    return currentUser
}

export const logout = ()=>{
    return signOut(auth)
}