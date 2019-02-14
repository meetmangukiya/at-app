import React from 'react';
import { Alert,Text,ScrollView,FlatList,View,TouchableOpacity, StyleSheet,KeyboardAvoidingView,TextInput} from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { SecureStore } from 'expo';
import { CheckBox } from 'react-native-elements'



export default class CoreAssignScreen extends React.Component {

  static navigationOptions = {
  title: 'CoreAssign',
}
  constructor(){
    super()
    this.state={
      dataSource:[],
      clientUsername:'',
      cores:[],
      selected:'',
      previousSelected:'',
      selectedCore:'',
      configClicked:'false',


    }

  this.socket=io.connect('http://localhost:3000/entities', {reconnect: true});

  }


  async componentWillMount(){

        var configClicked=await SecureStore.getItemAsync('configClicked');
        var clientUsername=await SecureStore.getItemAsync('clientSelectedUsername');

        this.socket.emit('requestAllCores','');
        this.socket.on('gottenAllCores', async(data)=>{
          var CoreArray=[];

          for (var i = 0; i < data.length; i++) {
             CoreArray.push({key:data[i]["username"],username:data[i]["username"],selected:false});
           };

             this.setState({
               dataSource:CoreArray,
               clientUsername:clientUsername,
               configClicked:configClicked,

             });


           });

        }

        _filter = async (item) => {
        if(this.state.previousSelected==item){

        }
        else{

      //  await SecureStore.setItemAsync('clientSelectedUsername',item.username);

        item.selected=true;
        this.state.previousSelected.selected=false;
        var a= this.state.selected;
        a+="add";
        this.setState({selectedCore:item.username, selected:a,previousSelected:item });

        }
      }

         _coreList = () =>{

               return( this.state.cores.map( (x,i) => {

                  return( <Picker.Item label={x} key={i} value={x}  />)} ));
                }



      _assignCore = () =>{
        this.socket.emit('assignCore',{coreUsername:this.state.selectedCore, clientUsername:this.state.clientUsername, configClicked:this.state.configClicked});
                this.socket.on('CoreAssignedMsg', function(data){
                  console.log(data);
                  alert(data);
                });
                this.props.navigation.navigate('Drawer');


          }


    render() {
      return (
      <View >
          <View >
      <Text> Use this page to configure {this.state.clientUsername} here</Text>
          </View>

        <View>
      <Text>Assign a core</Text>
      </View>

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
                       {item.username}
                       </Text>

                       </View>

                     <View>

                     <CheckBox
                       title='Select'
                       checked={item.selected}
                       onPress={() => this._filter(item)}
                     />
                     </View>

                     </View>

                 );
               }
             }

           />

          </View>



      <View>
          <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this._assignCore}
          >

          <Text style={styles.buttonText}> Confirm </Text>
          </TouchableOpacity>

          </View>

        </View>




            )

          }


      };



      const styles = StyleSheet.create({
        container: {
          alignItems: 'center',
          backgroundColor: '#fff',
        },
        assignContainer: {
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#fff',
        },
        configure:{
          backgroundColor: '#fff',

        },
        assignContentCreator:{
          paddingBottom:10
        },
        assignCore: {
          paddingBottom:10

        },
        buttonContainer:{
          backgroundColor:'#000000',

        },
        buttonText:{
          textAlign:'center',
          color: '#FFFFFF',
          fontWeight:'700',
        },
      });
