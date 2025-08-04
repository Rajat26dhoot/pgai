// hooks/useLeaderboard.ts
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Idea } from '../types/type';

export const useLeaderboard = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'votes'>('votes');

  useFocusEffect(
    useCallback(() => {
      const fetchAndSortIdeas = async () => {
        const data = await AsyncStorage.getItem('ideas');
        const parsed: Idea[] = data ? JSON.parse(data) : [];

        const withVotes = parsed.map((idea) => ({
          ...idea,
          votes: idea.votes ?? 0,
        }));

        const sorted = [...withVotes].sort((a, b) =>
          sortBy === 'rating' ? b.rating - a.rating : (b.votes ?? 0) - (a.votes ?? 0)
        );

        setIdeas(sorted.slice(0, 5));
      };

      fetchAndSortIdeas();
    }, [sortBy])
  );

  return { ideas, sortBy, setSortBy };
};
