import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OpenAIUtils, ConceptOption } from '../openai';

// Mock the OpenAI client
vi.mock('openai', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: vi.fn()
        }
      }
    }))
  };
});

describe('OpenAIUtils', () => {
  let openAIUtils: OpenAIUtils;
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    openAIUtils = new OpenAIUtils(mockApiKey);
  });

  describe('generateConcepts', () => {
    it('should generate concept options from title and description', async () => {
      const mockConcepts: ConceptOption[] = [
        {
          id: 'modern-crm',
          title: 'Modern CRM System',
          description: 'A streamlined customer relationship management system',
          features: ['Feature 1', 'Feature 2', 'Feature 3']
        }
      ];

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({ concepts: mockConcepts })
            }
          }
        ]
      };

      // @ts-ignore - Mocking private client
      openAIUtils.client.chat.completions.create.mockResolvedValue(mockResponse);

      const result = await openAIUtils.generateConcepts('Test App', 'A test application');
      expect(result).toEqual(mockConcepts);
      // @ts-ignore - Mocking private client
      expect(openAIUtils.client.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gpt-4',
          response_format: { type: 'json_object' }
        })
      );
    });

    it('should handle empty response', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({ concepts: [] })
            }
          }
        ]
      };

      // @ts-ignore - Mocking private client
      openAIUtils.client.chat.completions.create.mockResolvedValue(mockResponse);

      const result = await openAIUtils.generateConcepts('Test App', 'A test application');
      expect(result).toEqual([]);
    });

    it('should handle error response', async () => {
      // @ts-ignore - Mocking private client
      openAIUtils.client.chat.completions.create.mockRejectedValue(new Error('API Error'));

      await expect(openAIUtils.generateConcepts('Test App', 'A test application')).rejects.toThrow('API Error');
    });
  });

  describe('generateResponse', () => {
    it('should generate chat response from messages', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Test response'
            }
          }
        ]
      };

      // @ts-ignore - Mocking private client
      openAIUtils.client.chat.completions.create.mockResolvedValue(mockResponse);

      const messages = [
        { role: 'user' as const, content: 'Test message' }
      ];

      const result = await openAIUtils.generateResponse(messages);
      expect(result).toBe('Test response');
      // @ts-ignore - Mocking private client
      expect(openAIUtils.client.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gpt-4',
          temperature: 0.7
        })
      );
    });

    it('should include context in system message when provided', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Test response'
            }
          }
        ]
      };

      // @ts-ignore - Mocking private client
      openAIUtils.client.chat.completions.create.mockResolvedValue(mockResponse);

      const messages = [
        { role: 'user' as const, content: 'Test message' }
      ];
      const context = 'Test context';

      await openAIUtils.generateResponse(messages, context);
      // @ts-ignore - Mocking private client
      expect(openAIUtils.client.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'system',
              content: expect.stringContaining(context)
            })
          ])
        })
      );
    });
  });

  describe('generateFollowUpQuestions', () => {
    it('should generate follow-up questions for a concept', async () => {
      const mockQuestions = [
        'Question 1?',
        'Question 2?',
        'Question 3?'
      ];

      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({ questions: mockQuestions })
            }
          }
        ]
      };

      // @ts-ignore - Mocking private client
      openAIUtils.client.chat.completions.create.mockResolvedValue(mockResponse);

      const concept: ConceptOption = {
        id: 'test-concept',
        title: 'Test Concept',
        description: 'A test concept',
        features: ['Feature 1', 'Feature 2', 'Feature 3']
      };

      const result = await openAIUtils.generateFollowUpQuestions(concept);
      expect(result).toEqual(mockQuestions);
      // @ts-ignore - Mocking private client
      expect(openAIUtils.client.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gpt-4',
          response_format: { type: 'json_object' }
        })
      );
    });

    it('should include previous answers in prompt when provided', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({ questions: [] })
            }
          }
        ]
      };

      // @ts-ignore - Mocking private client
      openAIUtils.client.chat.completions.create.mockResolvedValue(mockResponse);

      const concept: ConceptOption = {
        id: 'test-concept',
        title: 'Test Concept',
        description: 'A test concept',
        features: ['Feature 1', 'Feature 2', 'Feature 3']
      };

      const previousAnswers = {
        'Question 1?': 'Answer 1',
        'Question 2?': 'Answer 2'
      };

      await openAIUtils.generateFollowUpQuestions(concept, previousAnswers);
      // @ts-ignore - Mocking private client
      expect(openAIUtils.client.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              content: expect.stringContaining('Previous answers')
            })
          ])
        })
      );
    });
  });
});