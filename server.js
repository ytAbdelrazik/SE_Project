
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

//Student model
const studentSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Age: Number,  
    ID: Number    
});

//schema
//
const Student = mongoose.model('Students', studentSchema);

module.exports = Student; 


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



