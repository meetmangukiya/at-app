import React from 'react';
import { Text,ScrollView,FlatList,View, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore } from 'expo';


export default class ConfigClientItemsScreen extends React.Component {
  constructor(){
    super()
    this.state={
      dataSource:[]
    }

  this.socket=io.connect('http://localhost:3000/clientConfig', {reconnect: true});

  }


  _selectServiceComponent = async (serviceName) => {
    await SecureStore.setItemAsync('serviceName',serviceName);
    this.props.navigation.navigate('ServiceConfig');


  }


    render() {
      return (
        <Text>Client Date</Text>

      );
    }
  };
