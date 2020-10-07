import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem } from "./ListItemComponent";

class MainItemsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FlatList
        data={this.props.listItems}
        renderItem={({ item }) => (
          <ListItem
            copyItem={this.props.copyItem}
            deleteItem={this.props.deleteItem}
            editItem={this.props.editItem}
            item={item}
          ></ListItem>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

export default MainItemsList;
