import redis from "redis";
const { redisConfig } = require("../config");

const redisClient = redis.createClient(redisConfig);

redisClient.on("error", (err) => {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", (err) => {
  console.log("Connected to redis successfully");
});

export default redisClient;
