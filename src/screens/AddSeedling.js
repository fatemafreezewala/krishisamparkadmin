import React, { useEffect, useState, useContext } from 'react'
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	ToastAndroid,
} from 'react-native'
import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import ImagePicker from 'react-native-image-crop-picker'
import { Button } from 'react-native-paper'
import { Picker } from '@react-native-community/picker'
import AppContext from '../context/AppContext'
import url from '../constant/url'
import Header from '../components/Header'

const AddSeedling = ({ navigation }) => {
	const { category } = useContext(AppContext)
	const [text, setText] = useState('')
	const [image, setImage] = useState('')
	const [catId, setCatId] = useState('')
	const [subCat, setSubCat] = useState([])
	const [selectedSubCat, setSelectedSubCat] = useState('')
	const [loading, setLoading] = useState(false)

	const handleAddSubCat = async () => {
		if (!text || !image.path || !selectedSubCat) {
			ToastAndroid.show('Incomplete data', ToastAndroid.SHORT)
			return
		}
		setLoading(true)
		const filename = image.path.match(/.*\/(.*)$/)[1]
		const formData = new FormData()
		formData.append('type_sub_name', text)
		formData.append('type_sub_parent_id', selectedSubCat)
		formData.append('type_sub_image', {
			uri: image.path,
			type: image.mime,
			name: filename,
		})
		try {
			const res = await fetch(`${url}insertSubTypeData`, {
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
				ToastAndroid.show('Sub Category added successfully', ToastAndroid.SHORT)
				navigation.goBack()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const getSubCategoryType = async (id) => {
		setCatId(id)
		try {
			const res = await fetch(`${url}getSubCategoryType`, {
				method: 'POST',
				body: JSON.stringify({
					subcategory_id: id,
				}),
			})
			const json = await res.json()
			if (json.status == '200') {
				setSubCat(json.data)
			} else {
				setSubCat([])
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<Header title="Add Type" />
			<ScrollView style={{ padding: 20 }}>
				<View style={styles.pickerWrapper}>
					<Picker
						mode="dropdown"
						selectedValue={catId}
						onValueChange={(itemValue) => {
							getSubCategoryType(itemValue)
						}}>
						<Picker.Item label="Select Category" value="" />
						{category.map((item, i) => {
							return (
								<Picker.Item
									key={i}
									label={item.subcat_name}
									value={item.subcat_id}
								/>
							)
						})}
					</Picker>
				</View>
				{subCat.length !== 0 && (
					<View style={styles.pickerWrapper}>
						<Picker
							mode="dropdown"
							selectedValue={selectedSubCat}
							onValueChange={(itemValue) => {
								setSelectedSubCat(itemValue)
							}}>
							<Picker.Item label="Select Sub-Category" value="" />
							{subCat.map((item, i) => {
								return (
									<Picker.Item
										key={i}
										label={item.type_name}
										value={item.type_id}
									/>
								)
							})}
						</Picker>
					</View>
				)}

				<OutlinedTextField
					label="Name"
					containerStyle={styles.input}
					onChangeText={setText}
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
					color="#6ead3a"
					icon="camera"
					mode="outlined"
					onPress={() => {
						ImagePicker.openPicker({
							width: 300,
							height: 300,
							cropping: true,
						})
							.then((image) => {
								setImage(image)
							})
							.catch((error) => {
								console.log(error)
							})
					}}>
					Upload Image
				</Button>
				<Button
					style={{ marginTop: '10%' }}
					color="#222022"
					mode="contained"
					loading={loading}
					onPress={handleAddSubCat}>
					Add Now
				</Button>
			</ScrollView>
		</View>
	)
}

export default AddSeedling

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
	},
	input: {
		marginTop: 20,
	},
	pickerWrapper: {
		borderWidth: 0.5,
		marginBottom: 20,
		borderRadius: 5,
	},
	imageStyle: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginVertical: 20,
	},
})
