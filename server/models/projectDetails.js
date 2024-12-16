import mongoose from 'mongoose';

const projectDetailsSchema = new mongoose.Schema({
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
     // Abstract/summary of the project
  },
  teamLeader: {
    name: {
      type: String,
      
    },
    rollNo: {
      type: String,
      
    },
  },
  teamMembers: [
    {
      name: {
        type: String,
        
      },
      rollNo: {
        type: String,
        
      },
    },
  ],
  guideName: { // Added guide name field
    type: String,
    
  },
  tasks: {
    reviewI: {
      type: Boolean,
      default: false,
    },
    reviewII: {
      type: Boolean,
      default: false,
    },
    reviewIII: {
      type: Boolean,
      default: false,
    },
    finalReview: {
      type: Boolean,
      default: false,
    },
    documentation: {
      type: Boolean,
      default: false,
    },
  },
  
  projectProgress: {
    type: Number, // Percentage of project completion
    default:0,
    min: 0,
    max: 100,
  },
  department: {
    type: String,
    required: true // Every project must have a department (CSEA, CSEB, etc.)
}
}, { timestamps: true });

// Virtual property to determine if the project is completed
{/*projectDetailsSchema.virtual('isCompleted').get(function() {
  return this.projectProgress === 100;
});*/}

// Use the existing model if already compiled
const ProjectDetails = mongoose.models.ProjectDetails || mongoose.model('ProjectDetails', projectDetailsSchema, 'teamNo');

export default ProjectDetails;
