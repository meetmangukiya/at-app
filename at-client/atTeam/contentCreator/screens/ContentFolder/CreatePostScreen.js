import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,

} from 'react-native';

import { SecureStore,ImagePicker} from 'expo';
import { CheckBox } from 'react-native-elements'
window.navigator.userAgent='react-native';

import io from 'socket.io-client/dist/socket.io';

export default class CreatePostScreen extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'Content',
  };

    constructor(){
      super()
      this.state = {
  //      photo:null,
        image: null,
        base64:null,
        caption:null,
        tags:null,
        hashtags:null,
        location:null,
        facebook:false,
        instagram:false,
        date:null,
        time:null,

        };

        this.socket=io.connect('http://localhost:3000/content', {reconnect: true});

      }

      _createPost=async()=>{

      await this.socket.emit('createPost', {clientUsername:await SecureStore.getItemAsync('clientSelectedUsername'),
        entity:await SecureStore.getItemAsync('entityToken'), msg:'Create Post',base64:this.state.base64, tags:this.state.tags,caption:this.state.caption,hashtags:this.state.hashtags,
        location:this.state.location,facebook:this.state.facebook,instagram:this.state.instagram,date:this.state.date,
        time:this.state.time});

      }


      _booleanInstagram(){
        this.setState({instagram:!this.state.instagram});
      }

      _booleanFacebook(){
        this.setState({facebook:!this.state.facebook});
      }


    render() {
      let { image } = this.state;

      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Button
             title="Pick an image from camera roll"
             onPress={this._pickImage}
           />
           {image &&
                <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}

                <TextInput
                placeholder="Caption"
                onChangeText={(text) => this.setState({caption:text})}

                  />

                <TextInput
                placeholder="Tags"
                onChangeText={(text) => this.setState({tags:text})}

                  />

              <TextInput
              placeholder="Hashtags"
              onChangeText={(text) => this.setState({hashtags:text})}

                />

              <TextInput
              placeholder="Location"
              onChangeText={(text) => this.setState({location:text})}

                />

                <TextInput
                placeholder="Date(YYYY-MM-DAY)"
                onChangeText={(text) => this.setState({date:text})}

                  />

                <TextInput
                placeholder="Time"
                onChangeText={(text) => this.setState({time:text})}

                  />

                  <CheckBox
                    title='Instagram'
                    checked={this.state.instagram}
                    onPress={() => this._booleanInstagram()}
                  />

                  <CheckBox
                    title='Facebook'
                    checked={this.state.facebook}
                    onPress={() => this._booleanFacebook()}
                  />

                  <Button
                    title="Create Post"
                    onPress={this._createPost}
                  />

         </View>
      );

    }


    _pickImage = async () => {

      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64:true,
        exif:true,
      });

      if (!result.cancelled) {
        console.log("uri:"+result.uri);
    //    this.setState({ photo: result});

        this.setState({ image: result.uri });
        this.setState({ base64: result.base64 });
        console.log("type:"+result.type);


      }
    };
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
  });
