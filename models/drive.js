const {DataTypes,DATE} = require("sequelize");
const instance = require("../dbconnection");

const account = instance.sequelize.define("drive",{
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
      },
      account_id:{
        allowNull:false,
        type:DataTypes.INTEGER
      },
    
  },
    {
        createdAt:true,
        updatedAt:true,
        deletedAt:true,
        tableName:"accounts"
    }
)

exports.account = account;