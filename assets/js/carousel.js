import { getDeckByID } from "./decks.js";
import { removeColorClasses } from "./colors.js";
import { hexToString } from "./colors.js";

/**
 * Initializes practice at the first card and attaches navigation and flip handlers.
 *
 * @param {import('./decks.js').Deck} deck - Deck containing at least one full card object.
 * @returns {void}
 */
function renderCarouselView(deck) {
  let currentIndex = 0;
  let showingQuestion = true;

  const carouselEl = document.querySelector(".carousel");
  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  const sectionTitle = carouselEl.querySelector(".carousel__title");
  const gridElement = carouselEl.querySelector(".carousel__grid");
  const cardTextElement = carouselEl.querySelector(".carousel__card-text");
  const flipButton = carouselEl.querySelector(
    ".carousel__btn.carousel__btn_type_flip",
  );

  removeColorClasses(cardTextElement);

  const color = hexToString(deck.color);
  cardTextElement.classList.add(`carousel__card-text_color_${color}`);

  /**
   * Disables a carousel button and applies its disabled appearance.
   *
   * @param {HTMLButtonElement} buttonEl - Button to disable.
   * @returns {void}
   */
  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }
  /**
   * Enables a carousel button and removes its disabled appearance.
   *
   * @param {HTMLButtonElement} buttonEl - Button to enable.
   * @returns {void}
   */
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  /**
   * Updates navigation buttons for the current index and deck length.
   *
   * @returns {void}
   */
  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  /**
   * Shows the current question or answer, updates the counter, and refreshes arrows.
   *
   * @returns {void}
   */
  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];
    cardTextElement.textContent = currentCard.question;
    const cardName = deck.name;
    const cardNumber = currentIndex + 1;
    const cardsLength = deck.cards.length;

    if (showingQuestion) {
      cardTextElement.textContent = currentCard.question;
      cardTextElement.classList.remove("carousel__card-text_color_white");
    } else {
      cardTextElement.textContent = currentCard.answer;
      cardTextElement.classList.add("carousel__card-text_color_white");
    }

    sectionTitle.textContent = `${cardName} · ${cardNumber}/${cardsLength}`;
    updateArrows();
  }

  rightBtn.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  };

  leftBtn.onclick = () => {
    if (currentIndex > 0) {
      showingQuestion = true;
      currentIndex--;
      updateDisplay();
    }
  };

  flipButton.onclick = () => {
    showingQuestion = !showingQuestion;

    updateDisplay();
  };

  updateDisplay();
}

export { renderCarouselView };
