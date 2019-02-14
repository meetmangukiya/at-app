import React from 'react';
import { Text,ScrollView,FlatList,View, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore } from 'expo';


export default class SelectServiceScreen extends React.Component {
  constructor(){
    super()
    this.state={
      dataSource:[]
    }

  this.socket=io.connect('http://localhost:3000/clientConfig', {reconnect: true});

  }

  async componentDidMount(){

    this.socket.emit('requestAllServices', await SecureStore.getItemAsync('clientSelectedUsername'));

    this.socket.on('gottenAllServices', async(data)=>{

    var serviceNames = [];
     for (i = 0; i < data.length; i++) {
        serviceNames.push({"key":i, "serviceName": data[i]});

        }

        this.setState({
          dataSource:serviceNames,
        });

      });

    };




  _selectService = async (serviceName) => {
    await SecureStore.setItemAsync('selectedService',serviceName);
    this.props.navigation.navigate('ServiceConfig');


  }


    render() {
      return (
        <FlatList
        data={this.state.dataSource}
        renderItem={({item}) =>

        {
            return (
              <TouchableOpacity onPress={() => this._selectService(item.serviceName)}>

                <Text style={{ width: "100%", height: 48, backgroundColor: "white" }}>
                {item.serviceName}
                </Text>
                <View style={{ width: "100%", height: 1, backgroundColor: "gray" }} />
              </TouchableOpacity>
            );


          }
        }


      />
      );
    }
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
