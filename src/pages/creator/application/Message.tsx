import React, { useState, useEffect } from 'react';
import { Message as MessageType, MessageHandlers } from './types';
import { ConceptOption, Question } from '../../../utils/openai';
import { ConceptCard } from '../../../components/cards/ConceptCard';
import { BaseCard } from '../../../components/base/BaseCard';
import { Button } from '../../../components/Button';

interface MessageProps {
  message: MessageType;
  handlers: MessageHandlers;
  answeredQuestions?: Record<string, string[]>;
  selectedConcept?: string;
  isProcessingConcept?: boolean;
}

export function Message({ 
  message, 
  handlers, 
  answeredQuestions = {},
  selectedConcept,
  isProcessingConcept = false
}: MessageProps) {
  const isSystem = message.type === 'system';
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize selected options from answered questions
  useEffect(() => {
    if (message.optionType === 'question' && message.options) {
      const question = message.options[0] as Question;
      if (answeredQuestions[question.id]) {
        setSelectedOptions(new Set(answeredQuestions[question.id]));
        setIsSubmitted(true);
      }
    }
  }, [message, answeredQuestions]);

  const handleOptionToggle = (optionId: string) => {
    if (isSubmitted) return; // Prevent changes after submission

    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const handleSubmitSelections = (questionId: string) => {
    handlers.onQuestionAnswer(questionId, Array.from(selectedOptions));
    setIsSubmitted(true);
  };

  const renderConceptOptions = (options: ConceptOption[]) => (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map(option => (
        <div
          key={option.id}
          className={`transition-opacity duration-200 ${
            selectedConcept && option.id !== selectedConcept ? 'opacity-50' : ''
          }`}
        >
          <ConceptCard
            concept={option}
            onSelect={() => !selectedConcept && !isProcessingConcept && handlers.onConceptSelect(option.id)}
            selected={option.id === selectedConcept}
            disabled={!!selectedConcept || isProcessingConcept}
          />
        </div>
      ))}
      {isProcessingConcept && (
        <div className="col-span-full mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center text-blue-700">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Exploring this concept in depth...</span>
          </div>
        </div>
      )}
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
                className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'
                } ${
                  selectedOptions.has(option.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.has(option.id)}
                  onChange={() => handleOptionToggle(option.id)}
                  disabled={isSubmitted}
                  className={`h-5 w-5 rounded border-gray-300 focus:ring-blue-500 ${
                    isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'
                  } ${
                    selectedOptions.has(option.id) ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
                <span className={`ml-3 ${isSubmitted ? 'text-gray-500' : 'text-gray-700'}`}>
                  {option.text}
                </span>
              </label>
            ))}
          </div>
          {!isSubmitted && selectedOptions.size > 0 && (
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => handleSubmitSelections(question.id)}
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
            <div 
              className={`prose prose-sm max-w-none ${isSystem ? 'text-left' : 'text-right'}`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              <div className={`p-4 rounded-xl ${isSystem ? 'bg-white shadow-sm' : 'bg-blue-50'}`}>
                {typeof message.content === 'string' && message.content === 'Processing your application...' ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {message.content}
                  </div>
                ) : typeof message.content === 'string' ? (
                  message.content.split('\n').map((line, i) => {
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
                  })
                ) : (
                  <div className="space-y-4">
                    {message.content}
                  </div>
                )}
              </div>
              {message.options && message.optionType === 'concept' && renderConceptOptions(message.options as ConceptOption[])}
              {message.options && message.optionType === 'question' && renderQuestionOptions(message.options as Question[])}
            </div>
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