const express = require('express');
const app = express();
const AppDAO = require('./utils/dao');
const dao = new AppDAO('./database.sqlite3');
const cors = require('cors');

app.use(cors())

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create user table if not exists
const createUsers='CREATE TABLE IF NOT EXISTS user(username VARCHAR PRIMARY KEY,password VARCHAR NOT NULL,firstname TEXT NOT NULL,lastname TEXT);'
dao.db.run(createUsers,(err)=>{
    if (err) {
        return console.error(err.message);
        }
        console.log('User table is created.');
});

// create task table if not exists
const createTasks='CREATE TABLE IF NOT EXISTS task(taskid INTEGER PRIMARY KEY,customername VARCHAR UNIQUE NOT NULL,taskname TEXT NOT NULL,taskdesc TEXT NOT NULL,FOREIGN KEY(customername) REFERENCES user(username));'
dao.db.run(createTasks,(err)=>{
    if (err) {
        return console.error(err.message);
      }
      console.log('Task table is created.');
});

// insert sample users 
// const insertUsers='INSERT into user (username,password,firstname,lastname) VALUES (?,?,?,?);'
// dao.db.run(insertUsers, ["admin","admin123456","John","Bates"],(err)=>{
//     if (err) {
//         return console.error(err.message);
//       }
//       console.log('User is created.');
// });
// dao.db.run(insertUsers, ["user","user123456","Matthew","Williams"],(err)=>{
//     if (err) {
//         return console.error(err.message);
//       }
//       console.log('User is created.');
// });

// get all users
app.get('/api/users',(req,res)=>{
    const getAllUsers='SELECT * FROM user'
    var params = []
    dao.db.all(getAllUsers, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// create new user
app.post("/api/user/", (req, res, next) => {
  var errors=[]
  if (!req.body.userName){
      errors.push("No username specified");
  }
  if (!req.body.password){
      errors.push("No password specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  var data = {
      userName: req.body.userName,
      password: req.body.password,
      firstName : req.body.firstName,
      lastName: req.body.lastName
  }
  var sql ='INSERT INTO user (username, password, firstname, lastname) VALUES (?,?,?,?)'
  var params =[data.userName, data.password, data.firstName, data.lastName]
  dao.db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data
      })
  });
})

// login user
app.post("/api/auth", (req, res, next) => {
    var errors=[]
    if (!req.body.userName){
        errors.push("No username specified");
    }
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        userName: req.body.userName,
        password: req.body.password
    }
    var sql ='SELECT * FROM user WHERE username = ? AND password = ?'
    var params =[data.userName, data.password]
    dao.db.all(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "Login Successful",
            "data":result
        })
    });
})

const port=4000;

app.listen(port,()=>{console.log('listening on port 4000')});