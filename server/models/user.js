import { db } from "../config/mongoDB.js";
import { comparePass, hashPass } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";
import { ObjectId } from "mongodb";

export default class User {
    static getCollection() {
        return db.collection('Users')
    }
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    static async register(payload) {
        // console.log('masukkkkk')
        const { name, username, email, password } = payload

        // console.log(email)
        if (!this.isValidEmail(email)) throw new Error('Invalid email format');

        if (password.length < 5) throw new Error('Password must be more rhan 5 character');
        const collection = this.getCollection()
        const findEmail = await collection.findOne({ email })
        // console.log(findEmail, '<<<<<<<<<<<<<<<<<')

        if (findEmail) throw new Error('Email must be unique')

        await collection.insertOne({
            name,
            username,
            email,
            password: hashPass(password)
        })

        return {
            message: 'Success add new account'
        }
    }

    static async login(payload) {
        const { email, password } = payload
        const collection = this.getCollection()

        const user = await collection.findOne({ email })
        if (!user) throw new Error('Email or Password is Invalid');

        if (!comparePass(password, user.password)) throw new Error('Email or Password is Invalid');

        const payloads = {
            id: user._id,
            email: user.email
        }

        const access_token = signToken(payloads)
        return {
            access_token
        }
    }

    static async getUserById(payload) {
        const collection = this.getCollection()

        // console.log("MASUKKKK")
        const { userId } = payload
        const user = await collection.aggregate([
            {
                $match: {
                    _id: new ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "Follows",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "Followings",
                },
            },
            {
                $lookup: {
                    from: "Users",
                    localField: "Followings.followingId",
                    foreignField: "_id",
                    as: "Followings",
                },
            },
            {
                $lookup: {
                    from: "Follows",
                    localField: "_id",
                    foreignField: "followingId",
                    as: "Followers",
                },
            },
            {
                $lookup: {
                    from: "Users",
                    localField: "Followers.followerId",
                    foreignField: "_id",
                    as: "Followers",
                },
            },
            {
                $project: {
                    password: 0,
                    "Followings.password": 0,
                    "Followers.password": 0,
                },
            },
        ]).toArray()

        if (user.length === 0) {
            throw new Error("User not found");
        }

        // console.log(user)

        return user[0]
    }

    static async searchUsers(payload) {
        const collection = this.getCollection()

        // console.log("masukkk")

        const { keyword } = payload

        // console.log(keyword)
        const searchUser = await collection.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { username: { $regex: keyword, $options: "i" } },
            ],
        }).toArray()

        // console.log(searchUser)

        return searchUser[0]
    }

    static async getProfile(infoUser) {
        const collection = this.getCollection()

        // console.log(infoUser)
        const user = await collection.aggregate([
            {
                $match: {
                    _id: new ObjectId(infoUser.userId)
                },
            },
            {
                $lookup: {
                    from: "Follows",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "Followings",
                },
            },
            {
                $lookup: {
                    from: "Users",
                    localField: "Followings.followingId",
                    foreignField: "_id",
                    as: "Followings",
                },
            },
            {
                $lookup: {
                    from: "Follows",
                    localField: "_id",
                    foreignField: "followingId",
                    as: "Followers",
                },
            },
            {
                $lookup: {
                    from: "Users",
                    localField: "Followers.followerId",
                    foreignField: "_id",
                    as: "Followers",
                },
            },
            {
                $project: {
                    password: 0,
                    "Followings.password": 0,
                    "Followers.password": 0,
                },
            },
        ]).next()

        console.log(user, "<<<<<<<<<")

        return user
    }
}

