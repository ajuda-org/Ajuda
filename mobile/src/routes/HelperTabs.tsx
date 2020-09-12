import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Requests, Helps, Profile } from "../pages/Helper";

import { useTheme } from "../contexts/theme";

const { Navigator, Screen } = createMaterialBottomTabNavigator();

function HelperTabs() {
  const { theme } = useTheme();
  return (
    <Navigator
      shifting
      initialRouteName="Requests"
      activeColor={theme.PrimaryColor}
      inactiveColor="#B8D4D3"
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
        name="Helps"
        component={Helps}
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
        component={Profile}
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

export default HelperTabs;