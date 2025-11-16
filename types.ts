
export enum LearningStepType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  INTERACTIVE = 'INTERACTIVE',
  PROJECT = 'PROJECT',
  MENTORSHIP = 'MENTORSHIP',
}

export interface LearningStep {
  title: string;
  description: string;
  type: LearningStepType;
  duration: string; // e.g., "45 minutes", "2 hours"
  isPro: boolean;
}

export interface LearningPath {
  title: string;
  description: string;
  steps: LearningStep[];
}

export interface UserProfile {
  name: string;
  currentRole: string;
  careerGoal: string;
  skills: string[];
}
