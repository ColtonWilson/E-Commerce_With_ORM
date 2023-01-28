const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint
//Skelton layout similar to module 13 lesson 25 routes/api/driverRoutes.js
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  //Try to get all the tags, is success then show json, catch errors and return 500 status code
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}],

    });
    res.status(200).json(tagData);

  }catch (err) {
    res.status(500).json(err);

  }
});

//Similar to above get
router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  //Try to get one tag by id if success then show json, catch errors and return 500 status code
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    //If nothing returned then tell user they caused error and no id was found
    if(!tagData){
       res.status(404).json({ message: 'No tag found with that id!' });
      
    }else{
      //If tag data found return json with success. 
      res.status(200).json(tagData);
    }

  }catch (err) {
    res.status(500).json(err);

  }
});

//Skelton layout similar to module 13 lesson 13 routes/api/userRoutes.js
router.post('/', async(req, res) => {
  // try to create a new tag, if error then user put in wrong req.body
  // ` req.body should look like this...
  //   {
  //     "tag_name": "black"
  //   }`
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }catch(err){
    res.status(400).json({ message: 'req.body should look like this...{"tag_name": "black"}' });
  }
});

//Skelton layout similar to module 13 lesson 13 routes/api/userRoutes.js
router.put('/:id', async(req, res) => {
  // try to update a tag, if error then user put in wrong req.body
  // update a tag's name by its `id` value
  // ` req.body should look like this...
  //   {
  //     "tag_name": "black"
  //   }`
  try{
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //if tagData is empty then ser error else success
    if(!tagData[0]){
      res.status(404).json({ message: 'req.body should look like this...{"tag_name": "black"}' });
    }else{
      res.status(200).json(tagData);
    }

  }catch(err){
    res.status(500).json(err);
  }
});

//Skelton layout similar to module 13 lesson 13 routes/api/userRoutes.js
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData = await Product.destroy({
      where: {
        id: req.params.id,
      }
     });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      
    }else{
      res.status(200).json(tagData);
    }


  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
