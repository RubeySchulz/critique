const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Day {
        _id: ID
        date: String
        item: String
        reviews: [Review]
    }

    type Review {
        _id: ID
        body: String
        starRating: Int
        user: User
        item: String
        createdAt: String
        day: Day
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        reviews: [Review]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        days: [Day]
        day(date: String!): Day
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addReview(body: String, starRating: Int!, user: ID!, day: ID!): Day
        addDay(date: String!, item: String!, image: String!): Day

    }
`;

module.exports = typeDefs;