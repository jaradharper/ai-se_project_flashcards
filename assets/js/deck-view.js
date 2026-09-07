import { hexToString } from "./colors.js";

const deckView = document.querySelector("#deck-view");
const title = deckView.querySelector(".gallery__title");
const cardList = deckView.querySelector(".gallery__list");
const cardTemplate = document.querySelector("#card-template");
const practiceButton = deckView.querySelector(".gallery__practice-btn");
const page = document.querySelector(".page");

/**
 * Clones a flashcard and attaches flip and local deletion handlers.
 * Deletion updates the supplied deck and DOM only; it does not call the server.
 *
 * @param {import('./decks.js').Card} card - Question and answer to display.
 * @param {import('./decks.js').Deck} deck - Owning deck, supplying its color and mutable cards array.
 * @returns {HTMLLIElement} Populated flashcard, not yet attached to the page.
 */
function createCardElement(card, deck) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const flipButton = cardElement.querySelector(".card__flip-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");
  const color = hexToString(deck.color);
  let showingQuestion = true;

  cardTitle.textContent = card.question;
  cardElement.classList.add(`card_color_${color}`);

  flipButton.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    cardTitle.textContent = showingQuestion ? card.question : card.answer;
    cardElement.classList.toggle("card_color_white", !showingQuestion);
    cardElement.classList.toggle(`card_color_${color}`, showingQuestion);
  });

  deleteButton.addEventListener("click", () => {
    const cardIndex = deck.cards.findIndex((item) => item.id === card.id);

    if (cardIndex !== -1) {
      deck.cards.splice(cardIndex, 1);
    }
    cardElement.remove();
  });

  return cardElement;
}

/**
 * Replaces the displayed cards with those in the deck and sets its practice link.
 *
 * @param {import('./decks.js').Deck} deck - Deck with full card objects to render.
 * @returns {void}
 */
function renderDeckView(deck) {
  page.classList.remove("page_no-mobile-bar");
  title.textContent = deck.name;
  cardList.replaceChildren();
  deck.cards.forEach((card) => cardList.append(createCardElement(card, deck)));
  practiceButton.onclick = () => {
    window.location.hash = `carousel/${deck._id}`;
  };
  deckView.classList.add("gallery_type_deck_visible");
}

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

/**
 * Lowercases and trims text, replacing runs of non-ASCII letters and digits
 * with hyphens and removing leading or trailing hyphens.
 *
 * @param {string} str - Text to turn into a URL-friendly slug.
 * @returns {string} Normalized slug.
 */
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Adds a missing # prefix to a valid six-digit hexadecimal color.
 * Returns #64d583 for empty or invalid input; preserves letter case.
 *
 * @param {string} [color] - Hexadecimal color with or without #.
 * @returns {string} Valid hexadecimal color including #, or the fallback green.
 */
function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}

export { renderDeckView };
