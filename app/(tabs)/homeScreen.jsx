import React, {useEffect, useState} from 'react';
import {View, StatusBar, Animated, ScrollView, StyleSheet, TouchableOpacity, Button} from 'react-native';

import {Divider} from "react-native-paper";
import {homeStyle, pageStyle} from "../../styles/page.jsx";


const HomeScreen = ({navigation}) => {

	const [selected, setSelected] = useState('All');
	const [filterToday, setFilterToday] = useState(false)


	useEffect(() => {
		if(selected == 'Today'){
			setFilterToday(true)
		}
		else{
			setFilterToday(false)
		}

	}, [selected]);

	const handleSelect = (label) => {
		setSelected(label);
		console.log(`Selected: ${label}`);
	};

	return (
		<View style={pageStyle.body}>

			<View style={homeStyle.sideBarContainer}>
				<Button title={"Screen Switch"}
				        onPress={() => navigation.navigate("DetailsScreen", {name: "Brayden", age: 12})}
				/>
			</View>

			<View style={homeStyle.fileCardContainer}>
				<ScrollView decelerationRate={'fast'}
				            contentContainerStyle={homeStyle.fileCardScrollContent}
				            style={homeStyle.fileCardScroll}

				>
					<View style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'flex-start',
						columnGap: 20,
						rowGap: 20,
					}}>
						<Divider bold={true} style={{backgroundColor: 'red', width: '100%', padding: .7}}/>
					</View>
				</ScrollView>
			</View>

		</View>
	);
}


export default HomeScreen