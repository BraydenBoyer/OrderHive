import { Text, View, Button } from 'react-native';
import { router } from 'expo-router';

export default function Page() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Go to Inventory" onPress={() => router.navigate('inventory')} />
        </View>
    );
}
