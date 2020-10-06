import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'

const ViewSeller = () => {
	return (
		<View style={styles.container}>
			<Header title="Sellers" />
		</View>
	)
}

export default ViewSeller

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
