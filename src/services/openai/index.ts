import OpenAI from "openai";
import { ConceptOption, Question, QuestionOption } from "../../utils/openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
console.log('Initializing OpenAI client with API key present:', !!apiKey);
console.log('API Key length:', apiKey?.length);

if (!apiKey) {
  throw new Error('OpenAI API key is missing. Please check your .env file.');
}

let openaiClient: OpenAI;
try {
  console.log('Creating OpenAI client...');
  openaiClient = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
  console.log('OpenAI client created successfully');
} catch (error) {
  console.error('Error creating OpenAI client:', error);
  throw error;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function generateConcepts(title: string, description: string): Promise<ConceptOption[]> {
  console.log('Generating concepts for:', { title, description });
  
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

Respond with a JSON object in the following format:
{
  "json": true,
  "concepts": [
    {
      "id": "kebab-case-unique-id",
      "title": "Concept Title",
      "description": "Brief description of the concept approach",
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "purpose": "Main purpose and target audience",
      "useCase": "Specific use case scenario"
    }
  ]
}`;

  try {
    console.log('Sending request to OpenAI with prompt:', prompt);
    const response = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates application concepts based on user requirements. You must always respond with valid JSON that includes a 'json: true' field."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });
    console.log('Received response from OpenAI:', JSON.stringify(response, null, 2));

    const content = response.choices[0].message.content;
    if (!content) {
      console.error('No content in response');
      throw new Error('No content in response');
    }

    try {
      const parsed = JSON.parse(content);
      console.log('Parsed response:', parsed);
      return parsed.concepts || [];
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Raw content:', content);
      throw parseError;
    }
  } catch (error) {
    console.error('Error in generateConcepts:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}

export async function generateResponse(
  messages: ChatMessage[],
  context?: string
): Promise<string> {
  console.log('Generating response for:', { messages, context });
  
  const systemMessage: ChatMessage = {
    role: "system",
    content: `You are Yuvi, an AI assistant helping users create applications. ${
      context ? `Context: ${context}` : ''
    }
    
Keep your responses concise, friendly, and focused on guiding the user through the application creation process. Use natural, conversational language.

Always respond with a JSON object in this format:
{
  "json": true,
  "response": "Your response text here"
}`
  };

  try {
    console.log('Sending request to OpenAI with messages:', [systemMessage, ...messages]);
    const response = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      response_format: { type: "json_object" }
    });
    console.log('Received response from OpenAI:', JSON.stringify(response, null, 2));

    const content = response.choices[0].message.content;
    if (!content) {
      console.error('No content in response');
      throw new Error('No content in response');
    }

    try {
      const parsed = JSON.parse(content);
      console.log('Parsed response:', parsed);
      return parsed.response || parsed.message || '';
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Raw content:', content);
      throw parseError;
    }
  } catch (error) {
    console.error('Error in generateResponse:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}

export async function generateFollowUpQuestions(
  concept: ConceptOption
): Promise<Question[]> {
  console.log('Generating follow-up questions for concept:', concept);
  
  const prompt = `Based on the selected application concept:
Title: ${concept.title}
Description: ${concept.description}
Features: ${concept.features.join(', ')}
Purpose: ${concept.purpose || ''}
Use Case: ${concept.useCase || ''}

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

Respond with a JSON object in the following format:
{
  "json": true,
  "questions": [
    {
      "id": "unique-question-id",
      "question": "The question text",
      "options": [
        {
          "id": "option-1",
          "text": "Option text with specific suggestion"
        }
      ]
    }
  ]
}`;

  try {
    console.log('Sending request to OpenAI with prompt:', prompt);
    const response = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates relevant follow-up questions to refine application concepts. You must always respond with valid JSON that includes a 'json: true' field."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });
    console.log('Received response from OpenAI:', JSON.stringify(response, null, 2));

    const content = response.choices[0].message.content;
    if (!content) {
      console.error('No content in response');
      throw new Error('No content in response');
    }

    try {
      const parsed = JSON.parse(content);
      console.log('Parsed response:', parsed);
      return parsed.questions || [];
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Raw content:', content);
      throw parseError;
    }
  } catch (error) {
    console.error('Error in generateFollowUpQuestions:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}