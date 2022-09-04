const { User, Review, Day } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
            .populate('reviews')
        },
        
        user: async(parent, { username }) => {
            return User.findOne({ username })
            .populate('reviews')
        },

        days: async () => {
            return Day.find()
            .populate({
                path: 'reviews',
                populate: { path: 'user',
                            model: 'User'}
            });
        },

        day: async (parent, { date }) => {
            return Day.findOne({ date })
            .populate({
                path: 'reviews',
                populate: { path: 'user',
                            model: 'User'}
            });
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        addReview: async (parent, args, context) => {
            const review = await Review.create(args);
            const day = await Day.findOneAndUpdate(
                { _id: args.day },
                { $addToSet: { reviews: review._id } },
                { new: true }
            ).populate({
                path: 'reviews',
                populate: { path: 'user',
                            model: 'User'}
            });

            const user = await User.findOneAndUpdate(
                { _id: args.user },
                { $addToSet: { reviews: review._id } },
                { new: true }
            )

            return day;
        },

        addDay: async (parent, args, context) => {
            const day = Day.create(args)

            return day;
        },

        deleteDay: async (parent, { dayId }) => {
            const day = Day.findOneAndDelete({ _id: dayId });

            return day;
        }
    }
    
};

module.exports = resolvers;