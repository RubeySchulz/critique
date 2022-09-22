import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Me {
        me {
            _id
            username
            email
            title
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
            following {
                _id
                username
                title
            }
            followers {
                _id
                username
                title
            }
            liked {
                _id
            }
        }
    }
`;

export const QUERY_ME_LIKED = gql`
    query Me {
        me {
            _id
            liked {
                _id
                body
            }
        }
    }
`

export const ALL_USERS = gql`
    query Users($username: String) {
        users(username: $username) {
            username
            title
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
            title
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
            following {
                _id
                username
            }
            followers {
                _id
                username
            }
        }
    }
`;

export const GET_DAY = gql`
    query Day($dayId: ID) {
        day(dayId: $dayId) {
            _id
            date
            item
            image
            reviews {
                _id
                body
                starRating
                createdAt
                user {
                    _id
                    username
                    title
                }
                likes
            }
        }
    }
`;

export const GET_REVIEW = gql`
    query Review($reviewId: ID!) {
        review(reviewId: $reviewId) {
            _id
            body
            starRating
            user {
                _id
                username
                title
            }
            createdAt
            day {
                item
                date
                image
            }
            replies {
                _id
                body
                user {
                _id
                username
                }
            }
            likes
        }
    }
`;