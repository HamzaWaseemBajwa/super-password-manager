import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AsyncLoadString, AsyncStoreString } from "../lib/StorageHandlers";
import { useNavigation } from "@react-navigation/native";

const LOGIN_PASSWORD_KEY = "USER_PASSWORD";
const TEST_PASSWORD_HASH = "test123";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enteredPassword: "",
      loginAttempt: false,
    };
  }

  submitPassword = () => {
    const { navigation } = this.props;
    AsyncLoadString(LOGIN_PASSWORD_KEY).then((hash) => {
      if (this.state.enteredPassword === hash) {
        this.setState({ loginSuccess: true }, () => {
          setTimeout(() => {
            this.props.onLoginSuccess();
          }, 2000);
        });
      } else {
        this.setState({ loginAttempt: true, enteredPassword: "" });
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <AntDesign name={"lock"} size={128} color={"white"} />
          <Text style={styles.label}>Super Password Manager</Text>
          <View style={{ flexDirection: "column" }}>
            {this.state.loginSuccess ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <View>
                <TextInput
                  placeholder={"Enter master password..."}
                  style={
                    this.state.loginAttempt
                      ? [styles.passwordBox, { borderColor: "red" }]
                      : styles.passwordBox
                  }
                  value={this.state.enteredPassword}
                  secureTextEntry={true}
                  onChangeText={(text) =>
                    this.setState({ enteredPassword: text })
                  }
                  onSubmitEditing={() => {
                    this.submitPassword();
                  }}
                ></TextInput>
                {this.state.loginAttempt ? (
                  <Text style={styles.alertText}>
                    Incorrect password. Try again!
                  </Text>
                ) : (
                  <View />
                )}
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1500fd",
  },
  label: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 8,
  },
  passwordBox: {
    borderColor: "white",
    borderWidth: 1,
    textAlign: "center",
    color: "white",
    height: 40,
    width: 240,
    fontSize: 16,
    borderRadius: 10,
  },
  alertText: {
    color: "red",
    textAlign: "center",
  },
});

export default LoginScreen;
