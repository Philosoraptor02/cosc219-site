const original = { name: 'Knox', km: 2.8 }; //
const alias = original; // A pointer to original
const copy  = { ...original }; // creates a new original object
alias.km = 99;   // what is original.km now? Still 99
copy.km  = 1;    // and now? Still 99, the copy is 1

const outer   = { name: 'X', meta: { tags: ['steep'] } };
const shallow = { ...outer };
shallow.meta.tags.push('rocky');   // what is outer.meta.tags? steep and rocky

({ x: 1 } === { x: 1 }) // false
