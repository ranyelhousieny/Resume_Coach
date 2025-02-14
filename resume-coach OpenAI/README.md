# Resume Coach - OpenAI Enhanced Version

This is the OpenAI-enhanced version of Resume Coach, using LangChain and GPT-3.5-turbo for intelligent resume analysis and improvement suggestions.

## Features

- 📝 **Smart Resume Analysis**
  - Automatic text processing
  - Token-aware input handling
  - Intelligent text truncation

- 🤖 **AI Integration**
  - LangChain for structured prompts
  - GPT-3.5-turbo for efficient processing
  - Comprehensive error handling

- 🎯 **User Experience**
  - Clean Material-UI interface
  - Sample files for testing
  - Clear feedback and suggestions

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
PORT=54735 HOST=0.0.0.0 npm start
```

3. Open http://localhost:54735 in your browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app

## Project Structure

```
src/
├── components/       # React components
│   ├── ResumeForm.js
│   └── CoachingAdvice.js
├── services/        # Business logic
│   └── langchainService.js
├── hooks/           # Custom React hooks
│   └── useFileReader.js
└── App.js          # Main component
```

## Sample Files

Test the application with our provided samples:

- Software Engineer
  - [Resume](/samples/software-engineer-resume.txt)
  - [Job Description](/samples/software-engineer-jd.txt)

- Data Scientist
  - [Resume](/samples/data-scientist-resume.txt)
  - [Job Description](/samples/data-scientist-jd.txt)

## Environment Variables

- `PORT` - Server port (default: 54735)
- `HOST` - Server host (default: 0.0.0.0)

## Dependencies

- React
- Material-UI
- LangChain
- OpenAI API

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see the [LICENSE](../LICENSE) file for details
