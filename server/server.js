require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const userRoute=require('./routes/userRoute');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const app=express();
const PORT=3000;


app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.use('/users',userRoute);


app.listen(PORT,()=>{
    console.log("Server Started Running");
})

