import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'

const ViewBuyer = () => {
	return (
		<View style={styles.container}>
			<Header title="Buyers" />
		</View>
	)
}

export default ViewBuyer

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
