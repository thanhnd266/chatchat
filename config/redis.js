const redis = require('redis');

const {host, port, username, password} = require('../constants/redis');

//connect to redis
const dbNumber = 0;
// const url = `redis://${username}:${password}@${host}:${port}/${dbNumber}`;
const url = `${host}:${port}/${dbNumber}`;
const redisClient = redis.createClient({url});
redisClient.connect();

redisClient.on('connect', () => {
    console.log('Connected to redis client');
}).on('error', (error) => {
    console.log(error)
})

module.exports = redisClient;