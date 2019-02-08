import React from 'react';
import { Platform,Text,ScrollView, StyleSheet, View, Button,TextInput,Image,DeviceEventEmitter } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore,ImagePicker, Permissions, CAMERA_ROLL} from 'expo';
import Swiper from 'react-native-swiper';

export default class StrategyScreen extends React.Component {
  static navigationOptions = {
  };

  constructor(){
    super()
    this.state = {
      image: null,
      status:null,
      base64:null,
      description:null,
      };

    this.socket=io.connect('http://localhost:3000/strategy', {reconnect: true});

};


  _done= async () => {

  await this.socket.emit('createStrategy', {clientUsername:await SecureStore.getItemAsync('clientSelectedUsername'), entity:await SecureStore.getItemAsync('entityToken'), msg:'Create Strategy Plan',description:this.state.description, base64:this.state.base64});
  this.props.navigation.navigate('Home');

  }


  render() {
    let { image } = this.state;

    return (

        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            <Text style={styles.text}>Swipe Right to see what we want your posts to look like</Text>
          </View>
          <View style={styles.slide2}>

            <View >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Button
                 title="Pick an image from camera roll"
                 onPress={this._pickImage}
               />
               {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}


             </View>

            </View>


              <View>

              </View>
               </View>
          <View style={styles.slide3}>

          <View style={styles.comment}>
          <TextInput
          placeholder="Describe it"
          onChangeText={(text) => this.setState({description:text})}

            />

            <View style={styles.comment}>
              <Button title="Done" onPress={this._done} />
              </View>
            </View>


          </View>
        </Swiper>

    );
  }

  _pickImage = async () => {

    var goAhead=true;
    if(Platform.OS === 'ios'){
      const { Permissions } = Expo;
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({status});

      if (status !== 'granted') {
        Linking.openURL('app-settings');
        goAhead=false;
        return;
     }
   }

   if(goAhead===true){
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64:true,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.setState({ base64: result.base64 });
      console.log(result.base64);
    }
  };
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#fff',
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  grid: {
    width: 400,
    height: 1200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  comment:{
    paddingTop:20,

  }
})
