import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
const decks = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces",
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
};


export function createNotification() {
  AsyncStorage.getItem('notification')
      .then(JSON.parse)
      .then(data => {
          if (data === null) {
            
              Permissions.askAsync(Permissions.NOTIFICATIONS)
                  .then(({status}) => {
                      if (status === 'granted') {
                          Notifications.cancelAllScheduledNotificationsAsync();

                          Notifications.scheduleNotificationAsync({
                            content: 'A whole day pass without having a quiz' ,
                            trigger: {
                               
                                 hour: 23,
                                 minute: 1,
                                repeats: true,
                                
                            }, 
                          }
                        
                          );
                          AsyncStorage.setItem('notification', JSON.stringify(true));
                      }
                  });
          }
      })
}

export function clearNotification() {
  return AsyncStorage.removeItem('notification')
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}



export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem('decks');
    if (results === null) {
      AsyncStorage.setItem('decks', JSON.stringify(decks));
    }
    return results === null ? decks : JSON.parse(results);
  } catch (err) {
    console.log(err);
  }
}


export async function saveDeck(title) {
  try {
    await AsyncStorage.mergeItem(
      decks,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function removeThatDeck(key) {
  try {
    const results = await AsyncStorage.getItem('decks');
    const data = JSON.parse(results);
    delete data[key];
    AsyncStorage.setItem(data, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

export async function addCard(title, card) {
 
  try {
    const deck = await getDeck(title);
    await AsyncStorage.mergeItem(
      decks,
      JSON.stringify({
        [title]: {
          questions:JSON.parse(deck) !== undefined && JSON.parse(deck)!== null? [...JSON.parse(deck).questions].concat(card):[]
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}



export function getDeck(id) {
  return AsyncStorage.getItem(id);
}

export function addDeck(title) {
  try {
    return AsyncStorage.setItem(
      title,
      JSON.stringify({ title, questions: [] })
    );
  } catch (error) {
    console.log(error);
  }
}


