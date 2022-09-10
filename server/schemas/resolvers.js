const { User, Review, Day } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('reviews')
                    .populate({
                        path: 'reviews',
                        populate: { path: 'day',
                                    model: 'Day'}
                    })
                return userData;    
            }

            throw new AuthenticationError('Not logged in');
        },

        users: async () => {
            return User.find()
            .populate('reviews')
        },
        
        user: async(parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('reviews')
            .populate({
                path: 'reviews',
                populate: { path: 'day',
                            model: 'Day'}
            })
        },

        days: async () => {
            return Day.find()
            .populate({
                path: 'reviews',
                populate: { path: 'user',
                            model: 'User'}
            })
        },

        day: async (parent, { dayId, date }) => {
            if(dayId) {
                return Day.findOne({ _id: dayId })
                .populate({
                    path: 'reviews',
                    populate: { path: 'user',
                                model: 'User'}
                });    
            }
            if(date){
                return Day.findOne({ date })
                .populate({
                    path: 'reviews',
                    populate: { path: 'user',
                                model: 'User'}
                }) 
            }
            return undefined;
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
        },

        updateDay: async (parent, { dayId, image, item }) => {
            const day = Day.findOneAndUpdate(
                { _id: dayId },
                { image, item },
                { new: true }
            );

            return day;
        },

        deleteReview: async (parent, { reviewId }) => {
            const review = Review.findByIdAndDelete({ _id: reviewId });

            return review;
        }
    }
    
};

module.exports = resolvers;