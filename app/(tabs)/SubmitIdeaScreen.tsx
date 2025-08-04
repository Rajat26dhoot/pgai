import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Title,
  useTheme,
  Avatar,
  Text,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function SubmitIdeaScreen() {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [existingIdeas, setExistingIdeas] = useState([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadIdeas = async () => {
        const storedIdeas = await AsyncStorage.getItem('ideas');
        const ideas = storedIdeas ? JSON.parse(storedIdeas) : [];
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
    const newIdea = {
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={[styles.scrollBg, { backgroundColor: colors.background }]}>
        {/* Header Section */}
        <View style={styles.headerBox}>
          <View style={styles.headerContent}>
            <Text style={styles.logoEmoji}>💡</Text>
            <Title style={styles.headerTitle}>Submit Your Startup Idea</Title>
          </View>
          <Text style={styles.profileIcon}>😎</Text>
        </View>

        {/* Form */}
        <View style={styles.formWrap}>
          <TextInput
            label="Startup Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
            outlineColor={colors.primary}
          />
          <TextInput
            label="Tagline"
            value={tagline}
            onChangeText={setTagline}
            style={styles.input}
            mode="outlined"
            outlineColor={colors.primary}
          />
          <TextInput
            placeholder="Describe your startup idea here..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            style={[styles.input, styles.descriptionInput]}
            mode="outlined"
            outlineColor={colors.primary}
          />
          <Button
            onPress={handleSubmit}
            mode="contained"
            icon="rocket-launch"
            style={[styles.button, { backgroundColor: colors.primary }]}
            contentStyle={{ paddingVertical: 10, borderRadius: 26 }}
            labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
          >
            Submit Idea
          </Button>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollBg: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  headerBox: {
    backgroundColor: '#27273f',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 18,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  profileIcon: {
    position: 'absolute',
    fontSize: 26,
    top: 16,
    right: 15,
    borderRadius:18,
  },
  formWrap: {
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
  },
  descriptionInput: {
    height: 140, // Increase or adjust height as needed
    textAlignVertical: 'top', // Ensures text starts from the top
  },
  button: {
    marginTop: 14,
    borderRadius: 26,
  },
});
