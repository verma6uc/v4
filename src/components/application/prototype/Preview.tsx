import React from 'react';

interface PreviewProps {
  url?: string;
  isLoading?: boolean;
}

export function Preview({ url, isLoading }: PreviewProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Starting development server...</p>
        </div>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="bg-white rounded-lg shadow h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>Preview not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow h-full">
      <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-gray-100 rounded px-3 py-1 text-sm text-gray-600 text-center truncate">
            {url}
          </div>
        </div>
      </div>
      <iframe
        src={url}
        className="w-full h-[calc(100%-40px)]"
        allow="cross-origin-isolated"
      />
    </div>
  );
}