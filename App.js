import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import CreateAccountScreen from "./app/screens/CreateAccountScreen";
import LoginScreen from "./app/screens/LoginScreen";
import MainListScreen from "./app/screens/MainListScreen";
import EditItemScreen from "./app/screens/EditItemScreen";
import GeneratePasswordScreen from "./app/screens/GeneratePasswordScreen";

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  onLoginSuccess() {
    //console.log("User logged in...");
    this.setState({ userToken: { user: "testUser" } });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#1500fd",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 36,
            },
          }}
        >
          {this.state.userToken == null ? (
            <>
              <Stack.Screen name="New" component={CreateAccountScreen} />
              <Stack.Screen name="Login">
                {() => <LoginScreen onLoginSuccess={this.onLoginSuccess} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="List" component={MainListScreen} />
              <Stack.Screen name="Add" component={EditItemScreen} />
              <Stack.Screen
                name="Generate"
                component={GeneratePasswordScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
