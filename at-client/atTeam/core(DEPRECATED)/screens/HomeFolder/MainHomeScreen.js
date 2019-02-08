import React from 'react';
import {  Button, Image,  Platform,  ScrollView,  StyleSheet,  Text,  TouchableOpacity,  View,}from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../../components/StyledText';
import ApprovalItem from '../../components/ApprovalItem';
import { SecureStore } from 'expo';

import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent='react-native';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../assets/images/at_sign.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      };

      constructor() {

      super();

      this.state={
        type:'',
      };

      this.socket=io.connect('http://localhost:3000/approvals', {reconnect: true});

      this.promise = this._getApprovals();

    };

  _signOutAsync = async () => {
await SecureStore.deleteItemAsync('userToken')
this.props.navigation.navigate('Auth');
}

_getApprovals = async () => {

      this.socket.emit('requestApprovalItems', await SecureStore.getItemAsync('usernameToken'));

      this.socket.on('gottenApprovalItems', async(data)=>{
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
      <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Image source={require('../../assets/images/at_sign.png')}
              style={styles.welcomeImage}/>
          </View>

          <View style={styles.getStartedContainer}>

            <Text>Hi Core, Here is what you have got to approve:</Text>

            <View style={styles.approval}>

            <ApprovalItem type="Strategy"/>

            </View>

              <Button title="Actually I don't care about this. Sign me out :)" onPress={this._signOutAsync} />

              </View>
            </View>

    );

};


}




const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  approval:{
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 120,

  },
  icon:{
    width: 24,
    height: 24,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

//{this.state.type}
