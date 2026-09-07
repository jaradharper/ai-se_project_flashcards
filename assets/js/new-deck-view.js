import { addDeck, getDecks } from "./api.js";
import { fetchedDecks } from "./decks.js";
import { renderDeckEl } from "./index.js";
import { renderDeckView } from "./deck-view.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;
const form = document.querySelector("#new-deck-form");
const sbmtBtn = document.querySelector(".new-deck-view__submit-btn");
const txtArea = document.querySelector("#new-deck-view__textarea");
const errorModal = document.querySelector("#error-modal");
const errorModalCloseButton = errorModal.querySelector(".modal__close_btn");
const errorModalMessage = errorModal.querySelector(".modal__error");

/**
 * Enables the deck submit button by setting disabled to false.
 * Despite its name, the current implementation enables the button.
 *
 * @returns {void}
 */
function disableSubmitBtn() {
  sbmtBtn.disabled = false;
}

/**
 * Hides the error modal.
 *
 * @returns {void}
 */
function closeModal() {
  errorModal.classList.remove("modal_visible");
}

errorModalCloseButton.addEventListener("click", closeModal);

/**
 * Sets the error modal message and makes the modal visible.
 *
 * @param {string} message - Error text to display.
 * @returns {void}
 */
function showError(message) {
  errorModalMessage.textContent = message;
  errorModal.classList.add("modal_visible");
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  /**
   * Parses form JSON and displays an error modal if parsing fails.
   *
   * @param {string} jsonString - JSON text entered in the form.
   * @returns {*} Parsed JSON value, or null on failure. Valid JSON null also returns null.
   */
  function parseJSON(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      showError("JSON parsing failed.");
      return null;
    }
  }

  const formData = new FormData(evt.target);
  const values = Object.fromEntries(formData);
  const jsonData = parseJSON(values.cards);
  const colorValue = values.color.toLowerCase();

  // Parsing failed, so don't continue.
  if (jsonData === null) {
    return;
  }

  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== colorValue
  ) {
    showError("The JSON color does not match the selected deck color.");
    return;
  }

  if (
    typeof jsonData.name !== "string" ||
    jsonData.name.trim().length < 2 ||
    jsonData.name.trim().length > 80
  ) {
    showError("The deck name must be a string between 2 and 80 characters.");
    return;
  }

  if (!Array.isArray(jsonData.cards)) {
    showError("Cards must be an array.");
    return;
  }

  const color = normalizeColor(values.color);
  const uniqueID = `${slugify(jsonData.name)}-${Date.now()}`;

  const newDeck = {
    color: colorValue,
    name: jsonData.name,
    cards: jsonData.cards,
  };
  addDeck({
    color: colorValue,
    name: jsonData.name,
    cards: jsonData.cards,
  })
    .then((createdDeck) => {
      return getDecks().then((decks) => {
        return decks.find((deck) => deck._id === createdDeck._id);
      });
    })
    .then((newDeck) => {
      if (!newDeck) {
        throw new Error("Created deck could not be loaded");
      }

      fetchedDecks.push(newDeck);
      renderDeckEl(newDeck);
      window.location.hash = "deck/" + newDeck._id;
    })
    .catch(() => {
      showError("Can't create or load deck");
    });
});

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

export { disableSubmitBtn, showError };
