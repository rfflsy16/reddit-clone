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
            await context.authenticate();
            // console.log("masukkkk")

            const cachePosts = await redis.get("posts");

            if (cachePosts) return JSON.parse(cachePosts);

            const posts = await Post.getPost();

            // console.log(posts)
            await redis.set("posts", JSON.stringify(posts), "EX", 3600);

            return posts;
        },
        getPostById: async (_, args, context) => {
            await context.authenticate();
            // console.log("masukkkk")

            const { postId } = args.input;

            // console.log(postId)
            if (!postId) throw new Error("postId is required");

            const cachePost = await redis.get(`post:${postId}`);
            if (cachePost) return JSON.parse(cachePost);
            // console.log(cachePost)

            const post = await Post.getPostById({ postId });
            await redis.set(`post:${postId}`, JSON.stringify(post), { EX: 3600 });
            return post;
        },
    },
    Mutation: {
        addPost: async (_, args, context) => {
            const infoUser = await context.authenticate();
            // console.log("masukkkk")

            const { content, tags, imgUrl } = args.input;
            const response = await Post.addPost({ content, tags, imgUrl }, infoUser);

            // console.log(response)
            await redis.del("posts");
            return response;
        },
        commentPost: async (_, args, context) => {
            const infoUser = await context.authenticate();
            // console.log("masukkkk")
            // console.log(infoUser)
            const { postId, content } = args.inputComment;
            const response = await Post.commentPost({ postId, content }, infoUser);

            await redis.del("posts");
            await redis.del(`post:${postId}`);
            return response;
        },
        likePost: async (_, args, context) => {
            const infoUser = await context.authenticate();
            // console.log(infoUser)

            const { postId, username } = args.inputLike;
            const response = await Post.likePost({ postId, username }, infoUser);

            await redis.del("posts");
            await redis.del(`post:${postId}`);

            return response
        },
    },
};

export { postTypeDefs, postResolvers }