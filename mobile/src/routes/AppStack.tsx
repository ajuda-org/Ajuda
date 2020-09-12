import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "../pages/Landing";
import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import Helped from "./HelpedTabs";
import Helper from "./HelperTabs";

import { Detail } from "../pages/Helper";
import { NewRequest } from "../pages/Helped";

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="Welcome" component={Welcome} />
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
        <Screen name="Helped" component={Helped} />
        <Screen name="Helper" component={Helper} />
        <Screen name="Detail" component={Detail} />
        <Screen name="NewRequest" component={NewRequest} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;