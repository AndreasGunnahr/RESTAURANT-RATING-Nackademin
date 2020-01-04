var mysql = require('mysql');

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

restaurantDB.all = (table, column, name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE ${column} = ?`, name, (err, results) => {
            if(err){
                return reject(err);
            }
            let result = JSON.parse(JSON.stringify(results));
            result.forEach(comment => {
                comment.stars = comment.stars.split("");                
            })
            return resolve(result);
        });
    });
};

restaurantDB.allPosts = (table) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table}`, (err, results) => {
            // console.log(JSON.parse(JSON.stringify(results)));
            if(err){
                return reject(err);
            }
            let result = JSON.parse(JSON.stringify(results));
            result.forEach(post => {
                post.tags = post.tags.trim().split(",");               
            })
            return resolve(result);
        });
    });
};

restaurantDB.one = (table, column, name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE ${column} = ?`, name, (err, results) => {
            if(err){
                return reject(err);
            }  
            if(table == "posts"){
                results[0].tags = results[0].tags.trim().split(',');
            }
            return resolve(results[0]);
        });
    });
};

restaurantDB.deletePost = (table, postID) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM ${table} WHERE id = ${postID}`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve("Number of records deleted: " + results.affectedRows);
        });
    });
}

restaurantDB.updatePost = (table, postID, object) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE ${table} SET title = ?, tags = ?, city = ?, cuisine = ?, description = ?, img = ?
        WHERE id = ${postID}`,[object.title, object.tags, object.city, object.cuisine, object.description, object.img],(err, results) => {
            if(err){
                return reject(err);
            }
            return resolve('Number of records changed: ' + results.affectedRows)
        });
    });
}

restaurantDB.updateCountComment = (table, postID) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE ${table} SET nrOfComments = (
            SELECT COUNT(*) FROM comments WHERE (post_id = ${postID} AND comment <> "")) WHERE id = ${postID}`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(JSON.parse(JSON.stringify(results)));
        });
    });
}

restaurantDB.insert = async (table, object) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO ${table} SET ?`, object , (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.insertId);
        });
    });
};


restaurantDB.updateRating = (table,userID, postID) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE ${table} SET 
            nrOfRatings = (SELECT COUNT(*) FROM ratings WHERE post_id = ${postID}),
            scoreRating = ((SELECT SUM(score) FROM ratings WHERE post_id = ${postID}) / (nrOfRatings))
            WHERE id = ${postID}`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(JSON.parse(JSON.stringify(results)));
        });
    });
}





module.exports = restaurantDB;