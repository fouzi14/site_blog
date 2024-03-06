const { func } = require("joi")
const jwt = require("jsonwebtoken")

function verifyToken (req , res , next){
    const authToken = req.headers.authorization;
    if(authToken){
        const token = authToken.split(" ")[1];
        try {
            const decodedpyload = jwt.verify(token,process.env.JWT_SUCRET)
            req.user = decodedpyload
            next();
        } catch (error) {
            return res.status(403).json({message : "invalid token "})

        }
    }else{
        return res.status(403).json({message : "no provide token "})
    }
}

function verifyTokenAndAdmin(req,res,next){
    verifyToken(req , res , ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return res.status(403).json({message : "not allowed , only admin "})

        }
    })
}

function verifyTokenAndOnlyUser(req,res,next){
    verifyToken(req , res , ()=>{
        if(req.user.id===req.params.id){
            next()
        }else{
            return res.status(403).json({message : "not allowed , only user himself "})

        }
    })
}


function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req , res , ()=>{
        if(req.user.id===req.params.id ||req.user.isAdmin ){
            next()
        }else{
            return res.status(403).json({message : "not allowed , only user himself or admin"})

        }
    })
}
module.exports={
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
}