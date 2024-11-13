import { db } from "../config/mongoDB.js";

export default class Post {
    static getCollection() {
        return db.collection('Posts')
    }
}