import { db } from "../config/mongoDB";

export default class User {
    static getCollection() {
        return db.collection('')
    }

    static async register(payload) {
        const { name, email, password } = payload
    }
}