import Redis from "ioredis";

//redis-18151.c334.asia-southeast2-1.gce.redns.redis-cloud.com:18151

const redis = new Redis({
    port: 1851,
    host: 'redis-18151.c334.asia-southeast2-1.gce.redns.redis-cloud.com',
    password: 'LmyvQnqNsvywDiUw6XG8EXUqd8TdEZJ1',
    db: 0
})

export default redis