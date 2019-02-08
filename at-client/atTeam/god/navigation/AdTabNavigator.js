import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator,createMaterialTopTabNavigator,createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AdPlanScreen from '../screens/AdFolder/AdPlanScreen';
import AdPerformanceScreen from '../screens/AdFolder/AdPerformanceScreen';




const AdTabNavigator = createBottomTabNavigator(

{
    AdPlan: {
        screen: AdPlanScreen,
        navigationOptions: {
            tabBarLabel: 'Ad Plan',

            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'md-clipboard' : 'md-link'}
              />
            ),

            tabBarOptions: {
                activeTintColor: '#2896d3',
                labelStyle: {
                    fontSize: 14,
                },
            },
        },
    },

    AdPerformance: {
        screen: AdPerformanceScreen,
        navigationOptions: {
            tabBarLabel: 'Ad Performance',

            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'md-bicycle' : 'md-link'}
              />
            ),

            tabBarOptions: {
                activeTintColor: '#2896d3',
                labelStyle: {
                    fontSize: 14,
                },
            },
        },
    },

}
);




export default AdTabNavigator;
