/*
  COSC 219 â€” Lab 6 Â· registry.js
  A class that owns a collection of Trails.
*/

// import the two classes from ./trail.js â€” note the .js is required
import { Trail, BikeTrail } from "./trail.js";

export class TrailRegistry {

   /* The array is PRIVATE. Nothing outside may push to it, sort it or
      empty it â€” this class decides what happens to the collection. */
   #trails = [];


   /* Accept an optional array of Trails and add each one. */
   constructor(trails = []) {
      for (const trail of trails) {
         this.add(trail); // Let the add() method handle validation
      }
   }


   /* get size â€” how many trails. */
   get size() {
      return this.#trails.length;
   }


   /* get all â€” a COPY of the array.
 
      Returning the private array itself would let a caller do
      registry.all.push("junk") and walk straight past every check in
      this class. One of the tests does exactly that.
      ---------------------------------------------------------------- */
   get all() {
      return [...this.#trails];
   }


   /* add(trail) â€” reject anything that is not a Trail.
 
      Throw a TypeError if it is not, otherwise store it and return `this`.
      Use `instanceof`. Remember a BikeTrail IS a Trail.
      ---------------------------------------------------------------- */
   add(trail) {
      if (!(trail instanceof Trail)) {
         throw new TypeError("Item must be an instance of Trail or BikeTrail.");
      }
      this.#trails.push(trail);
      return this;
   }


   /* find(name) â€” the matching Trail, ignoring case, or undefined. */
   find(name) {
      return this.#trails.find(t => t.name.toLowerCase() === name.toLowerCase());
   }


   /* byRating(rating) â€” every trail with that rating. */
   byRating(rating) {
      return this.#trails.filter(t => t.rating === rating);
   }


   /* get openTrails â€” every trail that is not closed. */
   get openTrails() {
      return this.#trails.filter(t => !t.isClosed);
   }


   /* get totalDistance â€” all the km added up, to one decimal place. */
   get totalDistance() {
      const total = this.#trails.reduce((sum, t) => sum + t.km, 0);
      return Math.round(total * 10) / 10;
   }


   /* get steepest â€” the trail with the largest steepness.
      undefined when there are none. */
   get steepest() {
      return this.#trails.reduce((steepest, t) =>
         (steepest === undefined || t.steepness > steepest.steepness) ? t : steepest
         , undefined);
   }


   /* describeAll() â€” an array of every trail's describe() string. */
   describeAll() {
      return this.#trails.map(t => t.describe());
   }


   /* static fromData(rows) â€” build a registry from plain objects.
 
      A row with a `surface` property becomes a BikeTrail; anything else
      becomes a Trail. Default a missing gain to 0.
      ---------------------------------------------------------------- */
   static fromData(rows) {
      const registry = new TrailRegistry();

      for (const row of rows) {
         const { name, km, rating, gain = 0, surface } = row;

         if (surface) {
            registry.add(new BikeTrail(name, km, rating, gain, surface));
         } else {
            registry.add(new Trail(name, km, rating, gain));
         }
      }

      return registry;
   }
}