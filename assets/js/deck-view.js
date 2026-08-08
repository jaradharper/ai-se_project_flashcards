import { hexToString } from "./colors.js";

const deckView = document.querySelector("#deck-view");
const title = deckView.querySelector(".gallery__title");
const cardList = deckView.querySelector(".gallery__list");
const cardTemplate = document.querySelector("#card-template");
const practiceButton = deckView.querySelector(".gallery__practice-btn");
const page = document.querySelector(".page");

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

function renderDeckView(deck) {
  page.classList.remove("page_no-mobile-bar");
  title.textContent = deck.name;
  cardList.replaceChildren();
  deck.cards.forEach((card) => cardList.append(createCardElement(card, deck)));
  practiceButton.onclick = () => {
    window.location.hash = `carousel/${deck.id}`;
  };
  deckView.classList.add("gallery_type_deck_visible");
}

export { renderDeckView };
