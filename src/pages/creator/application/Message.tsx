import React, { useState } from 'react';
import { Message as MessageType } from './types';
import { ConceptOption, Question } from '../../../utils/openai';
import { ConceptCard } from '../../../components/cards/ConceptCard';
import { BaseCard } from '../../../components/base/BaseCard';
import { Button } from '../../../components/Button';

interface MessageProps {
  message: MessageType;
  onSelectOption?: (optionId: string) => void;
}

export function Message({ message, onSelectOption }: MessageProps) {
  const isSystem = message.type === 'system';
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  const handleOptionToggle = (optionId: string) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const handleSubmitSelections = () => {
    // Submit all selected options
    selectedOptions.forEach(optionId => {
      onSelectOption?.(optionId);
    });
  };

  const renderConceptOptions = (options: ConceptOption[]) => (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map(option => (
        <ConceptCard
          key={option.id}
          concept={option}
          onSelect={onSelectOption || (() => {})}
          selected={false} // TODO: Add selected state management
        />
      ))}
    </div>
  );

  const renderQuestionOptions = (questions: Question[]) => (
    <div className="mt-4 space-y-6">
      {questions.map(question => (
        <BaseCard key={question.id} className="p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map(option => (
              <label
                key={option.id}
                className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                  selectedOptions.has(option.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.has(option.id)}
                  onChange={() => handleOptionToggle(option.id)}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
          {selectedOptions.size > 0 && (
            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleSubmitSelections}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Selections ({selectedOptions.size})
              </Button>
            </div>
          )}
        </BaseCard>
      ))}
    </div>
  );

  return (
    <div className="py-3">
      <div className="w-full px-4">
        <div className={`flex gap-4 items-start ${isSystem ? 'justify-start' : 'justify-end'}`}>
          {isSystem && (
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <span className="text-sm font-medium text-white">YV</span>
            </div>
          )}
          <div className={`${isSystem ? 'mr-8 max-w-[85%]' : 'ml-8 max-w-[85%]'}`}>
            {isSystem && message.content === 'Processing your application...' ? (
              <div className="text-sm text-gray-500 font-medium pl-4 flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {message.content}
              </div>
            ) : (
              <div 
                className={`prose prose-sm max-w-none ${isSystem ? 'text-left' : 'text-right'}`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                <div className={`p-4 rounded-xl bg-white shadow-sm ${isSystem ? 'mb-0' : ''}`}>
                  {message.content.split('\n').map((line, i) => {
                    if (line.trim().startsWith('•')) {
                      return (
                        <span key={i} className="block pl-4 -ml-2 my-1 text-gray-600">
                          {line}
                        </span>
                      );
                    }
                    if (line.trim().match(/^\[\d+\]/)) {
                      return (
                        <span key={i} className="block font-medium text-gray-700 mt-4 mb-2">
                          {line}
                        </span>
                      );
                    }
                    if (!line.trim()) {
                      return <span key={i} className="block h-3" />;
                    }
                    return (
                      <span key={i} className="block text-gray-800">
                        {line}
                      </span>
                    );
                  })}
                </div>
                {message.options && message.optionType === 'concept' && renderConceptOptions(message.options as ConceptOption[])}
                {message.options && message.optionType === 'question' && renderQuestionOptions(message.options as Question[])}
              </div>
            )}
          </div>
          {!isSystem && (
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center shadow-md">
              <span className="text-sm font-medium text-white">ME</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}