const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";
const headers = {
  authorization: "01a07003-c5d2-73be-9e93-d22b24d9ac1e",
  "Content-Type": "application/json",
};

/**
 * Parses a successful JSON response or rejects with the HTTP status.
 *
 * @param {Response} res - Response returned by fetch.
 * @returns {Promise<*>} Parsed JSON; rejects on an HTTP error or invalid JSON.
 */
function processResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Fetches the account's saved decks and their cards.
 *
 * @returns {Promise<import('./decks.js').Deck[]>} Fetched decks; rejects if the request or parsing fails.
 */
function getDecks() {
  return fetch(`${baseUrl}/decks`, {
    headers: headers,
  }).then(processResponse);
}

/**
 * Saves a new deck on the server. Fetch the decks again to load its full cards.
 *
 * @param {Object} deck - Data to save; the server assigns the deck ID.
 * @param {string} deck.name - Deck title.
 * @param {string} deck.color - Hexadecimal deck color, including #.
 * @param {import('./decks.js').Card[]} deck.cards - Questions and answers to save.
 * @returns {Promise<import('./decks.js').Deck>} Creation response, which may contain an empty cards array. Rejects on failure.
 */
function addDeck({ name, color, cards }) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, color, cards }),
  }).then(processResponse);
}

/**
 * Requests permanent deletion of a saved deck from the server.
 *
 * @param {string} deckId - Server-assigned _id of the deck to delete.
 * @returns {Promise<*>} Parsed deletion response; rejects if the request or parsing fails.
 */
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
