import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: isDark ? '#c792ea' : '#7e57c2',
        tabBarInactiveTintColor: isDark ? '#bbbbbb' : '#a0a0a0',
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 14,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Match icon to tab name
          if (route.name === 'SubmitIdeaScreen') {
            iconName = focused ? 'bulb' : 'bulb-outline';
          } else if (route.name === 'IdeaListScreen') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'LeaderboardScreen') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else {
            iconName = 'ellipse-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={28}
              color={color}
              style={{ marginBottom: -2 }}
            />
          );
        },
        tabBarStyle: {
          position: 'absolute',
          left: 18,
          right: 18,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          borderTopWidth: 0,
          height: 70,
          backgroundColor: isDark ? '#27273f' : '#ffffffdd',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.14,
          shadowRadius: 16,
          elevation: 20,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          margin: 15,
          borderRadius: 18,
        },
      })}
      sceneContainerStyle={{
        backgroundColor: isDark ? '#101014' : '#f5f7fb',
      }}
    >
      <Tabs.Screen
        name="SubmitIdeaScreen"
        options={{
          title: 'Submit',
        }}
      />
      <Tabs.Screen
        name="IdeaListScreen"
        options={{
          title: 'Ideas',
        }}
      />
      <Tabs.Screen
        name="LeaderboardScreen"
        options={{
          title: 'Top',
        }}
      />
    </Tabs>
  );
}
