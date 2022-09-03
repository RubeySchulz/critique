const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
            default: Date.now,
            get: date => dateFormat(date)
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