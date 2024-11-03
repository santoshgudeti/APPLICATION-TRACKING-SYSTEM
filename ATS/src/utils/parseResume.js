import { getDocument } from 'pdfjs-dist/legacy/build/pdf';

// Function to parse resume and extract specific information
const parseResume = async (file) => {
  const pdfData = await file.arrayBuffer();
  const pdf = await getDocument({ data: pdfData }).promise;
  const numPages = pdf.numPages;

  let text = '';
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(' ');
    text += ` ${pageText}`;
  }

  // Extract specific fields from the text
  const parsedData = extractResumeDetails(text);

  return parsedData;
};

// Function to extract specific details from the full text of the resume
const extractResumeDetails = (text) => {
  const nameMatch = text.match(/(?<=Name:)(.*?)(?=Email:)/);
  const emailMatch = text.match(/(?<=Email:)(.*?)(?=Phone:)/);
  const phoneMatch = text.match(/(?<=Phone:)(.*?)(?=Experience:)/);
  const skillsMatch = text.match(/(?<=Skills:)(.*?)(?=Education:)/);
  const experienceMatch = text.match(/(?<=Experience:)(.*?)(?=Education:)/);
  const educationMatch = text.match(/(?<=Education:)(.*?)(?=$)/);

  return {
    name: nameMatch ? nameMatch[0].trim() : 'N/A',
    email: emailMatch ? emailMatch[0].trim() : 'N/A',
    phone: phoneMatch ? phoneMatch[0].trim() : 'N/A',
    skills: skillsMatch ? skillsMatch[0].trim().split(',').map(skill => skill.trim()) : [],
    experience: experienceMatch ? experienceMatch[0].trim() : 'N/A',
    education: educationMatch ? educationMatch[0].trim() : 'N/A',
    fullText: text,
  };
};

export default parseResume;
