import AsyncStorage from "@react-native-community/async-storage";

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


export function getData() {
  return decks;
}

function formatDeckResults(results) {
  return results === null ? decks : JSON.parse(results);
}

export function getDecksOld() {
  return AsyncStorage.getItem(decks).then(formatDeckResults);
  // return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
  //   console.log('raw result', result);
  //   console.log('parse result', JSON.parse(result));
  //   return formatDeckResults(result);
  // });
}


export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem(decks);
    if (results === null) {
      AsyncStorage.setItem(decks, JSON.stringify(decks));
    }
    return results === null ? decks : JSON.parse(results);
  } catch (err) {
    console.log(err);
  }
}


export async function saveDeckTitleAS(title) {
  try {
    await AsyncStorage.mergeItem(
      data,
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

export async function removeDeckAS(key) {
  try {
    const results = await AsyncStorage.getItem(data);
    const data = JSON.parse(results);
    data[key] = undefined;
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
          questions: [...JSON.parse(deck).questions].concat(card)
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function resetDecks() {
  try {
    await AsyncStorage.setItem(data, JSON.stringify(decks));
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


