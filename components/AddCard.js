import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { gray, blue } from "../utils/colors";
import { connect } from "react-redux";
import { addCardToDeck } from "../actions/index";
import TextButton from "./TextButton";
import { Input } from "react-native-elements";
import {addCard} from '../utils/DATA'
export class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };
  handleQuestion = (question) => {
    this.setState({ question });
  };
  handleAnswer = (answer) => {
    this.setState({ answer });
  };

  handleSubmit = () => {
    const { addCardToDeck, title, navigation } = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer,
    };
 
  
    addCardToDeck(title, card);
    addCard(title,card)
    this.setState({ question: "", answer: "" });
    navigation.goBack();
  };


  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.botm}>
            <Text style={styles.title}>Add a question</Text>
          </View>
          <View style={[styles.botm]}>
            <Input
              style={styles.input}
              value={this.state.question}
              onChangeText={this.handleQuestion}
              placeholder="Question"
           
        
            />
          </View>
          <View style={[styles.botm]}>
            <Input
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.handleAnswer}
              placeholder="Answer"
              
            />
          </View>
          <TextButton
            onPress={this.handleSubmit}
            disabled={this.state.question === "" || this.state.answer === ""}
          >
            Submit
          </TextButton>
        </View>
        <View style={{ height: "30%" }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: blue,
    justifyContent: "space-around",
  },
  botm: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
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
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam("title", "undefined");

  return {
    title,
  };
};

export default connect(mapStateToProps, { addCardToDeck })(AddCard);
