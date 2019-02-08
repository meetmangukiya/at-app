import React from 'react';
import { Text,ScrollView, StyleSheet, View, Button, FlatList, Dimensions,  TouchableOpacity,Image } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore } from 'expo';


export default class IGcalendarScreen extends React.Component {
  static navigationOptions = {
  };

  constructor(){
    console.log("testCode");
    super()
    this.state={
      dataSource:[],
    }

  this.socket=io.connect('http://localhost:3000/content', {reconnect: true});

  };

  async componentDidMount(){

    this.socket.emit('getCalendar', {clientUsername:await SecureStore.getItemAsync('clientSelectedUsername')});

    this.socket.on('gottenCalendar', async(data)=>{
      console.log(data);

          this.setState({dataSource:data});
          });
      }



  _done= async () => {

  await this.socket.emit('done', {clientUsername:await SecureStore.getItemAsync('clientSelectedUsername'), entity:await SecureStore.getItemAsync('entityToken'), msg:'Create Content Calendar'});
  this.props.navigation.navigate('Home');

  }


  render() {
    return (

      <FlatList
      data={this.state.dataSource}
      numColumns={3}
      renderItem={({item}) =>

      {
          return (
            <TouchableOpacity onPress={() => this._selectPost(item.key)}>

            <Image source={{ uri: "data:image/jpeg;base64,"+item.base64 }} style={{ width: 138, height: 138 }} />

              <View style={{ width: "100%", height: 1, backgroundColor: "gray" }} />
            </TouchableOpacity>
          );


        }
      }


      />


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#fff',
  },
});
