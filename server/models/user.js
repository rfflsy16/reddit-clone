import { db } from "../config/mongoDB";
import { comparePass, hashPass } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";

export default class User {
    static getCollection() {
        return db.collection('Users')
    }

    static async register(payload) {
        const { username, email, password } = payload

        const collection = this.getCollection()
        await collection.insertOne({
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
}