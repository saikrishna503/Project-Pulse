import express from 'express';
import ProjectDetails from '../models/projectDetails.js'; // Ensure this model can handle different departments

const router = express.Router();

// Dynamic route for different CSE departments
router.get('/:department', async (req, res) => {
  const { department } = req.params;

  try {
    const projects = await ProjectDetails.find({ department });
    console.log(`Fetched projects for ${department}:`, projects);
    res.set('Cache-Control', 'no-store');

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found' });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error(`Error fetching projects for ${department}:`, error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new team
router.post('/:department/teams', async (req, res) => {
  const { teamNo, projectTitle } = req.body;

  try {
    const newTeam = new ProjectDetails({ teamNo, projectTitle, department: req.params.department });
    await newTeam.save();

    res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error adding team:', error);
    res.status(400).json({ message: 'Failed to add team' });
  }
});

// Remove a team by teamNo and department
router.delete('/:department/teams/:teamNo', async (req, res) => {
  const { teamNo, department } = req.params;

  try {
    console.log(`Attempting to remove team with teamNo: ${teamNo} for department: ${department}`);
    const result = await ProjectDetails.findOneAndDelete({ teamNo, department });
    if (result) {
      res.json({ message: 'Team removed' });
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    console.error('Error removing team:', error);
    res.status(500).json({ message: 'Failed to remove team' });
  }
});

// Update project title by teamNo and department
router.put('/:department/updateTitle/:teamNo', async (req, res) => {
  const { teamNo, department } = req.params;
  const { projectTitle } = req.body;

  try {
    // Find the team by teamNo and department, then update the projectTitle
    const updatedTeam = await ProjectDetails.findOneAndUpdate(
      { teamNo, department },
      { projectTitle },
      { new: true } // Return the updated document
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(updatedTeam); // Send back the updated team
  } catch (error) {
    console.error('Error updating project title:', error);
    res.status(500).json({ message: 'Failed to update project title.' });
  }
});

export default router;
