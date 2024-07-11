import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from '../src/components/Login'
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
function App()
{
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}  />
                    <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                </Routes>
            </div>
        </Router>
    );
}
export default App;