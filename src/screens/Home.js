import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Home = ({navigation}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'playlist-edit',
      title: 'Main Category',
      onpress: 'AddCategory',
    },
    {
      id: 'bd7acbea-c1b1-46c-aed5-3ad53abb28ba',
      name: 'playlist-plus',
      title: 'Sub Category',
      onpress: 'AddSubCategory',
    },
    {
      id: 'bd7acbea-c1b1-46c-aed5-3ad53ab28ba',
      name: 'format-list-text',
      title: 'Seedling Type',
      onpress: 'AddSeedling',
    },
    {
      id: 'bd7acba-c1b1-46c-aed5-3ad53ab28ba',
      name: 'bell',
      title: 'Notification',
      onpress: 'AddNotification',
    },
  ];
  const renderItem = ({item}) => (
    <Item
      onPress={() => navigation.navigate(item.onpress)}
      title={item.name}
      icon={item.title}
    />
  );
  const Item = ({title, icon, onPress}) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Icon color="#6ead3a" name={title} size={70}></Icon>
      <Text style={styles.sub}>{icon}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Welcome Admin!</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  item: {
    height: 160,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 15,
    marginVertical: 20,
    elevation: 2,
    backgroundColor: '#222022',
    borderRadius: 10,
    borderColor: '#008A16',
    flex: 1,
  },
  title: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: '10%',
  },
  sub: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'BreeSerif-Regular',
  },
  head: {
    fontFamily: 'BreeSerif-Regular',
    fontSize: 36,
    marginTop: '10%',
    textAlign: 'left',
    color: '#6ead3a',
    marginLeft: 20,
  },
});
export default Home;
