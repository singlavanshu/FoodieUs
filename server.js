const express = require('express');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
// Replace with your actual secret key

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/foodieus', { useNewUrlParser: true, useUnifiedTopology: true });

// Create User schema and model
const userSchema = new mongoose.Schema({
    Full_name: {type: String, required: true, unique: false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Route for handling form submission
app.post('/submit-form', (req, res) => {
    // Extract form data
    const { name, email, subject, message } = req.body;

    // Prepare data to write to Excel
    const date = new Date().toLocaleString();
    const data = { date, name, email, subject, message };

    // Write to Excel file
    const filePath = path.join(__dirname, 'responses.xlsx');
    writeExcel(filePath, data)
        .then(() => res.json({ message: 'Form submission successful!' }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

// Function to write data to Excel
async function writeExcel(filePath, data) {
    const workbook = new ExcelJS.Workbook();
    let sheet;
    if (fs.existsSync(filePath)) {
        await workbook.xlsx.readFile(filePath);
        sheet = workbook.getWorksheet('Responses');
    } else {
        sheet = workbook.addWorksheet('Responses');
        sheet.addRow(['Date', 'Name', 'Email', 'Subject', 'Message']);
    }

    sheet.addRow([data.date, data.name, data.email, data.subject, data.message]);
    await workbook.xlsx.writeFile(filePath);
    console.log(`Data written to ${filePath}`);
}

// Sign Up endpoint
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Sign In endpoint
app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verify user credentials
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Middleware to authenticate JWTs
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Protected endpoint example
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
