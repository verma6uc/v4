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
  private static instance: WebContainerService | null = null;
  private webcontainerInstance: WebContainer | null = null;
  private terminalWriters: ((data: string) => void)[] = [];
  private isBooting = false;
  private bootPromise: Promise<WebContainer> | null = null;

  private constructor() {}

  static getInstance(): WebContainerService {
    if (!WebContainerService.instance) {
      WebContainerService.instance = new WebContainerService();
    }
    return WebContainerService.instance;
  }

  async boot(): Promise<WebContainer> {
    // If already booted, return the instance
    if (this.webcontainerInstance) {
      return this.webcontainerInstance;
    }

    // If currently booting, return the existing promise
    if (this.bootPromise) {
      return this.bootPromise;
    }

    // Start the boot process
    this.bootPromise = (async () => {
      try {
        // Add a small delay to ensure any previous instance is cleaned up
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.webcontainerInstance = await WebContainer.boot();
        await this.webcontainerInstance.mount(files);
        return this.webcontainerInstance;
      } catch (error) {
        this.bootPromise = null;
        this.webcontainerInstance = null;
        console.error('Failed to boot WebContainer:', error);
        throw error;
      }
    })();

    return this.bootPromise;
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
    const instance = await this.boot();
    if (!instance) {
      throw new Error('WebContainer not initialized');
    }

    try {
      // Install dependencies
      const installProcess = await instance.spawn('npm', ['install']);
      
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
      const devProcess = await instance.spawn('npm', ['run', 'dev']);
      
      devProcess.output.pipeTo(
        new WritableStream({
          write: (data) => {
            this.writeToTerminal(data);
          },
        })
      );

      // Wait for server to be ready
      return new Promise<string>((resolve) => {
        instance.on('server-ready', (_, url) => {
          resolve(url);
        });
      });
    } catch (error) {
      console.error('Failed to start dev server:', error);
      throw error;
    }
  }

  async teardown() {
    this.webcontainerInstance = null;
    this.bootPromise = null;
    this.terminalWriters = [];
    WebContainerService.instance = null;
    // Add a small delay to ensure cleanup
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

// Export singleton instance
export const webContainerService = WebContainerService.getInstance();