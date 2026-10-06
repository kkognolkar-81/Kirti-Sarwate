export type TabType = 'home' | 'check-in' | 'stories' | 'insights' | 'profile';

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  quote: string;
  quoteAuthor?: string;
  paragraphs: string[];
  readTime: string;
  audioTime: string;
  audioDurationSeconds: number;
  category: 'anxiety' | 'encouragement' | 'loneliness' | 'rest' | 'all';
  categoryLabel: string;
  tags: string[];
  image: string;
  companionImage?: string;
  keywords: string;
  writtenAgo: string;
  isFavorite: boolean;
  isBookmarked: boolean;
  originBadge?: string;
  personalizationNote?: string;
}

export interface CheckInData {
  emotionId: string;
  emotionTitle: string;
  emotionSubtitle: string;
  valence: number;
  valenceLabel: string;
  areas: string[];
  reflectionText: string;
  timestamp: number;
}

export interface SavedReflection {
  id: string;
  storyTitle: string;
  prompt: string;
  content: string;
  date: string;
}
