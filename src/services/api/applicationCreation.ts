import axios from 'axios';
import { supabase } from '../supabase/client';
import { ConceptOption } from '../../utils/openai';
import { Feature, FeatureResponse } from '../mock/features';
import { UseCase } from '../mock/useCases';

const API_BASE_URL = 'http://localhost:8080';

interface CreateApplicationRequest {
  title: string;
  description: string;
  selectedConcept: ConceptOption;
  answers: Record<string, string[]>; // maps question text to answer texts
}

type ApplicationStatus = 
  | 'MEMORY'
  | 'BLUEPRINT'
  | 'VISUAL_PRD'
  | 'DURING_DEVELOPMENT'
  | 'UNDER_TESTED'
  | 'DEVELOPMENT_COMPLETE';

interface AIUseCaseResponse {
  status: 'success' | 'error';
  useCases?: UseCase[];
  message?: string;
}

export async function createApplication(data: CreateApplicationRequest): Promise<string> {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Create the application
    const { data: application, error: applicationError } = await supabase
      .from('applications')
      .insert([
        {
          title: data.title,
          description: data.description,
          status: 'MEMORY',
          company_id: null,
          current_version: '0.1.0'
        }
      ])
      .select()
      .single();

    if (applicationError) throw applicationError;

    // Create application memory
    const { error: memoryError } = await supabase
      .from('application_memory')
      .insert([
        {
          application_id: application.id,
          summary: data.description,
          created_at: new Date().toISOString(),
          notes: [
            `Initial concept: ${data.selectedConcept.title}`,
            `Concept description: ${data.selectedConcept.description}`
          ]
        }
      ]);

    if (memoryError) throw memoryError;

    return application.id;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
}

export async function generateFeatures(data: CreateApplicationRequest): Promise<Feature[]> {
  try {
    const response = await axios.post<FeatureResponse>(
      `${API_BASE_URL}/generate-features`,
      {
        title: data.title,
        description: data.description,
        selectedConcept: {
          title: data.selectedConcept.title,
          description: data.selectedConcept.description,
          features: data.selectedConcept.features,
          purpose: data.selectedConcept.purpose,
          useCase: data.selectedConcept.useCase
        },
        answers: data.answers
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.status === 'error' || !response.data.features) {
      throw new Error(response.data.message || 'Failed to generate features');
    }

    return response.data.features;
  } catch (error) {
    console.error('Error generating features:', error);
    throw error;
  }
}

export async function generateUseCases(
  feature: Feature,
  applicationData: CreateApplicationRequest
): Promise<UseCase[]> {
  try {
    const response = await axios.post<AIUseCaseResponse>(
      `${API_BASE_URL}/generate-usecases`,
      {
        title: applicationData.title,
        description: applicationData.description,
        selectedConcept: {
          title: applicationData.selectedConcept.title,
          description: applicationData.selectedConcept.description,
          features: applicationData.selectedConcept.features,
          purpose: applicationData.selectedConcept.purpose,
          useCase: applicationData.selectedConcept.useCase
        },
        answers: applicationData.answers,
        feature
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.status === 'error' || !response.data.useCases) {
      throw new Error(response.data.message || 'Failed to generate use cases');
    }

    return response.data.useCases;
  } catch (error) {
    console.error('Error generating use cases:', error);
    throw error;
  }
}