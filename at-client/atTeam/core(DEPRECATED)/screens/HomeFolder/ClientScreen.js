import React from 'react';
import { Text,ScrollView,FlatList,View, StyleSheet } from 'react-native';


export default class ClientScreen extends React.Component {
  constructor(){
    super()
    this.state={
      dataSource:[]
    }

  this.socket=io.connect('http://localhost:3000/clients', {reconnect: true});

  }
  renderItem= ()=> {
    <View>
      <Text>
      </Text>
    </View>

  }

  async componentDidMount(){

    this.socket.emit('requestClients', await SecureStore.getItemAsync('usernameToken'));

    this.socket.on('gottenClients', async(data)=>{
      if(data.needed=="none"){
      }
      else{
        if(data.needed.find("upcomingStrategy")){
          this.setState({type:"Strategy"});
        }
      }
    });


  }


    render() {
      return (
        <FlatList
        data={this.state.dataSource}
        renderItem={this.renderItem}
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
