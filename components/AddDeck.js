import React, { Component } from "react";
import { connect } from "react-redux";
import { white, purple, red } from "../utils/colors";
import { addDeck } from "../actions/index";
import { saveDeck } from "../utils/DATA";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import TextButton from "./TextButton";

class AddDeck extends Component {
  state = {
    name: "",
  };

  handleNameChange = (text) => {
    this.setState({
      name: text,
    });
  };

  handleSubmit = () => {
    const { addDeck, navigation } = this.props;
    const { name } = this.state;
    addDeck(name);
    saveDeck(name);
    navigation.goBack();
  };

  render() {
    return (
      <View>
        <ScrollView>
          <Text style={styles.header}>ADD DECK</Text>
          <Text style={styles.subHead}>
            What would be the title of your new deck?
          </Text>

          <View style={[styles.botm]}>
            <Input
              style={styles.input}
              value={this.state.name}
              onChangeText={this.handleNameChange}
              placeholder="name the dack"
            />
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TextButton style={[styles.btn]} onPress={this.handleSubmit}>
              Add Card
            </TextButton>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: red,
    marginBottom: 50,
    textAlign: "center",
  },
  botm: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
  },
  subHead: {
    fontSize: 24,
    marginBottom: 25,
    textAlign: "center",
  },
 
});

export default connect(null, { addDeck })(AddDeck);
