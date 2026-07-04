import { decks } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { getDeckByID } from "./decks.js";

const cardDeck = document.querySelector("#my-template");
const cardDeckContainer = document.querySelector(".decks__list");
const mainContent = document.querySelector(".page__main-content");
const carouselEl = document.querySelector(".carousel");

function createDeckEl(itemInDecks) {
  const cardEl = cardDeck.content.querySelector(".deck").cloneNode(true);

  const deckLink = cardEl.querySelector(".deck__link");
  deckLink.href = `#carousel/${itemInDecks.id}`;

  const cardTitle = cardEl.querySelector(".deck__title");
  cardTitle.textContent = itemInDecks.name;

  const deleteBtn = cardEl.querySelector(".deck__delete-btn");

  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  const color = hexToString(itemInDecks.color);
  cardEl.classList.add(`deck_color_${color}`);

  const cardCount = itemInDecks.cards.length;
  const cardCountText = cardEl.querySelector(".deck__count");
  cardCountText.textContent = `${cardCount} cards`;

  return cardEl;
}

function renderDeckEl(itemInDecks) {
  const cardEl = createDeckEl(itemInDecks);
  cardDeckContainer.append(cardEl);
}

decks.forEach(renderDeckEl);

const homeSection = document.querySelector("#home");
const notFoundSection = document.querySelector("#not-found");

function renderHomeView() {
  homeSection.style.display = "block";
  notFoundSection.style.display = "none";
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  carouselEl.style.display = "none";
  notFoundSection.style.display = "block";
}

function router() {
  const hash = window.location.hash.slice(1) || "home";
  const hashSplitter = hash.split("/");
  const hashId = hashSplitter[1];

  if (hash === "home") {
    renderHomeView();
    mainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash.startsWith("carousel/")) {
    renderCarouselView(getDeckByID(hashId));
    mainContent.classList.add("page__main-content_location_carousel");
  } else {
    renderNotFoundView();
    mainContent.classList.remove("page__main-content_location_carousel");
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
