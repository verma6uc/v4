import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  children: React.ReactNode;
}

export function KanbanColumn({
  id,
  title,
  color,
  children
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-lg ${color} p-4`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <div className="flex-1 space-y-4">
        {children}
      </div>
    </div>
  );
}