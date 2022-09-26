const jwt=require("jsonwebtoken")

const createRefToken=(user)=>{
    return jwt.sign(user,process.env.REF_TOKEN_SECRET,{expiresIn:"1d"})
}

const createAccToken=(user)=>{
    return jwt.sign(user,process.env.ACC_TOKEN_SECRET,{expiresIn:"1d"})
}

module.exports={createRefToken,createAccToken}