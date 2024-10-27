import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabBarIcon({ name, size=25, color }) {
	return <Ionicons name={name} size={size} color={color} />;
}