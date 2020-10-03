import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from '@ubaids/react-native-material-textfield';

import {Button} from 'react-native-paper';
const AddNotification = () => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView style={{padding: 20}}>
        <OutlinedTextField
          label="Text"
          secureTextEntry={true}
          containerStyle={styles.input}
          onChangeText={setPassword}
          inputContainerStyle={{borderColor: '#eee'}}
        />

        <Button
          style={{marginTop: '10%'}}
          color="#222022"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Send Now
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddNotification;

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
