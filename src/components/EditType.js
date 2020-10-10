import React, { useRef, useState } from 'react'
import {
	ScrollView,
	StyleSheet,
	ToastAndroid,
	Modal,
	Image,
} from 'react-native'
import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import ImagePicker from 'react-native-image-crop-picker'
import { Button } from 'react-native-paper'
import Header from '../components/Header'
import url from '../constant/url'

const EditModal = ({ info, modalVis, setModalVis, handleRefresh }) => {
	const [name, setName] = useState(info.type_sub_name)
	const [desc, setDesc] = useState(info.type_sub_desp)
	const [image, setImage] = useState({})
	const [loading, setLoading] = useState(false)

	const handleEdit = async () => {
		setLoading(true)
		const formData = new FormData()
		formData.append('type_sub_name', name)
		formData.append('type_sub_desp', name)
		formData.append('type_sub_id', info.type_sub_id)
		if (image.path) {
			formData.append('type_sub_image', {
				uri: image.path,
				type: image.mime,
				name: image.path.match(/.*\/(.*)$/)[1],
			})
		}
		try {
			const res = await fetch(`${url}updateTypeSubcategory`, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
				},
			})
			const json = await res.json()

			setLoading(false)
			if (json.status == '200') {
				ToastAndroid.show('Updated successfully', ToastAndroid.SHORT)
				setImage({})
				setModalVis(false)
				handleRefresh()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const handleImagePicker = () => {
		ImagePicker.openPicker({
			width: 300,
			height: 300,
			cropping: true,
		})
			.then((image) => {
				setImage(image)
			})
			.catch(() => {
				console.log('Cancelled')
			})
	}

	return (
		<Modal
			animationType="slide"
			visible={modalVis}
			onRequestClose={() => {
				setModalVis(false)
			}}>
			<Header title="Edit Type" noBack={true} />

			<ScrollView style={{ padding: 20 }}>
				<OutlinedTextField
					label="Type"
					containerStyle={styles.input}
					onChangeText={setName}
					defaultValue={info.type_sub_name}
				/>
				<OutlinedTextField
					label="Description"
					containerStyle={styles.input}
					onChangeText={setDesc}
					defaultValue={info.type_sub_desp}
				/>
				{image.path ? (
					<Image style={styles.imageStyle} source={{ uri: image.path }} />
				) : (
					<Image
						style={styles.imageStyle}
						source={{ uri: info.type_sub_image }}
					/>
				)}

				<Button
					// contentStyle={{ alignSelf: 'flex-start' }}
					icon="camera"
					mode="outlined"
					onPress={handleImagePicker}>
					Upload Image
				</Button>
				<Button
					style={{ marginTop: '10%' }}
					color="#222022"
					mode="contained"
					loading={loading}
					onPress={handleEdit}>
					Save
				</Button>
			</ScrollView>
		</Modal>
	)
}

export default EditModal

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
		width: 150,
		height: 150,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginVertical: 20,
	},
})
