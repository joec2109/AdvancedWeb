// server/index.js

// Grab the required dependencies
const express = require("express");

const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

// Create a new session with the user's ID and store the details in a cookie that expires after a day
app.use(session({
  key:"userId",
  secret:"scout",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24 * 1000,
  }
}))
// Create a connection with the mysql database
const db = mysql.createConnection({
  user:"root",
  host:"localhost",
  password:"",
  database:"scout_db",
});
// Creat the 'register' function so that once it is called from the frontend, it is executed here
app.post('/register', (req, res) => {

  const username = req.body.username
  const password = req.body.password
  const passwordRepeat = req.body.passwordRepeat
  // Find users with the username the user has input
  db.query("SELECT * FROM users WHERE username = ?;", username, (err, result)=> {

    if(err){
      res.send({err:err});
    }

    if (result.length == 0) {
      if (passwordRepeat.length > 0) {
        // If the username doesnt exist, a password has been input and 'repeat password' is the same as it, then register the user
        if (passwordRepeat == password) {
          bcrypt.hash(password, saltRounds, (err, hash) => {

            if (err) {
              console.log(err);
            }
            // Insert the new user into the database table (users)
            db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], (err, result)=> {
              if (err) {console.log(err);}

              res.send({message:"Registered successfully!"});
            })
          });
        } else {  // Passwords do not match
          res.send({message:"Passwords don't match"});
        }
      } else {  // Passwords do not match
        res.send({message:"Passwords don't match"});
      }
    } else {  // If the username already exists, it cannot be used again
      res.send({message:"User already exists!"});
    }
  })
})
// If the user selects a new team and clicks on the 'Update team' button on the news feed, this is called
app.post('/updateteam', (req, res)=> {
  const team = req.body.team
  const usersId = req.body.userId

  console.log(team, usersId)
  // Update the user's team within the database
  db.query("UPDATE users SET team = ? WHERE usersId = ?;", [team,usersId], (err, result) => {
    if (err) {console.log(err);}

    res.send({message:"Team updated!"});
  })
})
// Once the user clicks the login button on the login page, attempt to log the user in.
app.get("/login", (req, res)=> {
  if (req.session.user) { // if there is a session that exists for the user, they are logged in.
    res.send({loggedIn: true, user: req.session.user})
  } else {  // otherwise, they are not logged in
    res.send({loggedIn: false})
  }
})
// Function that is called once the user clicks on the 'logout' button
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('userId');
  res.send({ message: 'Session destroyed' }); // Destroy the session
});
// Function that is called once the user attempts to login.
app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  // Find users that exist within the database with the username input by the user.
  db.query("SELECT * FROM users WHERE username = ?;", username, (err, result)=> {

    if(err){
      res.send({err:err});
    }


    // If the username exists, check the password. If the password is correct, log them in
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => { // Un-hash the password stored in the db to compare it to the user's input
        if (response) { // If the details are correct, log them in
          req.session.user = result
          res.send(result);
        } else {
          res.send({message:"Incorrect username/password"});
        }
      })
    } else { // Username not found in the db
      res.send({message:"User doesn't exist"});
    }
  })
})
// Ensure the node backend is listening on port 3001 (port 3000 is used for the frontend)
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});