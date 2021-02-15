import React from "react";
import {
  ActivityIndicator,
  Button,
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
import Token from "../lib/Token";

class CreateAccountScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      welcomeMessage: true,
      userPassword: "",
    };
  }

  submitPassword = () => {
    let password = this.state.userPassword;
    let userToken = new Token();
    userToken.initToken(password);
    this.props.onSubmit(userToken, password);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <AntDesign name={"lock"} size={128} color={"white"} />
          {this.state.welcomeMessage ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.label}>
                Welcome! Super Password Manager is a simple app designed to help
                you to remember your passwords.
              </Text>
              <Text style={styles.label}>
                We know passwords are hard. Remembering a different password for
                each of the services you use is tough, and using the same
                password everywhere is unsecure. A lot of people use a small set
                of common passwords, so bad actors have an easy job accessing
                their accounts.
              </Text>
              <Text style={styles.label}>
                Super password manager helps you keep your personal and valuable
                data secure. You can generate strong unique passwords for each
                of your accounts, and Super Password Manager will remember them
                for you. our passwords will be stored securely and locally on
                your device, and all you will have to do is remember one
                password.
              </Text>
              <View
                style={{ borderColor: "white", borderWidth: 1, width: 100 }}
              >
                <Button
                  title="next"
                  color="#1500fd"
                  onPress={() => this.setState({ welcomeMessage: false })}
                />
              </View>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text style={styles.label}>
                To begin, enter your master password. This will allow you access
                your other passwords inside the apps. Keep in mind that if you
                forget the master password, there will be no way to reset it, or
                to retrieve the other passwords. Therefore, we recommend having
                a password that is both difficult to guess for others, but also
                memorable for you, such as phrase with 4 or more words.
              </Text>
              <TextInput
                placeholder={"Enter master password..."}
                style={styles.passwordBox}
                value={this.state.enteredPassword}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ userPassword: text })}
                onSubmitEditing={() => this.submitPassword()}
              ></TextInput>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1500fd",
  },
  label: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
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

export default CreateAccountScreen;
