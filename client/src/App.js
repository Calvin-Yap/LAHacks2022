import React,{useState} from "react";

import Map from "./components/Map";
import {signInWithGoogle} from "./Firebase"
import{
  BrowserRouter as Router,
  Route,
  Routes
}from "react-router-dom"
import SignInPage from './components/SignInPage';
import { useAuth } from './Firebase';

function App() {
  const currentUser = useAuth();
  return (
    <div>
      
    <Router>
      <Routes>
        {currentUser?<Route path="/" element={<Map/>}/>: <Route path="/" element={<SignInPage/>}/>}
      </Routes>
    </Router>

      
    </div>
  );
}

export default App;
