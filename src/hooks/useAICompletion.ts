import { useState } from 'react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AICompletionResponse {
  response: string;
  status: 'success' | 'error';
  message?: string;
}

type Model = 'gpt4' | 'gpt4-mini' | 'gpt3' | 'claude';

interface UseAICompletionResult {
  complete: (messages: Message[], model: Model) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

const API_BASE_URL = 'http://localhost:8080';

export function useAICompletion(): UseAICompletionResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const complete = async (messages: Message[], model: Model): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<AICompletionResponse>(
        `${API_BASE_URL}/ai-completion`,
        {
          messages,
          model
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.status === 'error') {
        throw new Error(response.data.message || 'Unknown error occurred');
      }

      return response.data.response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get AI completion';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    complete,
    isLoading,
    error
  };
}

// Example usage:
/*
function MyComponent() {
  const { complete, isLoading, error } = useAICompletion();

  const handleAICompletion = async () => {
    try {
      const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'What is the capital of France?' }
      ];
      
      const response = await complete(messages, 'gpt4');
      console.log('AI Response:', response);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <button onClick={handleAICompletion} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get AI Response'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
*/