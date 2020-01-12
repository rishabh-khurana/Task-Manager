const AppDAO = require('./dao');

const AddNewUser = (firstName,lastName,userName,password) =>{
    const dao = new AppDAO('./database.sqlite3')
    const sqlAddNewUser=`INSERT INTO user VALUES (${userName},${password},${firstName},${lastName});` 
    dao.db.run(sqlAddNewUser,(err)=>{
            if (err) {
                return console.error(err.message);
              }
            console.log('New User is added.');
        });
}

export default AddNewUser;