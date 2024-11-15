import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB.js";

export default class Post {
    static getCollection() {
        return db.collection('Posts')
    }

    static async getPost() {
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
        ]).toArray()

        return posts
    }

    static async getPostById(postId) {
        const collection = this.getCollection()

        const postById = await collection.findOne(postId)
    }


    static async addPost(payload, infoUser) {
        const { content, tags, imgUrl } = payload

        // console.log(content, tags, imgUrl)
        if (content === undefined) throw new Error('content is required')
        // if (tags === undefined) throw new Error('tags is required')
        // if (imgUrl === undefined) throw new Error('imgUrl is required')

        const collection = this.getCollection()

        await collection.insertOne({
            content,
            tags: [tags],
            imgUrl,
            authorId: new ObjectId(infoUser.userId),
            comments: [],
            likes: [],
            createdAt: new Date(),
            updatedAt: new Date()
        })

        return {
            message: 'Success add new Post'
        }
    }

    static async commentPost(payload) {
        const collection = this.getCollection()

        const { postId, content } = payload
        await collection.updateOne(
            {
                _id: new ObjectId(postId),
            },
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
        )
        return 'Success add Comment'
    }

    static async likePost(payload) {
        const { postId, username } = payload

        const collection = this.getCollection()

        await collection.updateOne(
            {
                _id: new ObjectId(postId)
            },
            {
                $push: {
                    likes: {
                        username
                    }
                }
            }
        )
        return 'Success add Like to the post'
    }
}