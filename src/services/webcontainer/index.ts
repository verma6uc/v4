import { WebContainer } from '@webcontainer/api';
import { dashboardTemplate } from './templates/dashboard/files';

// Use dashboard template as default files
const defaultFiles = dashboardTemplate;

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

  async boot(repoUrl?: string): Promise<WebContainer> {
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

        if (repoUrl) {
          await this.setupGitEnvironment();
          await this.cloneRepository(repoUrl);
        } else {
          await this.webcontainerInstance.mount(defaultFiles);
        }

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

  private async setupGitEnvironment() {
    if (!this.webcontainerInstance) throw new Error('WebContainer not initialized');

    // Install git
    const installProcess = await this.webcontainerInstance.spawn('apt-get', ['install', 'git']);
    installProcess.output.pipeTo(
      new WritableStream({
        write: (data) => {
          this.writeToTerminal(data);
        },
      })
    );
    await installProcess.exit;
  }

  private async cloneRepository(repoUrl: string) {
    if (!this.webcontainerInstance) throw new Error('WebContainer not initialized');

    // Clone the repository
    const cloneProcess = await this.webcontainerInstance.spawn('git', ['clone', repoUrl, '.']);
    cloneProcess.output.pipeTo(
      new WritableStream({
        write: (data) => {
          this.writeToTerminal(data);
        },
      })
    );
    await cloneProcess.exit;
  }

  private async detectPackageManager(): Promise<'npm' | 'yarn' | 'pnpm'> {
    if (!this.webcontainerInstance) throw new Error('WebContainer not initialized');

    try {
      const files = await this.webcontainerInstance.fs.readdir('.');
      
      if (files.includes('yarn.lock')) {
        return 'yarn';
      } else if (files.includes('pnpm-lock.yaml')) {
        return 'pnpm';
      }
      
      return 'npm';
    } catch {
      return 'npm';
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
    const instance = await this.boot();
    if (!instance) {
      throw new Error('WebContainer not initialized');
    }

    try {
      // Detect package manager
      const packageManager = await this.detectPackageManager();
      
      // Install dependencies
      const installCmd = packageManager === 'yarn' ? 'yarn' : 
                        packageManager === 'pnpm' ? 'pnpm install' : 
                        'npm install';
      
      const [cmd, ...args] = installCmd.split(' ');
      const installProcess = await instance.spawn(cmd, args);
      
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
      const devCmd = packageManager === 'yarn' ? 'yarn dev' :
                    packageManager === 'pnpm' ? 'pnpm dev' :
                    'npm run dev';
      
      const [devCmdExec, ...devArgs] = devCmd.split(' ');
      const devProcess = await instance.spawn(devCmdExec, devArgs);
      
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