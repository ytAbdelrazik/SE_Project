// Import required modules
const express = require('express');
const mongoose = require('mongoose');


// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ytdbse:ytdbse123@cluster0.rfhbl.mongodb.net/Students')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define student schema
const studentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  id: { type: Number, required: true },
  age: { type: Number, required: true },
  username: { type: String, required: true },
});

// Create Student model
const Student = mongoose.model('Students', studentSchema);



//Search student by id
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ ID: req.params.id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
