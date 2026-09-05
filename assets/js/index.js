/*import { decks } from "./decks.js";*/
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { getDeckByID, fetchedDecks } from "./decks.js";
import { renderDeckView } from "./deck-view.js";
import { disableSubmitBtn, showError } from "./new-deck-view.js";
import { getDecks } from "./api.js";

const cardDeck = document.querySelector("#my-template");
const newDeckButton = document.querySelector("#home .gallery__new-card-btn");
const cardDeckContainer = document.querySelector(".gallery__list");
const mainContent = document.querySelector(".page__main-content");
const carouselEl = document.querySelector(".carousel");
const deckViewSection = document.querySelector("#deck-view");
const newDeckView = document.querySelector("#new-deck-view");
const page = document.querySelector(".page");
const sections = document.querySelectorAll(".page__main-content > section");

function showView(currentSection, display) {
  sections.forEach((section) => {
    section.style.display = "none";
  });

  currentSection.style.display = display;
}

function createDeckEl(itemInDecks) {
  const cardEl = cardDeck.content.querySelector(".card").cloneNode(true);

  const deckLink = cardEl.querySelector(".card__link");
  deckLink.href = `#deck/${itemInDecks._id}`;
  deckLink.setAttribute("aria-label", `Open ${itemInDecks.name} deck`);

  const cardTitle = cardEl.querySelector(".card__title");
  cardTitle.textContent = itemInDecks.name;

  const deleteBtn = cardEl.querySelector(".card__delete-btn");

  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  const color = hexToString(itemInDecks.color);
  cardEl.classList.add(`card_color_${color}`);

  const cardCount = itemInDecks.cards.length;
  const cardCountText = cardEl.querySelector(".card__count");
  cardCountText.textContent = `${cardCount} cards`;

  return cardEl;
}

function renderDeckEl(itemInDecks) {
  const cardEl = createDeckEl(itemInDecks);
  cardDeckContainer.append(cardEl);
}

const homeSection = document.querySelector("#home");
const notFoundSection = document.querySelector("#not-found");

function renderHomeView() {
  showView(homeSection, "block");
  page.classList.remove("page_no-mobile-bar");
}

function renderNotFoundView() {
  showView(notFoundSection, "block");
  page.classList.add("page_no-mobile-bar");
}

function router() {
  const hash = window.location.hash.slice(1) || "home";
  const hashSplitter = hash.split("/");
  const hashId = hashSplitter[1];

  disableSubmitBtn();

  const deck = getDeckByID(hashId);

  if (hash === "home") {
    renderHomeView();
    mainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash === "new-deck" || hash === "new-deck-view") {
    showView(newDeckView, "block");
    disableSubmitBtn();
    page.classList.remove("page_no-mobile-bar");
    mainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash.startsWith("deck/") && deck) {
    showView(deckViewSection, "grid");
    renderDeckView(deck);
    mainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash.startsWith("carousel/") && deck && deck.cards.length) {
    page.classList.add("page_no-mobile-bar");
    showView(carouselEl, "flex");
    renderCarouselView(deck);
    mainContent.classList.add("page__main-content_location_carousel");
  } else {
    renderNotFoundView();
    mainContent.classList.remove("page__main-content_location_carousel");
  }
}

newDeckButton.addEventListener("click", () => {
  window.location.hash = "new-deck";
});
window.addEventListener("DOMContentLoaded", () => {
  getDecks()
    .then((decks) => {
      fetchedDecks.push(...decks);
      decks.forEach(renderDeckEl);
    })
    .catch(() => {
      showError("Can't fetch decks");
    })
    .finally(() => {
      router();
    });
});
window.addEventListener("hashchange", router);

export { renderDeckEl };
