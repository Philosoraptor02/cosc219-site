/*
  COSC 219 â€” Lab 7 Â· storage.js
  Reading and writing localStorage.

  Storage holds STRINGS and nothing else. Put an array in without
  JSON.stringify and you get back the text "[object Object]".
*/

const KEY = "cosc219.trails";


/* saveTrails(trails) â€” store the array under KEY. */

export function saveTrails(trails) {
   localStorage.setItem(KEY, JSON.stringify(trails));
}


/* loadTrails() â€” the stored array, or [] when there is not a usable one.

   THREE things can go wrong, and all three happen in normal use:

     1. Nothing stored yet. getItem returns null, and JSON.parse(null)
        quietly returns null rather than throwing â€” so a plain
        `return JSON.parse(raw)` hands null to the rest of your app.

     2. The stored text is not valid JSON. JSON.parse throws, and an
        uncaught throw here means the page never loads at all.

     3. It parses, but is not an array â€” something else used the key.

   In all three cases, return [].
   ---------------------------------------------------------------------- */

export function loadTrails() {
   const raw = localStorage.getItem(KEY);

   if (!raw) return [];

   try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
         return [];
      }
      return parsed;
   } catch (error) {
      return [];
   }
}


/* clearTrails() â€” remove the key entirely. */

export function clearTrails() {
   localStorage.removeItem(KEY);
}