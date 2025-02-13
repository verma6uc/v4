import React from 'react';
import { useLocation } from 'react-router-dom';
import { menuItems } from '../../layouts/showcase.data';

export function ShowcaseHeader() {
  const location = useLocation();
  const currentItem = menuItems.find(item => item.path === location.pathname);
  const Icon = currentItem?.icon;

  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-xl border-b border-gray-200">
      <div className="px-8 h-16 flex items-center">
        {currentItem && (
          <div className="flex items-center">
            {Icon && <Icon className="w-5 h-5 text-gray-500 mr-2" />}
            <h1 className="text-xl font-semibold text-gray-900">
              {currentItem.label}
            </h1>
          </div>
        )}
      </div>
    </header>
  );
}