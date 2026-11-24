# Lab 8 — Debugging worksheet

Fill one block in for each fault you find. **The reasoning is what is marked**,
not the fix — a one-line correction with no explanation earns very little.

Copy the block as many times as you need.

---

## Fault 1 — Skipped heading level (`index.html`)
- **Symptom:** The page heading hierarchy jumps directly from `<h1>` ("Trail Browser") to `<h3>` ("Filter and sort").
- **How I found it:** Inspected the document structure in the DevTools Elements panel and noticed an `<h3>` immediately following the `<h1>` with no `<h2>` in between.
- **Cause:** Skipping heading levels breaks the semantic document outline, which makes it harder for screen reader users to navigate and understand the structure of the page.
- **Fix:** Changed `<h3>Filter and sort</h3>` to `<h2>Filter and sort</h2>`.
- **Lecture:** Lecture 2

---

## Fault 2 — Missing form label (`index.html`)
- **Symptom:** The search input has no label, only placeholder text ("Search by name").
- **How I found it:** Inspected the `<form id="controls">` markup in the DevTools Elements panel and saw that `<input type="text" id="search">` had no associated `<label>` element.
- **Cause:** A `placeholder` attribute is only a temporary hint that disappears once the user starts typing and does not serve as a programmatic accessible name. Every form control needs an explicit `<label>` linked via `for`/`id`.
- **Fix:** Added `<label for="search">Search</label>` above the `#search` input.
- **Lecture:** Lecture 3

---

## Fault 3 — Horizontal overflow on narrow screens (`styles.css`)
- **Symptom:** At around 400px wide, the search input box hangs off the right edge of the container.
- **How I found it:** Opened the DevTools Device Toolbar at 400px width to see the overflow, then checked the Styles pane and saw `#search` had `width: 100%` alongside padding and borders with no `box-sizing: border-box` rule.
- **Cause:** Under CSS's default `box-sizing: content-box`, `width: 100%` applies only to the content area, so padding and borders are added on top of 100%, causing the element to exceed its container's width.
- **Fix:** Added `*, *::before, *::after { box-sizing: border-box; }` to `styles.css`.
- **Lecture:** Lecture 4

---

## Fault 4 — Missing keyboard focus indicator (`styles.css`)
- **Symptom:** Tabbing through the form controls shows no visible highlight on whichever element is focused.
- **How I found it:** Pressed the `Tab` key repeatedly to navigate the form and saw no focus ring, then inspected the `:focus` rule in the DevTools Styles pane and found `outline: none;`.
- **Cause:** Removing the browser's default focus outline with `outline: none` without providing a replacement style breaks keyboard accessibility, leaving keyboard-only users unable to tell where they are on the page.
- **Fix:** Replaced `outline: none;` with `outline: 3px solid var(--brand); outline-offset: 2px;`.
- **Lecture:** Lecture 4

---

## Fault 5 — Loose equality in filtering (`app.js`)
- **Symptom:** Rating comparisons in `matches()` use `==` instead of strict equality.
- **How I found it:** Checked `matches()` in `app.js` after `check.html` flagged type-converting comparisons and spotted `rating == "all" || trail.rating == rating`.
- **Cause:** The loose equality operator (`==`) performs implicit type coercion before comparing values, which can lead to unintended matches. Strict equality (`===`) compares both value and type without coercion.
- **Fix:** Changed both `==` operators to `===` in `matches()`.
- **Lecture:** Lecture 7

---

## Fault 6 — Broken and mutating sort (`app.js`)
- **Symptom:** The trail list is not ordered by distance, and sorting directly modifies the array passed into `sortByDistance()`.
- **How I found it:** Loaded `index.html` and noticed the distances were out of order (2.8, 16, 12, 5.5...). Inspected `sortByDistance()` in `app.js` and saw `trails.sort()` called without a comparator and directly on the original array.
- **Cause:** Calling `Array.prototype.sort()` with no comparator converts elements to strings and sorts them lexicographically rather than numerically by `km`. Additionally, `sort()` mutates the array in place rather than returning a new sorted copy.
- **Fix:** Copied the array with spread syntax and added a numeric comparator: `return [...trails].sort((a, b) => a.km - b.km);`.
- **Lecture:** Lecture 9

---

## Fault 7

## Fault 7 — XSS vulnerability via `innerHTML` (`app.js`)
- **Symptom:** A trail name containing HTML markup (such as `<img src=x onerror="alert(1)">`) is parsed as real HTML instead of displayed as plain text.
- **How I found it:** Read `render()` in `app.js` and saw `li.innerHTML` concatenating `trail.name` directly into an HTML string.
- **Cause:** Assigning dynamic or user-supplied data to `innerHTML` causes the browser to parse it as HTML markup, creating a Cross-Site Scripting (XSS) vulnerability. Using `textContent` inserts literal text safely without parsing markup.
- **Fix:** Replaced `li.innerHTML` with `document.createElement("span")` and `textContent` for `.trail-name` and `.trail-km`.
- **Lecture:** Lecture 13

---

## Fault 8 — Page reloads on form submit (`app.js`)
- **Symptom:** Clicking the "Apply" button causes the page to flash, reload, and reset the form and results.
- **How I found it:** Typed a search term into `index.html` and clicked Apply, observing the page reload. Checked the `submit` event listener in `app.js` and saw it did not cancel the default event.
- **Cause:** A `<form>` element's default browser behavior on submission is to send a request and reload the page, wiping out client-side state unless `event.preventDefault()` is called.
- **Fix:** Added the `event` parameter to the `submit` listener and called `event.preventDefault();` before `apply();`.
- **Lecture:** Lecture 14

---

## One more thing

**Which fault took you longest, and why?**
Fault 7 took me the longest to find, because I had to catch it in the code, not DevTools.

**Which one would you never have found without the checker?**
Fault 8.

