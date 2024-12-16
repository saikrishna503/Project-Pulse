import express from 'express';
import CSDProjectDetails from '../models/CSDProjectDetails.js'; // Adjust the import as necessary

const router = express.Router();

// Get CSD project details by teamNo
router.get('/project/:teamNo', async (req, res) => {
    const { teamNo } = req.params;

    try {
        const project = await CSDProjectDetails.findOne({ teamNo });
        if (!project) {
            return res.status(404).json({ message: 'CSD Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching CSD project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/project/:teamNo', async (req, res) => {
  const { teamNo } = req.params;
  const updateData = req.body;
  
  console.log("Update data:", updateData); // Log the update data

  try {
    const updatedProject = await CSDProjectDetails.findOneAndUpdate(
      { teamNo },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'CSD Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating CSD project:', error);
    res.status(500).json({ message: 'Failed to update CSD project', error });
  }
});


export default router;
