import React from 'react';
import { Lightbulb } from 'lucide-react';

interface AppMemoryProps {
  memory: {
    summary: string;
    createdAt: string;
    notes: string[];
  };
}

export function AppMemory({ memory }: AppMemoryProps) {
  return (
    <div className="flex items-start space-x-2 text-sm text-gray-600">
      <Lightbulb className="w-4 h-4 mt-0.5" />
      <div>
        <div className="font-medium">Memory Phase</div>
        <div className="text-xs">{memory.summary}</div>
        <div className="mt-1 space-y-1">
          {memory.notes.map((note, idx) => (
            <div key={idx} className="text-xs text-gray-500">• {note}</div>
          ))}
        </div>
      </div>
    </div>
  );
}