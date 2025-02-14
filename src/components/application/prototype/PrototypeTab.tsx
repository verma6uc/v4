import React, { useEffect, useState } from 'react';
import { Preview } from './Preview';
import { webContainerService } from '../../../services/webcontainer';
import { ApplicationTabWrapper } from '../ApplicationTabWrapper';

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

        // Boot without repoUrl to use the dashboard template
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

  const content = error ? (
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
  ) : (
    <div className="p-4">
      <div className="h-full min-h-[820px]">
        {/* Preview Section */}
        <div className="w-full h-full min-h-[820px]">
          <Preview url={previewUrl} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );

  return (
    <ApplicationTabWrapper currentTab="Prototype">
      {content}
    </ApplicationTabWrapper>
  );
}