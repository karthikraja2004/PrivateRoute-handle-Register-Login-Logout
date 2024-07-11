const express=require('express');
const {registerUser,LoginUser,Profile}=require('../controllers/userController');
const { validateToken } = require('../JWT');
const router=express.Router();

router.route('/profile').get(validateToken,Profile);
router.post('/register',registerUser);
router.post('/login',LoginUser);
module.exports=router;