const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const path = require('path');
const port = 3000
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb+srv://test:test@cluster0.fgsmz08.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: Number,
    query: String
  });


  const User = mongoose.model('User', userSchema);


  app.post('/contactus', async (req, res) => {
    const { username, email, phone, query } = req.body;
    try {
      const newUser = new User({ username, email, phone, query});
      await newUser.save();
      res.redirect('/contactus');
      
    } catch (err) {
      console.error('Error saving user:', err.message);
      res.redirect('/');
    }
  });
app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/menu', (req,res)=>{
    res.render('menu')
})

app.get('/contactus', (req,res)=>{
res.render('contactus')
})


app.get('/index', (req,res)=>{
    res.render('index')
    })
app.listen(port, ()=>{
    console.log('Server at 3000')
})





