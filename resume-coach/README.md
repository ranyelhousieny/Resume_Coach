# Resume Coach - React Version

This is the original React version of Resume Coach, providing a clean and intuitive interface for resume analysis and improvement.

## Features

- 📋 **Resume Management**
  - Upload resume files
  - Parse different file formats
  - Clean and intuitive interface

- 📊 **Analysis Tools**
  - Job description comparison
  - Keyword extraction
  - Format validation

- 💼 **Professional Tools**
  - Material-UI components
  - Responsive design
  - Cross-browser compatibility

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
│   ├── ResumeForm/
│   └── Analysis/
├── utils/           # Helper functions
├── styles/          # CSS and styling
└── App.js          # Main component
```

## Sample Files

Test the application with our provided samples in the root `/samples` directory:

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

- React 18+
- Material-UI
- React Router
- Other utilities (see package.json)

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). For detailed information about the development process, refer to:

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- Jest for testing

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder, ready for deployment.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Related Projects

- [Resume Coach OpenAI Version](../resume-coach%20OpenAI) - Enhanced version with AI capabilities

## License

MIT License - see the [LICENSE](../LICENSE) file for details

## Acknowledgments

- Create React App team
- Material-UI team
- All contributors to this project
