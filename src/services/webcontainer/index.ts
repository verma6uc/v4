import { WebContainer } from '@webcontainer/api';

const files = {
  'index.html': {
    file: {
      contents: `
<!DOCTYPE html>
<html>
  <head>
    <title>Prototype</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="app" class="p-4"></div>
    <script type="module" src="/src/main.js"></script>
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
  "type": "module",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "vite": "^4.0.4"
  }
}
      `
    }
  },
  'src': {
    directory: {
      'main.js': {
        file: {
          contents: `
document.querySelector('#app').innerHTML = \`
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">Prototype Preview</h1>
    <p class="text-gray-600">This is a live preview of your application.</p>
  </div>
\`
          `
        }
      }
    }
  }
};

class WebContainerService {
  private webcontainerInstance: WebContainer | null = null;
  private terminalWriters: ((data: string) => void)[] = [];

  async boot() {
    if (this.webcontainerInstance) {
      return this.webcontainerInstance;
    }

    try {
      this.webcontainerInstance = await WebContainer.boot();
      await this.webcontainerInstance.mount(files);
      return this.webcontainerInstance;
    } catch (error) {
      console.error('Failed to boot WebContainer:', error);
      throw error;
    }
  }

  onTerminalOutput(writer: (data: string) => void) {
    this.terminalWriters.push(writer);
    return () => {
      this.terminalWriters = this.terminalWriters.filter(w => w !== writer);
    };
  }

  private writeToTerminal(data: string) {
    this.terminalWriters.forEach(writer => writer(data));
  }

  async startDevServer() {
    if (!this.webcontainerInstance) {
      throw new Error('WebContainer not initialized');
    }

    try {
      // Install dependencies
      const installProcess = await this.webcontainerInstance.spawn('npm', ['install']);
      
      installProcess.output.pipeTo(
        new WritableStream({
          write: (data) => {
            this.writeToTerminal(data);
          },
        })
      );

      const installExitCode = await installProcess.exit;
      
      if (installExitCode !== 0) {
        throw new Error('Installation failed');
      }

      // Start dev server
      const devProcess = await this.webcontainerInstance.spawn('npm', ['run', 'dev']);
      
      devProcess.output.pipeTo(
        new WritableStream({
          write: (data) => {
            this.writeToTerminal(data);
          },
        })
      );

      // Wait for server to be ready
      return new Promise<string>((resolve) => {
        this.webcontainerInstance!.on('server-ready', (_, url) => {
          resolve(url);
        });
      });
    } catch (error) {
      console.error('Failed to start dev server:', error);
      throw error;
    }
  }

  async teardown() {
    // Cleanup resources if needed
    this.webcontainerInstance = null;
    this.terminalWriters = [];
  }
}

// Export singleton instance
export const webContainerService = new WebContainerService();