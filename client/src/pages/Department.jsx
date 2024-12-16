// Department.js
import React from 'react';
import { useParams } from 'react-router-dom';
import CSDdepart from './CSDdepart';
import CSMdepart from './CSMdepart';
import CSEdepart from './CSEdepart'; // Assuming you have this component

const Department = () => {
  const { department } = useParams(); 
  console.log(department.toLowerCase());// Get the department from the URL

  // Ensure that you use department to determine which component to render
  switch (department.toLowerCase()) {
    case 'csda':
      return <CSDdepart />;
    case 'csdb':
      return <CSDdepart />;
    case 'csdc':
      return <CSDdepart />;
    case 'csma':
      return <CSMdepart />;
    case 'csmb':
        return <CSMdepart />;
    case 'csmc':
        return <CSMdepart />;
  
    case 'csea':
      return <CSEdepart />;
    case 'cseb':
      return <CSEdepart />;
    case 'csec':
      return <CSEdepart />;
    case 'csed':
      return <CSEdepart />;
    // Add more cases as needed
    default:
      return <div>Department Not Found</div>;
  }
};

export default Department;
