import mongoose from 'mongoose';

// Define the schema for CSM projects
const CSMSchema = new mongoose.Schema({
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
        required: true // Every project must have a department (CSMA, CSMB, etc.)
    }
}, { collection: 'CSM' }); // Store all departments in the 'csm' collection

// Create a model with the schema, the third argument specifies the collection name explicitly
const CSM = mongoose.model('CSM', CSMSchema, 'CSM');

export default CSM;
