import { gql } from "@apollo/client";


export const LOGIN = gql`
    mutation Login($user: LoginInput) {
    login(user: $user) {
        access_token
    }
}
`;

export const REGISTER = gql`
    mutation Register($newUser: RegisterInput) {
    register(newUser: $newUser) {
    message
    }
}
`;

export const GET_POST = gql`
    query GetPost {
    getPost {
        _id
        content
        tags
        imgUrl
        authorId
        comments {
        content
        username
        createdAt
        updatedAt
        }
        likes {
        username
        createdAt
        updatedAt
        }
        createdAt
        updatedAt
    }
}
`;

export const GET_POST_BY_ID = gql`
    query GetPostById($input: GetPostByIdInput) {
    getPostById(input: $input) {
        _id
        authorId
        comments {
        content
        }
        content
        createdAt
        imgUrl
        likes {
        username
        }
        tags
        updatedAt
    }
}
`;

export const LIKE_POST = gql`
    mutation LikePost($inputLike: LikeInput) {
    likePost(inputLike: $inputLike) {
        message
    }
}
`;

export const COMMENT_POST = gql`
    mutation CommentPost($inputComment: CommentInput) {
    commentPost(inputComment: $inputComment) {
        message
    }
}
`;

export const ADD_POST = gql`
    mutation AddPost($input: AddPostInput) {
    addPost(input: $input) {
        message
    }
}
`;

export const SEARCH_USER = gql`
    query SearchUsers($profile: SearchUserInput) {
    searchUsers(profile: $profile) {
        email
        name
        username
    }
}
`;

export const FOLLOW_USER = gql`
    mutation FollowUser($input: FollowInput) {
    followUser(input: $input) {
        message
    }
}
`

export const GET_PROFILE = gql`
    query GetProfile {
    getProfile {
        _id
        name
        username
        email
        Followings {
        name
        }
        Followers {
        name
        }
    }
}
`;
