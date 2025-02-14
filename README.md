# Resume Coach

A web application to help you create and improve your professional resume using AI-powered feedback and suggestions. Get personalized recommendations to make your resume stand out and increase your chances of landing your dream job.

## Features

- 📝 **Interactive Resume Analysis**
  - Upload your resume (TXT, PDF, DOCX)
  - Paste job descriptions
  - Get instant AI-powered feedback

- 🤖 **AI-Powered Feedback**
  - Skills alignment analysis
  - Experience relevance check
  - Keyword optimization
  - Format and presentation tips

- 🎯 **Smart Processing**
  - Automatic text truncation for optimal results
  - Efficient token management
  - Clear feedback on improvements

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/ranyelhousieny/Resume_Coach.git
cd Resume_Coach
```

2. Install dependencies:
```bash
cd "resume-coach OpenAI"
npm install
```

3. Start the application:
```bash
PORT=54735 HOST=0.0.0.0 npm start
```

4. Open http://localhost:54735 in your browser

## Sample Files

We provide sample resumes and job descriptions for testing:

### Software Engineer
- [Sample Resume](/samples/software-engineer-resume.txt)
- [Sample Job Description](/samples/software-engineer-jd.txt)

### Data Scientist
- [Sample Resume](/samples/data-scientist-resume.txt)
- [Sample Job Description](/samples/data-scientist-jd.txt)

## Technical Details

- **Frontend**: React with Material-UI
- **AI Integration**: LangChain with GPT-3.5-turbo
- **File Handling**: Custom hooks for efficient file processing
- **State Management**: React hooks for local state
- **Error Handling**: Comprehensive error management for API calls

## Project Structure

```
resume-coach OpenAI/
├── public/
│   └── samples/          # Sample files for testing
├── src/
│   ├── components/       # React components
│   │   ├── ResumeForm.js
│   │   └── CoachingAdvice.js
│   ├── services/         # API and business logic
│   │   └── langchainService.js
│   ├── hooks/           # Custom React hooks
│   │   └── useFileReader.js
│   └── App.js           # Main application component
└── package.json
```

## API Key Setup

You'll need an OpenAI API key to use this application:
1. Go to https://platform.openai.com/api-keys
2. Create an account or log in
3. Generate a new API key
4. Enter the key in the application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- OpenAI for providing the GPT API
- LangChain for AI integration tools
- Material-UI for the component library