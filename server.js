
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
//_________________--------------------------____________________-----------------------


//"mahmoud"
// Route to get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find(); // Retrieve all students
        res.status(200).json(students); // Send the list of students as a response
    } catch (err) {
        res.status(500).json({ message: "Error retrieving students", error: err.message });
    }
});
//-------------------------------------------------------------------------------

//OG
// Delete student endpoint
app.delete('/students/deleteByName', async (req, res) => {
    const { Username } = req.body;
    if (!Username) {
        return res.status(400).json({ message: "Username must be provided" });
    } 
    try {
        // Delete all students where the Username matches exactly
        const result = await Student.deleteMany({ Username });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No students found with that Username" });
        }
        res.json({ message: "Students deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
     //-------------------------------------------------------------------------------

//"yt"
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
//---------------------------------------------------------------

//"ahmed"
// Delete student endpoint
app.delete('/students/deletee', async (req, res) => {
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
//--------------------------------------------------------


//"yassin"
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
//--------------------------------------------------

//"hamza"
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



//----------------------------------------------------
"youssef ghoraba"
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


//--------------------------------------
//Search student by id "Roaa"
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ ID: req.params.id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error('Error fetching student:', err);


// Server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
