const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });


// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle registration form submission
app.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.send('Error registering user.');
    } else {
      res.send('User registered successfully.');
    }
  });
});

app.get("/success",(req,res)=>{
  res.sendFile(__dirname+"/pages/success.html");

})
app.get("/error",(req,res)=>{
  res.sendFile(__dirname+"/pages/error.html");
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
