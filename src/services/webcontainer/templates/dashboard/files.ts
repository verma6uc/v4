export const dashboardTemplate = {
  'index.html': {
    file: {
      contents: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Prototype</title>
    <style>
      :root {
        --primary-color: #4f46e5;
        --secondary-color: #6366f1;
        --success-color: #22c55e;
        --warning-color: #eab308;
        --danger-color: #ef4444;
      }
      
      body {
        margin: 0;
        padding: 20px;
        font-family: system-ui, -apple-system, sans-serif;
        background-color: #f3f4f6;
      }
      
      .metric-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
      }
      
      .metric-card:hover {
        transform: translateY(-2px);
      }
      
      .metric-title {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }
      
      .metric-value {
        color: #111827;
        font-size: 1.875rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      .metric-change {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
      }
      
      .metric-change.positive { color: var(--success-color); }
      .metric-change.negative { color: var(--danger-color); }
      
      .metric-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
      }

      h1 {
        color: #111827;
        font-size: 1.875rem;
        font-weight: bold;
        margin-bottom: 2rem;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
      `
    }
  },
  'package.json': {
    file: {
      contents: `
{
  "name": "prototype",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "4.0.0",
    "vite": "4.3.9"
  }
}
      `
    }
  },
  'vite.config.js': {
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
  'src': {
    directory: {
      'main.jsx': {
        file: {
          contents: `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
          `
        }
      },
      'App.jsx': {
        file: {
          contents: `
import React from 'react';

export default function App() {
  return (
    <div className="container">
      <h1>Dashboard Overview</h1>
      
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-title">Total Revenue</div>
          <div className="metric-value">$48,574</div>
          <div className="metric-change positive">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 4L14 10L2 10L8 4Z" fill="currentColor"/>
            </svg>
            12.5% vs last month
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-title">Active Users</div>
          <div className="metric-value">2,420</div>
          <div className="metric-change positive">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 4L14 10L2 10L8 4Z" fill="currentColor"/>
            </svg>
            8.1% vs last month
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-title">Conversion Rate</div>
          <div className="metric-value">3.6%</div>
          <div className="metric-change negative">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12L14 6L2 6L8 12Z" fill="currentColor"/>
            </svg>
            1.2% vs last month
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-title">Avg. Session Duration</div>
          <div className="metric-value">4m 12s</div>
          <div className="metric-change positive">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 4L14 10L2 10L8 4Z" fill="currentColor"/>
            </svg>
            15.3% vs last month
          </div>
        </div>
      </div>
    </div>
  );
}
          `
        }
      }
    }
  }
};