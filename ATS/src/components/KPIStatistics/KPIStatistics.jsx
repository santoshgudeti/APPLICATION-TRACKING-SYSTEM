// KPIStatistics.jsx
import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import './KPIStatistics.css';

const KPIStatistics = ({ candidateData }) => {
  // Return a message if there's no candidate data
  if (!candidateData || candidateData.length === 0) {
    return <p>No candidate data available to display KPIs.</p>;
  }

  // Prepare data for charts
  const experienceLevels = candidateData.map(candidate => candidate.experience);
  const statusCounts = {
    shortlisted: candidateData.filter(c => c.status === 'Shortlisted').length,
    applied: candidateData.filter(c => c.status === 'Applied').length,
    interviewing: candidateData.filter(c => c.status === 'Interviewing').length,
  };
  const submissionDates = candidateData.map(candidate => candidate.submissionDate);

  // Data for Bar Chart (Experience levels)
  const experienceData = {
    labels: Array.from(new Set(experienceLevels)),
    datasets: [
      {
        label: 'Candidates by Experience',
        data: experienceLevels.map(
          level => candidateData.filter(c => c.experience === level).length
        ),
        backgroundColor: '#76b5c5',
      },
    ],
  };

  // Data for Pie Chart (Candidate Status)
  const statusData = {
    labels: ['Shortlisted', 'Applied', 'Interviewing'],
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ['#f6d365', '#fda085', '#fdcb6e'],
      },
    ],
  };

  // Data for Line Chart (Submissions Over Time)
  const submissionData = {
    labels: submissionDates,
    datasets: [
      {
        label: 'Submissions',
        data: submissionDates.map(
          date => candidateData.filter(c => c.submissionDate === date).length
        ),
        fill: false,
        borderColor: '#0984e3',
      },
    ],
  };

  return (
    <div className="kpi-statistics">
      <h2>Key Performance Index</h2>

      <div className="charts-container">
        <div className="chart">
          <h3>Experience Levels</h3>
          <Bar data={experienceData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <h3>Application Status</h3>
          <Pie data={statusData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <h3>Resume Submissions Over Time</h3>
          <Line data={submissionData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default KPIStatistics;
