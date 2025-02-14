import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface ConceptOption {
  id: string;
  title: string;
  description: string;
  features: string[];
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function generateConcepts(title: string, description: string): Promise<ConceptOption[]> {
  const prompt = `Given an application with:
Title: ${title}
Description: ${description}

Generate 3 different concept options for this application. Each concept should have:
1. A unique title that reflects a specific approach
2. A brief description explaining the concept
3. 3 key features that make this concept unique

Format the response as a JSON array of objects with properties:
- id (string): a kebab-case unique identifier
- title (string): the concept title
- description (string): the concept description
- features (array): array of 3 strings for key features`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that generates application concepts based on user requirements. You always respond with valid JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No content in response');
  }

  const parsed = JSON.parse(content);
  return parsed.concepts || [];
}

export async function generateResponse(
  messages: ChatMessage[],
  context?: string
): Promise<string> {
  const systemMessage: ChatMessage = {
    role: "system",
    content: `You are Yuvi, an AI assistant helping users create applications. ${
      context ? `Context: ${context}` : ''
    }
    
Keep your responses concise, friendly, and focused on guiding the user through the application creation process. Use natural, conversational language.`
  };

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [systemMessage, ...messages],
    temperature: 0.7,
  });

  return response.choices[0].message.content || '';
}

export async function generateFollowUpQuestions(
  concept: ConceptOption,
  previousAnswers: Record<string, string> = {}
): Promise<string[]> {
  const prompt = `Given the selected concept:
Title: ${concept.title}
Description: ${concept.description}
Features: ${concept.features.join(', ')}

${Object.keys(previousAnswers).length > 0 ? `
Previous answers:
${Object.entries(previousAnswers)
  .map(([question, answer]) => `Q: ${question}
A: ${answer}`)
  .join('\n')}
` : ''}

Generate 3 follow-up questions to help refine this concept further. The questions should:
1. Be specific and focused on gathering important details
2. Help understand the user's needs better
3. Guide the development of the application

Format the response as a JSON array of strings.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that generates relevant follow-up questions to refine application concepts. You always respond with valid JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No content in response');
  }

  const parsed = JSON.parse(content);
  return parsed.questions || [];
}