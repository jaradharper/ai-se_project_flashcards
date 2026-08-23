# Project 1: TripleTen Flash Card App

This is my first project in TripleTen's AI-Assisted Software Engineering
program. The app organizes flashcards into decks and provides multiple views
for browsing, managing, and practicing cards.

## Project Features

- An open deck view that displays a selected deck's cards and provides options
  to add a card, delete cards, or begin a practice session
- A confirmation modal that helps prevent users from accidentally deleting
  content
- A carousel practice view with previous, next, and flip-card controls
- Responsive layouts for desktop, tablet, and mobile screen sizes
- A mobile action bar that adapts to the active view without obscuring the
  carousel or 404 page
- Hash-based navigation between the deck gallery, open deck, carousel, and 404
  views
- A routed New Deck form with accessible color choices, a JSON textarea, and a
  disabled submission state ready for validation logic
- Dynamic card rendering, flipping, and deletion with JavaScript

## Technologies

- Semantic HTML5
- CSS, Flexbox, Grid, media queries, positioning, and z-index
- JavaScript and DOM manipulation
- Git and GitHub

## Run Locally

Clone the repository and open `index.html` with a local development server. The
application uses JavaScript modules, so opening the file directly from the file
system may not work in every browser.

The available hash routes include:

- `#home` for the deck gallery
- `#new-deck` for the New Deck form
- `#deck/<deck-id>` for an individual deck
- `#carousel/<deck-id>` for practice mode

## Deployed Site

Check out [this site.](https://jaradharper.github.io/ai-se_project_flashcards/#home)

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/1CtSMvZAnSmKS-zVeBQykMQI4Bg6jZj_h/view?usp=drive_link), where I describe my
project and some challenges I faced while building it.
