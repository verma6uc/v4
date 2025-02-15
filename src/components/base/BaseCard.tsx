import React from 'react';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
}

export function BaseCard({ children, className = '' }: BaseCardProps) {
  return (
    <div className={`bg-white p-2 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
}
