import React, { useState, useEffect } from 'react'
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
	Pressable,
	Alert,
	ToastAndroid,
} from 'react-native'
import Header from '../components/Header'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import url from '../constant/url'

const ViewCategory = ({ route, navigation }) => {
	const { name, id } = route.params
	const [loading, setLoading] = useState(false)
	const [types, setTypes] = useState([])

	useEffect(() => {
		getType()
	}, [])

	const getType = async () => {
		setLoading(true)
		try {
			const res = await fetch(`${url}getSubType`, {
				method: 'POST',
				body: JSON.stringify({
					type_sub_parent_id: id,
				}),
			})
			const json = await res.json()

			setLoading(false)
			if (json.status == '200') {
				setTypes(json.data)
			} else {
				setTypes([])
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const deleteAlert = (id) => {
		Alert.alert(
			'Delete Confirmation',
			'Do you want to delete this category?',
			[{ text: 'Cancel' }, { text: 'Yes', onPress: () => deleteType(id) }],
			{ cancelable: true },
		)
	}

	const deleteType = async (id) => {
		setLoading(true)
		try {
			const res = await fetch(`${url}deleteRecord`, {
				method: 'POST',
				body: JSON.stringify({
					id: id,
					column: 'type_sub_id',
					table: 'typesubcategories_tbl',
				}),
			})
			const json = await res.json()
			setLoading(false)
			if (json.status == '200') {
				await getType()
			}
			ToastAndroid.show('Deleted', ToastAndroid.SHORT)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<Header title={name} />
			<ScrollView>
				<View style={styles.listWrap}>
					{loading && <ActivityIndicator size="large" color="#000" />}
					{types.length == 0 && !loading && (
						<Text style={styles.errText}>No types Added</Text>
					)}
					{types.map((item, i) => {
						return (
							<View style={styles.itemWrap} key={i}>
								<View style={styles.item}>
									<Text style={styles.name}>{item.type_sub_name}</Text>
								</View>
								<View style={styles.icons}>
									<Pressable
										android_ripple={{ color: 'gray' }}
										onPress={() => {
											deleteAlert(item.type_sub_id)
										}}>
										<MCI
											style={styles.icon}
											name="delete-alert-outline"
											size={25}
											color="#e17055"
										/>
									</Pressable>
									<MCI
										style={styles.icon}
										name="square-edit-outline"
										size={25}
										color="#636e72"
									/>
								</View>
							</View>
						)
					})}
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	listWrap: {
		margin: 20,
	},
	itemWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 0.5,
		borderBottomColor: 'gray',
	},
	icons: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		margin: 10,
	},
	item: {
		paddingVertical: 15,
		flex: 1,
	},
	name: {
		fontSize: 18,
	},
	errText: {
		color: 'gray',
		textAlign: 'center',
	},
})
export default ViewCategory
