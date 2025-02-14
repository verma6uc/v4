import React from 'react';
import { ConceptOption } from '../../utils/openai';
import { Button } from '../Button';
import { BaseCard } from '../base/BaseCard';

interface ConceptCardProps {
  concept: ConceptOption;
  onSelect: (id: string) => void;
  selected?: boolean;
  disabled?: boolean;
}

export function ConceptCard({ concept, onSelect, selected, disabled }: ConceptCardProps) {
  return (
    <BaseCard 
      className={`h-full flex flex-col transition-all duration-200 ${
        selected ? 'ring-2 ring-blue-500' : ''
      } ${
        disabled && !selected ? 'opacity-50' : ''
      }`}
    >
      <div className="p-4 flex-1 flex flex-col">
        {/* Header */}
        <h3 className="text-lg font-semibold mb-2">{concept.title}</h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4">{concept.description}</p>
        
        {/* Features - using flex-1 to push button to bottom */}
        <div className="space-y-2 flex-1">
          <h4 className="font-medium text-sm text-gray-700">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1">
            {concept.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600">{feature}</li>
            ))}
          </ul>
        </div>

        {/* Button - always at bottom */}
        <div className="mt-4">
          <Button
            variant={selected ? "primary" : "outline"}
            onClick={() => !disabled && onSelect(concept.id)}
            className={`w-full ${disabled && !selected ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={disabled}
          >
            {selected ? 'Selected' : 'Select This Concept'}
          </Button>
        </div>
      </div>
    </BaseCard>
  );
}