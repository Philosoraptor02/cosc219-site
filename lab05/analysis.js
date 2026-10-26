/*
  COSC 219 â€” Lab 5
  Arrays, loops and iterators.

  Write the fourteen functions below. Each is tested independently â€”
  open check.html to see which pass.

  Every function must return a NEW value. None of them may change the
  array they were given: the tests check that TRAILS is untouched
  afterwards, and one of them will catch you if it isn't.
*/


/* ======================================================================
   PART A â€” the two helpers you were given in Lab 4
   You could not write these last week. Now you can.
   ====================================================================== */

/* A1 â€” revealWord(word, guessedLetters)

   Show the guessed letters, hide the rest behind underscores.

     revealWord("otter", "")      â†’  "_____"
     revealWord("otter", "ot")    â†’  "ott__"
     revealWord("otter", "otre")  â†’  "otter"

   Hint: "otter".split("") gives you an array of letters. Then map, then
   join(""). Three steps.
   ---------------------------------------------------------------------- */

function revealWord(word, guessedLetters) {
  return word
        .split("")
        .map(char => guessedLetters.includes(char) ? char : "_")
        .join("");
}


/* A2 â€” hasWon(word, guessedLetters)

   True when every letter of the word has been guessed.

     hasWon("otter", "ot")    â†’  false
     hasWon("otter", "otre")  â†’  true

   Hint: which iterator answers "is this true for all of them?"
   ---------------------------------------------------------------------- */

function hasWon(word, guessedLetters) {
  return word
      .split("")
      .every(char => guessedLetters.includes(char));
}


/* ======================================================================
   PART B â€” array basics
   ====================================================================== */

/* B1 â€” trailNames(trails)
   An array of just the names, same length as the input.
     trailNames(TRAILS).length  â†’  10
     trailNames(TRAILS)[0]      â†’  "Knox Mountain"
   ---------------------------------------------------------------------- */

function trailNames(trails) {
  return trails.map(t => t.name);
}


/* B2 â€” openTrails(trails)
   Only the trails that are not closed.
     openTrails(TRAILS).length  â†’  8
   ---------------------------------------------------------------------- */

function openTrails(trails) {
  return trails.filter(t => !t.closed);
}


/* B3 â€” findByName(trails, name)
   The single matching trail, ignoring case. undefined if there is none.
     findByName(TRAILS, "Bear Creek").km  â†’  5.5
     findByName(TRAILS, "bear creek").km  â†’  5.5
     findByName(TRAILS, "Nowhere")        â†’  undefined

   Careful: find returns the ELEMENT. filter would return an array.
   ---------------------------------------------------------------------- */

function findByName(trails, name) {
  return trails.find(t => t.name.toLowerCase() === name.toLowerCase());
}


/* B4 â€” sortedByDistance(trails)
   Shortest first, WITHOUT reordering the array you were given.

     sortedByDistance(TRAILS)[0].name  â†’  "Knox Mountain"   (2.8 km)
     sortedByDistance(TRAILS)[9].name  â†’  "Mission Creek"   (16 km)

   Two traps here, both from Lecture 9:
     Â· sort() changes the array it is called on. Copy it first.
     Â· the default sort compares as TEXT, so 10 sorts before 9.
       Pass a comparator.
   ---------------------------------------------------------------------- */

function sortedByDistance(trails) {
  return [...trails].sort((a, b) => a.km - b.km);
}


/* ======================================================================
   PART C â€” iterators that answer a question
   ====================================================================== */

/* C1 â€” anyClosed(trails)      is at least one closed?
     anyClosed(TRAILS)                â†’  true
     anyClosed(openTrails(TRAILS))    â†’  false
   ---------------------------------------------------------------------- */

function anyClosed(trails) {
  return trails.some(t => t.closed);
}


/* C2 â€” allUnder(trails, limit)   are they all shorter than limit km?
     allUnder(TRAILS, 20)  â†’  true
     allUnder(TRAILS, 10)  â†’  false
     allUnder([], 5)       â†’  true      â† yes, really. Think about why.
   ---------------------------------------------------------------------- */

function allUnder(trails, limit) {
  return trails.every(t => t.km < limit);
}


/* C3 â€” totalDistance(trails)
   Every trail's km added up, rounded to one decimal place.
     totalDistance(TRAILS)  â†’  71.3
     totalDistance([])      â†’  0

   Give reduce a starting value of 0, or the empty case throws.
   Round with: Math.round(total * 10) / 10
   ---------------------------------------------------------------------- */

function totalDistance(trails) {
  const total = trails.reduce((sum, t) => sum + t.km, 0);
  return Math.round(total * 10) / 10;
}


/* C4 â€” longestTrail(trails)
   The trail object with the largest km. undefined for an empty array.
     longestTrail(TRAILS).name  â†’  "Mission Creek"
     longestTrail([])           â†’  undefined

   The accumulator does not have to be a number â€” here it is a trail.
   ---------------------------------------------------------------------- */

function longestTrail(trails) {
  return trails.reduce((longest, t) => 
      (longest === undefined || t.km > longest.km) ? t : longest
   , undefined);
}


/* C5 â€” countByRating(trails)
   How many of each rating, as an object.
     countByRating(TRAILS)  â†’  { moderate: 3, easy: 4, hard: 3 }

   reduce with {} as the starting value. Two things people forget:
     Â· return the accumulator at the end of each pass
     Â· handle the first time a rating is seen  ( ?? 0 )
   ---------------------------------------------------------------------- */

function countByRating(trails) {
  return trails.reduce((counts, t) => {
      counts[t.rating] = (counts[t.rating] ?? 0) + 1;
      return counts;
   }, {});
}


/* ======================================================================
   PART D â€” chaining
   ====================================================================== */

/* D1 â€” openDistance(trails)
   Total km of the open trails only, to one decimal place.
     openDistance(TRAILS)  â†’  54.6

   filter, then map, then reduce. Read it as a sentence.
   ---------------------------------------------------------------------- */

function openDistance(trails) {
  const total = trails
      .filter(t => !t.closed)
      .map(t => t.km)
      .reduce((sum, km) => sum + km, 0);
   return Math.round(total * 10) / 10;
}


/* D2 â€” summaryLines(trails)
   One display string per trail, in the original order.

     summaryLines(TRAILS)[0]  â†’  "Knox Mountain â€” 2.8 km, moderate"
     summaryLines(TRAILS)[4]  â†’  "Rose Valley â€” 7.2 km, moderate (closed)"

   Note the em dash â€” and that "(closed)" only appears when it is.
   ---------------------------------------------------------------------- */

function summaryLines(trails) {
  return trails.map(t => 
      `${t.name} — ${t.km} km, ${t.rating}${t.closed ? " (closed)" : ""}`
   );
}


/* D3 â€” report(trails)
   An object summarising everything:

     {
       total: 10,
       open: 8,
       closed: 2,
       openKm: 54.6,
       longestOpen: "Mission Creek",
       byRating: { moderate: 3, easy: 4, hard: 3 }
     }

   longestOpen is the longest OPEN trail's name, or null if there are none.

   Call the functions you already wrote. Do not repeat their logic â€” that
   is why you wrote them separately.
   ---------------------------------------------------------------------- */

function report(trails) {
  const openT = openTrails(trails);
   const longestOpenTrail = longestTrail(openT);

   return {
      total: trails.length,
      open: openT.length,
      closed: trails.length - openT.length,
      openKm: openDistance(trails),
      longestOpen: longestOpenTrail ? longestOpenTrail.name : null,
      byRating: countByRating(trails)
   };
}