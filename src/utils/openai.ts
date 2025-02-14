import OpenAI from "openai";

type ChatRole = "system" | "user" | "assistant";

export interface ConceptOption {
  id: string;
  title: string;
  description: string;
  features: string[];
  purpose?: string;
  useCase?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

type ChatCompletionMessageParam = {
  role: ChatRole;
  content: string;
};

export class OpenAIUtils {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateConcepts(title: string, description: string): Promise<ConceptOption[]> {
    const prompt = `Given an application with:
Title: ${title}
Description: ${description}

Research similar products and generate 2-3 unique interpretations of what this application could be. Think deeply about:
1. The industry and its standards
2. The target audience and their core problems
3. How this application can solve these problems

For each interpretation, provide:
- A unique title reflecting the specific approach
- A clear description of the concept
- 3 key features that make this concept unique
- The main purpose and target audience
- A specific use case scenario

Format the response as a JSON object with a "concepts" array containing objects with:
{
  "id": "kebab-case-unique-id",
  "title": "Concept Title",
  "description": "Brief description of the concept approach",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "purpose": "Main purpose and target audience",
  "useCase": "Specific use case scenario"
}`;

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: "You are a helpful assistant that generates application concepts based on user requirements. Always respond with valid JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    const response = await this.client.chat.completions.create({
      model: "o3-mini",
      messages,
      response_format: { type: "text" },
      reasoning_effort: "high",
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in response');
    }

    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed.concepts) ? parsed.concepts : [];
    } catch (error) {
      console.error('Failed to parse JSON response:', error);
      return [];
    }
  }

  async generateResponse(messages: ChatMessage[], context?: string): Promise<string> {
    const systemMessage: ChatCompletionMessageParam = {
      role: "system",
      content: `You are Yuvi, an AI assistant helping users create applications. ${
        context ? `Context: ${context}` : ''
      }
    
Keep your responses concise, friendly, and focused on guiding the user through the application creation process. Use natural, conversational language.`
    };

    const formattedMessages: ChatCompletionMessageParam[] = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const response = await this.client.chat.completions.create({
      model: "o3-mini",
      messages: [systemMessage, ...formattedMessages],
      response_format: { type: "text" },
      reasoning_effort: "high",
      temperature: 0.7
    });

    return response.choices[0].message.content || '';
  }

  async generateFollowUpQuestions(
    concept: ConceptOption,
    previousAnswers: Record<string, string> = {}
  ): Promise<Question[]> {
    const prompt = `Based on the selected application concept:
Title: ${concept.title}
Description: ${concept.description}
Features: ${concept.features.join(', ')}
Purpose: ${concept.purpose}
Use Case: ${concept.useCase}

${Object.keys(previousAnswers).length > 0 ? `
Previous answers:
${Object.entries(previousAnswers)
  .map(([question, answer]) => `Q: ${question}
A: ${answer}`)
  .join('\n')}
` : ''}

Generate 5-10 questions to help clarify the core workflows and business objects of the application. 
Think deeply about:
1. The industry standards
2. Target audience needs
3. Core problems being solved
4. Essential workflows and processes

For each question:
1. Focus on business/user requirements, not technical details
2. Provide 3-4 relevant options/suggestions as answers
3. Help define core business objects and their actions
4. Clarify essential workflows

Format the response as a JSON object with a "questions" array containing objects with:
{
  "id": "unique-question-id",
  "question": "The question text",
  "options": [
    {
      "id": "option-1",
      "text": "Option text with specific suggestion"
    }
  ]
}`;

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: "You are a helpful assistant that generates relevant follow-up questions to refine application concepts. Always respond with valid JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    const response = await this.client.chat.completions.create({
      model: "o3-mini",
      messages,
      response_format: { type: "text" },
      reasoning_effort: "high",
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in response');
    }

    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed.questions) ? parsed.questions : [];
    } catch (error) {
      console.error('Failed to parse JSON response:', error);
      return [];
    }
  }
}

export interface ChatMessage {
  role: ChatRole;
  content: string;
}