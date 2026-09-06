import { decks } from "./decks.js";
import { addDeck } from "./api.js";
import { fetchedDecks } from "./decks.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;
const form = document.querySelector("#new-deck-form");
const sbmtBtn = document.querySelector(".new-deck-view__submit-btn");
const txtArea = document.querySelector("#new-deck-view__textarea");
const errorModal = document.querySelector("#error-modal");
const errorModalCloseButton = errorModal.querySelector(".modal__close_btn");
const errorModalMessage = errorModal.querySelector(".modal__error");

function disableSubmitBtn() {
  sbmtBtn.disabled = false;
}

function closeModal() {
  errorModal.classList.remove("modal_visible");
}

errorModalCloseButton.addEventListener("click", closeModal);

function showError(message) {
  errorModalMessage.textContent = message;
  errorModal.classList.add("modal_visible");
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

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
    .then((newDeck) => {
      fetchedDecks.push(newDeck);
    })
    .catch(() => {
      showError("Can't create deck");
    });

  window.location.hash = "deck/" + newDeck._id;
});

/**
 * Converts a string to a URL-safe slug: lowercase with any run of
 * non-alphanumeric characters replaced by a single hyphen, and no leading or
 * trailing hyphens.
 *
 * @param {string} str
 * @returns {string}
 */
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Returns a consistent lowercase hex color string with a leading "#".
 * Accepts values with or without a leading "#". Returns "#64d583" as a
 * fallback if the value is missing or not a valid 6-digit hex.
 *
 * @param {string|undefined} color
 * @returns {string}
 */
function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}

export { disableSubmitBtn, showError };
