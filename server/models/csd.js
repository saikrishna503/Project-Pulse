import mongoose from 'mongoose';

// Define the schema for CSD projects
const CSDSchema = new mongoose.Schema({
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
        required: true // Every project must have a department (CSDA, CSDB, etc.)
    }
}, { collection: 'CSD' }); // Store all departments in the 'csd' collection

// Create a model with the schema, the third argument specifies the collection name explicitly
const CSD = mongoose.model('CSD', CSDSchema, 'CSD');

export default CSD;
