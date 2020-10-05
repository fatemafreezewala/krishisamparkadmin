import React, { useState } from 'react'
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	ToastAndroid,
} from 'react-native'
import {
	TextField,
	FilledTextField,
	OutlinedTextField,
} from '@ubaids/react-native-material-textfield'
import ImagePicker from 'react-native-image-crop-picker'
import { Button } from 'react-native-paper'
import url from '../constant/url'
import Header from '../components/Header'

const AddCategory = ({ navigation }) => {
	const [name, setName] = useState('')
	const [image, setImage] = useState('')
	const [loading, setLoading] = useState(false)

	const handleAdd = async () => {
		if (!name || !image.path) {
			ToastAndroid.show(
				'Please enter name and select image',
				ToastAndroid.SHORT,
			)
			return
		}
		setLoading(true)
		const filename = image.path.match(/.*\/(.*)$/)[1]
		const formData = new FormData()
		formData.append('subcat_name', name)
		formData.append('category_id', '1')
		formData.append('subcat_image', {
			uri: image.path,
			type: image.mime,
			name: filename,
		})
		try {
			const res = await fetch(`${url}insertDataSubCategory`, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
				},
			})
			const json = await res.json()
			console.log(json)
			setLoading(false)
			if (json.status == '200') {
				ToastAndroid.show('Category added successfully', ToastAndroid.SHORT)
				navigation.goBack()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}
	return (
		<View style={styles.container}>
			<Header title="Add Category" />
			<ScrollView style={{ padding: 20 }}>
				<OutlinedTextField
					label="Category Name"
					containerStyle={styles.input}
					onChangeText={setName}
				/>
				{image == '' ? (
					<Image
						style={styles.imageStyle}
						source={require('../assets/sample.png')}
					/>
				) : (
					<Image style={styles.imageStyle} source={{ uri: image.path }} />
				)}

				<Button
					// contentStyle={{ alignSelf: 'flex-start' }}
					icon="camera"
					mode="outlined"
					onPress={() => {
						ImagePicker.openPicker({
							width: 300,
							height: 300,
							cropping: true,
						})
							.then((image) => {
								console.log(image)
								setImage(image)
							})
							.catch(() => {
								console.log('Cancelled')
							})
					}}>
					Upload Image
				</Button>
				<Button
					style={{ marginTop: '10%' }}
					color="#222022"
					mode="contained"
					loading={loading}
					onPress={handleAdd}>
					Add Now
				</Button>
			</ScrollView>
		</View>
	)
}

export default AddCategory

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: 'column',
		backgroundColor: '#fff',
		// paddingTop: 100,
	},
	input: {
		marginTop: 20,
	},
	imageStyle: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginVertical: 20,
	},
})
