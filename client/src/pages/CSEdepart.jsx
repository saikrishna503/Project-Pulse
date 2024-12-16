import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// Styled components...
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

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

const CSEDepart = ({ projectTitle }) => {
  const { department } = useParams();
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    isRemoveModalOpen: false,
    selectedTeam: null,
  });
  const [newTeam, setNewTeam] = useState({ teamNo: "", projectTitle: "" });
  const [totalProjects, setTotalProjects] = useState(0);
  const [updatedTitle, setUpdatedTitle] = useState("");

  useEffect(() => {
    if (department) {
      const uppercaseDepartment = department.toUpperCase();
      fetchTeams(uppercaseDepartment);
    }
  }, [department]);

  const fetchTeams = (uppercaseDepartment) => {
    setIsLoading(true);
    fetch(`http://localhost:4000/api/cse/${uppercaseDepartment}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }
        return response.json();
      })
      .then((data) => {
        setTeams(data);
        setTotalProjects(data.length);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        alert("Failed to fetch teams. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleAddTeam = () => {
    if (!newTeam.teamNo || !newTeam.projectTitle) {
      alert("Both Team No and Project Title are required.");
      return;
    }

    fetch(`http://localhost:4000/api/cse/${department.toUpperCase()}/teams`, {
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
        setModalState({ ...modalState, isModalOpen: false });
        setNewTeam({ teamNo: "", projectTitle: "" });
      })
      .catch((error) => console.error("Error adding team:", error));
  };

  const handleRemoveTeam = () => {
    if (!modalState.selectedTeam) {
      alert("Please select a team to remove.");
      return;
    }

    fetch(
      `http://localhost:4000/api/cse/${department.toUpperCase()}/teams/${modalState.selectedTeam.teamNo}`,
      { method: "DELETE" }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to remove team");
        return response.json();
      })
      .then(() => {
        fetchTeams(department.toUpperCase());
        setModalState({ ...modalState, isRemoveModalOpen: false, selectedTeam: null });
      })
      .catch((error) => {
        console.error("Error removing team:", error);
        alert(error.message);
      });
  };

  const updateProjectTitle = async (teamNo) => {
    try {
      const response = await axios.put(`/api/cseDepart/updateTitle/${teamNo}`, {
        projectTitle: updatedTitle,
      });
      updateTeam(response.data);
      setUpdatedTitle("");
    } catch (error) {
      console.error("Error updating project title:", error);
      alert(error.response?.data?.message || "Failed to update project title.");
    }
  };

  const updateTeam = (updatedTeam) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => (team.teamNo === updatedTeam.teamNo ? updatedTeam : team))
    );
  };

  return (
    <Wrapper id={department}>
      <HeaderWrapper>
        <h1>{department ? department.toUpperCase() : "DEPARTMENT"} Teams</h1>
        <h1>Total No of Projects: {totalProjects}</h1>
      </HeaderWrapper>

      <TableWrapper>
        {isLoading ? (
          <div>Loading teams...</div>
        ) : teams.length > 0 ? (
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
        <CreateButton onClick={() => setModalState({ ...modalState, isModalOpen: true })}>
          + CREATE NEW TEAM
        </CreateButton>

        <RemoveButton onClick={() => setModalState({ ...modalState, isRemoveModalOpen: true })}>
          - REMOVE TEAM
        </RemoveButton>
      </ButtonContainer>

      {/* Create Team Modal */}
      {modalState.isModalOpen && (
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
              <CancelButton onClick={() => setModalState({ ...modalState, isModalOpen: false })}>
                Cancel
              </CancelButton>
            </ButtonGroup>
          </ModalContent>
        </ModalWrapper>
      )}

      {/* Remove Team Modal */}
      {modalState.isRemoveModalOpen && (
        <ModalWrapper>
          <ModalContent>
            <Header>Remove Team</Header>
            <div>Select a team to remove:</div>
            <select
              value={modalState.selectedTeam?.teamNo || ""}
              onChange={(e) => {
                const selectedTeamNo = e.target.value;
                const selectedTeam = teams.find((team) => team.teamNo === selectedTeamNo);
                setModalState({ ...modalState, selectedTeam });
              }}
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.teamNo} value={team.teamNo} width="100px">
                  {team.teamNo} - {team.projectTitle}
                </option>
              ))}
            </select>

            <ButtonGroup>
              <RemoveButton onClick={handleRemoveTeam}>Remove</RemoveButton>
              <CancelButton onClick={() => setModalState({ ...modalState, isRemoveModalOpen: false })}>
                Cancel
              </CancelButton>
            </ButtonGroup>
          </ModalContent>
        </ModalWrapper>
      )}
    </Wrapper>
  );
};

export default CSEDepart;
