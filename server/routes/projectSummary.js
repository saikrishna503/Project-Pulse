import express from 'express';
import Department from '../models/department.js';  
import CSEProject from '../models/projectDetails.js';
import CSMProject from '../models/CSMProjectDetails.js';
import CSDProject from '../models/CSDProjectDetails.js';

const router = express.Router();

const getProjectStats = async (Model) => {
    const totalProjects = await Model.countDocuments();
    const completedProjects = await Model.countDocuments({ projectProgress: 100 });
    const pendingProjects = totalProjects - completedProjects;

    return { totalProjects, completedProjects, pendingProjects };
};

router.get('/summary', async (req, res) => {
    try {
        const totalDepartments = await Department.countDocuments();

        // Fetch all project stats in parallel using Promise.all
        const [cseStats, csmStats, csdStats] = await Promise.all([
            getProjectStats(CSEProject),
            getProjectStats(CSMProject),
            getProjectStats(CSDProject)
        ]);

        const totalProjects =
            cseStats.totalProjects + csmStats.totalProjects + csdStats.totalProjects;
        const totalCompleted =
            cseStats.completedProjects + csmStats.completedProjects + csdStats.completedProjects;
        const totalPending = totalProjects - totalCompleted;

        res.status(200).json({
            totalDepartments,
            totalProjects,
            totalCompleted,
            totalPending,
        });
    } catch (error) {
        console.error('Error fetching project summary:', error);
        res.status(500).json({ message: 'Internal server error while fetching project summary' });
    }
});

router.get('/departmentStatus', async (req, res) => {
    try {
        const [cseStats, csmStats, csdStats] = await Promise.all([
            getProjectStats(CSEProject),
            getProjectStats(CSMProject),
            getProjectStats(CSDProject)
        ]);

        const departmentStatus = [
            { department: 'CSE', ...cseStats },
            { department: 'CSM', ...csmStats },
            { department: 'CSD', ...csdStats },
        ];

        console.log('Department Status:', departmentStatus); // Log for debugging
        res.status(200).json({ departmentStatus });
    } catch (error) {
        console.error('Error fetching department status:', error);
        res.status(500).json({ message: 'Internal server error while fetching department status' });
    }
});

export default router;
