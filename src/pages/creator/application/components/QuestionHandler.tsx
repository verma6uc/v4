import React from 'react';
import { Question, QuestionOption } from '../../../../utils/openai';
import { useApplicationCreation } from '../context/ApplicationCreationContext';

interface QuestionHandlerProps {
  question: Question;
  onAnswer: (questionId: string, optionId: string) => void;
}

export function QuestionHandler({ question, onAnswer }: QuestionHandlerProps) {
  const { isProcessing } = useApplicationCreation();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{question.question}</h3>
      
      <div className="space-y-2">
        {question.options.map((option: QuestionOption) => (
          <button
            key={option.id}
            onClick={() => !isProcessing && onAnswer(question.id, option.id)}
            disabled={isProcessing}
            className="w-full text-left p-4 rounded-md border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{option.text}</span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Select the option that best matches your requirements.</p>
      </div>
    </div>
  );
}

interface QuestionProgressProps {
  totalQuestions: number;
  answeredQuestions: number;
}

export function QuestionProgress({ totalQuestions, answeredQuestions }: QuestionProgressProps) {
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{answeredQuestions} of {totalQuestions} questions answered</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}