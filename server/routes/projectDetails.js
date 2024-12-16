import express from 'express';
import ProjectDetails from '../models/projectDetails.js';

const router = express.Router();

// Fetch project details by teamNo
router.get('/project/:teamNo', async (req, res) => {
    const { teamNo } = req.params;

    try {
        const project = await ProjectDetails.findOne({ teamNo });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update project details by teamNo
router.put('/project/:teamNo', async (req, res) => {
    const { teamNo } = req.params;
    const updateData = req.body;

    // Log the update data to verify it is being sent correctly
    console.log('Update data:', updateData);

    try {
        const updatedProject = await ProjectDetails.findOneAndUpdate(
            { teamNo },
            updateData,
            { new: true, runValidators: true } // Return the updated document and run validations
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Failed to update project' });
    }
});

export default router;