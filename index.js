const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser'); // For parsing form data
const path = require('path')
// const connection = require('./routes/db.js'); // Import the database connection

app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/',require(path.join(__dirname,'routes/form.js')))

// Assuming a "public" directory with your static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle storing data
app.get('/', (req, res) => {
  // console.log("I am called")
  res.sendFile(path.join(__dirname + '/public/home.html'));
});

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

app.get('/', (req, res) => {
  // console.log("I am called")
  res.sendFile(path.join(__dirname + '../public/home.html'));
});

app.post('/submit', (req, res) => {
  const inputData = req.body;

  const query = 'INSERT INTO student_details (name, clg_id, age ,dept , year, division, gender, vacation, source, destination, class, applied_date, expiry_date, voucher_no) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    inputData.Name,
    inputData.Clg_ID,
    inputData.Age,
    inputData.Department,
    inputData.Year,
    inputData.Division,
    inputData.Gender,
    inputData.Vacation,
    inputData.Source,
    inputData.Destination,
    inputData.Class,
    inputData.Applied_Date,
    inputData.Expiry_Date,
    inputData.Voucher_no
  ];

  connection.query(query, values, (err, results) => {
    if (err) {

      console.error('Error storing data:', err);
      res.status(500);
      res.send(`
      <script>
        alert("Error Submitting form");
        window.location.href = "/view";
      </script>`);
    } else {
      console.log('Data stored successfully');
      res.status(200);
      res.send(`
      <script>
        alert("Form Submitted Successfully");
        window.location.href = "/view";
      </script>`);
    }
  });
});

//view
app.get('/view', (req, res) => {
  res.sendFile(__dirname + "/public/view.html");
})

app.get("/viewId", (req, res) => {
  const id = req.query.clg_id;
  const query = "SELECT * FROM student_details WHERE clg_id = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).json({ message: "Error" });
    } else {
      if (result.length > 0) {
        console.log("Fetched data:", result);
        res.status(200).json({ message: "Success", data: result[0] });
      } else {
        console.log("No data found");
        res.status(404).json({ message: "No data found" });
      }
    }
  });
});

// app.get("/viewId", (req, res) => {

//   // var clg_id = localStorage.getItem("clg_id");
//   // const clg_id = req.query.clg_id;

//   const id = req.query.clg_id;
//   const query = "Select * from student_details where clg_id = ?";

//   connection.query(query, [id], (err, result) => {
//     if (err) {
//       console.log("Err: ", err);
//       res.status(500).json({ message: "Err" });
//     }
//     else {
//       console.log("Fetched")
//       res.status(200).json({ message: "", id})
//     }
//   })
// })

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
