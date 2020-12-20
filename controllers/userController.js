const user = require("../models/user");
const bcrypt = require('bcrypt');

const saltRounds = 10;

//registration
exports.createAccount = async(req,res)=>{
    let verify = await user.user.findOne({
        where:{
            username:req.body.username
        },
        raw:true
    });
    
    if(verify==undefined){
        console.log("Registration is a go!");
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.password, salt);
    
        let data = await user.user.create({
            username:req.body.username,
            password:hash,
            email:req.body.email,
        }) 
        return true;
    }else{
        return false;
    }

}

//login authentication
exports.authentication = async(req,res)=>{
  
    let verify = await user.user.findOne({
        where:{
            username:req.body.username
        },
        raw:true
    });
    if(verify && bcrypt.compareSync(req.body.password, verify.password)){
        console.log("Login Approved");
        return true;
    }else{
        console.log("ENGK! No Login for you");
        return false;
    }
}

