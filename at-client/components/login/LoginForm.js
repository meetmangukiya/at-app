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
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

export default class LoginForm extends React.Component {

    render() {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <TextInput
            placeholder="username or email"
              returnKeyType="next"
              onSubmitEditing={()=>this.passwordInput.focus()}
              keyboardType="email-address"
              style={styles.input}
              />


            <TextInput
                placeholder="password"
                returnKeyType="go"
                secureTextEntry
                ref={(input)=>this.passwordInput=input}
                style={styles.input}
                />


            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

        </KeyboardAvoidingView>
      );

    }
  }

  const styles = StyleSheet.create({
    container:{
      padding:20,
    }
    input: {
      height:40
      backgroundColor:'rgba(255,255,255,0.2)'
      marginBottom: 20
      color:'#FFF'
      paddingHorizontal:10
    },
    buttonContainer:{
      backgroundColor:'#2980b9'
      paddingVertical:15
    },
    buttonText{
      textAlign:'center'
      color: '#FFFFFF'
      fontWeight:'700'
    }
  });
