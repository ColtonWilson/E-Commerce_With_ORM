// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
//Module 13 lesson 25 has similar layout
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Product,{
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
// Products belongToMany Tags (through ProductTag)
//Sequelize website states "When the join table has additional attributes, these can be passed in the options object:"
//through is required for this: 'through: UserProject'
Product.belongsToMany(Tag,{
  through: ProductTag,
  foreignKey: 'product_id',
});
// Tags belongToMany Products (through ProductTag)
//Similar to above
Tag.belongsToMany(Product,{
  through: ProductTag,
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
