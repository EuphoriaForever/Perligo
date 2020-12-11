const {DataTypes,DATE} = require("sequelize");
const instance = require("../dbconnection");

const drive = instance.sequelize.define("drive",{
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
        tableName:"drive"
    }
)

exports.drive = drive;