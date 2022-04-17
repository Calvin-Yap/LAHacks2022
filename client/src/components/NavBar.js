import React from 'react'
import { logout} from "../Firebase";
import "../styles/navBar.css"
export default function NavBar() {
  return (
      <div className="titleNav">
        <button onClick={logout}>Logout</button>
        <h1 >TeamUp <span role="img" aria-label="tent">🤼</span></h1>
        
      </div>
  )
}
