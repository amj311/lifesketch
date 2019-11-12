var express = require('express')
var app = express();

app.use(express.static('public'))
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://amj311:be13strong51@cluster0-u6luc.mongodb.net/lab5');


// Configure multer so that it will upload to '/public/data'
const multer = require('multer')
const upload = multer({
  dest: './public/data/',
  limits: {
    fileSize: 10000000
  }
});


//SCHEMA
var eventSchema = new mongoose.Schema({
  name: String,
  img: String,
  descr: String
});

eventSchema.methods.update = function(obj, cb) {
  this.name = obj.name;
  this.img = obj.img;
  this.save(cb);
};

mongoose.model('Event', eventSchema);
var Event = mongoose.model('Event');

//ROUTES
// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  console.log('uploading file')
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  console.log('file exists')
  res.json({
    path: "/images/" + req.file.filename
  });
  console.log('success')
});

// new Event
app.post('/api/events', (req,res,next) => {
    console.log('creating event')
    const event = new Event({
        name: req.body.name,
        img: req.body.img,
        descr: req.body.descr
    })
    event.save((err,event) => {
        if(err){return next(err)}
        res.json(event)
    })
    console.log('success')
})

//Get All
app.get('/api/events', (req,res,next) => {
  Event.find( (err, events) => {
    if(err) { return console.log(err) }
    res.json(events)
    console.log('got and sent all events')
  })
})


//ID Param
app.param('id', function(req, res, next, id) {
  var query = Event.findById(id);
  query.exec(function (err, event){
    if (err) { return next(err); }
    if (!event) { return next(new Error("can't find event")); }
    req.event = event;
    return next();
  });
});


// Get by ID
app.get('/api/events/:id', (req,res)=>{
  console.log(req.event)
  res.json(req.event)
})

// Delete by ID
app.delete('/api/events/:id', (req,res)=>{
  console.log("deleting event: "+req.event)
  Event.deleteOne(req.event, (err,res) => {
    if(err) {return console.log(err)}
    console.log(res)
  })
  res.json(req.event)
})

// PUT by ID
app.put('/api/events/:id', (req,res)=>{
  console.log(req.event)
  console.log(req.body)
  
  req.event.name = req.body.name;
  req.event.descr = req.body.descr;
  
  req.event.save( (err,event) => {
    if(err) {return console.log(err)}
    res.send(event)
  })
})





let port = 4201;

app.listen(port, () => {
    console.log('listening on ' + port)
})