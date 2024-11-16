import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB.js";

export default class Post {
    static getCollection() {
        return db.collection('Posts');
    }

    static async getPost() {
        const collection = this.getCollection();

        const posts = await collection.aggregate([
            {
                $lookup: {
                    from: "Users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "Author",
                },
            },
            {
                $project: {
                    "Author.password": 0,
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $unwind: {
                    path: "$Author",
                    preserveNullAndEmptyArrays: false,
                },
            },
        ]).toArray();

        return posts;
    }

    static async getPostById({ postId }) {
        const collection = this.getCollection();

        const postById = await collection.aggregate([
            {
                $match: {
                    _id: new ObjectId(postId),
                },
            },
            {
                $lookup: {
                    from: "Users",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "Author",
                },
            },
            {
                $project: {
                    "Author.password": 0,
                },
            },
            {
                $unwind: {
                    path: "$Author",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]).toArray();

        if (!postById || postById.length === 0) {
            throw new Error("Post not found");
        }

        return postById[0];
    }

    static async addPost(payload, infoUser) {
        const { content, tags, imgUrl } = payload;

        if (!content) throw new Error("Content is required");

        console.log(content, "<<<<<<<<")
        const collection = this.getCollection();

        await collection.insertOne({
            content,
            tags: tags || [],
            imgUrl: imgUrl || null,
            authorId: new ObjectId(infoUser.userId),
            comments: [],
            likes: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return { message: "Success add new Post" };
    }

    static async commentPost(payload, infoUser) {
        const { postId, content } = payload;

        // console.log(postId, content, "<<<<<<<<")
        const collection = this.getCollection();

        const post = await collection.findOne({ _id: new ObjectId(postId) });
        if (!post) throw new Error("Post not found");

        await collection.updateOne(
            { _id: new ObjectId(postId) },
            {
                $push: {
                    comments: {
                        content,
                        username: infoUser.username,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                },
            }
        );

        return { message: "Success add Comment" };
    }

    static async likePost(payload) {
        const { postId, username } = payload;

        const collection = this.getCollection();

        const post = await collection.findOne({
            _id: new ObjectId(postId),
            "likes.username": username,
        });

        // console.log(post)
        if (post) throw new Error("User already liked this post");

        await collection.updateOne(
            { _id: new ObjectId(postId) },
            {
                $push: {
                    likes: {
                        username,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                },
            }
        );

        return { message: "Successfully liked the post" };
    }
}
