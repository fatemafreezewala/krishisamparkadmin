import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from '@ubaids/react-native-material-textfield';

import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native-paper';
const AddCategory = () => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  return (
    <View style={styles.container}>
      <ScrollView style={{padding: 20}}>
        <OutlinedTextField
          label="Name"
          secureTextEntry={true}
          containerStyle={styles.input}
          onChangeText={setPassword}
          inputContainerStyle={{borderColor: '#eee'}}
        />
        {image == '' ? (
          <Image
            style={{width: 200, height: 200, resizeMode: 'contain'}}
            source={require('../assets/sample.png')}
          />
        ) : (
          <Image
            style={{width: 200, height: 200, resizeMode: 'contain'}}
            source={{uri: image}}
          />
        )}

        <Button
          contentStyle={{alignSelf: 'flex-start'}}
          icon="camera"
          mode="text"
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
            }).then((image) => {
              console.log(image);
              setImage(image.path);
            });
          }}>
          Upload Image
        </Button>
        <Button
          style={{marginTop: '10%'}}
          color="#222022"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Add Now
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  input: {
    marginTop: 20,
  },
});
