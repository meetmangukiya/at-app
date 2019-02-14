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
  Button,
  Picker,
} from 'react-native';
import { SecureStore } from 'expo';
import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent='react-native';


export default class PickServicesScreen extends React.Component {


  constructor() {
  super();

  this.state = {
  selectedPackage:'',

};

  this.socket=io.connect('http://localhost:3000/package', {reconnect: true});

};



  _signInAsync = async () => {
    console.log("being called");

  this.props.navigation.navigate('ClientApp');

  };

  _startFreeTrial = async (services) => {

    if(services=="custom"){
      this.props.navigation.navigate('CustomizePackage');

    }
    else{

    this.socket.emit('startFreeTrial',  {clientUsername:await SecureStore.getItemAsync('usernameToken'),selectedPackage: services});
            this.socket.on('selectPackageMsg', function(data){
              console.log(data);
              alert(data);

            });
          }
      }


    render() {
      return (

        <View>

        <View>
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={()=>this._startFreeTrial(500)}
        >

          <Text style={styles.buttonText}> $500  </Text>
          </TouchableOpacity>
        </View>

        <View>

          <TouchableOpacity
          style={styles.buttonContainer}
          onPress={()=>this._startFreeTrial(750)}
          >

            <Text style={styles.buttonText}> $750  </Text>
            </TouchableOpacity>
            </View>

            <View>

            <TouchableOpacity
            style={styles.buttonContainer}
            onPress={()=>this._startFreeTrial(1000)}
            >

              <Text style={styles.buttonText}> $1000  </Text>
              </TouchableOpacity>
              </View>

              <View>

              <TouchableOpacity
              style={styles.buttonContainer}
              onPress={()=>this._startFreeTrial("custom")}
              >

                <Text style={styles.buttonText}> Customize  </Text>
                </TouchableOpacity>
                </View>

                <View>


                  </View>

                  <View>

                <TouchableOpacity
                style={styles.buttonContainer}
                onPress= {this._signInAsync}>
                  <Text style={styles.buttonText}> Log In  </Text>
                  </TouchableOpacity>
                  </View>

            </View>


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
