import express from "express";
import router from "./routers";
import session from "express-session";
import redisClient from "./redis";
import connectRedis from "connect-redis";
import { errorHandler } from "./middlewares";

/** Declaration merging to add additional properties. */
declare module "express-session" {
  interface Session {
    userId: string;
  }
}

const { port, sessionSecret, sessionAge } = require("../config");
const app = express();
const RedisStore = connectRedis(session);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Init express-sessions with redis. */
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: sessionAge,
    },
  })
);
app.use(errorHandler);
app.use(router);

process
  .on("unhandledRejection", (reason, promise) => {
    console.warn(reason, "Unhandled rejection at promise:", promise);
  })
  .on("uncaughtException", (err) => {
    console.error(err.message);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server started on ${port}.`);
});

