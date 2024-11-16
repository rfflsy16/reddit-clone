import { MongoClient } from "mongodb";
import 'dotenv/config'

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

const db = client.db('redditRaffles')

export { db, client }