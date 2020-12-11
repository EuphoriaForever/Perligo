const {DataTypes,DATE} = require("sequelize");
const instance = require("../dbconnection");

const account = instance.sequelize.define("drive",{
    id:{
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER
      },
      username:{
        type:DataTypes.STRING,
        allowNull:false
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      email:{
        type:DataTypes.STRING,
        allowNull:false
      },
    
  },
    {
        createdAt:true,
        updatedAt:true,
        deletedAt:true,
        tableName:"users"
    }
)

exports.user = user;