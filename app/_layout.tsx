import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export function AppLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: '#4A90E2',
      },
      headerShown: false,  // This will hide the black "index" header
      headerTitleStyle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
      },
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        paddingTop: 10,
        height: Platform.OS === 'ios' ? 85 : 65,
      },
      tabBarActiveTintColor: '#4A90E2',
      tabBarInactiveTintColor: '#8E8E93',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: -5,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groceryList"
        options={{
          title: 'Grocery List',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-basket" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
