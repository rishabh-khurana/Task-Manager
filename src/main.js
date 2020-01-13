const express = require('express');
const app = express();
const AppDAO = require('./utils/dao');
const dao = new AppDAO('./database.sqlite3');

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

const port=3000;

app.listen(port,()=>{console.log('listening on port 3000')});