import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB.js";

export default class Follow {
    static getCollection() {
        return db.collection("Follows")
    }

    static async addFollow(payload, infoUser) {
        const collection = this.getCollection()

        const { followingId } = payload

        const followerId = new ObjectId(infoUser.userId)

        const followInput = {
            followingId: new ObjectId(followingId),
            followerId
        }
        const existingFollow = await collection.findOne(followInput)

        if (existingFollow) {
            await collection.deleteOne(followInput)

            return 'Unfollow Success'
        }

        const dataFollow = {
            ...followInput,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const followReport = await collection.insertOne(dataFollow)

        console.log(followReport.insertedId)

        await collection.findOne({ _id: new ObjectId(followReport.insertedId) })

        return {
            message: 'Follow Success'
        }
    }
}