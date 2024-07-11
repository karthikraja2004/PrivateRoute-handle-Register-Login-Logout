const {sign,verify}=require("jsonwebtoken");

const createTokens=(user)=>{
    const accessToken=sign({id:user._id,email:user.email},process.env.TOKEN_ID);
    return accessToken;
};

const validateToken=(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); // Log the authorization header
    const accessToken = authHeader && authHeader.split(' ')[1];
    console.log('Access Token:', accessToken); 
    if(!accessToken) {
        return res.status(400).json({error:"user not authenticated"});
    }

    try{
        const validateToken=verify(accessToken,process.env.TOKEN_ID)
        if(validateToken)
            {

                req.user=validateToken;
                req.authenticated=true;
                return next();
            }
    }
    catch(err)
    {
        return res.status(400).json({error:err});
    }
}

module.exports={createTokens,validateToken}