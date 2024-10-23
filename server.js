// Import required modules
const express = require('express');
const mongoose = require('mongoose');


// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://hamza:fo2sheldoksh@cluster0.rfhbl.mongodb.net/Students', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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
app.get('/', (req, res) => {
    res.send('API is working!');
  });
// Route to get the first 10 students sorted by username
// Route to add a new student for testing
app.post('/students/add', async (req, res) => {
    const newStudent = new Student({
      email: 'example@example.com',
      id: 1,  // Assuming this is a number
      age: 20,
      username: 'testuser'
    });
  
    try {
      const savedStudent = await newStudent.save();
      res.status(201).json(savedStudent);
    } catch (err) {
      console.error('Error saving student:', err);
      res.status(500).json({ message: err.message });
    }
  });
  
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
