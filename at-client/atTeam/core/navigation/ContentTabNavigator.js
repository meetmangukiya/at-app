import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator,createMaterialTopTabNavigator,createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import IGcalendarScreen from '../screens/ContentFolder/IGcalendarScreen';
import FacebookPostsScreen from '../screens/ContentFolder/FacebookPostsScreen';
import IGpostsScreen from '../screens/ContentFolder/IGpostsScreen';


const igContentNavigator = createMaterialTopTabNavigator({
  IGcalendar: {
    screen:IGcalendarScreen,
    navigationOptions: {
            tabBarLabel: 'Grid',

            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'grid' : 'md-link'}
              />
            ),

            tabBarOptions: {
                style:{
                  paddingTop:30,
                },
                labelStyle: {
                    fontSize: 14,
                },
            },

        },
  },
  IGpost:{
    screen:IGpostsScreen,
    navigationOptions: {
            tabBarLabel: 'Posts',

            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'image' : 'md-link'}
              />
            ),

            tabBarOptions: {
              style:{
                paddingTop:30,
              },
                labelStyle: {
                    fontSize: 14,
                },
            },
        },

  },
});




const ContentTabNavigator = createBottomTabNavigator(

{
    Instagram: {
        screen: igContentNavigator,
        navigationOptions: {
            tabBarLabel: 'Instagram',

            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'logo-instagram' : 'md-link'}
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

    Facebook: {
        screen: FacebookPostsScreen,
        navigationOptions: {
            tabBarLabel: 'Facebook',

            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? 'logo-facebook' : 'md-link'}
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




export default ContentTabNavigator;
