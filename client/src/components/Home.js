import React from 'react'
import {Link} from 'react-router-dom'; 
const Home = () => {
  return (
    <div>Welcome to our website
    <div className="button-container">
     <button><Link to="/register" className="btn">Register</Link></button>
     <button><Link to="/login" className="btn">Login</Link></button>
    </div>
    </div>
  )
}

export default Home