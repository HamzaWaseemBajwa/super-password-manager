import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import PropTypes from "prop-types";

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconName: props.iconName,
      iconSize: props.iconSize,
      iconColor: props.iconColor,
      width: props.width,
    };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(this.props.onPressArgs)}
        style={
          this.props.showBorder
            ? [styles.border, { borderColor: this.props.iconColor }]
            : styles.noBorder
        }
      >
        <View style={[styles.actionButton, { minWidth: this.state.width }]}>
          <FontAwesome5
            name={this.state.iconName}
            size={this.state.iconSize}
            color={this.state.iconColor}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  border: {
    alignItems: "center",
    borderWidth: 1,
    padding: 4,
    margin: 2,
    borderRadius: 5,
  },
  noBorder: {
    alignItems: "center",
    justifyContent: "center",
  },
});

ActionButton.propTypes = {
  onPress: PropTypes.func,
  onPressArgs: PropTypes.any,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  showBorder: PropTypes.bool,
  borderColor: PropTypes.string,
  width: PropTypes.number,
};

ActionButton.defaultProps = {
  onPress: () => {},
  onPressArgs: null,
  showBorder: true,
  width: 48,
};

export default ActionButton;
