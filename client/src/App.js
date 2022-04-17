import React,{useState} from "react";
import Map from "./components/Map";
import Event from "./components/Event";
import {signInWithGoogle} from "./Firebase"
function App() {
  
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with google</button>
      <Map />
      
    </div>
  );
}

export default App;
