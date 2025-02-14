import axios from 'axios';
import { ConceptOption } from '../../utils/openai';

const API_BASE_URL = 'http://localhost:8080';

export async function generateConcepts(title: string, description: string): Promise<ConceptOption[]> {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-concepts`, {
      title,
      description
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Failed to generate concepts');
    }

    return response.data.concepts;
  } catch (error) {
    console.error('Error generating concepts:', error);
    throw error;
  }
}