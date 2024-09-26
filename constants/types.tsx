import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type RootStackParamList = {

	HomeScreen: undefined,
	DetailsScreen: {name: string, age: number} | undefined
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
export type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetailsScreen'>;