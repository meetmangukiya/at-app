import React from 'react';
import { Text,ScrollView, StyleSheet, View, Button } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore } from 'expo';


export default class IGcalendarScreen extends React.Component {
  static navigationOptions = {
  };

  constructor(){
    super()
    this.state={
    }

    this.socket=io.connect('http://localhost:3000/done', {reconnect: true});

};


  _done= async () => {

  await this.socket.emit('done', {clientUsername:await SecureStore.getItemAsync('clientSelectedUsername'), entity:await SecureStore.getItemAsync('entityToken'), msg:'Approve Content Calendar'});
  this.props.navigation.navigate('Home');

  }


  render() {
    return (
      <View style={styles.container}>
        <Button title="Done" onPress={this._done} />
        </View>
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
