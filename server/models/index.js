const User = require('./User');
const Review = require('./Review');
const Day = require('./Day');

module.exports = { User, Review, Day };

// User table with 
// username, email, password, reviews (ref)

// Review table with
// body, starRating, user (ref), createdAt, day (ref)

// Days table with
// date, item, image, reviews (ref)