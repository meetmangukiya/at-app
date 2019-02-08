import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator,createMaterialTopTabNavigator,createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MainAccountScreen from '../screens/AccountFolder/MainAccountScreen';
import FirstQuestionScreen from '../screens/AccountFolder/KYC/FirstQuestionScreen';



const KYCStack = createStackNavigator({

  FirstQuestion: {
    screen: FirstQuestionScreen,
    navigationOptions: {
      title: "First Question"
    }
  },
 });

const AccountStack = createStackNavigator({

  MainAccount: {
    screen: MainAccountScreen,
    navigationOptions: {
      title: "Account"
    }
  },
  KYC:{
    screen:KYCStack,
  }
 });




export default AccountStack;
