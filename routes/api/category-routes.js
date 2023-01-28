const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint
//Skelton layout similar to module 13 lesson 25 routes/api/driverRoutes.js
router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  //Try to get all the categories, is success then show json, catch errors and return 500 status code
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}],

    });
    res.status(200).json(categoryData);

  }catch (err) {
    res.status(500).json(err);

  }
});

//Similar to above get
router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  //Try to get one category by id if success then show json, catch errors and return 500 status code
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    //If nothing returned then tell user they caused error and no id was found
    if(!categoryData){
       res.status(404).json({ message: 'No category found with that id!' });
      
    }else{
      //If tag data found return json with success. 
      res.status(200).json(categoryData);
    }

  }catch (err) {
    res.status(500).json(err);

  }
});

//Skelton layout similar to module 13 lesson 13 routes/api/userRoutes.js
router.post('/', async(req, res) => {
  // try to create a new category, if error then user put in wrong req.body
  // ` req.body should look like this...
  //   {
  //     "category_name": "jeans"
  //   }`
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch(err){
    res.status(400).json({ message: 'req.body should look like this...{"category_name": "jeans"}' });
  }
});

//Skelton layout similar to module 13 lesson 13 routes/api/userRoutes.js
router.put('/:id', async(req, res) => {
  // try to update a category by its `id` value, if error then user put in wrong req.body
  // ` req.body should look like this...
  //   {
  //     "category_name": "jeans"
  //   }`
  try{
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //if categoryData is empty then ser error else success
    if(!categoryData[0]){
      res.status(404).json({ message: 'req.body should look like this...{"category_name": "jeans"}' });
    }else{
      res.status(200).json(categoryData[0]);
    }

  }catch(err){
    res.status(500).json(err);
  }
});

//Skelton layout similar to module 13 lesson 13 routes/api/userRoutes.js
router.delete('/:id', async(req, res) => {
  // try to delete a category by its `id` value, if error then user put in invalid id
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
     });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      
    }else{
      res.status(200).json(categoryData);
    }


  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
