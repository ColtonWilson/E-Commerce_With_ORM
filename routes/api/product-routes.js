const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
//Skelton layout similar to module 13 lesson 25 routes/api/driverRoutes.js
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  //Try to get all the products is success then show json, catch errors and return 500 status code
  try{
    const productData = await Product.findAll({
      include: [{model: Category}, {model: Tag}],

    });
    res.status(200).json(productData);

  }catch (err) {
    res.status(500).json(err);

  }

});

// get one product
//Skelton layout similar to module 13 lesson 25 routes/api/driverRoutes.js
//Try to get one product by id if success then show json, catch errors and return 500 status code
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try{
    const productData = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag}],
    });
    //If nothing returned then tell user they caused error and no id was found
    if(!productData){
       res.status(404).json({ message: 'No product found with that id!' });
      
    }else{
      //If product data found return json with success. 
      res.status(200).json(productData);
    }

  }catch (err) {
    res.status(500).json(err);

  }
});
//************************Given code has error******************************** */
// create new product
//This code was given, but does not work with the example req.body that was given as it was missing category_id. If that is added then categories can be added. As shown:
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      category_id: 1
      tagIds: [1, 2, 3, 4]
    }
  */
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});
//Skelton layout similar to module 13 lesson 13 routes/api/userRoutes.js
router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try{
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      }
     });
    if (!productData) {
      res.status(404).json({ message: 'No product with this id!' });
      
    }else{
      res.status(200).json(productData);
    }


  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
