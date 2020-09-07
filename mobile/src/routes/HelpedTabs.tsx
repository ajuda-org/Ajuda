import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Requests from "../pages/Helper/Requests";

import { useTheme } from "../contexts/theme";

const { Navigator, Screen } = createMaterialBottomTabNavigator();

function HelpedTabs() {
  const { theme } = useTheme();
  return (
    <Navigator
      shifting
      initialRouteName="Requests"
      activeColor={theme.PrimaryColor}
      inactiveColor="#B0B8DE"
      barStyle={{ backgroundColor: '#F9F9F9' }}
    >
      <Screen
        name="Requests"
        component={Requests}
        options={{
          tabBarLabel: 'PEDIDOS',
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons name="ios-map" size={22} color={focused ? theme.PrimaryColor : color} />
            );
          }
        }}
      />
      <Screen
        name="Help"
        component={Requests}
        options={{
          tabBarLabel: 'AJUDAS',
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons name="ios-heart" size={22} color={focused ? theme.PrimaryColor : color} />
            );
          }
        }}
      />
      <Screen
        name="Profile"
        component={Requests}
        options={{
          tabBarLabel: 'PERFIL',
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons name="md-person" size={22} color={focused ? theme.PrimaryColor : color} />
            );
          }
        }}
      />
    </Navigator>
  )
}

export default HelpedTabs;