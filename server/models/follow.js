import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB.js";

export default class Follow {
    static getCollection() {
        return db.collection("Follows");
    }

    static async addFollow(payload, infoUser) {
        const collection = this.getCollection();
        const { followingId } = payload;
        const followerId = new ObjectId(infoUser.userId);

        const followInput = {
            followingId: new ObjectId(followingId),
            followerId,
        };

        // console.log(followInput)
        try {
            const existingFollow = await collection.findOne(followInput);

            if (existingFollow) {
                await collection.deleteOne(followInput);

                return {
                    message: "Unfollow Success",
                };
            }

            const dataFollow = {
                ...followInput,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await collection.insertOne(dataFollow);

            return {
                message: "Follow Success",
            };
        } catch (error) {
            throw new Error("Failed to follow/unfollow user.");
        }
    }
}
