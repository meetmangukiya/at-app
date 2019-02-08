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

export default class MainSurveillanceScreen extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'Surveillance',
  };

    render() {
      return (
        <View style={styles.container}>

        <Text>Surveillance</Text>
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
