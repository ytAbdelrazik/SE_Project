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

// Delete student endpoint
app.delete('/students/delete', async (req, res) => {
    const { ID } = req.body; 
    if (!ID) {
        return res.status(400).json({ message: "Student ID must be provided" });
    }

    try {
        const result = await Student.deleteOne({ ID });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No student found with that ID" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
