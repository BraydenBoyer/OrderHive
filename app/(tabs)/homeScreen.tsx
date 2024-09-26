import React, {useEffect, useState} from 'react';
import {View, StatusBar, Animated, ScrollView, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {DetailsScreenNavigationProp, HomeScreenNavigationProp, RootStackParamList} from "@/constants/types";
import {homeStyle, pageStyle} from "@/styles/page";
import {Divider} from "react-native-paper";
import MySegmentButton from "@/components/mySegmentButton";
import {MyCard} from "@/components/MyCard";
import {useIsFocused} from "@react-navigation/core";




type Props = {
	navigation: HomeScreenNavigationProp
}



const HomeScreen = ({navigation}: Props ) => {

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

	const handleSelect = (label: string) => {
		setSelected(label);
		console.log(`Selected: ${label}`);
	};

	return (
		<View style={pageStyle.body}>

			<View style={homeStyle.sideBarContainer}>
				<MySegmentButton labels={['All', 'Today','Franklin', 'Grove City', 'Clarion']} selected={selected} onSelect={handleSelect} />
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
						<MyCard todayFilter={filterToday} selected={selected} city={'Clarion'} date={'8/12/24'} details={'Nancy is coming late.'} totalCustomers={20} totalMoney={245.50}/>
						<MyCard todayFilter={filterToday} selected={selected} city={'Grove City'} date={'8/12/24'} details={'Nancy is coming late.'} totalCustomers={20} totalMoney={245.50}/>
						<MyCard todayFilter={filterToday} selected={selected} city={'Franklin'} date={'8/17/24'} details={'Nancy is coming late.'} totalCustomers={20} totalMoney={245.50}/>
						<MyCard todayFilter={filterToday} selected={selected} city={'Grove City'} date={'8/12/24'} details={'Nancy is coming late.Nancy is coming late.Nancy is coming late.Nancy is coming late.Nancy is coming late.Nancy is coming late.Nancy is coming late.Nancy is coming late.te.Nancy is coming late.'} totalCustomers={20} totalMoney={245.50}/>
						<Divider bold={true} style={{backgroundColor: 'red', width: '100%', padding: .7}}/>
					</View>
				</ScrollView>
			</View>

		</View>
	);
}


export default HomeScreen