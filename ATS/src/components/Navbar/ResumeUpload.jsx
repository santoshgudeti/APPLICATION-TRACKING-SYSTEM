// ResumeUpload.jsx
import React, { useState } from 'react';
import parsePDF from '../../utils/parseResume'; // Correct path
const ResumeUpload = ({ onResumesParsed }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    const parsedResumes = await Promise.all(files.map(async (file) => {
      const parsedData = await parseResume(file);
      return parsedData; // Ensure parsedData is a structured object with fields like name, email, etc.
    }));
    onResumesParsed(parsedResumes);
  };

  return (
    <div>
      <h3>Upload Resumes</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ResumeUpload;
