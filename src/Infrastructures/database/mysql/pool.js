/* istanbul ignore file */
const mysql = require('mysql2');

const {
  MYSQLHOST,
  MYSQLPORT,
  MYSQLUSER,
  MYSQLPASSWORD,
  MYSQLDATABASE,
} = process.env;

const config = {
  host: MYSQLHOST,
  port: parseInt(MYSQLPORT, 10),
  user: MYSQLUSER,
  password: MYSQLPASSWORD,
  database: MYSQLDATABASE,
};

const pool = mysql.createPool(config);

pool.getConnection((err) => {
  if (err) {
    console.log(err);
  }
});

const promisePool = pool.promise();

module.exports = promisePool;
