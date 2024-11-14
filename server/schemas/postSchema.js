import redis from "../config/redit.js"
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

    type ResultAddPost {
        message: String
    }

    input AddPostInput {
        content: String!
        imgUrl: String
        tags: [String]
        authorId: ID
    }

    input CommentInput {
        postId: ID!
        content: String!
    }

    input LikeInput {
        postId: ID!
    }

    type Query {
        find: [Post]
        getPostById(input: GetPostByIdInput): Post
    }

    type Mutation {
    addPost(input: AddPostInput): ResultAddPost
    commentPost(input: CommentInput): String
    likePost(input: LikeInput): String
    }
`

const postResolvers = {
    Query: {
        find: async (_, args, context) => {
            // console.log('MASUKKKK')
            const cachePosts = await redis.get("posts")
            if (cachePosts) return JSON.parse(cachePosts);

            const posts = await Post.find()
            await redis.set('posts', JSON.stringify(posts))

            return posts
        }
    },
    Mutation: {
        addPost: async (_, args, context) => {
            const { content, tags, imgUrl, authorId } = args.input
            const posts = await Post.addPost({ content, tags, imgUrl, authorId })

            // console.log(posts)
            return posts
        }
    }
}

export { postTypeDefs, postResolvers }