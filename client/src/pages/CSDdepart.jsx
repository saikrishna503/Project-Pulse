import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from 'react-router-dom';

// Styled components
const Wrapper = styled.div`
  padding: 40px 0 80px 0; 
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(90deg, rgba(0, 70, 209, 0.03) 0%, rgba(57, 14, 61, 0.1) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 95%, 0 100%);
`;

const Title = styled.h1`
  font-size: 52px;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
`;

const TableWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const Table = styled.div`
  width: 100%;
  padding: 10px;
  border: 2px solid violet;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
`;

const InfoLink = styled(Link)`
  color: violet;
  text-decoration: none;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px; 
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
  border: 1px solid lightgray;
  border-radius: 5px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; /* Aligns children to opposite sides */
  align-items: center; /* Centers items vertically */
  padding: 20px 0; /* Add padding as needed */
`;

const CSDdepart = () => {
  const { department } = useParams();
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({ teamNo: "", projectTitle: "" });
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const uppercaseDepartment = department.toUpperCase();
    fetchTeams(uppercaseDepartment);
  }, [department]);

  const fetchTeams = (uppercaseDepartment) => {
    fetch(`http://localhost:4000/api/csd/${uppercaseDepartment}`)
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
        setTotalProjects(data.length); // Assuming each team counts as one project
      })
      .catch((error) => console.error("Error fetching teams:", error));
  };

  const handleAddTeam = () => {
    fetch(`http://localhost:4000/api/csd/${department.toUpperCase()}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTeam),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add team");
        return response.json();
      })
      .then(() => {
        fetchTeams(department.toUpperCase());
        setIsModalOpen(false);
        setNewTeam({ teamNo: "", projectTitle: "" });
      })
      .catch((error) => console.error("Error adding team:", error));
  };

  const handleRemoveTeam = () => {
    if (!selectedTeam) {
      console.error("No team selected for removal.");
      return;
    }

    fetch(`http://localhost:4000/api/csd/${department.toUpperCase()}/teams/${selectedTeam.teamNo}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove team");
        }
        return response.json();
      })
      .then(() => {
        fetchTeams(department.toUpperCase());
        setIsRemoveModalOpen(false);
        setSelectedTeam(null);
      })
      .catch((error) => console.error("Error removing team:", error));
  };

  return (
    <Wrapper id={department}>
      <HeaderWrapper>
      <h1>{department.toUpperCase()} Teams</h1>
      <h1><span>Total No of Projects: {totalProjects}</span></h1>
  
    </HeaderWrapper>
      <TableWrapper>
        {teams.length > 0 ? (
          teams.map((team) => (
            <Table key={team.teamNo}>
              <div>
                <div>Team No: {team.teamNo}</div>
                <div>Project Title: {team.projectTitle}</div>
              </div>
              <InfoLink to={`/project/${team.teamNo}`}>Show Info</InfoLink>
            </Table>
          ))
        ) : (
          <div>No teams available for this department.</div>
        )}
      </TableWrapper>

      <ButtonContainer>
        <CreateButton onClick={() => setIsModalOpen(true)}>
          + CREATE NEW TEAM
        </CreateButton>
        <RemoveButton onClick={() => setIsRemoveModalOpen(true)}>
          - REMOVE TEAM
        </RemoveButton>
      </ButtonContainer>

      {isModalOpen && (
        <ModalWrapper>
          <ModalContent>
            <Header>Add New Team</Header>
            <Input
              type="text"
              placeholder="Team No"
              value={newTeam.teamNo}
              onChange={(e) => setNewTeam({ ...newTeam, teamNo: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Project Title"
              value={newTeam.projectTitle}
              onChange={(e) => setNewTeam({ ...newTeam, projectTitle: e.target.value })}
            />
            <ButtonGroup>
              <CreateButton onClick={handleAddTeam}>Add Team</CreateButton>
              <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
            </ButtonGroup>
          </ModalContent>
        </ModalWrapper>
      )}

      {isRemoveModalOpen && (
        <ModalWrapper>
          <ModalContent>
            <Header>Remove Team</Header>
            <p>Select a team to remove:</p>
            <select
              value={selectedTeam?.teamNo || ''}
              onChange={(e) => {
                const team = teams.find(t => t.teamNo === e.target.value);
                setSelectedTeam(team);
              }}
            >
              <option value="" disabled>Select a team</option>
              {teams.map((team) => (
                <option key={team.teamNo} value={team.teamNo}>{team.teamNo}</option>
              ))}
            </select>
            <ButtonGroup>
              <CreateButton onClick={handleRemoveTeam}>Remove Team</CreateButton>
              <CancelButton onClick={() => setIsRemoveModalOpen(false)}>Cancel</CancelButton>
            </ButtonGroup>
          </ModalContent>
        </ModalWrapper>
      )}
    </Wrapper>
  );
};

export default CSDdepart;
