const AppDAO = require('./utils/dao');

function main(){
    // init the db
    const dao = new AppDAO('./database.sqlite3')

    const createUsers='CREATE TABLE IF NOT EXISTS user(user_name VARCHAR PRIMARY KEY,password VARCHAR NOT NULL,first_name TEXT NOT NULL,last_name TEXT);'

    dao.db.run(createUsers,(err)=>{
        if (err) {
            return console.error(err.message);
          }
          console.log('User table is created.');
    });

    const createTasks='CREATE TABLE IF NOT EXISTS task(task_id INTEGER PRIMARY KEY,customer_name VARCHAR UNIQUE NOT NULL,task_name TEXT NOT NULL,task_desc TEXT NOT NULL,FOREIGN KEY(customer_name) REFERENCES users(user_name))'

    dao.db.run(createTasks,(err)=>{
        if (err) {
            return console.error(err.message);
          }
          console.log('Task table is created.');
    });

    // close the db
    dao.db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });

    // npm start
}

main()