const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // For parsing form data
const connection = require('./db'); // Import the database connection

app.use(bodyParser.urlencoded({ extended: false }));

// Assuming a "public" directory with your static files
app.use(express.static('public'));

// Route to handle storing data
app.post('/submit', (req, res) => {
  const inputData = req.body;

  const query = 'INSERT INTO student (name, id ,dept , year, division, gender, vacation, source, destination, class, issued_date, expiry_date, voucher_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    inputData.Name,
    inputData.ID,
    inputData.Department,
    inputData.Year,
    inputData.Division,
    inputData.Gender,
    inputData.Vacation,
    inputData.Source,
    inputData.Destination,
    inputData.Class,
    inputData.Issued_Date,
    inputData.Expiry_Date,
    inputData.Voucher_no
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error storing data:', err);
      res.status(500).send('Error storing data');
    } else {
      console.log('Data stored successfully');
      res.status(200).send('Data stored successfully');
    }
  });
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
