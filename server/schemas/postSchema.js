import Post from "../models/post.js"

const postTypeDefs = `#graphql
    type Comment {
        content: String
        username: String
        createdAt: String
        updatedAt: String
    }

    type Like {
        username: String
        createdAt: String
        updatedAt: String
    }
    
    type Post {
        _id: ID
        content: String
        tags: [String]
        imgUrl: String
        authorId: ID
        comments: [Comment]
        likes: [Like]
        createdAt: String
        updatedAt:String

    }

        input GetPostByIdInput {
        postId: String!
    }

    input AddPostInput {
        content: String!
        imgUrl: String
        tags: [String]
    }

    input CommentInput {
        postId: ID!
        content: String!
    }

    input LikeInput {
        postId: ID!
    }

    type Query {
        getPosts: [Post]
        getPostById(input: GetPostByIdInput): Post
    }

    type Mutation {
    addPost(input: AddPostInput): Post
    commentPost(input: CommentInput): String
    likePost(input: LikeInput): String
    }
`

const postResolvers = {
    Query: {
        getPosts: async (_, args, context) => {

        }

    }
}

export { postTypeDefs, postResolvers }