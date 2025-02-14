import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function scanDirectory(dir: string): { [key: string]: { file: { contents: string } } } {
  const result: { [key: string]: { file: { contents: string } } } = {};
  
  // Read all files in directory
  const files = readdirSync(dir);
  
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively scan subdirectories
      const subDirResults = scanDirectory(fullPath);
      // Merge results
      Object.assign(result, subDirResults);
    } else {
      // Read file content
      const content = readFileSync(fullPath, 'utf-8');
      // Get relative path from templates directory
      const relativePath = fullPath.split('templates/')[1];
      // Add to result map
      result[relativePath] = {
        file: {
          contents: content
        }
      };
    }
  }
  
  return result;
}

// Usage:
const templateDir = '/Users/vaibhavverma/Documents/project 2/src/services/webcontainer/templates';
const fileMap = scanDirectory(templateDir);

// Export the result
export const dashboardTemplate = fileMap;