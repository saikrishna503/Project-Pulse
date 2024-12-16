
import mongoose from 'mongoose';

// Define the schema for CSE projects
const CSESchema = new mongoose.Schema({
    teamNo: {
        type: String,
        required: true,
        unique: true // Ensures unique team numbers
    },
    projectTitle: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true // Every project must have a department (CSEA, CSEB, etc.)
    }
}, { collection: 'CSE' }); // Store all departments in the 'cse' collection

// Create a model with the schema, the third argument specifies the collection name explicitly
const CSE = mongoose.model('CSE', CSESchema, 'CSE');

export default CSE;
