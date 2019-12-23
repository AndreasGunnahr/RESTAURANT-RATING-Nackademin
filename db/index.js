var mysql = require('mysql');
var bcrypt = require('bcrypt');

var pool  = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT
});

pool.getConnection(function(err, connection) {
  if (err) throw err; 
  console.log('Connected to database')
});

let restaurantDB = {};

restaurantDB.all = (table) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table}`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

restaurantDB.one = (table, column, name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE ${column} = ?`, name, (err, results) => {
            if(err){
                return reject(err);
            }
            console.log(results)
            return resolve(results[0]);
        });
    });
};

restaurantDB.insert = async (table, object) => {
    object.password = await bcrypt.hash(object.password,10);
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO ${table} SET ?`, object , (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};



module.exports = restaurantDB;