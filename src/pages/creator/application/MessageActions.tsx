import React from 'react';
import { Copy, ThumbsUp, ThumbsDown, Volume2, RotateCw } from 'lucide-react';

interface MessageActionsProps {
  onCopy: () => void;
  onLike: () => void;
  onDislike: () => void;
  onSpeak: () => void;
  onRegenerate: () => void;
}

export function MessageActions({ onCopy, onLike, onDislike, onSpeak, onRegenerate }: MessageActionsProps) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <button 
        className="p-1 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700"
        onClick={onCopy}
      >
        <Copy className="w-4 h-4" />
      </button>
      <button 
        className="p-1 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700"
        onClick={onLike}
      >
        <ThumbsUp className="w-4 h-4" />
      </button>
      <button 
        className="p-1 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700"
        onClick={onDislike}
      >
        <ThumbsDown className="w-4 h-4" />
      </button>
      <button 
        className="p-1 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700"
        onClick={onSpeak}
      >
        <Volume2 className="w-4 h-4" />
      </button>
      <button 
        className="p-1 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-700"
        onClick={onRegenerate}
      >
        <RotateCw className="w-4 h-4" />
      </button>
    </div>
  );
}