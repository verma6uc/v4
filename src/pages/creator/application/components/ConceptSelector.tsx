import React from 'react';
import { ConceptOption } from '../../../../utils/openai';
import { useApplicationCreation } from '../context/ApplicationCreationContext';

interface ConceptSelectorProps {
  concepts: ConceptOption[];
  onSelect: (conceptId: string) => void;
}

export function ConceptSelector({ concepts, onSelect }: ConceptSelectorProps) {
  const { isProcessing } = useApplicationCreation();

  return (
    <div className="space-y-4">
      {concepts.map((concept) => (
        <div
          key={concept.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
          onClick={() => !isProcessing && onSelect(concept.id)}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{concept.title}</h3>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-600 mb-4">
            <p>{concept.description}</p>
          </div>

          <div className="space-y-4">
            {/* Features Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1">
                {concept.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>

            {/* Purpose Section */}
            {concept.purpose && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Purpose & Target Audience:</h4>
                <p className="text-sm text-gray-600">{concept.purpose}</p>
              </div>
            )}

            {/* Use Case Section */}
            {concept.useCase && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Example Use Case:</h4>
                <p className="text-sm text-gray-600">{concept.useCase}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                !isProcessing && onSelect(concept.id);
              }}
              disabled={isProcessing}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select This Concept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}