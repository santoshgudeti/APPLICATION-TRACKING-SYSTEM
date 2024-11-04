import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Mainpage from './components/Mainpage/Mainpage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateJobDescription from './components/JobDescription/Create/CreateJobDescription';
import EditJobDescription from './components/JobDescription/Edit/EditJobDescription';
import CandidateFiltering from './components/CandidateFiltering/CandidateFiltering';

import Background from './assets/Background.mp4';
import EndFrame from './assets/EndFrame.png';

function App() {
  const [activeComponent, setActiveComponent] = useState('main');
  const [showEndFrame, setShowEndFrame] = useState(false);
  const [resumeData, setResumeData] = useState([]); // Initialize as an empty array
  const videoRef = useRef(null);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const handleResumeUpload = (data) => {
    // Store the uploaded resumes temporarily
    setResumeData(data);
  };

  const handleVideoEnd = () => {
    setShowEndFrame(true);
  };

  const handleSubmitToCandidateFiltering = () => {
    // This function can be used to submit the resumes to CandidateFiltering
    // Additional processing can be done here if needed
    // E.g., parsing resumes if not already done
  };

  return (
    <Router>
      <div style={{ position: 'relative', overflowY: 'auto', height: '100vh' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          onEnded={handleVideoEnd}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
            display: showEndFrame ? 'none' : 'block',
          }}
        >
          <source src={Background} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {showEndFrame && (
          <img
            src={EndFrame}
            alt="End Frame"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
            }}
          />
        )}

        <Navbar 
          onComponentChange={handleComponentChange} 
          handleResumeUpload={handleResumeUpload} 
          onSubmitToCandidateFiltering={handleSubmitToCandidateFiltering} // Pass the submit handler
        />

        <div style={{ paddingTop: '60px', paddingBottom: '20px' }}>
          {activeComponent === 'candidateFiltering' && <CandidateFiltering data={resumeData} />}
          {activeComponent === 'createJob' && <CreateJobDescription />}
          {activeComponent === 'editJob' && <EditJobDescription />}
          {activeComponent === 'main' && <Mainpage />}
          {resumeData.length > 0 && <ResumeDataDisplay data={resumeData} />} {/* Only display if there's data */}
        </div>

        <Routes>
          <Route path="/job-description/create" element={<CreateJobDescription />} />
          <Route path="/job-description/edit" element={<EditJobDescription />} />
        </Routes>
      </div>
    </Router>
  );
}

const ResumeDataDisplay = ({ data }) => {
  return (
    <div>
      <h2>Parsed Resume Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
