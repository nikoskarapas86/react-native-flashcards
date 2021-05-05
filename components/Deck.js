import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { white, gray } from '../utils/colors';
import { connect } from 'react-redux';

const Deck = props => {
  const { deck } = props;

 
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.deckText}>{deck.title}</Text>
      </View>
      <View>
        <Text style={styles.text}>{deck.questions.length} cards</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 120,
    minHeight: 120,
    borderWidth: 1,
    borderColor:gray,
    backgroundColor: white,
    borderRadius: 6,
    marginBottom: 10
  },
  deckText: {
    fontSize: 28
  },
  text: {
    fontSize: 16,
    color: gray
  }
});

const mapStateToProps = ({ deck }) => {
  const dec = deck;

  return {
    dec
  };
};

export default connect(mapStateToProps)(Deck);
