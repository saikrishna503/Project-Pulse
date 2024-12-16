import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaEdit } from 'react-icons/fa';
import { Bar } from "react-chartjs-2";
import axios from 'axios'; // Add this line at the top

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Wrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(90deg, rgba(0, 70, 209, 0.03) 0%, rgba(57, 14, 61, 0.1) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 95%, 0 100%);
`;

const PTitle = styled.div`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 20px;
  color: #E0E0E0; /* Change to your desired light color */
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;


const EditIcon = styled(FaEdit)`
  cursor: pointer;
  margin-left: 10px;
  color: violet;
  font-size: 24px;
`;

const Details = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border: 2px solid violet;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
`;

const DetailItem = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid violet;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.15);
  color: ${({ theme }) => theme.text};
  transition: border 0.3s ease;

  &:focus {
    border: 2px solid violet;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: violet;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkviolet;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; // spacing between the elements
  width: 100%;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border: 2px solid violet;
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const ProjectDetails = ({ onTitleUpdate }) => {
  const { teamNo } = useParams();
  const [team, setTeam] = useState({ teamMembers: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(''); // Add this line
  const [teams, setTeams] = useState([]);


  const [formData, setFormData] = useState({
    teamMembers: [],
    teamNo: "",
    projectTitle: "",
    tasks: {}
  });

  const tasks = [
    { label: "Review I", key: "reviewI" },
    { label: "Review II", key: "reviewII" },
    { label: "Review III", key: "reviewIII" },
    { label: "Final Review", key: "finalReview" },
    { label: "Documentation", key: "documentation" },
  ];

  useEffect(() => {
    fetch(`http://localhost:4000/api/csea/project/${teamNo}`)
      .then((response) => response.json())
      .then((data) => {
        setTeam(data);
        setFormData({
          ...data,
          tasks: data.tasks || {},
          teamNo: data.teamNo,
          projectTitle: data.projectTitle,
        });
      })
      .catch((error) => console.error("Error fetching team data:", error));
  }, [teamNo]);


  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (taskKey) => {
    setFormData((prev) => {
      const updatedTasks = { ...prev.tasks, [taskKey]: !prev.tasks[taskKey] };
      const newProgress = calculateProgress(updatedTasks); // Use updatedTasks here
      return { ...prev, tasks: updatedTasks, projectProgress: newProgress };
    });
  };
  
  // Adjusted progress calculation function
  const calculateProgress = (updatedTasks = formData.tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = Object.values(updatedTasks).filter(Boolean).length;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };
  

  const progressPercentage = calculateProgress();

  const data = {
    labels: ["Project Progress"],
    datasets: [
      {
        label: "Progress (%)",
        data: [progressPercentage],
        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const handleSave = () => {
    // Calculate the progress and prepare the updated data
    const updatedFormData = { ...formData };

    // Save the data to the server
    fetch(`http://localhost:4000/api/csea/project/${teamNo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((response) => response.json())
      .then((updatedTeam) => {
        setFormData(updatedTeam);
        setIsEditing(false);

        // Call the updateTeam function to update the project title in the parent
        updateTeam(updatedTeam);
      })
      .catch((error) => console.error("Error saving team data:", error));
  };

  const updateProjectTitle = async (teamNo) => {
    try {
      const response = await axios.put(`/api/cse/updateTitle/${teamNo}`, {
        projectTitle: updatedTitle,
      });
      updateTeam(response.data);
      onTitleUpdate(response.data.projectTitle); // Pass the updated title back to the parent
      setUpdatedTitle('');
    } catch (error) {
      console.error('Error updating project title:', error);
      alert(error.response?.data?.message || 'Failed to update project title.');
    }
  };

  const updateTeam = (updatedTeam) => {
    setTeams((prevTeams) =>
        prevTeams.map((team) => (team.teamNo === updatedTeam.teamNo ? updatedTeam : team))
    );
};

  return (
    <Wrapper>
      <PTitle>
        <span>{team.projectTitle}</span>
        <EditIcon onClick={handleEditClick} />
      </PTitle>
      <Details>
        {isEditing ? (
          <div>
            <DetailItem>
              <strong>Team No:</strong>
            </DetailItem>
            <DetailItem>
              <strong>Project Title:</strong>
              <Input
                type="text"
                name="projectTitle"
                value={formData.projectTitle || ""}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>Project Abstract:</strong>
              <Input
                type="text"
                name="projectAbstract"
                value={formData.projectAbstract || ""}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>Team Leader:</strong>
              <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ marginBottom: '5px', display: 'block' }}>Name</label>
                  <Input
                    type="text"
                    name="teamLeaderName"
                    value={formData.teamLeader ? formData.teamLeader.name : ""}
                    onChange={e => {
                      setFormData(prev => ({
                        ...prev,
                        teamLeader: { ...prev.teamLeader, name: e.target.value }
                      }));
                    }}
                    placeholder="Team Leader Name"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ marginBottom: '5px', display: 'block' }}>Roll No</label>
                  <Input
                    type="text"
                    name="teamLeaderRollNo"
                    value={formData.teamLeader ? formData.teamLeader.rollNo : ""}
                    onChange={e => {
                      setFormData(prev => ({
                        ...prev,
                        teamLeader: { ...prev.teamLeader, rollNo: e.target.value }
                      }));
                    }}
                    placeholder="Team Leader Roll No"
                  />
                </div>
              </div>
            </DetailItem>
            <DetailItem>
              <strong>Team Members:</strong>
              <ul>
                {formData.teamMembers && formData.teamMembers.length > 0 ? (
                  formData.teamMembers.map((member, index) => (
                    <li key={index} style={{ marginBottom: "20px", listStyle: "none" }}>
                      <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ marginBottom: '5px', display: 'block' }}>Name</label>
                          <Input
                            type="text"
                            name={`teamMemberName_${index}`}
                            value={member.name || ""}
                            onChange={(e) => {
                              const updatedMembers = [...formData.teamMembers];
                              updatedMembers[index].name = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                teamMembers: updatedMembers,
                              }));
                            }}
                            placeholder="Team Member Name"
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ marginBottom: '5px', display: 'block' }}>Roll No</label>
                          <Input
                            type="text"
                            name={`teamMemberRollNo_${index}`}
                            value={member.rollNo || ""}
                            onChange={(e) => {
                              const updatedMembers = [...formData.teamMembers];
                              updatedMembers[index].rollNo = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                teamMembers: updatedMembers,
                              }));
                            }}
                            placeholder="Team Member Roll No"
                          />
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li style={{ color: 'white' }}>No team members available.</li>
                )}
              </ul>
            </DetailItem>
            <DetailItem>
              <strong>Guide Name:</strong>
              <Input
              type="text"
              name="guideName"
              value={formData.guideName}
              onChange={handleInputChange}
            />
            </DetailItem>
            

            <DetailItem>
              <strong>Tasks:</strong>
              <FlexContainer>
                {tasks.map((task) => (
                  <TaskWrapper key={task.key}>
                    <TaskItem>
                      <Checkbox
                        type="checkbox"
                        checked={!!formData.tasks[task.key]}
                        onChange={() => handleTaskChange(task.key)}
                      />
                      {task.label}
                    </TaskItem>
                  </TaskWrapper>
                ))}
              </FlexContainer>
            </DetailItem>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        ) : (
          <div>
            <DetailItem>
              <strong>Team No:</strong> {team.teamNo}
            </DetailItem>
            <DetailItem>
              <strong>Project Title:</strong> {team.projectTitle}
            </DetailItem>
            <DetailItem>
              <strong>Project Abstract:</strong> {team.projectAbstract}
            </DetailItem>
            <DetailItem>
              <strong>Team Leader:</strong>
              <div>{team.teamLeader ? team.teamLeader.name : "N/A"}</div>
              <div>Roll No: {team.teamLeader ? team.teamLeader.rollNo : "N/A"}</div>
            </DetailItem>
            <DetailItem>
              <strong>Team Members:</strong>
              <ul>
                {team.teamMembers && team.teamMembers.length > 0 ? (
                  team.teamMembers.map((member, index) => (
                    <li key={index} style={{ color: 'white' }}>
                      {member.name} (Roll No: {member.rollNo})
                    </li>
                  ))
                ) : (
                  <li style={{ color: 'white' }}>No team members available.</li>
                )}
              </ul>
            </DetailItem>
            <DetailItem>
              <strong>Guide Name:</strong> {team.guideName}
            </DetailItem>
            <DetailItem>
              <strong>Project Progress:</strong> {progressPercentage}%
              <Bar data={data} options={options} height={80} />
            </DetailItem>
          </div>
        )}
      </Details>
    </Wrapper>
  );
};

export default ProjectDetails;
