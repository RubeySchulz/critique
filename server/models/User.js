const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
let titles = require('../../client/src/assets/titles.json');

titles = titles.titles

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
          },

        password: {
            type: String,
            required: true,
            minlength: 5
        },

        title: {
            type: String,
            enum: titles
        },

        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],

        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],

        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],

        liked: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],

        // if follower, body is null
        // if reply body is the reply content
        // if like body is the review ID
        notifications: [
            {
                type: {
                    type: String,
                    enum: ['follower', 'reply', 'like'],
                    required: true
                },
                _id: {
                    type: String,
                    required: true
                },
                username: String,
                body: String,
                replyParent: String
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);


// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;