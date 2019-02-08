import React from 'react';
import { Alert,Text,ScrollView,FlatList,View,TouchableOpacity, StyleSheet,KeyboardAvoidingView,TextInput, Picker} from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore } from 'expo';


export default class ClientAssignScreen extends React.Component {

  static navigationOptions = {
  title: 'ClientAssign',
}
  constructor(){
    super()
    this.state={
      clientBusinessName:'',
      clientUsername:'',
      contentCreators:[],
      selectedContentCreator:'',
      cores:[],
      selectedCore:'',

    }

  this.socket=io.connect('http://localhost:3000/entities', {reconnect: true});

  }


  async componentWillMount(){

     var clientUser=await SecureStore.getItemAsync('clientSelectedUsername');
     this.setState({clientUsername:clientUser});


     this.socket.emit('requestClient',clientUser);

     this.socket.on('gottenClient', async(data)=>{
     this.setState({clientBusinessName:data.businessName});

   });

     this.socket.emit('requestAllContentCreators','');
     this.socket.on('gottenAllContentCreators', async(data)=>{
       var ContentCreatorsArray=[];

       for (var i = 0; i < data.length; i++) {
          ContentCreatorsArray.push(data[i]["username"]);
        };

          this.setState({
            contentCreators:ContentCreatorsArray
          });


        });


        this.socket.emit('requestAllCores','');
        this.socket.on('gottenAllCores', async(data)=>{
          var CoreArray=[];
          console.log(data);

          for (var i = 0; i < data.length; i++) {
             CoreArray.push(data[i]["username"]);
           };

             this.setState({
               cores:CoreArray
             });


           });

        }


      _contentCreatorList = () =>{

          return( this.state.contentCreators.map( (x,i) => {

             return( <Picker.Item label={x} key={i} value={x}  />)} ));
           }

         _coreList = () =>{

               return( this.state.cores.map( (x,i) => {

                  return( <Picker.Item label={x} key={i} value={x}  />)} ));
                }


        _assignContentCreator = () =>{
          this.socket.emit('assignContentCreator',{contentCreatorUsername:this.state.selectedContentCreator, clientUsername:this.state.clientUsername});
          this.socket.on('ContentCreatorAssignedMsg', function(data){
            console.log(data);
            alert(data);


          });
        }

      _assignCore = () =>{
        this.socket.emit('assignCore',{coreUsername:this.state.selectedCore, clientUsername:this.state.clientUsername});
                this.socket.on('CoreAssignedMsg', function(data){
                  console.log(data);
                  alert(data);


                });

          }


    render() {
      return (
      <View style={styles.container}>
          <View style={styles.configure}>
      <Text> Use this page to configure {this.state.clientBusinessName} here</Text>
          </View>

        <View style={styles.assignContainer}>
          <View style={styles.assignContentCreator}>

      <Text>Assign a content creator</Text>


          <Picker
            mode="dropdown"
            selectedValue={this.state.selectedContentCreator}
            onValueChange={ (value) => ( this.setState({selectedContentCreator : value}) )}>

            { this._contentCreatorList() }

          </Picker>

          <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this._assignContentCreator}
          >

            <Text style={styles.buttonText}> Confirm  </Text>
            </TouchableOpacity>

      </View>

      <View style={styles.assignCore}>

      <Text>Assign a core</Text>

      <Picker

        mode="dropdown"
        selectedValue={this.state.selectedCore}
        onValueChange={ (value) => ( this.setState({selectedCore : value}) )}>

        { this._coreList() }

        </Picker>

        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={this._assignCore}
        >

          <Text style={styles.buttonText}> Confirm </Text>
          </TouchableOpacity>

          </View>
        </View>
      </View>




            );

          }

      };


      const styles = StyleSheet.create({
        container: {
          alignItems: 'center',
          paddingTop: 30,
          flex: 1,
          backgroundColor: '#fff',
        },
        assignContainer: {
          alignItems: 'center',
          paddingTop: 30,
          flex: 1,
          backgroundColor: '#fff',
          flexDirection: 'row'
        },
        configure:{
          paddingTop: 30,
          backgroundColor: '#fff',
          paddingBottom: 120,

        },
        assignContentCreator:{
          paddingBottom:10
        },
        assignCore: {
          paddingBottom:10

        },
        buttonContainer:{
          backgroundColor:'#000000',
          paddingVertical:15,

        },
        buttonText:{
          textAlign:'center',
          color: '#FFFFFF',
          fontWeight:'700',
        },
      });

      //{this.state.type}
