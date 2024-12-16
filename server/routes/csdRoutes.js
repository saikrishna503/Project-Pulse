import express from 'express';
import ProjectDetails from '../models/csd.js'; // Ensure the CSD model is imported correctly

const router = express.Router();

// Dynamic route for different CSD departments
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

// Remove a team by teamNo
router.delete('/:department/teams/:teamNo', async (req, res) => {
  const { teamNo } = req.params;

  try {
    console.log(`Attempting to remove team with teamNo: ${teamNo} for department: ${req.params.department}`);
    const result = await ProjectDetails.findOneAndDelete({ teamNo, department: req.params.department });
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

export default router;
