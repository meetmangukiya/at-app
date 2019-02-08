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

export default class MainAnalyticScreen extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'Analytics',
  };

    render() {
      return (
        <View style={styles.container}>

        <Text>Analytics</Text>
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
