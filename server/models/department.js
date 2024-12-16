import mongoose from 'mongoose';
// Define the Department schema
const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
}, { collection: 'Depart' });

// Export the Department model
const Department = mongoose.model('Department', DepartmentSchema,'Depart');

export default Department;