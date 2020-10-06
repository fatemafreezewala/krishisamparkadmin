import React, { useContext, useState } from 'react'
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	Pressable,
	Alert,
	ActivityIndicator,
	ToastAndroid,
} from 'react-native'
import Header from '../components/Header'
import AppContext from '../context/AppContext'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import url from '../constant/url'

const ViewCategory = ({ navigation }) => {
	const { category, setCategory } = useContext(AppContext)
	const [loading, setLoading] = useState(false)

	const deleteAlert = (id) => {
		Alert.alert(
			'Delete Confirmation',
			'Do you want to delete this category?',
			[{ text: 'Cancel' }, { text: 'Yes', onPress: () => deleteCategory(id) }],
			{ cancelable: true },
		)
	}

	const deleteCategory = async (id) => {
		setLoading(true)
		try {
			const res = await fetch(`${url}deleteRecord`, {
				method: 'POST',
				body: JSON.stringify({
					id: id,
					column: 'subcat_id',
					table: 'subcategories_tbl',
				}),
			})
			const json = await res.json()
			if (json.status == '200') {
				let res = await fetchCategory()
				setCategory(res)
			}
			ToastAndroid.show('Category deleted', ToastAndroid.SHORT)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const fetchCategory = async () => {
		try {
			const res = await fetch(`${url}getSubCategory`, {
				method: 'POST',
				body: JSON.stringify({
					category_id: '1',
				}),
			})
			const json = await res.json()
			if (json.status == '200') {
				return json.data
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<Header title="Categories" />
			<ScrollView>
				<View style={styles.listWrap}>
					{loading && <ActivityIndicator size="large" color="#000" />}
					{category.map((item, i) => {
						return (
							<View style={styles.itemWrap} key={i}>
								<Pressable
									android_ripple={{ color: 'gray' }}
									style={styles.item}
									onPress={() =>
										navigation.navigate('ViewSubCat', {
											name: item.subcat_name,
											category_id: item.subcat_id,
										})
									}>
									<Text style={styles.name}>{item.subcat_name}</Text>
								</Pressable>
								<View style={styles.icons}>
									<Pressable
										android_ripple={{ color: 'gray' }}
										onPress={() => {
											deleteAlert(item.subcat_id)
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
})
export default ViewCategory
