import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ElementType;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export function Tabs({ 
  tabs, 
  defaultTab, 
  variant = 'default',
  className = '' 
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const getTabStyles = (isActive: boolean) => {
    const baseStyles = 'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200';
    
    switch (variant) {
      case 'pills':
        return `${baseStyles} rounded-lg ${
          isActive 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-600 hover:bg-gray-50'
        }`;
      
      case 'underline':
        return `${baseStyles} border-b-2 ${
          isActive 
            ? 'border-blue-600 text-blue-600' 
            : 'border-transparent text-gray-600 hover:border-gray-200 hover:text-gray-900'
        }`;
      
      default:
        return `${baseStyles} ${
          isActive 
            ? 'text-blue-600' 
            : 'text-gray-600 hover:text-gray-900'
        }`;
    }
  };

  return (
    <div className={className}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={getTabStyles(isActive)}
                aria-current={isActive ? 'page' : undefined}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}