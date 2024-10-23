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

app.post('/students', (req, res) => {
    try{
    const {Username,Email,Age}=req.body;
    const new_student = new Student({Username,Email,Age});
    new_student.save();
    res.status(201).json({
        message: 'Student created successfully!',
        student:new_student
    });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating student', error });
    }
    
});
 app.get('/students', async(req,res)=>{ 
    try{
        const all = await Student.find()
        res.status(200).json(all)
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting student', error });
    }
});









// Server port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));