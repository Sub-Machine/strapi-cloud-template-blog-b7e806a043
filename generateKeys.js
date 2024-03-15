const crypto = require('crypto');

// Generate a random string of specified length
function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, length); // return required number of characters
}

// Generate a set of keys
const keys = [generateRandomString(32), generateRandomString(32)]; // You can adjust the length of the keys as per your requirements

console.log("Generated keys:", keys);
