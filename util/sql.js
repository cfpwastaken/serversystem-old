const nodesql = require("mysql");
const mysql = nodesql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
console.log("[MySQL] Connecting...");
mysql.connect();
console.log("[MySQL] Connected!");

module.exports = mysql;