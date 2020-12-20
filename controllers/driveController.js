const user = require("../models/user");
const drive = require("../models/drive");

//creating a drive for newly registered account
exports.createDrive  = async(req,res)=>{
    let verify = await user.user.findOne({
        where:{
            username:req.body.username
        },
        raw:true
    });

    let data = await drive.drive.create({
        account_id: verify.id 
    }) 
    console.log("OKAY NANG DRIVE");
}