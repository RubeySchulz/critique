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
            image
            item
            reviews {
                _id
                body
                starRating
                user {
                    _id
                    username
                }
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

export const UPDATE_DAY = gql`
    mutation UpdateDay($dayId: ID!, $image: String!, $item: String!) {
        updateDay(dayId: $dayId, image: $image, item: $item) {
            _id
            item
            image
        }
    }
`;

export const FOLLOW_USER = gql`
    mutation FollowUser($followId: ID!) {
        followUser(followId: $followId) {
            _id
            username
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

export const UNFOLLOW_USER = gql`
    mutation UnfollowUser($unfollowId: ID!) {
            unfollowUser(unfollowId: $unfollowId) {
            _id
            username
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

export const UPDATE_USER = gql`
    mutation UpdateUser($username: String!, $email: String, $title: String) {
        updateUser(username: $username, email: $email, title: $title) {
            _id
            username
            email
            title
        }
    }
`;

export const ADD_REPLY = gql`
    mutation AddReply($reviewId: ID!, $body: String!) {
        addReply(reviewId: $reviewId, body: $body) {
            _id
            body
            user {
                username
            }
            replies {
                _id
                body
                user {
                username
                _id
                }
            }
            likes
        }
    }
`;

export const DELETE_REPLY = gql`
    mutation DeleteReply($reviewId: ID!, $replyId: ID!) {
        deleteReply(reviewId: $reviewId, replyId: $replyId) {
            _id
            body
            starRating
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

export const LIKE_REVIEW = gql`
    mutation LikeReview($reviewId: ID!) {
        likeReview(reviewId: $reviewId) {
            _id
            body
            likes
        }
    }
`;

export const UNLIKE_REVIEW = gql`
    mutation UnlikeReview($reviewId: ID!) {
        unlikeReview(reviewId: $reviewId) {
            _id
            likes
        }
    }
`;