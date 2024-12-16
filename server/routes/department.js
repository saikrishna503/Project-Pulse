import express from 'express';
import Department from '../models/department.js'; // Ensure this model can handle different departments

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const departments = await Department.find();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching departments', error });
    }
  });
  

// POST route to add a new department
router.post('/add', async (req, res) => {
  const { name, shortName } = req.body;  // Include shortName in the body

  if (!name || !shortName) {
    return res.status(400).json({ message: 'Both name and shortName are required' });
  }

  try {
    const newDepartment = new Department({ name, shortName });
    await newDepartment.save();
    res.status(201).json({ message: 'Department added successfully', department: newDepartment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE route to remove a department by its ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department', error });
  }
});

export default router;