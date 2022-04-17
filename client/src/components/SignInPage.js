import React from 'react'
import {signInWithGoogle} from "../Firebase"
import "../styles/signIn.css"
export default function SignInPage() {
  return (
    <div className='signInContainer'>
        <h1>TeamUp <span role="img" aria-label="tent">🤼</span></h1>
        <br/>
        <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  )
}
