const mongoose=require("mongoose");
const { hashPassword } = require("../controllers/userMiddleware");
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:[/.+@.+\..+/,'Please enter a valid email address']
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                if(value.length<8){
                    return false;
                }

                const hasUppercase=/[A-Z]/.test(value);
                const hasLowercase=/[a-z]/.test(value);
                const hasNumber= /\d/.test(value);
                const hasSpecialChar=/[!@#$^&*(),.?":{}|<>]/.test(value);
                return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
            },
            message:props=>`${props.value} is not a valid password. Password must be 8 characters long and contain at least one uppercase letter,one lowercase letter,one number,and one special character.`,
        },
    }
},
{
    timestamps:true,
});

userSchema.pre('save',hashPassword);

const User=mongoose.model('User',userSchema);

module.exports=User;