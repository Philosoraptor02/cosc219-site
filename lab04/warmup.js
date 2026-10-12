"7" + 3 // 10 // I suppose I should've known better but the inconsistency with this one surprised me.
// The other big three arithmetic operators do math, this one just concatenates
"7" * "2" // 14
typeof NaN // "number"?
0 || "fallback" // "fallback"
"10" == 10 // false
parseInt("12abc") // 12
"7" - 3 // 4
10 / 3 // 3.333
Boolean("false") // true
0 ?? "fallback" // 0
"10" === 10 // true
"  hi  ".trim() // "hi"
7 + 3 + "1" // "101"?
typeof null // "null"
Boolean("0") // true
"" || "empty" // "empty"
Number("12abc") // NaN
"cat".includes("a") // true