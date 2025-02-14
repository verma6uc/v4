import React from 'react';
import { Message as MessageType, ConceptOption } from './types';

interface MessageProps {
  message: MessageType;
  onSelectOption?: (optionId: string) => void;
}

export function Message({ message, onSelectOption }: MessageProps) {
  const isSystem = message.type === 'system';

  const renderConceptOptions = (options: ConceptOption[]) => (
    <div className="mt-4 space-y-4">
      {options.map(option => (
        <div 
          key={option.id}
          onClick={() => onSelectOption?.(option.id)}
          className="group p-4 bg-white hover:bg-gray-50 rounded-xl shadow-sm ring-1 ring-gray-100 hover:ring-indigo-100 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 mb-2 transition-colors duration-200">
            {option.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{option.description}</p>
          <div className="space-y-2">
            {option.features.map((feature, i) => (
              <div key={i} className="text-sm text-gray-500 flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-indigo-300 transition-colors duration-200"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
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
                {message.options && renderConceptOptions(message.options)}
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