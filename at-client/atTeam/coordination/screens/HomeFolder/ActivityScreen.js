import React from 'react';
import { Text,ScrollView, StyleSheet } from 'react-native';

export default class ActivityScreen extends React.Component {
  static navigationOptions = {
    title: 'Activity',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
      <Text> New Content Calendar added</Text>


      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
