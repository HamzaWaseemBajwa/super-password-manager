import ActionButton from "../components/ActionButtonComponent";
import React from "react";
import { Alert, StyleSheet, View, Clipboard, SafeAreaView } from "react-native";
import MainItemsList from "../components/MainItemsListComponent";
import { AsyncLoadObject, AsyncStoreObject } from "../lib/StorageHandlers";

const STORAGE_KEY = "KEY_CHAIN";

class MainListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
    };

    this.loadItemsFromStorage = this.loadItemsFromStorage.bind(this);
    this.saveListToStorage = this.saveListToStorage.bind(this);
    this.addItemToList = this.addItemToList.bind(this);
    this.updateItemInList = this.updateItemInList.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.copyItem = this.copyItem.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
    this.onItemEdit = this.onItemEdit.bind(this);
  }

  loadItemsFromStorage() {
    AsyncLoadObject(STORAGE_KEY).then((loadedData) => {
      if (loadedData != null) {
        //console.log(loadedData);
        this.setState({ itemList: loadedData });
      }
    });
  }

  saveListToStorage() {
    if (this.state.itemList.length === 0) {
      console.log("Nothing to save....");
      return;
    }
    AsyncStoreObject(STORAGE_KEY, this.state.itemList).then((result) => {});
  }

  writeToClipboard = async (value) => {
    await Clipboard.setString(value);
    alert("Password copied to clipboard!");
  };

  componentDidMount() {
    //console.log("Component mounted...");
    this.loadItemsFromStorage();
    this.props.navigation.addListener("focus", () => {
      let route = this.props.route;
      if (route.params?.updateType !== undefined) {
        if (route.params.updateType === "insert") {
          this.props.route.params.updateType = undefined;
          this.addItemToList(route.params.updateItem);
        } else if (route.params.updateType === "update") {
          this.props.route.params.updateType = undefined;
          this.updateItemInList(route.params.updateItem);
        }
      }
    });
  }

  onItemAdd() {
    if (this.state.itemList.length === 1000) {
      alert("Limit of 1000 items reached. Cannot add anymore!");
      return;
    }
    this.props.navigation.navigate("Add", { mode: "add" });
  }

  onItemEdit(value) {
    let item = this.state.itemList.find((item) => item.title === value);
    this.props.navigation.navigate("Add", {
      mode: "edit",
      item: JSON.stringify(item),
    });
  }

  addItemToList(itemString) {
    let itemListCopy = [...this.state.itemList];
    itemListCopy.push(JSON.parse(itemString));
    //console.log(itemString);
    this.setState({ itemList: itemListCopy }, () => this.saveListToStorage());
  }

  updateItemInList(itemString) {
    let updateItem = JSON.parse(itemString);
    const index = this.state.itemList
      .map((e) => e.title)
      .indexOf(updateItem.oldTitle);
    if (this.state.itemList[index].title === updateItem.title) {
      let itemListCopy = [...this.state.itemList];
      itemListCopy[index].password = updateItem.password;
      this.setState({ itemList: itemListCopy }, () => this.saveListToStorage());
    } else {
      let itemListCopy = [...this.state.itemList];
      let newItem = { title: updateItem.title, password: updateItem.password };
      itemListCopy.splice(index, 1, newItem);
      this.setState({ itemList: itemListCopy }, () => this.saveListToStorage());
    }
  }

  deleteItem(value) {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete the entry for " + value + "?",
      [
        {
          text: "Yes",
          onPress: () => {
            let newList = this.state.itemList;
            newList = newList.filter(function (obj) {
              return obj.title !== value;
            });
            this.setState({ itemList: newList }, () =>
              this.saveListToStorage()
            );
          },
        },
        {
          text: "No",
          onPress: () => {
            return false;
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  copyItem(value) {
    const index = this.state.itemList.map((e) => e.title).indexOf(value);
    const password = this.state.itemList[index].password;
    this.writeToClipboard(password);
  }

  render() {
    return (
      <View style={styles.screen}>
        <SafeAreaView style={styles.container}>
          <MainItemsList
            listItems={this.state.itemList}
            copyItem={this.copyItem}
            editItem={this.onItemEdit}
            deleteItem={this.deleteItem}
          ></MainItemsList>
        </SafeAreaView>
        <SafeAreaView style={styles.pageFooter}>
          <ActionButton
            onPress={this.onItemAdd}
            iconName={"plus"}
            iconSize={36}
            iconColor={"white"}
            showBorder={false}
          />
          <ActionButton
            iconName={"file"}
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
  container: {
    flex: 1,
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#1500fd",
    padding: 8,
    elevation: 10,
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
  pageTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    flex: 1,
  },
  button: {
    flexGrow: 4,
    margin: 5,
    color: "#1500fd",
  },
});

export default MainListScreen;
