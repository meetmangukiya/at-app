import React from 'react';
import { Text,ScrollView,FlatList,View, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore } from 'expo';


export default class SelectAddServiceScreen extends React.Component {
  constructor(){
    super()
    this.state={
      dataSource:'',
    }

  this.socket=io.connect('http://localhost:3000/clientConfig', {reconnect: true});

  }

  async componentDidMount(){

    this.socket.emit('requestAllAddServices', await SecureStore.getItemAsync('clientSelectedUsername'));

    this.socket.on('gottenAllAddServices', async(data)=>{

        this.setState({
          dataSource:data,
        });

      });

    };


  _selectService = async (key) => {
    await SecureStore.setItemAsync('selectedService',key);
    this.props.navigation.navigate('AddService');
  }


    render() {
      return (
        <FlatList
        data={this.state.dataSource}
        renderItem={({item}) =>

        {
            return (
              <TouchableOpacity onPress={() => this._selectService(item.key)}>

                <Text style={{ width: "100%", height: 48, backgroundColor: "white" }}>
                {item.value}
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
