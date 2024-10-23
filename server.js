const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB URI
const dbURI = 'mongodb+srv://ashrafahmed2006:dsberlin@cluster0.rfhbl.mongodb.net/Students';

// Connect to MongoDB using Mongoose
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use((req, res, next) => {
    console.log('The middleware received the request:', req.method, req.url);
    next();
});
app.use(express.json());

// Define the Student model with ID correctly typed
const studentSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Age: Number,  
    ID: Number    
});

// Create the model from the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student; 

app.get('/students/search', async (req, res) => {
    const { Username } = req.body; // Get the name from query parameters
    if (!Username) {
        return res.status(400).json({ message: "Name parameter is required" });
    }

    try {
        // Use a case-insensitive search to find students by name
        const students = await Student.find({ Username: new RegExp(Username, 'i') });
        if (students.length === 0) {
            return res.status(404).json({ message: "No students found with that name" });
        }
        res.json(students); // Send the found students back to the client
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));