const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });
const path = require('path')
const EmployeeModel = require('./models/Users')
const dealsdrayModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))


mongoose.connect("mongodb://127.0.0.1:27017/dealsdraycompany")


// Login page

app.post("/login", (req, res) => {
    const {name, password} = req.body;
    EmployeeModel.findOne({name: name})
    .then(user => console.log(user))
    .catch(err => console.log(err))
})



app.get('/', (req, res) => {
    dealsdrayModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    dealsdrayModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    dealsdrayModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name, 
        formData: req.body,
        email: req.body.email, 
        mobile: req.body.mobile, 
        gender: req.body.gender,
        role: req.body.role,
        course: req.body.course
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})



app.delete('/deleteUsers/:id', (req, res) => {
    const id = req.params.id;
    dealsdrayModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
    dealsdrayModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
        console.log(file)
    }
})



app.get('/getUser', (req, res) => {
    dealsdrayModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/createUser', upload.single('image'), async (req, res) => {
    const { originalname, path } = req.file;
    
    try {
      const image = new Image({
        name: originalname,
        path: path,
      });
  
      await image.save();
  
      res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error uploading image' });
    }
  });



app.listen(3002, () => {
    console.log("Server is Running")
})