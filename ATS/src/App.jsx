import { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Mainpage from './components/Mainpage/Mainpage';
import Sidebar from './components/Mainpage/Sidebar/Sidebar';
import CreateJobDescription from './components/JobDescription/Create/CreateJobDescription';
import EditJobDescription from './components/JobDescription/Edit/EditJobDescription';
import CandidateFiltering from './components/CandidateFiltering/CandidateFiltering';
import KPIStatistics from './components/KPIStatistics/KPIStatistics';
import Background from './assets/Background.mp4';
import EndFrame from './assets/EndFrame.png';
import Image3 from './assets/image3.jpg';

function App() {
  const [activeComponent, setActiveComponent] = useState('main');
  const [showEndFrame, setShowEndFrame] = useState(false);
  const [resumeData, setResumeData] = useState([]);
  const videoRef = useRef(null);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const handleResumeUpload = (data) => {
    if (data && data.length > 0) {
      setResumeData(data);
    } else {
      console.warn("No data available from resume upload.");
    }
  };

  const handleVideoEnd = () => {
    setShowEndFrame(true);
  };

  const activeJobs = 5; // Example number of active jobs
  const shortlisted = resumeData.filter(resume => resume.status === 'Shortlisted').length; // Count shortlisted resumes

  return (
    <Router>
      <div style={{ overflowY: 'auto', height: '100vh' }}>
        {/* First section with video background */}
        <div style={{ position: 'relative', height: '100vh' }}>
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
          <Navbar onComponentChange={handleComponentChange} handleResumeUpload={handleResumeUpload} />
          <Sidebar onComponentChange={handleComponentChange} />
        </div>

        {/* Second section with static background image */}
        <div
          
        >
          <KPIStatistics candidateData={resumeData} totalResumes={resumeData.length} activeJobs={activeJobs} shortlisted={shortlisted} />

          <div style={{ paddingTop: '60px', paddingBottom: '20px' }}>
            {activeComponent === 'candidateFiltering' && <CandidateFiltering data={resumeData} />}
            {activeComponent === 'createJob' && <CreateJobDescription />}
            {activeComponent === 'editJob' && <EditJobDescription />}
            {activeComponent === 'main' && <Mainpage />}
            {resumeData.length > 0 && <ResumeDataDisplay data={resumeData} />}
          </div>

          <Routes>
            <Route path="/job-description/create" element={<CreateJobDescription />} />
            <Route path="/job-description/edit" element={<EditJobDescription />} />
            {/* Add a default route for the root path */}
            <Route path="/" element={<Mainpage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const ResumeDataDisplay = ({ data }) => {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
  