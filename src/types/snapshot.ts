export interface MoveDetails {
  country: string;
  city: string;
  moveDate: string; // YYYY-MM
}

export interface ChildProfile {
  name: string;
  age: string;
  yearGroup: string;
  languages: string[];
  hasSpecialNeeds: boolean;
  specialNeedsDetails: string;
}

export interface Preferences {
  schoolTypes: string[];
  topPriorities: string[];
  wantApplicationTracking: boolean;
  wantDocumentHelp: boolean;
  wantTimelineBuilding: boolean;
}

export interface FinderFormData {
  move: MoveDetails;
  child: ChildProfile;
  preferences: Preferences;
}

export interface ApplicationStep {
  title: string;
  description: string;
  timeline: string;
}

export interface School {
  id: string;
  name: string;
  type: string;
  curriculum: string;
  location: string;
  ageRange: string;
  matchScore: number;
  highlights: string[];
  tuitionRange: string;
  applicationSteps: ApplicationStep[];
}
