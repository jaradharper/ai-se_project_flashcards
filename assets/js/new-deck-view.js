import { decks } from "./decks.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;
const form = document.querySelector("#new-deck-form");
const sbmtBtn = document.querySelector(".new-deck-view__submit-btn");
const txtArea = document.querySelector("#new-deck-view__textarea");

function disableSubmitBtn() {
  sbmtBtn.disabled = false;
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const values = Object.fromEntries(formData);
  const jsonData = JSON.parse(values.cards);
  const color = normalizeColor(values.color);
  const uniqueID = `slugify(values.name);-${Date.now()}`;

  const newDeck = {
    id: uniqueID,
    color: color,
    name: jsonData.name,
    cards: jsonData.cards,
  };

  decks.push(newDeck);

  window.location.hash = "deck/" + uniqueID;

  console.log(decks);
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

export { disableSubmitBtn };
