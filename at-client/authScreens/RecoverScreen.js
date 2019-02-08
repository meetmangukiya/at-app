import React from 'react';
import qs from 'qs';
import { Linking } from 'react-native';
import email from 'react-native-email'

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Button
} from 'react-native';
import { SecureStore } from 'expo';

import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent='react-native';

export default class RecoverScreen extends React.Component {

  constructor() {
  super();
  this.state = {screenFirstName: '',
  error:''};

  this.socket=io.connect('http://localhost:3000/authentication', {reconnect: true});

};

render() {
        return (
            <View style={styles.container}>
                <Button title="Send Recovery Mail" onPress={this.handleEmail} />
            </View>
        )
    }



    handleEmail = () => {
        const to = ['armandpoonawala08@gmail.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            cc: ['armandpoonawala08@gmail.com'], // string or array of email addresses
            bcc: 'armandpoonawala08@gmail.com', // string or array of email addresses
            subject: 'Show how to use',
            body: 'Some body right here'
        }).catch(console.error)
    }
}




  const styles = StyleSheet.create({
    Welcome:{
      fontSize: 40,
      height:40,
      marginBottom: 20,
      color:'#00000',
      paddingHorizontal:10,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    loginText: {
      height:40,
      marginBottom: 20,
      color:'#00000',
      paddingHorizontal:10,
    },

    input: {
      height:40,
      backgroundColor:'rgba(255,255,255,0.2)',
      marginBottom: 20,
      color:'#2980b9',
      paddingHorizontal:10,
    },
    buttonContainer:{
      backgroundColor:'#000000',
      paddingVertical:15,
    },
    buttonText:{
      textAlign:'center',
      color: '#FFFFFF',
      fontWeight:'700',
    },
    errorText:{
      textAlign:'center',
      color: '#8b0000',
      fontSize:10,
      paddingHorizontal:20,

    }
  });
