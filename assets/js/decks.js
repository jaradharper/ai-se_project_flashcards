/**
 * A flashcard's text and optional server or legacy identifier.
 * @typedef {Object} Card
 * @property {string} [_id] - Server-assigned card ID.
 * @property {string|number} [id] - Legacy ID used by local card deletion.
 * @property {string} question - Text shown on the front.
 * @property {string} answer - Text shown on the back.
 */

/**
 * A saved deck cached by the application.
 * @typedef {Object} Deck
 * @property {string} _id - Server-assigned deck ID.
 * @property {string} name - Display title.
 * @property {string} color - Hexadecimal deck color including #.
 * @property {Card[]} cards - Cards included in this response.
 */

const fetchedDecks = [];

/**
 * Finds a cached deck by its server-assigned _id without making a request.
 *
 * @param {string} deckId - ID to match.
 * @returns {Deck|undefined} First matching deck, or undefined if absent.
 */
function getDeckByID(deckId) {
  return fetchedDecks.find((deck) => deck._id === deckId);
}

export { getDeckByID, fetchedDecks };
