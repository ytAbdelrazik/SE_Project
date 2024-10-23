
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
//youssef
app.post('/newstudent', (req, res) => {
    try{
    const {Username,Email,Age,ID}=req.body;
    const new_student = new Student({Username,Email,Age,ID});
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
//ahmed
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

//hamza
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find().limit(10).sort({ Username: 1 }); // Changed 'Username' to 'username' to match the schema
    console.log('Fetched students:', students); // Debugging
    res.status(200).json(students);
  } catch (err) {
    console.error('Error fetching students:', err); // Debugging
    res.status(500).json({ message: err.message });
  }
});



//yt
app.patch('/UpdateNameByID', async (req, res) => {
    const studentId = parseInt(req.query.id.trim()); //parse to INT
    const newName = req.body.username; // get name from postman body

    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { ID: studentId }, // find the student by ID
            { $set: { Username: newName } }, // update the Username 
            { new: true } // return the updated document
        );

        if (updatedStudent.Username==newName) {
            res.status(200).json({ message: "Updated Student", student: updatedStudent }); // updated student
        } else  if(updatedStudent.Username!=newName) {
            res.status(404).json({ message: "name was not updated" }); // update failed
        }
         else{
            res.status(404).json({ message: "Student not found" }); //  student is not found
         }
    } catch (err) {
        res.status(500).json({ message: "Error updating student", error: err.message }); // errors
    }
});





// Server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

