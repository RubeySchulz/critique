const { Schema, model } = require('mongoose');

const replySchema = new Schema(
    {
        body: {
            type: String,
            required: true
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        toJSON: {
          getters: true
        }
    }
)

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

        likes: {
            type: Number,
            default: 0
        },

        day: {
            type: Schema.Types.ObjectId,
            ref: 'Day'
        },

        replies: [replySchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        }
    }
);

reviewSchema.virtual('replyCount').get(function() {
    return this.replies.length;
})

const Review = model('Review', reviewSchema);

module.exports = Review;