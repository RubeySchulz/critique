import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Me {
        me {
            _id
            username
            email
            reviews {
                _id
                body
                starRating
                createdAt
                day {
                    _id
                    date
                    item
                    image
                }
            }
        }
    }
`;

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
        }
    }
`;

export const QUERY_GET_USER = gql`
    query User($username: String!) {
        user(username: $username) {
            _id
            username
            email
            reviews {
                _id
                body
                starRating
                createdAt
                day {
                    _id
                    date
                    item
                    image
                }
            }
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