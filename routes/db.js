// const express = require('express');
// const mysql = require('mysql2');
// const app = express();// For parsing form data
// const path = require('path');

// const connection = mysql.createConnection({
//   host: 'localhost',    // Replace with your MySQL host
//   user: 'root',     // Replace with your MySQL username
//   password: 'root', // Replace with your MySQL password
//   database: 'try_rail'      // Replace with your MySQL database name
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//   } else {
//     console.log('Connected to database');
//   }
// });

// // app.get('/', (req, res) => {
// //   // console.log("I am called")
// //   res.sendFile(path.join(__dirname + '../public/home.html'));
// // });

// app.post('/submit', (req, res) => {
//   const inputData = req.body;

//   const query = 'INSERT INTO student_details (name, clg_id, age ,dept , year, division, gender, vacation, source, destination, class, applied_date, expiry_date, voucher_no) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
//   const values = [
//     inputData.Name,
//     inputData.ID,
//     inputData.Age,
//     inputData.Department,
//     inputData.Year,
//     inputData.Division,
//     inputData.Gender,
//     inputData.Vacation,
//     inputData.Source,
//     inputData.Destination,
//     inputData.Class,
//     inputData.Applied_Date,
//     inputData.Expiry_Date,
//     inputData.Voucher_no
//   ];

//   connection.query(query, values, (err, results) => {
//     if (err) {
//       console.error('Error storing data:', err);
//       res.status(500).send('Error storing data');
//     } else {
//       console.log('Data stored successfully');
//       res.status(200).send('Data stored successfully');
//       // res.sendFile(path.join(__dirname,'public/view.html'));
//     }
//   });
// });

// app.get('/submit',(req,res)=>{
//   res.sendFile(path.join(__dirname,'../public/views.html'))
// })

// module.exports = connection;
