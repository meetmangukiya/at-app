import React from 'react';
import { Text,ScrollView,FlatList,View, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore } from 'expo';


export default class RemoveServiceScreen extends React.Component {
  constructor(){
    super()
    this.state={
      dataSource:[]
    }

  this.socket=io.connect('http://localhost:3000/clientConfig', {reconnect: true});

  }


  _removeService = async () => {
    var service=await SecureStore.getItemAsync('selectedService');
    this.socket.emit('requestRemoval', {service:service, clientUsername:await SecureStore.getItemAsync('clientSelectedUsername') });

  }


    render() {
      return (
        <View>
            <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this._removeService}
            >

            <Text style={styles.buttonText}> Remove Service </Text>
            </TouchableOpacity>

          </View>

      );
    }
  };




        const styles = StyleSheet.create({
          container: {
            alignItems: 'center',
            backgroundColor: '#fff',
          },
          assignContainer: {
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#fff',
          },
          configure:{
            backgroundColor: '#fff',

          },
          assignContentCreator:{
            paddingBottom:10
          },
          assigncontentCreator: {
            paddingBottom:10

          },
          buttonContainer:{
            backgroundColor:'#000000',

          },
          buttonText:{
            textAlign:'center',
            color: '#FFFFFF',
            fontWeight:'700',
          },
        });
