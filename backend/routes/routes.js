const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer'); // Import multer
const BlogPost = require("../models/blogsModel"); // Import the BlogPost model
const PartnerLogoModel = require("../models/partnersModel"); // Import the BlogPost model
const HeroModel = require("../models/heroModel"); // Import the BlogPost model
const usersModel = require("../models/usersModel");
const subscribersModel = require("../models/subscribersModel");
const solutionsModel = require("../models/solutionsModel");

const JWT_SECRET = 'Ra./"hmsjhmj2@92mm9290()jk82.290/o2F9%Y68][]jkh&mk';

router.post("/signup", async (req, res)=> {
  const saltedPassword = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(req.body.password, saltedPassword);

  const signedupUser = new usersModel({
      email: req.body.email,
      username: req.body.username,
      password: securedPassword
  });
  signedupUser.save().then((data) => {res.json({status: "saved", data: data})}).catch((error) => {res.json(error)});
});

router.post("/login", async (req, res) => {
const { email, password } = req.body;
try {
    const user = await usersModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: 'No account with that email was found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    return res.status(200).json({ status: "found", data: token });
    } catch (error) {
      return res.status(500).json({ error: error });
  }
});

router.get('/getDetails', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Use optional chaining to avoid errors if authorization header is missing

  if (!token) {
    return res.status(401).json({ status: 'error', errorMessage: 'Authorization token is missing.' });
  }
  try {
    const user = jwt.verify(token, JWT_SECRET); // Authenticate the token with JWT_SECRET - If valid, it returns an object with email value
    const email = user.email;

    const data = await usersModel.findOne({ email });
    if (data) {
      return res.json({ status: "ok", data: data});
    } else {
      return res.json({ status: "empty", data: "No user found"});
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ status: 'error', errorMessage: 'Invalid token.' });
    } else {
      return res.status(500).json({ status: 'error', errorMessage: 'Server error.' });
    }
  }
});


const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, "../src/webimages");
    },
    filename:function (req, file, cb){
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname );
    }
});

const upload = multer({storage: storage});

router.post('/add-blog', upload.single('thumbnail'), async (req, res) => {
  const thumbnail = req.file.filename;
  try {
    const { title, content, author, tags } = req.body;

    if (!title || !content || !author || !tags) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const newBlogPost = new BlogPost({
      title,
      content,
      author,
      tags,
      thumbnail
    });  
    await newBlogPost.save();
    res.status(201).json({ success: true, message: 'Blog post added successfully', data: newBlogPost });
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ success: false, message: 'Failed to add blog post' });
  }
});


router.post('/upload-logo', upload.single('logo'), async (req, res) => {
  try {
    const logoData = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    // Create a new PartnerLogo document using the PartnerLogoModel
    const newPartnerLogo = new PartnerLogoModel(logoData);

    // Save the new logo to the database
    await newPartnerLogo.save();

    // Respond with the URL of the uploaded logo
    res.json({ success: true, logoUrl: `/api/logo/${newPartnerLogo._id}` });
  } catch (error) {
    console.error('Error uploading logo:', error);
    res.status(500).json({ success: false, message: 'Failed to upload logo' });
  }
});

router.get('/logo/:id', async (req, res) => {
  try {
    const logo = await PartnerLogoModel.findById(req.params.id);
    if (!logo) {
      return res.status(404).json({ success: false, message: 'Logo not found' });
    }

    res.set('Content-Type', logo.contentType);
    res.send(logo.data);
  } catch (error) {
    console.error('Error fetching logo:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch logo' });
  }
});

router.put('/edit-hero', upload.single('backgroundImage'), async (req, res) => {
  try {
    const { title1, title2, title3 } = req.body;
    const backgroundImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    // Update the hero content and background image in the database
    await HeroModel.findOneAndUpdate(
      {}, // Assuming you want to update a single hero entry
      { title1, title2, title3, backgroundImage },
      { new: true } // Return the updated document
    );

    // Respond with a success message
    res.json({ success: true, message: 'Hero content updated successfully' });
  } catch (error) {
    console.error('Error updating hero content:', error);
    res.status(500).json({ success: false, message: 'Failed to update hero content' });
  }
});

router.get("/getblogs", async(req, res)=>{
  try{
    const posts = await BlogPost.find();
    if(!posts){
      res.status(404).json("No blogs found");
    } else {
      res.status(200).json({status: "ok", data: posts});
    }
  } catch(error){
    res.status(500).json("Internal server error");
  }
});

router.get("/getSubscribers", async(req, res)=>{
  try{
    const subscribers = await subscribersModel.find();
    if(!subscribers){
      res.status(404).json("No subscribers found");
    } else {
      res.status(200).json({status: "ok", data: subscribers});
    }
  } catch(error){
    res.status(500).json("Internal server error");
  }
});

router.get("/getSolutions", async(req, res)=>{
  try{
    const solutions = await solutionsModel.find();
    if(!solutions){
      res.status(404).json("No solutions found");
    } else {
      res.status(200).json({status: "ok", data: solutions});
    }
  } catch(error){
    res.status(500).json("Internal server error");
  }
});

router.get("/getClients", async(req, res)=>{
  try{
    const clients = await PartnerLogoModel.find();
    if(!clients){
      res.status(404).json("No clients found");
    } else {
      res.status(200).json({status: "ok", data: clients});
    }
  } catch(error){
    res.status(500).json("Internal server error");
  }
});

router.get("/getHero", async(req, res)=>{
  try{
    const hero = await HeroModel.find();
    if(!hero){
      res.status(404).json("No hero found");
    } else {
      res.status(200).json({status: "ok", data: hero});
    }
  } catch(error){
    res.status(500).json("Internal server error");
  }
});


module.exports = router;
