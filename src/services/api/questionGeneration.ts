import axios from 'axios';
import { ConceptOption, Question } from '../../utils/openai';

const API_BASE_URL = 'http://localhost:8080';

interface QuestionGenerationRequest {
  title: string;
  description: string;
  selectedConcept: ConceptOption;
}

interface QuestionGenerationResponse {
  status: 'success' | 'error';
  questions?: Question[];
  message?: string;
}

export async function generateQuestions({
  title,
  description,
  selectedConcept
}: QuestionGenerationRequest): Promise<Question[]> {
  try {
    const response = await axios.post<QuestionGenerationResponse>(
      `${API_BASE_URL}/generate-questions`,
      {
        title,
        description,
        selectedConcept
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.status === 'error' || !response.data.questions) {
      throw new Error(response.data.message || 'Failed to generate questions');
    }

    return response.data.questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}