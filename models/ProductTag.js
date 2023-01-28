const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}
//Go to seeds/product-tag-seeds/ to see what columns are needed. Needs  product_id: and tag_id:
//Skeleton layout similar to module 13 lesson 17
ProductTag.init(
  {
    // define columns...Have ID to keep track of each category
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },//Must be a foreign key since named product_id
    product_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },//Must be a foreign key since named tag_id
    tag_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
