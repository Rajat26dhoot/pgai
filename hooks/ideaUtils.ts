import AsyncStorage from '@react-native-async-storage/async-storage';
import { Idea } from '../types/type';

export const loadIdeas = async (): Promise<Idea[]> => {
  const data = await AsyncStorage.getItem('ideas');
  const parsed: Idea[] = data ? JSON.parse(data) : [];
  return parsed.map((idea) => ({
    ...idea,
    votes: idea.votes ?? 0,
  }));
};

export const saveIdeas = async (ideas: Idea[]): Promise<void> => {
  await AsyncStorage.setItem('ideas', JSON.stringify(ideas));
};

export const sortIdeas = (ideas: Idea[], sortBy: 'rating' | 'votes'): Idea[] => {
  return [...ideas].sort((a, b) =>
    sortBy === 'rating'
      ? b.rating - a.rating
      : (b.votes ?? 0) - (a.votes ?? 0)
  );
};

export const upvoteIdea = (ideas: Idea[], id: string): Idea[] => {
  return ideas.map((idea) =>
    idea.id === id ? { ...idea, votes: (idea.votes ?? 0) + 1 } : idea
  );
};
