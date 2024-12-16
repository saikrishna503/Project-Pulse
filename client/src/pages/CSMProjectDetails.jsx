import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaEdit } from 'react-icons/fa';

const Wrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(90deg, rgba(0, 70, 209, 0.03) 0%, rgba(57, 14, 61, 0.1) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 95%, 0 100%);
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
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

const CSMProjectDetails = () => {
  const { teamNo } = useParams(); 
  const [team, setTeam] = useState({ teamMembers: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/api/csm/project/${teamNo}`)
      .then((response) => response.json())
      .then((data) => {
        setTeam(data);
        setFormData(data);
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

  const handleSave = () => {
    fetch(`http://localhost:4000/api/csm/project/${teamNo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        setTeam(data);
        setIsEditing(false);
      })
      .catch(error => console.error("Error saving team data:", error));
  };

  return (
    <Wrapper>
      <Title>
        <span>Team No: {team.teamNo} - {team.projectTitle}</span>
        <EditIcon onClick={handleEditClick} />
      </Title>
      <Details>
        {isEditing ? (
          <div>
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
              <Input
                type="text"
                name="teamLeader"
                value={formData.teamLeader ? formData.teamLeader.name : ""}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>Team Members:</strong>
              {formData.teamMembers.map((member, index) => (
                <Input
                  key={index}
                  type="text"
                  name={`teamMember${index}`}
                  value={member.name}
                  onChange={e => {
                    const updatedMembers = [...formData.teamMembers];
                    updatedMembers[index].name = e.target.value;
                    setFormData(prev => ({ ...prev, teamMembers: updatedMembers }));
                  }}
                />
              ))}
            </DetailItem>
            <DetailItem>
              <strong>Guide Name:</strong>
              <Input
                type="text"
                name="guideName"
                value={formData.guideName || ""}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>Project Progress:</strong>
              <Input
                type="number"
                name="projectProgress"
                value={formData.projectProgress || 0}
                onChange={handleInputChange}
              />
            </DetailItem>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        ) : (
          <>
            <DetailItem><strong>Project Abstract:</strong> {team.projectAbstract || "N/A"}</DetailItem>
            <DetailItem><strong>Team Leader:</strong> {team.teamLeader ? `${team.teamLeader.name} (Roll No: ${team.teamLeader.rollNo})` : "N/A"}</DetailItem>
            <DetailItem><strong>Team Members:</strong></DetailItem>
            <ul>
              {team.teamMembers && team.teamMembers.length > 0 ? (
                team.teamMembers.map((member, index) => (
                  <li key={index} style={{ color: 'white' }}>{member.name} (Roll No: {member.rollNo})</li>
                ))
              ) : (
                <li style={{ color: 'white' }}>No team members available.</li>
              )}
            </ul>
            <DetailItem><strong>Guide Name:</strong> {team.guideName || "N/A"}</DetailItem>
            <DetailItem><strong>Project Progress:</strong> {team.projectProgress || 0}%</DetailItem>
          </>
        )}
      </Details>
    </Wrapper>
  );
};

export default CSMProjectDetails;
