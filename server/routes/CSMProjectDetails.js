import express from 'express';
import CSMProjectDetails from '../models/CSMProjectDetails.js'; // Adjust the import as necessary

const router = express.Router();

// Get CSM project details by teamNo
router.get('/project/:teamNo', async (req, res) => {
    const { teamNo } = req.params;

    try {
        const project = await CSMProjectDetails.findOne({ teamNo });
        if (!project) {
            return res.status(404).json({ message: 'CSM Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching CSM project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update CSM project details by teamNo
router.put('/project/:teamNo', async (req, res) => {
    const { teamNo } = req.params;
    const updateData = req.body;
  
    try {
      const updatedProject = await CSMProjectDetails.findOneAndUpdate(
        { teamNo },
        updateData,
        { new: true } // Return the updated document
      );
  
      if (!updatedProject) {
        return res.status(404).json({ message: 'CSM Project not found' });
      }
  
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error('Error updating CSM project:', error);
      res.status(500).json({ message: 'Failed to update CSM project' });
    }
});

export default router;
