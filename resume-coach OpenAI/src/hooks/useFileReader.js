import { useState } from 'react';

export const useFileReader = () => {
  const [fileContent, setFileContent] = useState(null);
  const [error, setError] = useState(null);

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (event) => {
        setFileContent(event.target.result);
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        setError(error);
        reject(error);
      };

      reader.readAsText(file);
    });
  };

  return { fileContent, error, readFile };
};