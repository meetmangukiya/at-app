import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class MainStrategyScreen extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'Strategy',
  };

    render() {
      return (
        <View style={styles.container}>

        <Text>Strategy</Text>
        </View>
      );

    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
  });
