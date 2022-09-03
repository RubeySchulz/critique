const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
    {
        body: {
            type: String
        },

        starRating: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5]
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },

        day: {
            type: Schema.Types.ObjectId,
            ref: 'Day'
        }
    }
);

const Review = model('Review', reviewSchema);

module.exports = Review;