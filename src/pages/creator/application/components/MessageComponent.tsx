import React from 'react';
import { Message, MessageOptionType } from '../types/chat';
import { ConceptOption, Question } from '../../../../utils/openai';

interface MessageComponentProps {
  message: Message;
  handlers: {
    onConceptSelect: (conceptId: string) => void;
    onQuestionAnswer: (questionId: string, selectedOptionIds: string[]) => void;
  };
  answeredQuestions?: Record<string, string[]>;
  selectedConcept?: string;
  isProcessingConcept: boolean;
}

export const MessageComponent: React.FC<MessageComponentProps> = ({
  message,
  handlers,
  answeredQuestions,
  selectedConcept,
  isProcessingConcept
}) => {
  const isConceptOption = (option: MessageOptionType): option is ConceptOption => {
    return 'title' in option && 'description' in option && 'features' in option;
  };

  const isQuestion = (option: MessageOptionType): option is Question => {
    return 'question' in option && 'options' in option;
  };

  const renderOptions = () => {
    if (!message.options) return null;

    if (message.optionType === 'concept') {
      return (
        <div className="mt-4 space-y-4">
          {message.options.filter(isConceptOption).map(option => (
            <button
              key={option.id}
              onClick={() => handlers.onConceptSelect(option.id)}
              disabled={isProcessingConcept || selectedConcept === option.id}
              className={`w-full p-4 text-left rounded-lg border transition-colors ${
                selectedConcept === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h3 className="font-medium text-gray-900">{option.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{option.description}</p>
            </button>
          ))}
        </div>
      );
    }

    if (message.optionType === 'question') {
      const question = message.options.find(isQuestion);
      if (!question) return null;

      const selectedAnswers = answeredQuestions?.[question.id] || [];

      return (
        <div className="mt-4 space-y-2">
          <p className="font-medium text-gray-900">{question.question}</p>
          <div className="space-y-2">
            {question.options.map(option => (
              <label key={option.id} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAnswers.includes(option.id)}
                  onChange={(e) => {
                    const newSelected = e.target.checked
                      ? [...selectedAnswers, option.id]
                      : selectedAnswers.filter(id => id !== option.id);
                    handlers.onQuestionAnswer(question.id, newSelected);
                  }}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-sm text-gray-700">{option.text}</div>
              </label>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`p-4 ${
        message.type === 'user' ? 'bg-blue-50' : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-gray-800">{message.content}</div>
        {renderOptions()}
      </div>
    </div>
  );
};