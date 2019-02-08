
import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator, createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import AccountStackNavigator from './AccountStackNavigator';
import MainAnalyticScreen from '../screens/AnalyticFolder/MainAnalyticScreen';
import MainSurveillanceScreen from '../screens/SurveillanceFolder/MainSurveillanceScreen';

import ContentTabNavigator from './ContentTabNavigator';
import PhotographyTabNavigator from './PhotographyTabNavigator';
import AdTabNavigator from './AdTabNavigator';

import InfluencerTabNavigator from './InfluencerTabNavigator';

import MainStrategyScreen from '../screens/StrategyFolder/MainStrategyScreen';

import MainTabNavigator from './MainTabNavigator';
import CallScreen from '../screens/HomeFolder/CallScreen';


const HomeSwitch= createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Home: MainTabNavigator,
});

const ClientDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MainTabNavigator,
  },
  Account:{
    screen:AccountStackNavigator,
  },
  Strategy:{
    screen:MainStrategyScreen,
  },
  Content:{
    screen:ContentTabNavigator,
  },
  Photography:{
    screen:PhotographyTabNavigator,
  },
  Influencers:{
    screen:InfluencerTabNavigator,
  },
  Ads:{
    screen:AdTabNavigator,
  },
  Survaillance:{
    screen:MainSurveillanceScreen,
  },
  Analytics:{
    screen:MainAnalyticScreen,
  },

});

const ClientSwitch= createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Drawer: ClientDrawerNavigator,
  MonthlyCall: CallScreen,

});

export default ClientSwitch;
