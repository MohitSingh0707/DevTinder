const adminAuth = (req,res,next) =>{
     const token ='xyz';
     const isAdminAuthenticated = token === 'xyz';
     if(isAdminAuthenticated){
         next();
     } else {
         res.status(403).send({message: "Admin Auth Failed"});
     }
}

module.exports = {adminAuth};