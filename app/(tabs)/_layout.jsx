import { Tabs } from 'expo-router';
import React from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    const options = (title) => {
        return {
            title: title,

        }
    }


    return (
        <Tabs
            screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            }}>
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    headerShown: false,

                }}
            />
            <Tabs.Screen
                name="customer"
            />
        </Tabs>
    );
}
