// app/SubmitIdeaScreen.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Title,
  useTheme,
  Text,
} from 'react-native-paper';
import { useSubmitIdea } from '../hooks/useSubmitIdea';

export default function SubmitIdeaScreen() {
  const { colors } = useTheme();
  const {
    name,
    tagline,
    description,
    setName,
    setTagline,
    setDescription,
    handleSubmit,
  } = useSubmitIdea();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollBg, { backgroundColor: colors.background }]}
      >
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
    borderRadius: 18,
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
    height: 140,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 14,
    borderRadius: 26,
  },
});
