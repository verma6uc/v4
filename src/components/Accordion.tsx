import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ElementType;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: 'default' | 'bordered' | 'ghost';
  defaultOpen?: string[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  variant = 'default',
  defaultOpen = [],
  allowMultiple = false,
  className = ''
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setOpenItems(prev =>
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  const getItemStyles = () => {
    switch (variant) {
      case 'bordered':
        return 'border border-gray-200 rounded-lg mb-2';
      case 'ghost':
        return 'bg-transparent';
      default:
        return 'border-b border-gray-200';
    }
  };

  const getButtonStyles = (isOpen: boolean) => {
    const baseStyles = 'flex items-center justify-between w-full py-4 px-4 text-left';
    
    switch (variant) {
      case 'bordered':
        return `${baseStyles} ${
          isOpen 
            ? 'bg-gray-50 rounded-t-lg' 
            : 'hover:bg-gray-50 rounded-lg'
        }`;
      case 'ghost':
        return `${baseStyles} ${
          isOpen 
            ? 'bg-gray-50' 
            : 'hover:bg-gray-50'
        }`;
      default:
        return `${baseStyles} ${
          isOpen 
            ? 'bg-gray-50' 
            : 'hover:bg-gray-50'
        }`;
    }
  };

  return (
    <div className={`divide-y divide-gray-200 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        const Icon = item.icon;

        return (
          <div key={item.id} className={getItemStyles()}>
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className={getButtonStyles(isOpen)}
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-2">
                {Icon && <Icon className="w-5 h-5 text-gray-400" />}
                <span className="text-sm font-medium text-gray-900">
                  {item.title}
                </span>
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            
            {isOpen && (
              <div className="px-4 pb-4 pt-2">
                <div className="text-sm text-gray-600">
                  {item.content}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}