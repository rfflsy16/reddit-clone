import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB.js";

export default class Post {
    static getCollection() {
        return db.collection('Posts')
    }

    static async find() {
        const collection = this.getCollection()

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
                    preserveNullAndEmptyArrays: true,
                },
            }
        ])
    }

    static async addPost(payload) {
        const { content, tags, imgUrl, authorId } = payload

        if (content === undefined) throw new Error('content is required')
        if (tags === undefined) throw new Error('tags is required')
        if (imgUrl === undefined) throw new Error('imgUrl is required')
        if (authorId === undefined) throw new Error('authorId is required')

        const collection = this.getCollection()

        await collection.insertOne({
            content,
            tags,
            imgUrl,
            authorId: new ObjectId()
        })

        return {
            message: 'Success add new Post',
            // content,
            // tags,
            // imgUrl,
            // authorId
        }
    }
}