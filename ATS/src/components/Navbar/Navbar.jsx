import React, { useRef, useState } from 'react';
import SMlogo from '../../assets/SMlogo.png';
import { FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onComponentChange, handleResumeUpload }) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmitFiles = () => {
    if (selectedFiles.length > 0) {
      console.log("Submitting selected files:", selectedFiles);
      handleResumeUpload(selectedFiles); // Pass selected files to the parent component
      // Optionally, reset the selected files after submission
      setSelectedFiles([]);
    } else {
      console.warn("No files selected for submission.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <span>
          <img
            style={{
              height: "70px",
              width: "70px",
              marginRight: "30px",
              objectFit: "cover",
            }}
            src={SMlogo}
            alt="Logo"
          />
        </span>

        <a href="/profile" className="d-flex align-items-center text-decoration-none">
          <span style={{ color: "white", fontSize: '20px' }} className="profile d-flex align-items-center thick-underline">
            <FaUser style={{ marginRight: '10px' }} className="profile" />
            Profile
          </span>
        </a>

        <div className="navbar-content-container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Job Description Posting
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => onComponentChange('createJob')}
                  >
                    Create Job
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => onComponentChange('editJob')}
                  >
                    Edit Job
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link candidate-filtering-link"
                onClick={() => onComponentChange('candidateFiltering')}
              >
                Candidate Filtering
              </a>
            </li>

            <button
              className="upload-resume-button"
              onClick={handleUploadClick}
            >
              Upload Resume
            </button>

            <button
              className="submit-resume-button"
              onClick={handleSubmitFiles}
              style={{ marginLeft: '10px' }}
            >
              Submit
            </button>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx"
              multiple
            />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
