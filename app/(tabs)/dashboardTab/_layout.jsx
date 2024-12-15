// tabs/dashboardTab/_layout.jsx
import { Stack } from 'expo-router';
import { basicScreenOption } from '../../styles/basicScreenStyling';
import { lightTheme } from "../../styles/themes/colors/lightTheme.jsx"; // Adjust path as necessary

const colors = lightTheme.colors;

// Update `basicScreenOption` if needed to include color properties from the theme
const themedScreenOptions = {
  ...basicScreenOption,
  headerStyle: {
    backgroundColor: colors.primary, // Use theme color for header background
  },
  headerTintColor: colors.onPrimary, // Use theme color for header text/icons
  contentStyle: {
    backgroundColor: colors.background, // Use theme color for screen background
  },
};

export default function StackLayout() {
  return (
    <Stack screenOptions={themedScreenOptions}>
      <Stack.Screen name={"index"} />
      <Stack.Screen name={"OrderCreation"} />
      <Stack.Screen name={"CreateOrder"} />
      <Stack.Screen name={"orderPage/[OrderID]"} />
      <Stack.Screen name={"pickupOrderPage/[OrderID]"} />
      <Stack.Screen name={"OrderPickup"} />
      <Stack.Screen name={"CollectionInfo"} />
      <Stack.Screen name={"Collaborator"}/>
      <Stack.Screen name={"Pickup"} />
      <Stack.Screen name={"SalesForecasting"} />
      <Stack.Screen name={"OrderAssembly"} />
      <Stack.Screen name={"ProductAnalysis"} />
    </Stack>
  );
}