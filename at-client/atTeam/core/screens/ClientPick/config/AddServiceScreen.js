import React from 'react';
import { Text,ScrollView,FlatList,View, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore } from 'expo';


export default class AddServiceScreen extends React.Component {
  constructor(){
    super()
    this.state={
      dataSource:[]
    }

  this.socket=io.connect('http://localhost:3000/clientConfig', {reconnect: true});

  }


  _addService = async () => {
    this.socket.emit('requestAdd', {service:await SecureStore.getItemAsync('selectedService'), clientUsername:await SecureStore.getItemAsync('clientSelectedUsername') });

  }


    render() {
      return (
        <View>
            <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this._addService}
            >

            <Text style={styles.buttonText}> Add Service </Text>
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
