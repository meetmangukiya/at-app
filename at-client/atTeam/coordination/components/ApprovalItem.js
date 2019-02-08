import React from 'react';
import { Icon } from 'expo';
import { Button, Image, StyleSheet,View,Text} from 'react-native';
import { withNavigation } from 'react-navigation';

import Colors from '../constants/Colors';

class ApprovalItem extends React.Component {
  constructor(props) {
  super(props);

  if (this.props.type=="Strategy"){
    this.state={
      type:"Strategy",
      icon:require('../assets/images/strat.png'),
    };
  };

};

  _go = async () => {
    if(this.props.type=="Strategy"){
  this.props.navigation.navigate('Strategy');
    }
  };


  render() {

    return (
      <View style={styles.container}>
      <Text>{this.state.type}</Text>
      <Button
        onPress={this._go}
        title="Go Approve"
        color="#841584"
      />

      <Image source={this.state.icon}
        style={styles.approvalImage}/>
    </View>

      );
    }
  }



  const styles = StyleSheet.create({
    container:{
      fontSize: 40,
      height:40,
      marginBottom: 20,
      paddingHorizontal:10,
      paddingBottom:10,


    },
    approvalImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      paddingBottom:10,

    },
  });

  export default withNavigation(ApprovalItem);
