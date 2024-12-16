import React from "react";
import styled from "styled-components";
import TeamMember from "./TeamMember";
const TeamWrapper = styled.div`
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
  margin-bottom: 80px;
  @media (max-width: 768px) {
    width: 90%;
    font-size: 16px;
    margin-bottom: 60px;
  }
`;

const TeamContainer = styled.div`
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

const Team = () => {
  const members = [
    { name: "Lakum Saikrishna", rollno: "21641A0503" },
    { name: "Manaswitha", rollno: "21641A0504" },
    { name: "Sushma", rollno: "21641A0505" },
    { name: "Prasad Rao", rollno: "21641A0506" }
  ];

  return (
    <TeamWrapper id="team">
      <Title>Meet the Crew</Title>
      <Description>We're a small, remote team working on interesting problems at the edge of compute.</Description>
      <TeamContainer>
        {members.map((member, index) => (
          <TeamMember key={index} name={member.name} rollno={member.rollno} />
        ))}
      </TeamContainer>
    </TeamWrapper>
  );
};

export default Team;
