import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'
import TabNavigator from './TabNavigator'

import AddCategory from '../screens/AddCategory'
import AddSubCategory from '../screens/AddSubCategory'
import AddSeedling from '../screens/AddSeedling'
import AddNotification from '../screens/AddNotification'
import ViewSubCat from '../screens/ViewSubCat'
import ViewTypes from '../screens/ViewTypes'

const Stack = createStackNavigator()

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}>
				<Stack.Screen name="Home" component={TabNavigator} />
				<Stack.Screen name="AddNotification" component={AddNotification} />
				<Stack.Screen name="AddSeedling" component={AddSeedling} />
				<Stack.Screen name="AddSubCategory" component={AddSubCategory} />
				<Stack.Screen name="AddCategory" component={AddCategory} />
				<Stack.Screen name="ViewSubCat" component={ViewSubCat} />
				<Stack.Screen name="ViewTypes" component={ViewTypes} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default AppNavigator
