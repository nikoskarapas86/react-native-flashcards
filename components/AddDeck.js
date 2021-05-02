import React, { Component } from 'react';

import { white, purple,red } from "../utils/colors";
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableHighlight,
    StyleSheet,
} from 'react-native'

class AddDeck extends Component {

    state = {
        deckName: '',
    }


    handleDeckNameInputChange = (newInput) => {
        this.setState({
            deckName: newInput
        })
    }

    handleSubmit = () => {
        const { handleNewDeckSubmition } = this.props.screenProps
        const userInput = this.state.deckName

        if (userInput) {
            if (userInput === 'dateLatestAttempted') {
                alert("dateLatestAttempted is a reserve word in this app, kindly use another Title for the Deck")
            } 
            else {
                handleNewDeckSubmition(userInput.trim())
                    .then((newDeck) => {
                        this.setState({ deckName: '' })
                        this.props.navigation.navigate('Deck', { deck: newDeck })
                    })
            }
        }
        else { alert("Deck name cannot be submitted empty!") }

    }

    render() {
        return (
            <View>
            <ScrollView>
            <Text style={styles.header}>
                    ADD DECK
                </Text>
                <Text style={styles.subHead}>
                    What would be the title of your new deck?
                </Text>
                {/* <TextInput
                    value={this.state.deckName}
                    onChangeText={this.handleDeckNameInputChange}
                    style={styles.textbox}
                /> */}

                <View style={{
                    alignItems: 'center',
                }}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.handleSubmit}
                    >
                        <Text style={styles.submit}>
                            SUBMIT
                    </Text>
                    </TouchableHighlight>
                </View>
                </ScrollView>
                </View>
          
               
        
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        marginTop: 20,
        height: 40,
        borderRadius: 6,
        alignItems: 'center',
        backgroundColor: white,
        color: red,
        borderBottomColor: purple,
        borderBottomWidth: 2,
        justifyContent: 'center',
    },
    root: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 36,
        fontWeight: 'bold',
        color: red,
        marginBottom: 50,
        textAlign: 'center'
    },
    subHead: {
        fontSize: 24,
        marginBottom: 25,
        textAlign: 'center'
    },
    textbox: {
        borderColor: 'black',
        borderWidth: 1,
        margin: 5,
        paddingLeft: 5
    },
    submit: {
        fontSize: 20,
        color: 'white'
    }
})


export default AddDeck