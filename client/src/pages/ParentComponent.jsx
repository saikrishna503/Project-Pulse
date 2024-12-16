import React, { useState } from 'react';
import CSEProjectDetails from './CSEProjectDetails';
import CSEdepart from './CSEdepart';

const ParentComponent = () => {
  const [projectTitle, setProjectTitle] = useState('');

  const handleTitleUpdate = (newTitle) => {
    setProjectTitle(newTitle);
  };

  return (
    <div>
      <CSEProjectDetails onTitleUpdate={handleTitleUpdate} />
      <CSEdepart projectTitle={projectTitle} />
    </div>
  );
};

export default ParentComponent;
