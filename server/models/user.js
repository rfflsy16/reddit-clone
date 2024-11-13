import { db } from "../config/mongoDB.js";
import { comparePass, hashPass } from "../helpers/bcrypt.js";
import { signToken } from "../helpers/jwt.js";

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
        console.log(findEmail, '<<<<<<<<<<<<<<<<<')

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

    static async getProfile() {

    }
}

