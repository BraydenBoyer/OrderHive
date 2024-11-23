import * as React from 'react';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

export default function TabBarIcon({ name, size=25, color }) {
	return <MaterialIcons name={name} size={size} color={color} />;
}