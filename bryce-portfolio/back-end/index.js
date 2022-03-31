const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true
});

// Create a scheme for projects in the portfolio
const projectSchema = new mongoose.Schema({
  title: String,
  paths: Array,
  objective: String,
  technicals: String,
  results: String,
});

// Create a model for projects in the portfolio
const Project = mongoose.model('Project', projectSchema);


// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new project in the museum: takes a title and a path to an image.
app.post('/api/projects', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    paths: req.body.paths,
    objective: req.body.objective,
    technicals: req.body.technicals,
    results: req.body.results,
  });
  try {
    await project.save();
    res.send(project);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Remove an project in the museum: takes a Title
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the projects in the museum.
//The project.find is a mongodb command that returns all projects in the projects collection
app.get('/api/projects', async (req, res) => {
  try {
    let projects = await Project.find();
    res.send(projects);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Update an existing project
app.put('/api/projects/:id', async (req, res) => {
  try {
    let project = await Project.findOne({
      _id: req.params.id
    });
    project.title = req.body.title;
    project.objective = req.body.objective;
    project.paths = req.body.paths;
    project.technicals = req.body.technicals;
    project.results = req.body.results;
    await project.save();
    res.send(project);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
