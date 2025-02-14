import React from 'react';
import { ConceptOption } from '../../utils/openai';
import { Button } from '../Button';
import { BaseCard } from '../base/BaseCard';

interface ConceptCardProps {
  concept: ConceptOption;
  onSelect: (id: string) => void;
  selected?: boolean;
}

export function ConceptCard({ concept, onSelect, selected }: ConceptCardProps) {
  return (
    <BaseCard className={`transition-all duration-200 ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{concept.title}</h3>
        <p className="text-gray-600 mb-4">{concept.description}</p>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1">
            {concept.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600">{feature}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <Button
            variant={selected ? "primary" : "outline"}
            onClick={() => onSelect(concept.id)}
            className="w-full"
          >
            {selected ? 'Selected' : 'Select This Concept'}
          </Button>
        </div>
      </div>
    </BaseCard>
  );
}