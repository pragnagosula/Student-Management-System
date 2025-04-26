const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentID: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  department: { type: String, required: true },
  enrollmentYear: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
