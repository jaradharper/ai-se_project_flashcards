# Project 1: TripleTen Flash Card App

My first project in TripleTen's AI-Assisted Software Engineering program. This
app organizes flashcards into decks and lets users create decks, browse their
cards, and practice questions and answers. Decks are loaded from the TripleTen
API and kept in a shared in-memory cache for navigation.

## Features

- Fetch and display saved decks with their names, colors, and card counts.
- Create a deck from JSON with a selectable color and form validation.
- Fetch the complete deck after creation so its cards appear without refreshing.
- Delete decks from the server, the local cache, and the page.
- Open a deck and flip individual cards between questions and answers.
- Practice with previous, next, and flip controls and a current-card counter.
- Navigate between Home, New Deck, Deck, Practice, About, and a not-found view.
- Display validation and request errors in a dismissible modal.
- Adapt layouts and bottom action buttons to smaller screens.
- Document named JavaScript functions with JSDoc, including shared deck and card
  types.

## Technologies

- HTML5 and CSS, including Flexbox, Grid, and media queries
- JavaScript modules, DOM manipulation, and hash-based routing
- Fetch API, JSON, promises, and authenticated HTTP requests
- JSDoc, Prettier, Git, and GitHub

## Run Locally

1. Clone the repository and open the project folder:

   ```bash
   git clone https://github.com/jaradharper/ai-se_project_flashcards.git
   cd ai-se_project_flashcards
   ```

2. In `assets/js/api.js`, configure the shared `headers.authorization` value
   with your TripleTen course API token. Keep the `Content-Type` header set to
   `application/json`. The token determines which account's decks are accessed.

3. Open `index.html` with a local development server, such as VS Code Live
   Server. Use the server's HTTP URL rather than opening the file directly; the
   app uses JavaScript modules. No build step is required.

An internet connection and valid API token are needed to load and save decks.

## Create a Deck

Choose **+ New Deck**, select the **pink** color, and paste this object into the
JSON field:

```json
{
  "name": "JavaScript Practice",
  "color": "#ee92d7",
  "cards": [
    {
      "question": "What does push() do?",
      "answer": "Adds items to the end of an array."
    },
    {
      "question": "What does JSON.stringify() do?",
      "answer": "Converts JavaScript data into JSON text."
    }
  ]
}
```

The JSON color must match the selected swatch. The form checks JSON syntax,
requires a name whose trimmed length is 2–80 characters, and requires `cards` to
be an array. The server assigns `_id` values; do not generate a deck ID in the
form data.

After creation, the app fetches the saved decks again, finds the new deck by its
`_id`, caches it, adds its home-page tile, and opens its cards. This extra fetch
handles the creation response returning an empty `cards` array even when the
cards have been saved.

## Routes

| URL hash              | View                                                   |
| --------------------- | ------------------------------------------------------ |
| `#home`               | Deck gallery; also the default when no hash is present |
| `#new-deck`           | New Deck form (`#new-deck-view` is also supported)     |
| `#deck/<deck-id>`     | Cards in the deck with the matching server `_id`       |
| `#carousel/<deck-id>` | Practice for a deck containing cards                   |
| `#about`              | About section                                          |

Unknown routes, missing deck IDs, and practice routes for empty decks display
the not-found view.

## JavaScript Structure

| File                         | Responsibility                                                                |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `assets/js/api.js`           | Shared request headers, response handling, and GET, POST, and DELETE requests |
| `assets/js/decks.js`         | `fetchedDecks` cache, ID lookup, and JSDoc data types                         |
| `assets/js/index.js`         | Initial loading, home-page tiles, deck deletion, and routing                  |
| `assets/js/new-deck-view.js` | Form validation, deck creation, and error modal controls                      |
| `assets/js/deck-view.js`     | Rendering and flipping cards in an open deck                                  |
| `assets/js/carousel.js`      | Practice navigation, card flipping, and progress display                      |
| `assets/js/colors.js`        | Color-name and hexadecimal conversions and class cleanup                      |

The cache lasts only for the current page session. Reloading fetches the saved
data from the server again.

## Current Limitations

- **+ New Card** is a visual placeholder; creating individual cards is not yet
  implemented.
- Individual card deletion currently changes the page and local data only. It is
  not saved to the server, and its legacy `id` lookup still needs to be updated
  for server card `_id` values.
- Deck deletion is permanent in the app: there is no confirmation or undo flow.
- The About route currently displays placeholder text.

## Manual Checks

- Load Home and compare the displayed decks with the GET `/decks` response in
  the browser's Network panel.
- Create a test deck and confirm its cards appear immediately, its tile appears
  on Home, and the deck remains available after reloading.
- Flip cards and use Practice to check navigation and the card counter.
- Try invalid JSON or a mismatched color and confirm the error modal appears.
- Delete a disposable test deck and reload to confirm it stays deleted.
- Open About and an unknown hash to check the About and not-found routes.
- Check desktop and narrow-screen layouts, including the fixed bottom buttons.

## Deployed Site

[View the Flash Card App](https://jaradharper.github.io/ai-se_project_flashcards/#home).

## Project Pitch Video

[Watch the project pitch](https://drive.google.com/file/d/1CtSMvZAnSmKS-zVeBQykMQI4Bg6jZj_h/view?usp=drive_link),
where I describe the project and challenges I faced while building it.
