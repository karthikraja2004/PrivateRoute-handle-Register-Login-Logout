import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [form,setForm]=useState({
        email:'',
        password:'',
        confirmPassword:''
    });
    
    const [showCPassword,setCShowPassword]=useState(false);
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setForm({...form,
            [e.target.name]:e.target.value});
    }
    
    const toggleCPasswordVisibility=()=>{
        setCShowPassword(!showCPassword)

        setTimeout(()=>{
            setCShowPassword(false);
        },200);
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:3000/users/register',form);
            alert('User registered');
            navigate('/login');
        }
        catch(error)
        {
            if (error.response) {
                alert(error.response.data.error);
            } else if (error.request) {
                console.error(error.request);
                alert('No response received from server');
            } else {
                console.error('Error', error.message);
                alert('Error registering user');
            }
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>email:</label>
            <input type="text" name="email" value={form.email} onChange={handleChange}/>
        </div>
        <div>
            <label>New Password:</label>
            <input type='password'
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            autocomplete="new-password" 
            required/>
        </div>
        <div>
            <label>Confirm Password:</label>
            <input type={showCPassword ? 'text': 'password'} 
            name="confirmPassword" 
            value={form.confirmPassword} 
            onChange={handleChange} 
            autocomplete="new-password" 
            required/>
            <button type="button" onClick={toggleCPasswordVisibility}>
                {showCPassword ? 'Hide': 'Show'} Password
            </button>
        </div>
        <button type="submit">Register</button>
    </form>
  )
}

export default Register