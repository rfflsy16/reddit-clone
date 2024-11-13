import { MongoClient } from "mongodb";

const uri = `mongodb+srv://rfflsy16:mamangGacor16@raffles.9c2dw.mongodb.net/`
const client = new MongoClient(uri)

const db = client.db('redditRaffles')

export { db, client }