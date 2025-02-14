import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const CreatingApplicationMessage = () => (
  <LoadingSpinner message="Creating your application..." />
);

export const GeneratingFeaturesMessage = () => (
  <LoadingSpinner message="Crafting features for your application..." />
);

export const WritingStoriesMessage = () => (
  <LoadingSpinner message="Writing user stories..." />
);