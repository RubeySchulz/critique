const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Reply {
        _id: ID
        body: String
        user: User
        createdAt: String
    }

    type Day {
        _id: ID
        date: String
        item: String
        image: String
        reviews: [Review]
    }

    type Review {
        _id: ID
        body: String
        starRating: Int
        user: User
        createdAt: String
        day: Day
        replies: [Reply]
        likes: Int
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        title: String
        reviews: [Review]
        followers: [User]
        following: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users(username: String): [User]
        user(username: String!): User
        days: [Day]
        day(dayId: ID, date: String): Day
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(username: String!, email: String, password: String, title: String): User
        addReview(body: String, starRating: Int!, user: ID!, day: ID!): Day
        addDay(date: String!, item: String!, image: String!): Day
        deleteDay(dayId: ID!): Day
        updateDay(dayId: ID!, image: String!, item: String!): Day
        deleteReview(reviewId: ID!): Review

        followUser(followId: ID!): User
        unfollowUser(unfollowId: ID!): User

        addReply(reviewId: ID!, body: String!): Review
        deleteReply(reviewId: ID!, replyId: ID!): Review
        likeReview(reviewId: ID!): Review
        unlikeReview(reviewId: ID!): Review
    }
`;

module.exports = typeDefs;