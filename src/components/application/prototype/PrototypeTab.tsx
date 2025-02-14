import React, { useEffect, useState, useCallback } from 'react';
import { Terminal } from './Terminal';
import { Preview } from './Preview';
import { webContainerService } from '../../../services/webcontainer';

export function PrototypeTab() {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeWebContainer = async () => {
      try {
        await webContainerService.boot();
        if (!isMounted) {
          await webContainerService.teardown();
          return;
        }

        const url = await webContainerService.startDevServer();
        if (!isMounted) return;
        setPreviewUrl(url);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Failed to start development server');
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsInitialized(true);
        }
      }
    };

    if (!isInitialized) {
      initializeWebContainer();
    }

    return () => {
      isMounted = false;
      if (isInitialized) webContainerService.teardown();
    };
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <h3 className="text-lg font-medium mb-2">Error</h3>
          <p>{error}</p>
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