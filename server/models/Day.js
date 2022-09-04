const { Schema, model } = require('mongoose');

const daySchema = new Schema(
    {
        item: {
            type: String,
            required: true,
            unique: true
        },

        date: {
            type: Date,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }    
        ]
    }
);

const Day = model('Day', daySchema);

module.exports = Day;