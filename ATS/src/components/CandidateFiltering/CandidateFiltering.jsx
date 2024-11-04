import React, { useState } from 'react';
import './CandidateFiltering.css';

const CandidateFiltering = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Ganga',
      email: 'Gangakasi@example.com',
      designation: 'Software Engineer',
      companyName: 'Tech Solutions Inc.',
      experience: 6,
      skills: 'JavaScript, React',
      location: 'New York',
      availability: 'Immediate',
      status: 'Passed',
      resume: 'resume-johndoe.pdf',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      designation: 'Data Scientist',
      companyName: 'Data Analytics Corp.',
      experience: 3,
      skills: 'Python, Django',
      location: 'San Francisco',
      availability: '1 month',
      status: 'Failed',
      resume: 'resume-janesmith.pdf',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alicej@example.com',
      designation: 'Project Manager',
      companyName: 'Project Masters',
      experience: 5,
      skills: 'Agile, Scrum',
      location: 'Boston',
      availability: '2 weeks',
      status: 'Passed',
      resume: 'resume-alicejohnson.pdf',
    },
    {
      id: 4,
      name: 'Robert Brown',
      email: 'robertb@example.com',
      designation: 'UI/UX Designer',
      companyName: 'Design Studio',
      experience: 4,
      skills: 'Figma, Adobe XD',
      location: 'Chicago',
      availability: 'Immediate',
      status: 'Passed',
      resume: 'resume-robertbrown.pdf',
    },
    {
      id: 5,
      name: 'Emily Davis',
      email: 'emilyd@example.com',
      designation: 'Full Stack Developer',
      companyName: 'CodeCrafters',
      experience: 7,
      skills: 'JavaScript, Node.js, React',
      location: 'Los Angeles',
      availability: '1 month',
      status: 'Passed',
      resume: 'resume-emilydavis.pdf',
    },
    {
      id: 6,
      name: 'Michael Wilson',
      email: 'michaelw@example.com',
      designation: 'Business Analyst',
      companyName: 'Analytics Experts',
      experience: 2,
      skills: 'Excel, SQL',
      location: 'Miami',
      availability: '2 weeks',
      status: 'Failed',
      resume: 'resume-michaelwilson.pdf',
    },
    {
      id: 7,
      name: 'Olivia Martinez',
      email: 'oliviam@example.com',
      designation: 'Marketing Specialist',
      companyName: 'Marketing Gurus',
      experience: 3,
      skills: 'SEO, Content Writing',
      location: 'Seattle',
      availability: '3 weeks',
      status: 'Passed',
      resume: 'resume-oliviamartinez.pdf',
    },
    {
      id: 8,
      name: 'James Taylor',
      email: 'jamest@example.com',
      designation: 'Network Engineer',
      companyName: 'Tech Networks',
      experience: 8,
      skills: 'Cisco, TCP/IP',
      location: 'Dallas',
      availability: 'Immediate',
      status: 'Passed',
      resume: 'resume-jamestaylor.pdf',
    },
    {
      id: 9,
      name: 'Sophia Thompson',
      email: 'sophiat@example.com',
      designation: 'Software Tester',
      companyName: 'Quality Assurance Co.',
      experience: 5,
      skills: 'Manual Testing, Selenium',
      location: 'Atlanta',
      availability: '1 month',
      status: 'Failed',
      resume: 'resume-sophiathompson.pdf',
    },
    {
      id: 10,
      name: 'William Garcia',
      email: 'williamg@example.com',
      designation: 'Database Administrator',
      companyName: 'Database Solutions',
      experience: 4,
      skills: 'MySQL, Oracle',
      location: 'San Diego',
      availability: '2 weeks',
      status: 'Passed',
      resume: 'resume-williamgarcia.pdf',
    },
  ]);

  const calculateScore = (candidate) => {
    let experienceScore = candidate.experience >= 5 ? 100 : candidate.experience >= 2 ? 50 : 0;
    let skillsScore = ['JavaScript', 'React', 'Node.js'].filter(skill => candidate.skills.includes(skill)).length / 3 * 100;
    let locationScore = candidate.location === 'New York' ? 100 : 0;
    let availabilityScore = candidate.availability === 'Immediate' ? 100 : 0;

    return (experienceScore + skillsScore + locationScore + availabilityScore) / 4;
  };

  candidates.forEach(candidate => {
    candidate.score = calculateScore(candidate);
  });

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const handleCellEdit = (id, field, value) => {
    setCandidates(prevCandidates =>
      prevCandidates.map(candidate =>
        candidate.id === id ? { ...candidate, [field]: value } : candidate
      )
    );
  };

  const filteredCandidates = candidates.filter(candidate => {
    return (candidate.skills.toLowerCase().includes(filterText.toLowerCase()) && 
            (filterStatus === 'all' || candidate.status.toLowerCase() === filterStatus));
  });

  const getResumeFilename = (candidate) => {
    const fileExtension = candidate.resume.split('.').pop();
    return `${candidate.name.replace(/\s+/g, '_')}.${fileExtension}`;
  };

  return (
    <div className={`candidate-filtering-container ${isFullScreen ? 'full-screen' : ''}`}>
      <h2 className="candfil" style = {{textDecoration :"underline"}}onDoubleClick={toggleFullScreen}>Candidate Filtering</h2>
      <input
        type="text"
        placeholder="Search by skills..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="filter-input"
      />

      {/* Scrollable table container */}
      <div className="table-container">
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Company Name</th>
              <th>Experience (Years)</th>
              <th>Skills Matched</th>
              <th>Location</th>
              <th>Availability</th>
              <th>Score</th>
              <th>Resume Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr key={candidate.id}>
                <td>{index + 1}</td>
                <td className="NAME" onDoubleClick={() => handleCellEdit(candidate.id, 'name', prompt("Edit Name:", candidate.name))}>
                  {candidate.name}
                </td>
                <td className="EMAIL" onDoubleClick={() => handleCellEdit(candidate.id, 'email', prompt("Edit Email:", candidate.email))}>
                  {candidate.email}
                </td>
                <td className="DESIGNATION" onDoubleClick={() => handleCellEdit(candidate.id, 'designation', prompt("Edit Designation:", candidate.designation))}>
                  {candidate.designation}
                </td>
                <td className="COMPANY" onDoubleClick={() => handleCellEdit(candidate.id, 'companyName', prompt("Edit Company Name:", candidate.companyName))}>
                  {candidate.companyName}
                </td>
                <td className="EXPERIENCE" onDoubleClick={() => handleCellEdit(candidate.id, 'experience', prompt("Edit Experience:", candidate.experience))}>
                  {candidate.experience}
                </td>
                <td className="SKILLS" onDoubleClick={() => handleCellEdit(candidate.id, 'skills', prompt("Edit Skills:", candidate.skills))}>
                  {candidate.skills}
                </td>
                <td className="LOCATION" onDoubleClick={() => handleCellEdit(candidate.id, 'location', prompt("Edit Location:", candidate.location))}>
                  {candidate.location}
                </td>
                <td className="AVAILABILITY" onDoubleClick={() => handleCellEdit(candidate.id, 'availability', prompt("Edit Availability:", candidate.availability))}>
                  {candidate.availability}
                </td>
                <td>
                  <div className="score-circle">
                    <svg width="72" height="72">
                      <circle cx="36" cy="36" r="32" fill="none" stroke="#e0e0e0" strokeWidth="10" />
                      <circle
                        cx="36"
                        cy="36"
                        r="32"
                        fill="none"
                        stroke={candidate.score >= 70 ? 'green' : candidate.score >= 50 ? 'orange' : 'red'}
                        strokeWidth="4"
                        strokeDasharray={`${candidate.score * 0.1} ${100 - candidate.score * 0.1}`}
                        strokeDashoffset="25"
                      />
                    </svg>
                    <span>{candidate.score.toFixed(2)}</span>
                  </div>
                </td>
                <td>
                  <div className="resume-actions">
                    <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="resume-action-button">View</a><br></br>
                    <a href={candidate.resume} download={getResumeFilename(candidate)} className="resume-action-button">Download</a>
                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateFiltering;
