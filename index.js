const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Import axios for making HTTP requests
const pdf = require("pdf-parse");
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle text extraction from a PDF URL
app.post('/api/text/extract', async (req, res) => {
  try {
    const { pdfUrl } = req.body;

    // Fetch the PDF from the specified URL
    const response = await axios.get(pdfUrl, {
      responseType: 'arraybuffer', // Set response type to array buffer
    });

    // Extract text from the fetched PDF file
    const pdfBuffer = response.data;
    const pdfText = await extractTextFromPDF(pdfBuffer);

    res.json({ text: pdfText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during text extraction.' });
  }
});

// Function to extract text from PDF buffer
const extractTextFromPDF = async (pdfBuffer) => {
  try {
    const dataBuffer = Buffer.from(pdfBuffer); // Convert array buffer to Buffer
    const { text } = await pdf(dataBuffer); // Parse PDF
    return text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return '';
  }
};

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
