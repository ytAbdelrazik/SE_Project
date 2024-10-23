const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB URI
const dbURI = 'mongodb+srv://ytdbse:ytdbse123@cluster0.rfhbl.mongodb.net/Students';

// Connect to MongoDB using Mongoose
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

// Student model
const studentSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Age: Number,
    ID: Number
});

// Schema
const Student = mongoose.model('Students', studentSchema);

// Route to get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find(); // Retrieve all students
        res.status(200).json(students); // Send the list of students as a response
    } catch (err) {
        res.status(500).json({ message: "Error retrieving students", error: err.message });
    }
});
////git add server.js
// Server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));