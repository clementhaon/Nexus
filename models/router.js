import user from "./users/controller.js";
import auth from "./auth/controller.js";

import express from 'express';
const Router = express.Router();

Router.use('/auth', auth);


import isAuthorized from "../app/core/auth.js";


Router.use('/user', isAuthorized, user);

export default Router;