import { writeFileSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// First, read all necessary files
const templateDir = __dirname;
const dashboardDir = join(templateDir, 'dashboard');

// Read data and styles
const styles = readFileSync(join(dashboardDir, 'styles.ts'), 'utf-8');
const data = readFileSync(join(dashboardDir, 'data.ts'), 'utf-8');

// Read all component files recursively
function readDirRecursively(dir: string, baseDir: string = dir): { [key: string]: { file: { contents: string } } } {
  const result: { [key: string]: { file: { contents: string } } } = {};
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = fullPath.replace(baseDir + '/', '');

    if (entry.isDirectory()) {
      Object.assign(result, readDirRecursively(fullPath, baseDir));
    } else if (entry.isFile() && !entry.name.endsWith('.ts')) {
      // Skip TypeScript files as they're handled separately
      const content = readFileSync(fullPath, 'utf-8');
      result[relativePath] = {
        file: {
          contents: content
        }
      };
    }
  }

  return result;
}

// Generate the template object
const template = {
  // Include base files
  'index.html': {
    file: {
      contents: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Inventory Manager</title>
    <style>
${styles}
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
      `
    }
  },
  'package.json': {
    file: {
      contents: readFileSync(join(dashboardDir, 'package.json'), 'utf-8')
    }
  },
  'tsconfig.json': {
    file: {
      contents: readFileSync(join(dashboardDir, 'tsconfig.json'), 'utf-8')
    }
  },
  'vite.config.ts': {
    file: {
      contents: readFileSync(join(dashboardDir, 'vite.config.ts'), 'utf-8')
    }
  },
  // Include all component files
  ...readDirRecursively(join(dashboardDir, 'components'))
};

// Generate the output
const output = `import { styles } from './styles';
import { chartData, inventoryItems, stockEvents } from './data';

export const dashboardTemplate = ${JSON.stringify(template, null, 2)};`;

// Write to files.ts
const outputPath = join(dashboardDir, 'files.ts');
writeFileSync(outputPath, output);

console.log('Generated files.ts successfully!');