import Redis from "ioredis";
import 'dotenv/config'

//redis-18151.c334.asia-southeast2-1.gce.redns.redis-cloud.com:18151

const redis = new Redis({
    port: 18151,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
})

export default redis