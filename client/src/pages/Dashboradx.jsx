import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, LineController);

// Styled components
const Container = styled.div`
  padding: 40px;
  background-color: #1c1c1c;
  min-height: 100vh;
  color: white;
`;

const StatsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const StatCard = styled.div`
  padding: 30px;
  background: #2c2c2c;
  border-radius: 12px;
  border: 2px solid violet;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    background: #353535;
  }
`;

const PTitle = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #e0e0e0;
  text-align: center;
`;

const StatValue = styled(Typography)`
  font-size: 38px;
  font-weight: bold;
  color: violet;
  text-align: center;
`;

const BarChartContainer = styled.div`
  margin-top: 40px;
`;

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalProjects: 0,
    totalCompleted: 0,
    totalPending: 0,
    totalDepartments: 0,
  });
  const [departmentProjects, setDepartmentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjectSummary = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/projects/summary');
        setSummary(response.data);

        const departmentResponse = await axios.get('http://localhost:4000/api/projects/departmentStatus');
        console.log('Department Status:', departmentResponse.data); // Log for debugging

        setDepartmentProjects(departmentResponse.data.departmentStatus); // Ensure correct data structure
      } catch (err) {
        setError('Error fetching project summary');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectSummary();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Container>{error}</Container>;

  // Prepare data for the Bar Chart
  const labels = departmentProjects.map((dept) => dept.department);
  const totalProjects = departmentProjects.map((dept) => dept.totalProjects || 0);
  const completedProjects = departmentProjects.map((dept) => dept.completedProjects || 0);
  const pendingProjects = departmentProjects.map((dept) => dept.pendingProjects || 0);

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Projects',
        data: totalProjects,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Completed Projects',
        data: completedProjects,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        type: 'line',
        fill: false,
        tension: 0.2,
        pointRadius: 5,
      },
      {
        label: 'Pending Projects',
        data: pendingProjects,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        type: 'line',
        fill: false,
        tension: 0.2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += Math.round(context.raw * 100) / 100; // Round for better presentation
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'gray' },
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'gray' },
      },
    },
  };

  return (
    <Container>
      <StatsWrapper>
        <StatCard>
          <PTitle>Total Projects</PTitle>
          <StatValue variant="h4">{summary.totalProjects}</StatValue>
        </StatCard>
        <StatCard>
          <PTitle>Total Departments</PTitle>
          <StatValue variant="h4">{summary.totalDepartments}</StatValue>
        </StatCard>
        <StatCard>
          <PTitle>Total Completed Projects</PTitle>
          <StatValue variant="h4">{summary.totalCompleted}</StatValue>
        </StatCard>
        <StatCard>
          <PTitle>Total Pending Projects</PTitle>
          <StatValue variant="h4">{summary.totalPending}</StatValue>
        </StatCard>
      </StatsWrapper>

      <BarChartContainer>
        <Typography variant="h4" style={{ marginBottom: '20px', color: 'white' }}>
          Department-wise Project Status
        </Typography>
        <Bar data={data} options={options} />
      </BarChartContainer>
    </Container>
  );
};

export default Dashboard;
