import React, { useEffect, useState, useCallback } from 'react';
import { Terminal } from './Terminal';
import { Preview } from './Preview';
import { webContainerService } from '../../../services/webcontainer';

export function PrototypeTab() {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    const initializeWebContainer = async () => {
      try {
        // Ensure cleanup of any existing instance
        await webContainerService.teardown();

        // Wait a bit before initializing
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!isMounted) return;

        await webContainerService.boot();
        if (!isMounted) return;

        const url = await webContainerService.startDevServer();
        if (!isMounted) return;

        setPreviewUrl(url);
        setError(undefined);
      } catch (err) {
        if (!isMounted) return;
        console.error('WebContainer error:', err);
        setError(err instanceof Error ? err.message : 'Failed to start development server');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeWebContainer();

    return () => {
      isMounted = false;
      if (cleanup) {
        cleanup();
      }
      // Cleanup WebContainer on unmount
      webContainerService.teardown().catch(console.error);
    };
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <h3 className="text-lg font-medium mb-2">Error</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 text-sm font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 p-4">
        <div className="h-full grid grid-rows-[1fr,300px] gap-4">
          {/* Preview Section */}
          <div className="w-full h-full">
            <Preview url={previewUrl} isLoading={isLoading} />
          </div>

          {/* Terminal Section */}
          <div className="w-full">
            <Terminal 
              onMount={(write) => {
                const unsubscribe = webContainerService.onTerminalOutput(write);
                return () => unsubscribe();
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}