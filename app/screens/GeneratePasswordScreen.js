import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  SafeAreaView,
  Slider,
  Switch,
  ProgressBarAndroid,
} from "react-native";
import ActionButton from "../components/ActionButtonComponent";
import { generatePassword, checkPasswordStrength } from "../lib/PasswordUtils";

class GeneratePasswordScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      generatedPassword: "",
      passwordStrength: "",
      passwordStrengthValue: 0.0,
      passwordStrengthColor: "",
      passwordLength: 16,
      useUpperCase: true,
      useSymbols: true,
      useDigits: true,
    };

    this.toggleUpperCaseSwitch = this.toggleUpperCaseSwitch.bind(this);
    this.toggleSymbolsSwitch = this.toggleSymbolsSwitch.bind(this);
    this.toggleDigitsSwitch = this.toggleDigitsSwitch.bind(this);
    this.getNewPassword = this.getNewPassword.bind(this);
    this.passwordLengthChange = this.passwordLengthChange.bind(this);
    this.getPasswordStrength = this.getPasswordStrength.bind(this);
    this.onPressOk = this.onPressOk.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: true }, () => this.getNewPassword());
  }

  getPasswordStrength() {
    let strengthObject = checkPasswordStrength(this.state.generatedPassword);
    this.setState({
      passwordStrength: strengthObject["strength"],
      passwordStrengthValue: strengthObject["value"],
      passwordStrengthColor: strengthObject["color"],
    });
  }

  getNewPassword() {
    let newPassword = generatePassword(
      this.state.useUpperCase,
      true,
      this.state.useDigits,
      this.state.useSymbols,
      this.state.passwordLength
    );
    this.setState({ generatedPassword: newPassword }, () =>
      this.getPasswordStrength()
    );
  }

  passwordLengthChange(value) {
    if (this.state.mounted) {
      this.setState({ passwordLength: value }, () => this.getNewPassword());
    }
  }

  toggleUpperCaseSwitch() {
    this.setState({ useUpperCase: !this.state.useUpperCase }, () =>
      this.getNewPassword()
    );
  }

  toggleSymbolsSwitch() {
    this.setState({ useSymbols: !this.state.useSymbols }, () =>
      this.getNewPassword()
    );
  }

  toggleDigitsSwitch() {
    this.setState({ useDigits: !this.state.useDigits }, () =>
      this.getNewPassword()
    );
  }

  onPressOk() {
    this.props.navigation.navigate("Add", {
      newPassword: this.state.generatedPassword,
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.page}>
            <View style={styles.passwordBox}>
              <Text style={styles.passwordBoxText}>
                {this.state.generatedPassword}
              </Text>
            </View>
            <View style={styles.formField}>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={this.state.passwordStrengthValue}
                style={{ flex: 3 }}
                color={this.state.passwordStrengthColor}
              />
              <Text style={{ flex: 1, textAlign: "center" }}>
                {this.state.passwordStrength}
              </Text>
            </View>
            <View style={{ paddingBottom: 32 }} />

            <View style={styles.formField}>
              <Text>Length</Text>
              <Slider
                thumbTintColor={"#1500fd"}
                minimumTrackTintColor="blue"
                style={{ flex: 1 }}
                minimumValue={6}
                maximumValue={64}
                step={1}
                value={16}
                onValueChange={(value) => {
                  this.passwordLengthChange(value);
                }}
              />
              <Text>{this.state.passwordLength}</Text>
            </View>
            <View style={styles.formField}>
              <Text>Uppercase</Text>
              <Switch
                trackColor={{ false: "#767577", true: "lightblue" }}
                thumbColor={this.state.useUpperCase ? "#1500fd" : "#f4f3f4"}
                onValueChange={this.toggleUpperCaseSwitch}
                value={this.state.useUpperCase}
              />
            </View>
            <View style={styles.formField}>
              <Text>Symbols</Text>
              <Switch
                trackColor={{ false: "#767577", true: "lightblue" }}
                thumbColor={this.state.useSymbols ? "#1500fd" : "#f4f3f4"}
                onValueChange={this.toggleSymbolsSwitch}
                value={this.state.useSymbols}
              />
            </View>
            <View style={styles.formField}>
              <Text>Digits</Text>
              <Switch
                trackColor={{ false: "#767577", true: "lightblue" }}
                thumbColor={this.state.useDigits ? "#1500fd" : "#f4f3f4"}
                onValueChange={this.toggleDigitsSwitch}
                value={this.state.useDigits}
              />
            </View>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView></SafeAreaView>
        <SafeAreaView style={styles.pageFooter}>
          <ActionButton
            onPress={this.getNewPassword}
            iconName={"sync"}
            iconSize={36}
            iconColor={"white"}
            showBorder={false}
          />
          <ActionButton
            onPress={this.onPressOk}
            iconName={"check"}
            iconSize={36}
            iconColor={"white"}
            showBorder={false}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },
  formField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#1500fd",
    padding: 8,
    elevation: 10,
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    flex: 1,
  },
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    borderRadius: 10,
    elevation: 10,
    padding: 10,
    margin: 10,
  },
  pageFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#1500fd",
    padding: 8,
    elevation: 10,
  },
  passwordBox: {
    backgroundColor: "#1500fd",
    justifyContent: "center",
    padding: 32,
    borderRadius: 10,
    height: "40%",
  },
  passwordBoxText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  textLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textBox: {
    fontSize: 18,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10,
  },
});

export default GeneratePasswordScreen;
