import React, { Component } from 'react';
import { handleInitialData } from '../actions/index';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {purple, red } from "../utils/colors";
import { connect } from 'react-redux';
import Deck from './Deck';
class DeckList extends Component {

    componentDidMount() {
        this.props.handleInitialData();
        
      }

    render() {
        const { decks,navigation } = this.props;
        console.log(Object.values(decks))
        return (
            <ScrollView style={styles.container}>
            <Text style={styles.title}>Flashcards</Text>
            {Object.values(decks).map(deck => {
              return (
                <TouchableOpacity
                  key={deck.title}
                  onPress={() => navigation.navigate('DetailOfDeck',{ dec: deck })
                   
                  }
                >
                  <Deck key={deck.key} deck={deck} />
                </TouchableOpacity>
              );
            })}
            <View style={{ marginBottom: 30 }} />
          </ScrollView>
              
          );
    }

}


const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    textDecorationLine: "underline",
    borderBottomColor: purple,
    borderBottomWidth: 2,
    borderTopColor: purple,
    borderTopWidth: 2,
    fontWeight: "bold",
    color: red,
    margin: 50,
    textAlign: "center",
  },
  deckBoxes: {
    borderWidth: 2,
    borderColor: purple,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    borderRadius: 15,
  },
  title: {
    color: red,
    fontSize: 20,
  },
  titleView: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = state => ({ decks: state });

export default connect(
    mapStateToProps,
    { handleInitialData }
  )(DeckList);
