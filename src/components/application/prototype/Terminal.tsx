import React, { useEffect, useRef } from 'react';

interface TerminalProps {
  onMount?: (write: (data: string) => void) => void;
}

export function Terminal({ onMount }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onMount) return;

    const write = (data: string) => {
      if (!contentRef.current) return;

      // Create a new line element
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.textContent = data;
      
      // Append the new line
      contentRef.current.appendChild(line);

      // Scroll to bottom
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    };

    onMount(write);
  }, [onMount]);

  return (
    <div 
      ref={terminalRef}
      className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-lg overflow-auto h-[300px]"
    >
      <div 
        ref={contentRef}
        className="space-y-1 whitespace-pre-wrap break-all"
      />
    </div>
  );
}