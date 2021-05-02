import React from "react";
import { StyleSheet, View } from "react-native";
import reducer from "./reducers/index";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { getDecks, loadInitialDecks } from "./utils/DATA";
import logger from "./middleware/logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk,logger));

export default class App extends React.Component {
 

  componentDidMount() {
    loadInitialDecks();
  }

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

    const TabNav = createMaterialTopTabNavigator(tabs);
    const TabsContainer = createAppContainer(TabNav);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <TabsContainer />
        </View>
      </Provider>
    );
  }
  finishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
