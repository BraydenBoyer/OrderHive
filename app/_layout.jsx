import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {Tabs} from 'expo-router'
import { useColorScheme } from '@/hooks/useColorScheme';
import TabNavigation from "../components/navigation/_tabNavigator";

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
      <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
	      <Tabs>
            <Tabs.Screen name="Index" options={{title: 'Home'}}/>
            <Tabs.Screen name="Inventory" options={{title: 'Inventory'}}/>
          </Tabs>
      </ThemeProvider>
  );
}
