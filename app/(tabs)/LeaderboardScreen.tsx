// app/LeaderboardScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { Idea } from '../types/idea';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const badgeEmojis = ['🥇', '🥈', '🥉', '🏅', '🎖️']; // for top 5

export default function LeaderboardScreen() {
  const { ideas, sortBy, setSortBy } = useLeaderboard();

  const renderItem = ({ item, index }: { item: Idea; index: number }) => {
    const rankColor = ['#ffd700', '#c0c0c0', '#cd7f32', '#aaa', '#999'][index];

    return (
      <LinearGradient
        colors={['#fdfbfb', '#ebedee']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={[styles.badge, { backgroundColor: rankColor }]}>
          <Text style={styles.badgeText}>
            {badgeEmojis[index] ?? `#${index + 1}`}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.tagline}>{item.tagline}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>⭐ {item.rating}/100</Text>
            <Text style={styles.meta}>👍 {item.votes}</Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Top 5 Ideas</Text>

      <Text style={styles.head}>Sort By</Text>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchButton,
            sortBy === 'votes' && styles.switchButtonActive,
          ]}
          onPress={() => setSortBy('votes')}
        >
          <Text
            style={[
              styles.switchText,
              sortBy === 'votes' && styles.switchTextActive,
            ]}
          >
            Votes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchButton,
            sortBy === 'rating' && styles.switchButtonActive,
          ]}
          onPress={() => setSortBy('rating')}
        >
          <Text
            style={[
              styles.switchText,
              sortBy === 'rating' && styles.switchTextActive,
            ]}
          >
            Rating
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    padding: 15,
    marginBottom: 10,
    color: 'white',
    backgroundColor: '#27273f',
  },
  switchContainer: {
    padding: 15,
    gap: 12,
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  switchButtonActive: {
    backgroundColor: '#191927',
  },
  switchText: {
    color: '#333',
    fontWeight: '600',
  },
  switchTextActive: {
    color: 'white',
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  badgeText: {
    fontSize: 22,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  tagline: {
    fontStyle: 'italic',
    color: '#555',
    marginTop: 2,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 20,
  },
  meta: {
    fontSize: 14,
    color: '#444',
  },
  list: {
    padding: 16,
    paddingBottom: 20,
  },
});
