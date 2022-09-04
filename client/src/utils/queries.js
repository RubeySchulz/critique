import { gql } from '@apollo/client';

export const ALL_USERS = gql`
    query Users {
        users {
            _id
            username
            email
            password
            reviews {
                _id
                body
                starRating
                item
            }
        }
    }
`;

export const ALL_DAYS = gql`
    query Days {
        days {
            _id
            date
            item
            reviews {
                _id
                body
                starRating
                user {
                username
                _id
                }
            }
        }
    }
`;

export const GET_USER = gql`
    query User($username: String!) {
        user(username: $username) {
            _id
            username
            email
        }
    }
`;

export const GET_DAY = gql`
    query Day($dayId: ID!) {
        day(dayId: $dayId) {
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
`