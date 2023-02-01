// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
//Skeleton layout similar to module 13 lesson 17
Product.init(
  {
    // define columns...Go to seeds/product-seeds/ to see what columns are needed
    //Need id to keep track of each product
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    //sequelize website states decimal(10,2) to have two decimal places
    price:{
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true, 
      }
    },//Must be a foreign key since named category_id
    category_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
