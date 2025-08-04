import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, LayoutAnimation,
  UIManager, Platform, TouchableOpacity,
} from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Idea } from '../../types/type';
import { loadIdeas, saveIdeas, sortIdeas, upvoteIdea } from '../../utils/ideaUtils';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function IdeaListScreen() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'votes'>('rating');
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        const data = await loadIdeas();
        setIdeas(sortIdeas(data, sortBy));
      };
      fetch();
    }, [sortBy])
  );

  const handleUpvote = async (id: string) => {
    const updated = upvoteIdea(ideas, id);
    await saveIdeas(updated);
    setIdeas(sortIdeas(updated, sortBy));
  };

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const renderIdea = ({ item }: { item: Idea }) => {
    const isExpanded = expandedIds.includes(item.id);
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.tagline}>{item.tagline}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.badge}>⭐ {item.rating}/100</Text>
          <Text style={styles.badge}>👍 {item.votes}</Text>
        </View>
        {isExpanded && <Text style={styles.description}>{item.description}</Text>}
        <View style={styles.actions}>
          <Button
            mode="contained"
            buttonColor={colors.primary}
            onPress={() => handleUpvote(item.id)}
            style={styles.voteButton}
            labelStyle={{ fontWeight: 'bold' }}
          >
            Upvote
          </Button>
          <Button
            mode="text"
            textColor={colors.primary}
            onPress={() => toggleExpand(item.id)}
            labelStyle={{ fontWeight: '600' }}
          >
            {isExpanded ? 'Hide Details' : 'Read More'}
          </Button>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.heading}>🚀 Submitted Ideas</Text>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.capsuleToggleContainer}>
          {['rating', 'votes'].map((criteria) => (
            <TouchableOpacity
              key={criteria}
              onPress={() => setSortBy(criteria as 'rating' | 'votes')}
              style={[
                styles.capsuleButton,
                sortBy === criteria && styles.capsuleButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.capsuleText,
                  sortBy === criteria && styles.capsuleTextActive,
                ]}
              >
                {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id}
        renderItem={renderIdea}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// (keep your existing styles here)


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '500',
    padding: 15,
    color: 'white',
    backgroundColor: '#27273f',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  tagline: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 13,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    alignItems: 'center',
  },
  voteButton: {
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  sortContainer: {
    padding: 10,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  capsuleToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 24,
    padding: 4,
    alignSelf: 'flex-start',
  },
  capsuleButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  capsuleButtonActive: {
    backgroundColor: '#191927',
  },
  capsuleText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 14,
  },
  capsuleTextActive: {
    color: '#fff',
  },
  list: {
    padding: 10,
    paddingBottom: 40,
  },
});
