import React from 'react';
import { Button,Text,ScrollView,FlatList,View, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore } from 'expo';
import { CheckBox } from 'react-native-elements'


export default class ClientScreen extends React.Component {
  constructor(){
    super()
    this.state={
      dataSource:[],
      selected:'',
      previousSelected:'',
    }

  this.socket=io.connect('http://localhost:3000/entities', {reconnect: true});

  }

  async componentDidMount(){

    this.socket.emit('requestAllClients', await SecureStore.getItemAsync('usernameToken'));

    this.socket.on('gottenAllClients', async(data)=>{

    var clientNames = [];
     for (i = 0; i < data.length; i++) {
        clientNames.push({"key":data[i]["_id"], "username": data[i]["username"],"businessName": data[i]["businessName"],"selected":false});
        if(i===data.length-1){
          this.setState({
            dataSource:clientNames
          });
        }
      }

    });


  }

  _goDrawer= async () => {
    this.props.navigation.navigate('Drawer');

  }

  _selectClient = async (item) => {
    await SecureStore.setItemAsync('clientConfigUsername',item.username);
    await SecureStore.setItemAsync('clientSelectedUsername',item.username);

    this.props.navigation.navigate('ClientSettings');


  }

  _filterClient = async (item) => {
    if(this.state.previousSelected==item){

    }
    else{

    await SecureStore.setItemAsync('clientSelectedUsername',item.username);
    item.selected=true;
    this.state.previousSelected.selected=false;
    var a= this.state.selected;
    a+="add";
    this.setState({selected:a});
    this.setState({previousSelected:item});

    }
  }


    render() {
      return (
        <View>
        <FlatList
        data={this.state.dataSource}
        extraData={this.state.selected}
        renderItem={({item}) =>

        {
            return (

                <View style={styles.clientContainer}>

                <View style={styles.listText}>

                  <Text>
                  {item.businessName}
                  </Text>

                  </View>

                  <View>
                  <Button title="Configure" onPress={()=> this._selectClient(item)} />

                </View>
                <View>

                <CheckBox
                  title='Select'
                  checked={item.selected}
                  onPress={() => this._filterClient(item)}
                />
                </View>

                </View>

            );
          }
        }

      />

        <View>
        <Button title="Go do some great work!" onPress={this._goDrawer} />
        </View>

      </View>


      );
    }
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  clientContainer:{
    flex: 1,
    paddingTop: 15,
    flexDirection: 'row'
  },
  listText:{
    paddingLeft:5,
     width: "30%",
      height: 48,
       backgroundColor: "white" }

});
