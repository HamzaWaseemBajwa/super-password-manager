import React from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import ActionButton from "../components/ActionButtonComponent";

class EditItemScreen extends React.Component {
  constructor(props) {
    super(props);

    let item = { title: "", password: "" };

    if (props.route.params.mode === "edit") {
      item = JSON.parse(props.route.params.item);
    }

    this.state = {
      mode: props.route.params.mode,
      currentTitle: item.title,
      oldTitle: item.title,
      currentPassword: item.password,
      passwordSecure: true,
    };

    this.togglePasswordReveal = this.togglePasswordReveal.bind(this);
    this.onPressOk = this.onPressOk.bind(this);
    this.onGeneratePassword = this.onGeneratePassword.bind(this);
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      let route = this.props.route;
      if (route.params?.newPassword !== undefined) {
        let newPassword = route.params?.newPassword;
        this.props.route.params.newPassword = undefined;
        this.setState({ currentPassword: newPassword });
      }
    });
  }

  togglePasswordReveal() {
    this.setState({ passwordSecure: !this.state.passwordSecure });
  }

  onGeneratePassword() {
    this.props.navigation.navigate("Generate");
  }

  onPressOk() {
    if (this.state.currentTitle.length === 0) {
      alert("Please enter a title!");
      return;
    }

    if (this.state.currentPassword.length === 0) {
      alert("Please enter a password!");
      return;
    }

    if (this.state.mode === "add") {
      let item = {
        title: this.state.currentTitle,
        password: this.state.currentPassword,
      };

      this.props.navigation.navigate("List", {
        updateType: "insert",
        updateItem: JSON.stringify(item),
      });
    } else if (this.state.mode === "edit") {
      let item = {
        title: this.state.currentTitle,
        oldTitle: this.state.oldTitle,
        password: this.state.currentPassword,
      };

      this.props.navigation.navigate("List", {
        updateType: "update",
        updateItem: JSON.stringify(item),
      });
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.page}>
            <Text style={styles.textLabel}>Title</Text>
            <TextInput
              style={styles.textBox}
              placeholder="Enter item name..."
              defaultValue={this.state.currentTitle}
              onChangeText={(newTitle) =>
                this.setState({ currentTitle: newTitle })
              }
            />
            <Text style={styles.textLabel}>Password</Text>
            <TextInput
              style={styles.textBox}
              placeholder="Enter password..."
              defaultValue={this.state.currentPassword}
              secureTextEntry={this.state.passwordSecure}
              onChangeText={(newPassword) =>
                this.setState({ currentPassword: newPassword })
              }
            />
            <View style={{ flexDirection: "row" }}>
              {this.state.passwordSecure ? (
                <ActionButton
                  onPress={this.togglePasswordReveal}
                  iconName={"eye"}
                  iconSize={24}
                  iconColor={"black"}
                />
              ) : null}
              {this.state.passwordSecure ? null : (
                <ActionButton
                  onPress={this.togglePasswordReveal}
                  iconName={"eye-slash"}
                  iconSize={24}
                  iconColor={"black"}
                />
              )}
              <ActionButton
                onPress={this.onGeneratePassword}
                iconName={"cog"}
                iconSize={24}
                iconColor={"black"}
              />
            </View>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.pageFooter}>
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

EditItemScreen.propTypes = {
  itemTitle: PropTypes.string,
  itemPassword: PropTypes.string,
};

export default EditItemScreen;
