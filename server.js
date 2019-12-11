const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'))

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb+srv://amj311:be13strong51@cluster0-u6luc.mongodb.net/lifesketch', {
  useNewUrlParser: true
});


/***********************************
 *        - EVENTS/ITEMS -         * 
 * ********************************/

// Create a scheme for items in the timeline: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  name: String,
  artist: String,
  day: Number,
  month: Number,
  year: Number,
  pos: Number,
  img: String,
  period: String,
  note: String,
  type: String,
  recId: String,
  elId: String,
  group: String,
  title: String,
  body: String,
  loc: String,
  order: String,
});

// Create a model for items in the timeline.
const Item = mongoose.model('Item', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async(req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the timeline: takes a title and a path to an image.
app.post('/api/items', async(req, res) => {
  const item = new Item(req.body);
  try {
    console.log("Post Item");
    console.log(item);
    await item.save();
    res.send(item);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the timeline.
app.get('/api/items', async(req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async(req, res) => {
  try {
    // console.log("Made it into delete");
    let result = await Item.deleteOne({ _id: req.params.id });
    res.send(result);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async(req, res) => {
  try {
    console.log("Edit Item");
    var item = await Item.findByIdAndUpdate({ _id: req.params.id }, req.body);
    console.log(item);
    res.send(item)
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

let port = 3000;
app.listen(port, () => console.log('Server listening on port '+port));
