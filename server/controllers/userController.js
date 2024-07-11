const User = require('../models/userModel');
const bcrypt=require('bcrypt');
const {createTokens}=require('../JWT');
const registerUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        console.log(req.body); // Add this to debug incoming request data

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({
            email,
            password, // Password hashing is handled in the model
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if(error.name==='ValidationError')
            {
                return res.status(400).json({error:error.message})
            }
            else
            {
                console.error('Error registering User:', error);
        res.status(500).json({ error: 'Server error' });
            }   
    }
};

const LoginUser= async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user)
            {
                return res.status(400).json({error:'Invalid email or password'});
            }
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(!passwordMatch)
            {
                return res.status(400).json({error:'Invalid email or password'});
            }
            else
            {
                const accessToken=createTokens(user);
                res.cookie("access-token",accessToken,{
                    maxAge:60*60*60,
                    httpOnly:true,
                    secure:process.env.NODE_ENV==='production'
                });
                res.status(200).json({message:"Login Successful"});
            }
    }
    catch(error)
    {
        console.log('Error Logging in',error);
        res.status(500).json({error:'Server error'});
    }
    
}
const Profile=async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('--password');
        res.json(user);
    }
    catch(error)
    {
        console.log("Error fetching user Prfile: ",error);
        res.status(500).json({error:"server error"});
    }
};

module.exports = { registerUser,LoginUser,Profile};
