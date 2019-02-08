import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  NavigationActions,
  KeyboardAvoidingView,
  Button
} from 'react-native';
import { SecureStore } from 'expo';
import io from 'socket.io-client/dist/socket.io';


export default class FirstQuestionScreen extends React.Component {


  constructor() {
  super();

  this.state = {
  Age: '',
};

  this.socket=io.connect('http://localhost:3000/kyc', {reconnect: true});

};

  _submitKYC = async () => {

      this.socket.emit('submitKYC',  {clientUsername: await SecureStore.getItemAsync('usernameToken'),age: this.state.Age});
        this.socket.on('submittedKYC', function(data){
          console.log(data);
            alert(data);
          });
          }




    render() {
      return (

        <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <TextInput
            placeholder="How old is your business?"
              onChangeText={(text) => this.setState({Age:text})}
              style={styles.input}
              />

            <TouchableOpacity
            style={styles.buttonContainer}
            onPress= {this._submitKYC}>
              <Text style={styles.buttonText}> Submit KYC </Text>
              </TouchableOpacity>

        </KeyboardAvoidingView>

      );

    }

};


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
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5F5DC',
    },
    loginText: {
      height:40,
      marginBottom: 20,
      color:'#00000',
      paddingHorizontal:20,
    },

    input: {
      height:40,
      backgroundColor:'rgba(255,255,255,0.2)',
      marginBottom: 20,
      color:'#2980b9',
      paddingHorizontal:40,
    },
    buttonContainer:{
      backgroundColor:'#000000',
      paddingVertical:15,
      paddingHorizontal:20,
      marginBottom: 20,


    },
    buttonText:{
      textAlign:'center',
      color: '#FFFFFF',
      fontWeight:'700',
      paddingHorizontal:20,

    },
    errorText:{
      textAlign:'center',
      color: '#8b0000',
      fontSize:10,
      paddingHorizontal:20,

    }

    ,
  });
