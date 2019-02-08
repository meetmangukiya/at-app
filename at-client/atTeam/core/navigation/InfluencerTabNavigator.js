import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator,createMaterialTopTabNavigator,createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import InfluencerSchedulingScreen from '../screens/InfluencerFolder/InfluencerSchedulingScreen';
import InfluencerPlanScreen from '../screens/InfluencerFolder/InfluencerPlanScreen';
import InfluencerPostsScreen from '../screens/InfluencerFolder/InfluencerPostsScreen';




const InfluencerTabNavigator = createBottomTabNavigator(

{
    SchedulingInfluencer: {
        screen: InfluencerSchedulingScreen,
        navigationOptions: {
            tabBarLabel: 'Scheduling',

            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'md-time' : 'md-link'}
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

    InfluencerPlan: {
        screen: InfluencerPlanScreen,
        navigationOptions: {
            tabBarLabel: 'Influencer Plan',

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

    InfluencerPostsScreen: {
        screen: InfluencerPostsScreen,
        navigationOptions: {
            tabBarLabel: 'Influencer Posts',

            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'md-glasses' : 'md-link'}
              />
            ),

            tabBarOptions: {
                activeTintColor: '#2896d3',
                labelStyle: {
                    fontSize: 14,
                },
            },
        },
    }
}
);




export default InfluencerTabNavigator;
