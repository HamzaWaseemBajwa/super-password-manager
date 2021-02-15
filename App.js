import * as React from "react";
import { View, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CreateAccountScreen from "./app/screens/CreateAccountScreen";
import LoginScreen from "./app/screens/LoginScreen";
import MainListScreen from "./app/screens/MainListScreen";
import EditItemScreen from "./app/screens/EditItemScreen";
import GeneratePasswordScreen from "./app/screens/GeneratePasswordScreen";
import { AsyncLoadObject, AsyncStoreObject } from "./app/lib/StorageHandlers";

const TOKEN_KEY = "USER_TOKEN";
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
      password: "",
      userToken: null,
      isLoggedIn: false,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onNewUserCreated = this.onNewUserCreated.bind(this);
    this.removeWait = this.removeWait.bind(this);
  }

  componentDidMount() {
    AsyncLoadObject(TOKEN_KEY).then((userToken) => {
      console.log(userToken);
      if (userToken) {
        this.setState({ userToken: userToken });
      }
    });
  }

  onNewUserCreated(newToken, password) {
    //console.log(newToken);
    //console.log(password);
    AsyncStoreObject(TOKEN_KEY, newToken).then((result) => {
      if (result) {
        this.setState({
          password: password,
          userToken: newToken,
          isLoggedIn: true,
        });
      }
    });
  }

  onLoginSuccess() {
    //console.log("User logged in...");
    this.setState({ isLoggedIn: true });
  }

  removeWait() {
    this.setState({ waiting: false });
  }

  render() {
    if (this.state.waiting) {
      setTimeout(() => {
        this.removeWait();
      }, 3000);
      return null;
    } else {
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
            {this.state.userToken === null ? (
              <>
                <Stack.Screen name="New">
                  {() => (
                    <CreateAccountScreen onSubmit={this.onNewUserCreated} />
                  )}
                </Stack.Screen>
              </>
            ) : !this.state.isLoggedIn ? (
              <Stack.Screen name="Login">
                {() => <LoginScreen onSubmit={this.onLoginSuccess} />}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen name="List">
                  {(props) => (
                    <MainListScreen
                      {...props}
                      KEY={this.state.password}
                      SALT={this.state.userToken.userEncryptionSalt}
                    />
                  )}
                </Stack.Screen>
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
}
