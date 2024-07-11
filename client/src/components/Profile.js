import React,{useEffect,useState} from 'react'
import axios from 'axios';

const Profile = () => {
  const [profile,setProfile]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(() =>{
      const fetchProfile=async()=>{
        try{
          const token=localStorage.getItem('token');
          console.log('Token :',token);
          const response=await axios.get('http://localhost:3000/users/profile',{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
  
          });
          setProfile(response.data);
        }
        catch(error)
        {
          console.log('Error fetching Profile:',error);
          setError(error.response?.data?.error||'Server error');
        }
        finally{
          setLoading(false);
        }
      };
      fetchProfile();
    },[]);
    if (loading) return <div>Loading...</div>;
  if (error) return <div>{String(error)}</div>;

    return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <div>
          <p>Email: {profile.email}</p><br/>
          <p>Joined :{new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  )
}

export default Profile;