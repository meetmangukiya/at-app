import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  NavigationActions,
  KeyboardAvoidingView,
  Button,
  Picker,
} from 'react-native';
import { SecureStore } from 'expo';
import io from 'socket.io-client/dist/socket.io';
window.navigator.userAgent='react-native';
import { CheckBox } from 'react-native-elements'



export default class CustomizePackageScreen extends React.Component {


  constructor() {
  super();

  this.state = {
  selectedPackage:'',
  services:['Strategy','Analytics'],
  TwoHourPhotography:false,
  FourHourPhotography:false,
  Influencers:false,
  Ads:false,
  FifteenPosts:false,
  ThirtyPosts:false,
  Surveillance:false,
  EngagementCampaign:false,



};

  this.socket=io.connect('http://localhost:3000/package', {reconnect: true});

};


_filterPackage = async (item) => {


  if(item=="2HourPhotography"){
    console.log("hhhhhiahjsdiashds");

    this.setState({TwoHourPhotography:!this.state.TwoHourPhotography})
  }
  if(item=="4HourPhotography"){
    this.setState({FourHourPhotography:!this.state.FourHourPhotography})
  }
  if(item=="Engagement Campaign"){
    this.setState({EngagementCampaign:!this.state.EngagementCampaign})
  }
  if(item=="Surveillance"){
    this.setState({Surveillance:!this.state.Surveillance})
  }
  if(item=="Influencers"){
    this.setState({Influencers:!this.state.Influencers})
  }
  if(item=="30Posts"){
    this.setState({ThirtyPosts:!this.state.ThirtyPosts})
  }
  if(item=="15Posts"){
    this.setState({FifteenPosts:!this.state.FifteenPosts})
  }
  if(item=="Ads"){
    this.setState({Ads:!this.state.Ads})
  }
  if(item=="Analytics"){
    this.setState({Analytics:!this.state.Analytics})
  }

  var found = this.state.services.find(function(element) {
    return element.valueOf()==item.valueOf();
  });

   if(found!=undefined){

    var filtered = this.state.services.filter(function(value, index, arr){
    return value.valueOf()==item.valueOf();
    });
    this.setState({services:filtered})
  }

   else{

     var servicesArr=this.state.services;

     servicesArr.push(item);

     this.setState({services:servicesArr});

   }
 }



  _signInAsync = async () => {

  this.props.navigation.navigate('ClientApp');

  };

  _startFreeTrial = async () => {
    console.log(this.state.services);

    this.socket.emit('startFreeTrial',  {clientUsername:await SecureStore.getItemAsync('usernameToken'),selectedPackage: this.state.services});
            this.socket.on('selectPackageMsg', function(data){
              console.log(data);
              alert(data);

            });
          }



    render() {
      return (

        <View style={styles.container}>

          <View style={styles.packageContainer}>
                  <CheckBox
                        title='2 hours of photography'
                        checked={this.state.TwoHourPhotography}
                        onPress={() => this._filterPackage("2HourPhotography")}
                      />
                </View>


                <View style={styles.packageContainer}>
                        <CheckBox
                              title='4 hours of photography'
                              checked={this.state.FourHourPhotography}
                              onPress={() => this._filterPackage("4HourPhotography")}
                            />
                      </View>



                      <View style={styles.packageContainer}>
                              <CheckBox
                                    title='15 Posts'
                                    checked={this.state.FifteenPosts}
                                    onPress={() => this._filterPackage("15Posts")}
                                  />
                            </View>



                            <View style={styles.packageContainer}>
                                    <CheckBox
                                          title='30 Posts'
                                          checked={this.state.ThirtyPosts}
                                          onPress={() => this._filterPackage("30Posts")}
                                        />
                                  </View>


                                  <View style={styles.packageContainer}>
                                          <CheckBox
                                                title='Engagement Campaign'
                                                checked={this.state.EngagementCampaign}
                                                onPress={() => this._filterPackage("Engagement Campaign")}
                                              />
                                        </View>


                                        <View style={styles.packageContainer}>
                                                <CheckBox
                                                      title='Surveillance'
                                                      checked={this.state.Surveillance}
                                                      onPress={() => this._filterPackage("Surveillance")}
                                                    />
                                              </View>


                                              <View style={styles.packageContainer}>
                                                      <CheckBox
                                                            title='Ad Management'
                                                            checked={this.state.Ads}
                                                            onPress={() => this._filterPackage("Ads")}
                                                          />
                                                    </View>


                                                    <View style={styles.packageContainer}>
                                                            <CheckBox
                                                                  title='Influencer Marketing'
                                                                  checked={this.state.Influencers}
                                                                  onPress={() => this._filterPackage("Influencers")}
                                                                />
                                                          </View>


                              




                <View>
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress= {this._startFreeTrial}>
                  <Text style={styles.buttonText}> Start Free Trial  </Text>
                  </TouchableOpacity>
                  </View>

              <View>
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress= {this._signInAsync}>
                  <Text style={styles.buttonText}> Log In  </Text>
                  </TouchableOpacity>

                </View>
            </View>


      );

    }

};


  const styles = StyleSheet.create({
    Welcome:{
      fontSize: 40,
      height:40,
      marginBottom: 20,
      color:'#00000',
      paddingHorizontal:10,
    },
    packageContainer:{
      flex: 1,
      paddingTop: 15,
      flexDirection: 'row'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5F5DC',
    },
    loginText: {
      height:40,
      marginBottom: 20,
      color:'#00000',
      paddingHorizontal:20,
    },

    input: {
      height:40,
      backgroundColor:'rgba(255,255,255,0.2)',
      marginBottom: 20,
      color:'#2980b9',
      paddingHorizontal:40,
    },
    buttonContainer:{
      backgroundColor:'#000000',
      paddingVertical:15,
      paddingHorizontal:20,
      marginBottom: 20,


    },
    buttonText:{
      textAlign:'center',
      color: '#FFFFFF',
      fontWeight:'700',
      paddingHorizontal:20,

    },
    errorText:{
      textAlign:'center',
      color: '#8b0000',
      fontSize:10,
      paddingHorizontal:20,

    }

    ,
  });
