const user = require("../models/user");
exports.createAccount = async(req,res)=>{
    let data = await user.user.create({
        username:req.body.username,
        password:req.query.password,
        email:req.body.email,
    })

    res.send(data);
}