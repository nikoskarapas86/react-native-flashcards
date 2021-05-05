import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import TextButton from "./TextButton";

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    correctAnswers: 0,
    showQuest: true,
  };

  handleCorrect = () => {
    this.setState((prevState) => ({
      correctAnswers: ++prevState.correctAnswers,
      currentQuestion: ++prevState.currentQuestion,
    }));
  };

  handleIncorrect = () => {
    this.setState((prevState) => ({
      currentQuestion: ++prevState.currentQuestion,
    }));
  };

  resetQuiz = () => {
    this.setState(() => ({
      currentQuestion: 0,
      correctAnswers: 0,
      showQuest: true,
    }));
  };

  render() {
    const { deck } = this.props;
    const { currentQuestion } = this.state;
    const questLength = deck.questions.length;
    const { question, answer } =
      questLength !== undefined &&
      questLength > 0 &&
      currentQuestion < questLength
        ? deck.questions[currentQuestion]
        : { question: null, answer: null };
    console.log(question, answer);

    return !!questLength ? (
      currentQuestion >= questLength ? (
        <ScrollView>
          <Text>results</Text>
          <View style={styles.root}>
            <Text>
              {`results of quiz ${(
                (this.state.correctAnswers / questLength) *
                100
              ).toFixed(2)}%`}
            </Text>
          </View>
          <View style={styles.root}>
            <TouchableHighlight onPress={this.resetQuiz}>
              <Text>RESTART QUIZ</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() =>  this.props.navigation.goBack()}>
              <Text>GO BACK</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={styles.root}>
            <Text>{`${currentQuestion + 1} / ${questLength}`}</Text>
            <Text>{this.state.showQuest && question ? question : answer}</Text>

            <TextButton
              onPress={() =>
                this.setState((prevState) => ({
                  showQuest: !prevState.showQuest,
                }))
              }
            >
              Show answer or question
            </TextButton>
          </View>
          <View style={styles.root}>
            <TouchableHighlight onPress={this.handleCorrect}>
              <Text>CORRECT</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.handleIncorrect}>
              <Text>INCORRECT</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      )
    ) : (
      <View style={styles.root}>
        <ScrollView>
          <View style={styles.root}>
            <Text>The list is empty for that deck</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

const mapStateToProps = (state, { navigation }) => {
  const deck = navigation.getParam("dec", "undefined");
  return {
    deck,
  };
};

export default connect(mapStateToProps)(Quiz);
