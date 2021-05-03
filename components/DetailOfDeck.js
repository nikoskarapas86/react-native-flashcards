import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { gray, green, white, red } from "../utils/colors";
import { connect } from "react-redux";
import TextButton from "./TextButton";

export class DetailOfDeck extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  handleDelete = (id) => {
    const { removeDeck, navigation } = this.props;

    // removeDeck(id);
    // removeDeckAS(id);

    navigation.goBack();
  };
  render() {
    const { deck } = this.props;
    console.log(deck);
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.txt}>{deck.title}</Text>
        </View>
        <View>
          <Text style={styles.card}>{deck.questions.length} cards</Text>
        </View>
        <View>
          <TextButton   style={[styles.btn]}
            onPress={() =>
              this.props.navigation.navigate("AddCard", { title: deck.title })
            }
          >
            Add Card
          </TextButton>
          <TextButton  style={[styles.btn]}
            onPress={() =>
              this.props.navigation.navigate("Quiz", { title: deck.title })
            }
          >
            Start Quiz
          </TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: white,
    borderRadius: 5,
    marginBottom: 10,
  },
  txt: {
    fontSize: 28,
  },
  btn: {
    width: 100,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 1,
    borderColor: '#999'
  },
  card: {
    fontSize: 18,
    color: gray,
  },
});

const mapStateToProps = (dec, { navigation }) => {
  const deck = navigation.getParam("dec", "undefined");

  return {
    deck,
  };
};

export default connect(
  mapStateToProps
  // { removeDeck }
)(DetailOfDeck);
