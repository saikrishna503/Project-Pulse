// Department.js
import React from 'react';
import { useParams } from 'react-router-dom';
import CSDProjectDetails from './CSDProjectDetails';
import CSMProjectDetails from './CSMProjectDetails';
import CSEProjectDetails from './CSEProjectDetails';

const ProjectDetails = () => {
    const { teamNo } = useParams();
    console.log(teamNo); // Log the team number for debugging
    const departmentCode = teamNo.substring(0, 3);
    // Switch case to determine which project details to display
    switch (departmentCode) {
      case 'CSE':
        return <CSEProjectDetails  />;
      case 'CSD':
        return <CSDProjectDetails />;
      case 'CSM':
        return <CSMProjectDetails />;
      // Add more cases as needed
      default:
        return <div>Project Not Found</div>;
    }
  };
  
  export default ProjectDetails;