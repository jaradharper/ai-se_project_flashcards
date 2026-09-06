const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";
const headers = {
  authorization: "01a07003-c5d2-73be-9e93-d22b24d9ac1e",
};

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

function getDecks() {
  return fetch(`${baseUrl}/decks`, {
    headers: headers,
  }).then(processResponse);
}

function addDeck({ name, color, cards }) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, color, cards }),
  }).then(processResponse);
}

function deleteDeck(deckId) {
  return fetch(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers: headers,
  }).then(processResponse);
}

/*function getRandomQuote() {
  return fetch(`${baseUrl}/quotes/random`).then(processResponse);
}
  */

export { getDecks, deleteDeck, addDeck };
