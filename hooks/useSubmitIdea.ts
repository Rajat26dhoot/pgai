// hooks/useSubmitIdea.ts
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import type { Idea } from '../types/type';

export const useSubmitIdea = () => {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [existingIdeas, setExistingIdeas] = useState<Idea[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadIdeas = async () => {
        const storedIdeas = await AsyncStorage.getItem('ideas');
        const ideas: Idea[] = storedIdeas ? JSON.parse(storedIdeas) : [];
        setExistingIdeas(ideas);
      };
      loadIdeas();
    }, [])
  );

  const handleSubmit = async () => {
    if (!name || !tagline || !description) {
      Alert.alert('Please fill all fields');
      return;
    }

    const aiRating = Math.floor(Math.random() * 101);
    const newIdea: Idea = {
      id: Date.now().toString(),
      name,
      tagline,
      description,
      rating: aiRating,
    };

    try {
      const updatedIdeas = [...existingIdeas, newIdea];
      await AsyncStorage.setItem('ideas', JSON.stringify(updatedIdeas));
      Alert.alert('🎉 Success', `AI Rating: ${aiRating}/100`);
      setName('');
      setTagline('');
      setDescription('');
      router.push('/IdeaListScreen');
    } catch (error) {
      Alert.alert('Error saving your idea');
    }
  };

  return {
    name,
    tagline,
    description,
    setName,
    setTagline,
    setDescription,
    handleSubmit,
  };
};
