import mongoose from 'mongoose';

// Define the schema for a team
const teamSchema = new mongoose.Schema({
    teamNo: {
        type: String,
        required: true
    },
    projectTitle: {
        type: String,
        required: true
    }
});

// Create a model based on the schema
const Teams = mongoose.model('Teams', teamSchema);

export default Teams;
