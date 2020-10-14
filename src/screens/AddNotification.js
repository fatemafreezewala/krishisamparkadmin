import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import Header from '../components/Header'
import { Button } from 'react-native-paper'

const AddNotification = () => {
	const [text, setText] = useState('')

	return (
		<View style={styles.container}>
			<Header title="Notification" />

			<ScrollView style={{ padding: 20 }}>
				<OutlinedTextField
					label="Text"
					containerStyle={styles.input}
					inputContainerStyle={{ borderColor: '#eee' }}
				/>
				<Button
					style={{ marginTop: 30 }}
					color="#222022"
					mode="contained"
					onPress={() => {}}>
					Send Now
				</Button>
			</ScrollView>
		</View>
	)
}

export default AddNotification

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
	},
	input: {
		marginTop: 20,
	},
})
