const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',    // Replace with your MySQL host
  user: 'root',     // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'try_rail'      // Replace with your MySQL database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

module.exports = connection;
