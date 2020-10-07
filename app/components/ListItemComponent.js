import React from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import ActionButton from "./ActionButtonComponent";

TouchableOpacity.defaultProps = {
  ...(TouchableOpacity.defaultProps || {}),
  delayPressIn: 0,
};

export class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Pressable style={styles.item}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.listItemTitle}>{this.props.item.title}</Text>
          <View style={{ flexDirection: "row" }}>
            <ActionButton
              onPress={this.props.copyItem}
              onPressArgs={this.props.item.title}
              iconName={"clipboard"}
              iconSize={24}
              iconColor={"blue"}
              width={40}
            ></ActionButton>
            <ActionButton
              onPress={this.props.editItem}
              onPressArgs={this.props.item.title}
              iconName={"edit"}
              iconSize={24}
              iconColor={"green"}
              width={40}
            ></ActionButton>
            <ActionButton
              onPress={this.props.deleteItem}
              onPressArgs={this.props.item.title}
              iconName={"trash-alt"}
              iconSize={24}
              iconColor={"red"}
              width={40}
            ></ActionButton>
          </View>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginVertical: 2,
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  listItemTitle: {
    fontSize: 24,
    color: "black",
  },
});
