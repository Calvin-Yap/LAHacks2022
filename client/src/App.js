import React from "react";

import Map from "./components/Map";

import{
  BrowserRouter as Router,
  Route,
  Routes
}from "react-router-dom"
import SignInPage from './components/SignInPage';
import { useAuth } from './Firebase';


function App() {
  const currentUser = useAuth();
  const user = currentUser
  return (
    <div>
      
    <Router>
      <Routes>
        {currentUser?<Route path="/" element={<Map user={user}/>}/>: <Route path="/" element={<SignInPage/>}/>}
      </Routes>
    </Router>

      
    </div>
  );
}

export default App;
