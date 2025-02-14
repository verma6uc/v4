import { styles } from './styles';
import { chartData, inventoryItems, stockEvents } from './data';
import { components } from './components';
import { featureComponents } from './feature-components';
import { eventsComponents } from './events-components';
import { inventoryComponents } from './inventory-components';

export const dashboardTemplate = {
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
      contents: `
{
  "name": "inventory-manager",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "lucide-react": "^0.344.0",
    "recharts": "^2.12.0",
    "react-router-dom": "^6.22.0",
    "date-fns": "^3.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "4.0.0",
    "vite": "4.3.9",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
      `
    }
  },
  'vite.config.ts': {
    file: {
      contents: `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173
    }
  }
});
      `
    }
  },
  'tsconfig.json': {
    file: {
      contents: `
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
      `
    }
  },
  'tsconfig.node.json': {
    file: {
      contents: `
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
      `
    }
  },
  'src/main.tsx': {
    file: {
      contents: `
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
      `
    }
  },
  'src/App.tsx': {
    file: {
      contents: `
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { Inventory } from './components/inventory/Inventory';
import { StockEvents } from './components/events/StockEvents';

// Sample data
const chartData = ${JSON.stringify(chartData, null, 2)};
const inventoryItems = ${JSON.stringify(inventoryItems, null, 2)};
const stockEvents = ${JSON.stringify(stockEvents, null, 2)};

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard chartData={chartData} />} />
          <Route path="/inventory" element={<Inventory initialItems={inventoryItems} />} />
          <Route path="/stock-events" element={<StockEvents events={stockEvents} />} />
        </Routes>
      </div>
    </div>
  );
}
      `
    }
  },
  // Include all components
  ...components,
  ...featureComponents,
  ...eventsComponents,
  ...inventoryComponents
};
