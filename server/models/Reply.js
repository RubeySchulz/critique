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

        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reply'
            }
        ]
    },
    {
        toJSON: {
          getters: true
        }
    }
)

const Reply = model('Reply', replySchema);

module.exports = Reply;