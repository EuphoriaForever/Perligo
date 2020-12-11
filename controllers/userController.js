const user = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createAccount = async(req,res)=>{
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(req.body.password, salt);

    let data = await user.user.create({
        username:req.body.username,
        password:hash,
        email:req.body.email,
    }) 
}