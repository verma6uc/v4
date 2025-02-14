import { useState, useEffect } from 'react';
import { Feature } from '../../../../services/mock/features';
import { UseCase } from '../../../../services/mock/useCases';
import { generateUseCases } from '../../../../services/api/applicationCreation';
import { ConceptOption } from '../../../../utils/openai';

interface UseCaseMap {
  [featureId: string]: {
    useCases: UseCase[];
    isLoading: boolean;
  };
}

interface UseUseCasesProps {
  features: Feature[];
  selectedConcept: ConceptOption | null;
  applicationData: {
    title: string;
    description: string;
    answers?: Record<string, string[]>;
  };
}

export function useUseCases({ features, selectedConcept, applicationData }: UseUseCasesProps) {
  const [useCaseMap, setUseCaseMap] = useState<UseCaseMap>({});

  const loadUseCases = async (feature: Feature) => {
    if (!selectedConcept) return;

    setUseCaseMap(prev => ({
      ...prev,
      [feature.id]: {
        useCases: [],
        isLoading: true
      }
    }));

    try {
      const cases = await generateUseCases(
        feature,
        {
          title: applicationData.title,
          description: applicationData.description,
          selectedConcept: selectedConcept,
          answers: applicationData.answers || {}
        }
      );

      setUseCaseMap(prev => ({
        ...prev,
        [feature.id]: {
          useCases: cases,
          isLoading: false
        }
      }));
    } catch (error) {
      console.error('Error loading use cases:', error);
      setUseCaseMap(prev => ({
        ...prev,
        [feature.id]: {
          useCases: [],
          isLoading: false
        }
      }));
    }
  };

  useEffect(() => {
    features.forEach(feature => {
      if (!useCaseMap[feature.id]) {
        loadUseCases(feature);
      }
    });
  }, [features, selectedConcept]);

  return { useCaseMap };
}