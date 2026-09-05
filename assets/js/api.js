const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

function getDecks() {
  return fetch(`${baseUrl}/decks`, {
    headers: {
      authorization: "01a07003-c5d2-73be-9e93-d22b24d9ac1e",
    },
  }).then(processResponse);
}

/*function getRandomQuote() {
  return fetch(`${baseUrl}/quotes/random`).then(processResponse);
}
  */

export { getDecks };
