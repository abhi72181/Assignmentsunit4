const authorisation=function(permittedRoles){
    return (req,res,next)=>{
        const user=req.user;
        let isPermitted=false
        permittedRoles.map(role=>{
           if(user.role.includes(role)){
               isPermitted=true
           }
        })
        if(isPermitted){
            return next()
        }
        return res.status(401).send({message:"you are not authorised"})
    }
}
module.exports=authorisation