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

    type Response {
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
        getPost: [Post]
        getPostById(input: GetPostByIdInput): Post
    }

    type Mutation {
        addPost(input: AddPostInput): Response
        commentPost(inputComment: CommentInput): Response
        likePost(inputLike: LikeInput): Response
    }
`

const postResolvers = {
    Query: {
        getPost: async (_, args, context) => {
            await context.authenticate()
            // console.log('MASUKKKK')
            const cachePosts = await redis.get("posts")
            // console.log(cachePosts, "<<<<<");

            if (cachePosts) return JSON.parse(cachePosts);

            const posts = await Post.getPost()
            // console.log(posts)
            await redis.set('posts', JSON.stringify(posts))

            // console.log(posts)
            return posts
        },
        getPostById: async (_, args, context) => {
            await context.authenticate()
            // console.log('masukkk')
            // await redis.del('posts')
            const cachePosts = await redis.get("posts")
            if (cachePosts) return JSON.parse(cachePosts);
            // console.log(cachePosts, "<<<<<<<<<<<")

            const { postId } = args.input
            const getPostById = await Post.getPostById({ postId })

            await redis.set('posts', JSON.stringify(getPostById))
            // console.log(getPostById, "<<<<<<<<<<<<<<,,")
            return getPostById
        }
    },
    Mutation: {
        addPost: async (_, args, context) => {
            const infoUser = await context.authenticate()
            // console.log(infoUser, '<<<<<<<<<<')
            const { content, tags, imgUrl } = args.input
            const posts = await Post.addPost({ content, tags, imgUrl }, infoUser)

            await redis.del("posts")
            // console.log(posts)
            return posts
        },
        commentPost: async (_, args, context) => {
            const infoUser = await context.authenticate()
            // console.log(infoUser, "<<<<<<<")
            const { postId, content } = args.inputComment
            const comment = await Post.commentPost({ postId, content }, infoUser)

            // console.log('masukk');

            await redis.del('posts')
            return comment
        },
        likePost: async (_, args, context) => {
            const infoUser = await context.authenticate()
            const { postId, username } = args.inputLike
            const like = await Post.likePost({ postId, username }, infoUser)

            // console.log(like, "<<<<<<<<<<<<<<<")
            return like
        }
    }
}

export { postTypeDefs, postResolvers }