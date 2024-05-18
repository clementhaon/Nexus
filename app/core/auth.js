import jsonwebtoken from"jsonwebtoken";
import models from "../models/index.js";
import dotenv from 'dotenv'
dotenv.config()
import * as config from "../config/index.js";
config.getConfig();


const isDefined = (authorization) => {

  return (
    authorization &&
    authorization.split(" ")[0] === "Bearer" &&
    authorization.split(" ")[1]
  );
};

const isAuthorized = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (isDefined(authorization)) {
    const token = authorization.split(" ")[1];
    const signature = authorization.split(".")[2];
    try {
      const payload = jsonwebtoken.verify(token, config.jwtKey);
      if (payload) {
        req.user = await models.user.scope("all").findOne({ where: { id: payload.id } });
        if (req.user && signature === req.user.token_signature) {
          next();
          return null;
        }
      }
    } catch (error) {
      return res.status(401).send({ status: 401, message: "Invalid token" });
    }
  }
  return res.status(401).send({ status: 401, message: "Invalid token" });
};

export default isAuthorized;