// tabs/dashboardTab/_layout.jsx
import { Stack } from 'expo-router';
import { basicScreenOption } from '../../../StylesTemp/basicScreenStyling';

export default function StackLayout() {
  return (
    <Stack screenOptions={basicScreenOption}>
      <Stack.Screen name={"index"} />
      <Stack.Screen name={"CollectionInfo"} />
      <Stack.Screen name={"Collaborator"}/>
      <Stack.Screen name={"Pickup"} />
      <Stack.Screen name={"SalesForecasting"} />
      <Stack.Screen name={"OrderAssembly"} />
      <Stack.Screen name={"ProductAnalysis"} />
    </Stack>
  );
}