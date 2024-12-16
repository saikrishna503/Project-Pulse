import React, { useState, useEffect } from "react"; // Import useEffect
import styled from "styled-components";
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios


const DepartmentWrapper = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(90deg, rgba(0, 70, 209, 0.03) 0%, rgba(57, 14, 61, 0.1) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 95%, 0 100%);
`;

const Title = styled.div`
  font-size: 52px;
  font-weight: 800;
  text-align: center;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 36px;
  }
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
  width: 100%;
  max-width: 700px;
  text-align: center;
  color: hsl(246, 6%, 65%);
  margin-bottom: 40px;
  @media (max-width: 768px) {
    width: 90%;
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const DepartmentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  max-width: 1200px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DepartmentCard = styled.div`
  width: 250px;
  padding: 20px;
  border: 2px solid violet; /* Violet border */
  border-radius: 12px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: white; /* Ensure the text is white for visibility */
  backdrop-filter: blur(10px); /* Adds a blur effect behind the card for better readability */
`;


const CreateButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: violet;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  &:hover {
    background-color: darkviolet;
  }
`;

const RemoveButton = styled(CreateButton)`
  background-color: red;
  &:hover {
    background-color: darkred;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
`;

const Header = styled.h3`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
`;

const CancelButton = styled(CreateButton)`
  background-color: gray;
  &:hover {
    background-color: darkgray;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;
const RemoveModalWrapper = styled(ModalWrapper)`
  /* If you want any specific styles for the remove modal wrapper, add them here */
`;

const RemoveModalContent = styled(ModalContent)`
  /* If you want any specific styles for the remove modal content, add them here */
`;

const Department = () => {
  const [departments, setDepartments] = useState([
    { name: "Computer Science and Engineering", shortName: "CSE" },
    { name: "Computer Science and Engineering (Data Science)", shortName: "CSD" },
    { name: "Computer Science and Engineering (Artificial Intelligence)", shortName: "CSM" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: "", shortName: "" });
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Function to fetch departments
  const fetchDepartments = () => {
    setLoading(true); // Set loading to true when fetching starts
    fetch('http://localhost:4000/api/department')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch departments');
        return response.json();
      })
      .then((data) => {
        setDepartments(data); // Assuming data is an array of department objects
        setLoading(false); // Set loading to false when fetching completes
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setLoading(false); // Set loading to false even on error
      });
  };

  // Function to handle adding a new department
  const handleAddDepartment = () => {
    fetch('http://localhost:4000/api/department/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDepartment),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to add department');
        return response.json();
      })
      .then((data) => {
        setDepartments([...departments, data.department]); // Assuming data contains the new department
        setIsModalOpen(false);
        setNewDepartment({ name: "", shortName: "" });
      })
      .catch((error) => {
        console.error("Error adding department:", error);
        alert(error.message); // Notify user of the error
      });
  };

  // Function to handle removing a department
  const handleRemoveDepartment = () => {
    if (!selectedDepartment) {
      console.error("No department selected for removal.");
      return;
    }

    fetch(`http://localhost:4000/api/department/delete/${selectedDepartment._id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove department");
        }
        return response.json();
      })
      .then(() => {
        // Refresh the list of departments
        setDepartments(departments.filter(dep => dep._id !== selectedDepartment._id));
        setIsRemoveModalOpen(false);
        setSelectedDepartment(null);
      })
      .catch((error) => {
        console.error("Error removing department:", error);
        alert(error.message); // Notify user of the error
      });
  };

  return (
    <DepartmentWrapper id="departments">
  <Title>Departments</Title>
  <Description>
    Explore our diverse computer science departments offering specialized programs.
  </Description>
  <DepartmentContainer>
    {departments.map((department, index) => (
      <Link
        key={index}
        to={`/${department.shortName.toLowerCase()}`}
        style={{ textDecoration: 'none' }} // Optional: To remove underline from link
      >
        <DepartmentCard>
          {/* Displaying the department name and short name */}
          {department.name} <br /> ({department.shortName})
        </DepartmentCard>
      </Link>
    ))}
  </DepartmentContainer>

  {/* Wrapping the buttons in a div */}
  <div style={{ marginTop: '20px' }}>
    <CreateButton onClick={() => setIsModalOpen(true)}>
      + CREATE NEW DEPARTMENT
    </CreateButton>
    <RemoveButton
      style={{ marginLeft: '20px' }}
      onClick={() => setIsRemoveModalOpen(true)}
    >
      - REMOVE DEPARTMENT
    </RemoveButton>
  </div>



      {isModalOpen && (
        
          <ModalWrapper>
            <ModalContent>
              <Header>Add New Department</Header>
              <Input
                type="text"
                placeholder="Department Name"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Short Name"
                value={newDepartment.shortName}
                onChange={(e) => setNewDepartment({ ...newDepartment, shortName: e.target.value })}
              />
              <ButtonGroup>
                <CreateButton onClick={handleAddDepartment}>Add Department</CreateButton>
                <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
              </ButtonGroup>
            </ModalContent>
          </ModalWrapper>
        )}
        
        {isRemoveModalOpen && (
          <RemoveModalWrapper>
            <RemoveModalContent>
              <Header>Remove Department</Header>
              <p>Select a department to remove:</p>
              <select
                value={selectedDepartment?.name || ''}
                onChange={(e) => {
                  const department = departments.find(dep => dep.name === e.target.value);
                  setSelectedDepartment(department);
                }}
              >
                <option value="" disabled>Select a department</option>
                {departments.map((department, index) => (
                  <option key={index} value={department.name}>{department.name}</option>
                ))}
              </select>
              <ButtonGroup>
                <CreateButton onClick={handleRemoveDepartment}>Remove Department</CreateButton>
                <CancelButton onClick={() => setIsRemoveModalOpen(false)}>Cancel</CancelButton>
              </ButtonGroup>
            </RemoveModalContent>
          </RemoveModalWrapper>
        
      )}
    </DepartmentWrapper>
  );
};

export default Department;