import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
            _id
            username
            email
            }
        }
    }
`;

export const ADD_REVIEW = gql`
    mutation AddReview($starRating: Int!, $user: ID!, $day: ID!, $body: String) {
        addReview(starRating: $starRating, user: $user, day: $day, body: $body) {
            _id
            date
            item
            image
            reviews {
                _id
                body
                starRating
                user {
                    _id
                    username
                }
                item
                createdAt
            }
        }
    }
`;

export const ADD_DAY = gql`
    mutation AddDay($date: String!, $item: String!, $image: String!) {
        addDay(date: $date, item: $item, image: $image) {
            _id
            date
            item
        }
    }
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;