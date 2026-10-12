/*
  COSC 219 â€” Lab 4
  Variables, conditionals and functions.

  Write the eight functions below. Each one is small, and each is tested
  independently â€” open check.html to see which pass.

  NO ARRAYS AND NO LOOPS. You have not been taught them yet, and you do not
  need them here. Everything can be done with string methods, conditionals
  and arithmetic. (revealWord and hasWon at the bottom are provided for
  exactly that reason â€” read them, but you are not expected to write them.)
*/

const STARTING_LIVES = 6;

/* ---------- 1. normalizeGuess(input) -----------------------------------

   Tidy whatever the user typed and return a single lowercase letter.
   Return the empty string "" for anything that is not exactly one letter
   from a to z.

   normalizeGuess("A")       â†’  "a"
   normalizeGuess("  t  ")   â†’  "t"
   normalizeGuess("cat")     â†’  ""
   normalizeGuess("3")       â†’  ""

   Useful: .trim()  .toLowerCase()  .length  and comparison operators.
   ---------------------------------------------------------------------- */

function normalizeGuess(input) {
    input = input.trim();
    input = input.toLowerCase();

    if (input.length !== 1 || (input < 'a' || input > 'z')) {
        return "";
    }
    return input;

}

/* ---------- 2. isValidGuess(input) -------------------------------------

   Return true or false â€” a real boolean, not the letter.
   Hint: you already wrote the hard part in question 1.

   isValidGuess("q")   â†’  true
   isValidGuess("!")   â†’  false
   ---------------------------------------------------------------------- */

function isValidGuess(input) {
    return normalizeGuess(input) !== "";

}

/* ---------- 3. alreadyGuessed(letter, guessedLetters) -------------------

   guessedLetters is a single string of the letters tried so far, e.g. "aet".
   Return true if this letter is in it. Capital letters count as the same
   letter.

   alreadyGuessed("a", "aet")  â†’  true
   alreadyGuessed("A", "aet")  â†’  true
   alreadyGuessed("z", "aet")  â†’  false
   ---------------------------------------------------------------------- */

function alreadyGuessed(letter, guessedLetters) {
    return guessedLetters.toLowerCase().includes(letter.toLowerCase());

}

/* ---------- 4. isCorrect(letter, word) ---------------------------------

   Is the letter in the word? Case should not matter, and an invalid guess
   is never correct.

   isCorrect("o", "otter")  â†’  true
   isCorrect("O", "otter")  â†’  true
   isCorrect("z", "otter")  â†’  false
   ---------------------------------------------------------------------- */

function isCorrect(letter, word) {
    if (normalizeGuess(letter) === "") {
        return false;

    }

}

/* ---------- 5. livesAfterGuess(lives, correct) -------------------------

   Return the number of lives after a guess. A correct guess costs nothing;
   a wrong one costs 1. Lives must never go below zero.

   livesAfterGuess(6, true)   â†’  6
   livesAfterGuess(6, false)  â†’  5
   livesAfterGuess(0, false)  â†’  0
   ---------------------------------------------------------------------- */

function livesAfterGuess(lives, correct) {
    return correct ? lives : Math.max(0, lives - 1);

}

/* ---------- 6. scoreFor(word, lives) -----------------------------------

   10 points per letter in the word, plus 5 per remaining life.

   Give `lives` a DEFAULT of STARTING_LIVES so scoreFor("otter") works.

   scoreFor("otter", 6)  â†’  80
   scoreFor("otter", 1)  â†’  55
   scoreFor("otter")     â†’  80
   ---------------------------------------------------------------------- */

function scoreFor(word, lives) {
    return (word.length * 10) + (lives * 5);

}

/* ---------- 7. statusMessage(word, guessedLetters, lives) --------------

   One sentence describing the current state. Three cases, in this order:

     lives is 0 or less   â†’  Out of lives. The word was "otter".
     the word is complete â†’  You got it! "otter" with 4 lives left.
     otherwise            â†’  3 lives left. Guessed: ot

   Two details the tests check:
     Â· "1 life left", not "1 lives left"
     Â· when nothing has been guessed yet, say "Guessed: nothing yet"

   You may call hasWon(word, guessedLetters) â€” it is provided below.
   Use template literals.
   ---------------------------------------------------------------------- */

function statusMessage(word, guessedLetters, lives) {
    if (lives <= 0) {
        return `Out of lives. The word was "${word}".`;
    }

    const lifeWord = lives === 1 ? "life" : "lives";
    if (hasWon(word, guessedLetters)) {
        return `You got it! "${word}" with ${lives} ${lifeWord} left.`;
    }

    const guessedStr = guessedLetters === "" ? "nothing yet" : guessedLetters;
    return `${lives} ${lifeWord} left. Guessed: ${guessedStr}`;

}

/* ---------- 8. gradeFor(score) -----------------------------------------

   90+ â†’ "A"   80+ â†’ "B"   70+ â†’ "C"   60+ â†’ "D"   below 60 â†’ "F"
   ---------------------------------------------------------------------- */

function gradeFor(score) {
    function gradeFor(score) {
        // Order is critical here: check the highest band first so it catches properly.
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        return "F";

    }

}

/* ======================================================================
   PROVIDED â€” read these, do not change them.

   Both need to look at every letter of the word, which needs a loop. That
   is Lecture 9. After Lab 5 you will be able to write them yourself.
   ====================================================================== */

function revealWord(word, guessedLetters) {
    return word
        .toLowerCase()
        .replace(/[a-z]/g, (letter) =>
            guessedLetters.includes(letter) ? letter : "_");
}

function hasWon(word, guessedLetters) {
    return !revealWord(word, guessedLetters).includes("_");
}
// Nothing breaks if you swap them, the two lines are independent. Updating the player's lives doesn't
// rely on the guessedLetters string, and updating the string doesn't rely on the life count.
// The order doesn't matter, I even tried swapping lines of code to see if there would be a change and there wasn't one.

// isValidGuess acts as a guard clause to catch invalid inputs and output a helpful warning message to
// the user. If you didn't have that guard clause and ran normalizeGuess first, a bad input would get converted
// to an empty string. The game's logic isn't meant to handle these, and it would cause a lot of problems.