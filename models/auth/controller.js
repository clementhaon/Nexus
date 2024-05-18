import express from "express";
import models from "../index.js";
import jsonwebtoken from "jsonwebtoken";
const app = express.Router();
import dotenv from 'dotenv'
dotenv.config({ silent: true });


const register = async (req, res) => {


    try {

        //Check entry
        if (!req.body) throw new Error("missing params");
        if (!req.body.email) throw new Error("missing params");
        if (!req.body.password) throw new Error("missing params");
        if (!req.body.pseudo) throw new Error("missing params");
        if (!req.body.birthday) throw new Error("missing params");
        if (!req.body.validCGU) throw new Error("missing params");
        if (!req.body.validPrivacyPolicy) throw new Error("missing params");

        const userExists = await models.user.findOne({ where: { email: req.body.email } });

        if (userExists) throw new Error('user already exist');

        const userCreate = await models.user.create({
            email: req.body.email,
            password: req.body.password,
            pseudo: req.body.pseudo,
            birthday: req.body.birthday,
            validCGU: req.body.validCGU,
            validPrivacyPolicy: req.body.validPrivacyPolicy,
            gender: req.body.gender,
            nationality: req.body.nationality,
            profilePictureUrl: req.body.profilePictureUrl
        });
        if (!userCreate) throw new Error ("Error in creation user");
        try {
            //Launch function login in model user
            await userCreate.login();
            //Save the login
            await userCreate.save();
        } catch (err) {
            throw new Error("genreate token failed")
        }

        const responseGenric = await userCreate.toAuthJSON();

        return res.status(200).json(responseGenric);
    
    } catch (err) {
        console.log(err)

        return res.status(500).send({success:false, message: err?.message ? err?.message : ""});

    }


}

const login = async (req, res) => {


    try {
        //Check entry
        if (!req.body) throw new Error("missing params");
        if (!req.body.email) throw new Error("missing params");
        if (!req.body.password) throw new Error("missing params");

        const userExists = await models.user.scope("all").findOne({ where: { email: req.body.email } });

        if (!userExists) throw new Error('user not found');

        try {
            //Launch function validate password in model user
            const validatePass = await userExists.validatePassword(req.body.password);
            if (!validatePass) throw new Error();
        } catch (err) {
            throw new Error("invalid password")
        }

        try {
            //Launch function login in model user
            await userExists.login();
            //Save the login
            await userExists.save();
        } catch (err) {
            throw new Error("genreate token failed")
        }

        const responseGenric = await userExists.toAuthJSON();

        return res.status(200).json(responseGenric);
    
    } catch (err) {
        console.log(err)

        return res.status(500).send({success:false, message: err?.message ? err?.message : ""});

    }
}

const refresh = async (req, res) => {


    try {
        //Check entry
        if (!req.body) throw new Error("missing params");
        if (!req.body.refreshToken) throw new Error("missing params");
        const refreshToken = req.body.refreshToken;
        const payload = jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN);
        if (!payload) throw new Error("Refresh token invalid");
        const refreshSignature = refreshToken.split(".")[2];

        const getUser = await models.user.scope("all").findOne({ where: { refresh_token_signature: refreshSignature } });

        if(!getUser) throw new Error("Signature invalid");

        try {
            //Launch function login in model user
            await getUser.login();
            //Save the login
            await getUser.save();
        } catch (err) {
            throw new Error("genreate token failed")
        }

        const responseGenric = await getUser.toAuthJSON();

        return res.status(200).json(responseGenric);
    
    } catch (err) {
        console.log(err)

        return res.status(500).send({success:false, message: err?.message ? err?.message : ""});

    }
}

app.post('/register', register);
app.post('/login', login);
app.post('/refresh_token', refresh)

export default app;