import React from "react";
import { StyleSheet, View } from "react-native";
import reducer from "./reducers/index";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import {createStackNavigator} from 'react-navigation-stack';
import { getDecks } from "./utils/DATA";
import logger from "./middleware/logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import DetailOfDeck from './components/DetailOfDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import thunk from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk,logger));

export default class App extends React.Component {
 

  

  render() {
    const tabs = {
      Decks: {
        screen: DeckList,
        navigationOptions: {
          tabBarLabel: "all decks"     
        },
      },
      Add: {
        screen: AddDeck,
        navigationOptions: {
          tabBarLabel: "Add deck"
         
        },
      },
    };
    const tabsNav = createMaterialTopTabNavigator(tabs);
    const nav = createStackNavigator(
      {
        Home:{
          screen:tabsNav
        },
        DetailOfDeck:{
          screen: DetailOfDeck,
          navigationOptions: {
            title: 'Deck Details'
          }
        },
        AddCard:{
          screen: AddCard,
          navigationOptions: {
            title: 'add a new card'
          }
        },
        Quiz:{
          screen: Quiz
         
        }

      }
    )

    



    const TabsContainer = createAppContainer(nav);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <TabsContainer />
        </View>
      </Provider>
    );
  }
 
}


