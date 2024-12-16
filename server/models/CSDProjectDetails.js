import mongoose from 'mongoose';

const csdProjectDetailsSchema = new mongoose.Schema({
  teamNo: {
    type: String,
    required: true,
    unique: true, // Ensures each team has a unique team number
  },
  projectTitle: {
    type: String,
    required: true,
  },
  projectAbstract: {
    type: String,
    required: true, // Abstract/summary of the project
  },
  teamLeader: {
    name: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
  },
  teamMembers: [
    {
      name: {
        type: String,
        required: true,
      },
      rollNo: {
        type: String,
        required: true,
      },
    },
  ],
  guideName: { // Added guide name field
    type: String,
    required: true,
  },
  projectProgress: {
    type: Number, // Percentage of project completion
    required: true,
    min: 0,
    max: 100,
  },
}, { timestamps: true });

// Virtual property to determine if the project is completed
{/*csdProjectDetailsSchema.virtual('isCompleted').get(function() {
  return this.projectProgress === 100;
});*/}

// Use the existing model if already compiled
const CSDProjectDetails = mongoose.models.CSDProjectDetails || mongoose.model('CSDProjectDetails', csdProjectDetailsSchema, 'csdProjectDetails');

export default CSDProjectDetails;
