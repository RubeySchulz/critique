const { User, Review, Day, Reply } = require('../models');
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
                    .populate('followers')
                    .populate('following')
                    .populate('liked')
                    .populate('notifications')
                return userData;    
            }

            throw new AuthenticationError('Not logged in');
        },

        users: async (parent, {username}) => {
            return User.find({ username: { $regex: username, $options: 'i'}})
            .populate('reviews')
            .populate('followers')
            .populate('following')
            .populate('liked')
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
            .populate('followers')
            .populate('following')
            .populate('liked')
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
        },

        review: async(parent, { reviewId }) => {
            return Review.findOne({ _id: reviewId})
            .populate({
                path: 'replies',
                populate: { path: 'user',
                            model: 'User'}
            })
            .populate('user')
            .populate('day');
        },

        reply: async(parent, { replyId }) => {
            const reply = Reply.findOne({ _id: replyId })
            .populate('user')
            .populate('replies')
            return reply;
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

        updateUser: async (parent, args, context) => {
            const user = User.findOneAndUpdate(
                { _id: context.user._id },
                { ...args },
                { new: true, runValidators: true }
            )

            return user;
        },

        addReview: async (parent, args) => {
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

        addDay: async (parent, args) => {
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
                { new: true, runValidators: true }
            );

            return day;
        },

        deleteReview: async (parent, { reviewId }) => {
            const review = Review.findByIdAndDelete({ _id: reviewId });

            return review;
        },

        followUser: async (parent, { followId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { following: followId } },
                { new: true }
                );

                const followed = await User.findOneAndUpdate(
                    { _id: followId },
                    { $addToSet: { followers: context.user._id, notifications: { type: 'follower', _id: context.user._id, username: context.user.username } } },
                    { new: true, runValidators: true }
                ).populate("following");
        
                return followed;
            }
        
            throw new AuthenticationError("You need to be logged in!");
        },
      
        unfollowUser: async (parent, { unfollowId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { following: unfollowId } },
                { new: true }
                );

                const followed = await User.findOneAndUpdate(
                { _id: unfollowId },
                { $pull: { followers: context.user._id } },
                { new: true }
                ).populate("following");
        
                return followed;
            }
        
            throw new AuthenticationError("You need to be logged in!");
        },

        addReply: async (parent, { reviewId, body }, context) => {
            if(context.user){
                const reply = await Reply.create({ user: context.user._id, body })

                const updatedReview = await Review.findOneAndUpdate(
                    { _id: reviewId },
                    { $addToSet: { replies: reply._id } },
                    { new: true, runValidators: true }
                ).populate({
                    path: 'replies',
                    populate: { path: 'user',
                                model: 'User'}
                }).populate('user');

                const updatedUser = await User.findOneAndUpdate(
                    { _id: updatedReview.user._id },
                    { $addToSet: { notifications: { type: 'reply', _id: reply._id, username: context.user.username, body: reply.body, replyParent: updatedReview._id } } },
                    { new: true, runValidators: true }
                );

                return updatedReview;
            }
        },

        deleteReply: async (parent, { reviewId, replyId }) => {
            const reply = await Reply.deleteOne({ _id: replyId })

            const updatedReview = await Review.findOneAndUpdate(
                { _id: reviewId },
                { $pull: {replies: {_id: replyId } } },
                { new: true }
            ).populate({
                path: 'replies',
                populate: { path: 'user',
                            model: 'User'}
            }).populate('user');

            return updatedReview;
        },

        likeReview: async (parent, { reviewId }, context) => {
            const updatedReview = await Review.findOneAndUpdate(
                { _id: reviewId },
                { $inc: { likes: 1 } },
                { new: true }
            ).populate({
                path: 'replies',
                populate: { path: 'user',
                            model: 'User'}
            }).populate('user');

            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { liked: reviewId } }
            )

            const updatedUser = await User.findOneAndUpdate(
                { _id: updatedReview.user._id },
                { $addToSet: { notifications: { type: 'like', _id: updatedReview._id, username: context.user.username, body: updatedReview.body } } },
                { new: true, runValidators: true }
            );

            return updatedReview;
        },

        unlikeReview: async (parent, { reviewId }, context) => {
            const updatedReview = await Review.findOneAndUpdate(
                { _id: reviewId },
                { $inc: { likes: -1 } },
                { new: true }
            ).populate({
                path: 'replies',
                populate: { path: 'user',
                            model: 'User'}
            }).populate('user');

            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { liked: reviewId } }
            )

            return updatedReview;
        },

        updateNotifs: async (parent, { notifId }, context) => {
            if(context.user){
                if(notifId){
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { notifications: { _id: notifId } } },
                        { new: true }
                    ).populate('notifications')

                    return updatedUser    
                }
                if(notifId === null) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { notifications: { type: ['follower', 'reply', 'like'] } } },
                        { new: true }
                    ).populate('notifications')

                    return updatedUser  
                }
            }
        }
    }
    
};

module.exports = resolvers;