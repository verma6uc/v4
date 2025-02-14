import React from 'react';
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
        <BaseCard key={question.id} className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h3>
          <div className="space-y-2">
            {question.options.map(option => (
              <Button
                key={option.id}
                variant="outline"
                onClick={() => onSelectOption?.(option.id)}
                className="w-full text-left justify-start h-auto py-3 px-4"
              >
                {option.text}
              </Button>
            ))}
          </div>
        </BaseCard>
      ))}
    </div>
  );

  return (
    <div className="py-3">
      <div className="w-full px-4">
        <div className={`flex gap-4 items-start ${isSystem ? 'justify-start' : 'justify-end'}`}>
          {isSystem && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">YV</span>
            </div>
          )}
          <div className={`${isSystem ? 'mr-8 max-w-[85%]' : 'ml-8 max-w-[85%]'}`}>
            {isSystem && message.content === 'Processing your application...' ? (
              <div className="text-sm text-gray-500 font-medium pl-4">
                {message.content}
              </div>
            ) : (
              <div 
                className={`prose prose-sm max-w-none ${isSystem ? 'text-left' : 'text-right'}`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                <p className={`text-gray-800 ${isSystem ? 'mb-0' : ''}`}>
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
                      <span key={i} className="block">
                        {line}
                      </span>
                    );
                  })}
                </p>
                {message.options && message.optionType === 'concept' && renderConceptOptions(message.options as ConceptOption[])}
                {message.options && message.optionType === 'question' && renderQuestionOptions(message.options as Question[])}
              </div>
            )}
          </div>
          {!isSystem && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-sm font-medium text-white">ME</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}