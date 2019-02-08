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

export default class InfluencerPlanScreen extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: 'Influencers',
  };

    render() {
      return (
        <View style={styles.container}>

        <Text>Influencers</Text>
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
