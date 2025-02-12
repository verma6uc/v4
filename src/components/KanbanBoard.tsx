import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
}

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove?: (taskId: string, newStatus: Task['status']) => void;
  onTaskClick?: (task: Task) => void;
  className?: string;
}

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-blue-50' },
  { id: 'completed', title: 'Completed', color: 'bg-green-50' },
  { id: 'blocked', title: 'Blocked', color: 'bg-red-50' }
];

export function KanbanBoard({
  tasks,
  onTaskMove,
  onTaskClick,
  className = ''
}: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [taskGroups, setTaskGroups] = useState(() => {
    const groups: Record<string, Task[]> = {};
    columns.forEach(column => {
      groups[column.id] = tasks.filter(task => task.status === column.id);
    });
    return groups;
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeTask = tasks.find(task => task.id === active.id);
      const overColumn = over.id as Task['status'];
      
      if (activeTask && overColumn) {
        // Update local state
        setTaskGroups(prev => {
          const newGroups = { ...prev };
          const oldStatus = activeTask.status;
          
          // Remove from old column
          newGroups[oldStatus] = newGroups[oldStatus].filter(
            task => task.id !== activeTask.id
          );
          
          // Add to new column
          newGroups[overColumn] = [
            ...newGroups[overColumn],
            { ...activeTask, status: overColumn }
          ];
          
          return newGroups;
        });
        
        // Notify parent
        onTaskMove?.(activeTask.id, overColumn);
      }
    }
    
    setActiveId(null);
  };

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            color={column.color}
          >
            <SortableContext
              items={taskGroups[column.id].map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {taskGroups[column.id].map(task => (
                <KanbanCard
                  key={task.id}
                  task={task}
                  onClick={() => onTaskClick?.(task)}
                />
              ))}
            </SortableContext>
          </KanbanColumn>
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <KanbanCard
            task={activeTask}
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}