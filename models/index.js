import Sequelize from "sequelize";
import * as db from "../app/config/index.js";
import user from "./users/model.js";
import pictures from "./pictures/model.js";
import soft_skills from "./soft_skills/model.js";
import technical_skills from "./technical_skills/model.js";
import type_of_contribution from "./type_of_contribution/model.js";
import projects from "./projects/model.js";
import contributions from "./contributions/model.js";
import dotenv from 'dotenv'
dotenv.config({ silent: true });
const dt = Sequelize.DataTypes;

const sequelize = new Sequelize(
    `${process.env.DB_NAME}`, `${process.env.DB_USERNAME}`, `${process.env.DB_PASSWORD}`,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        logging: false
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Database is now connected to the express server.");
    })
    .catch((error) => {
        console.error(error);
        console.error("Failed to connect to the database !");
    });

const models = {
    user: user(sequelize, dt),
    pictures : pictures(sequelize, dt),
    soft_skills: soft_skills(sequelize, dt),
    technical_skills: technical_skills(sequelize, dt),
    type_of_contribution: type_of_contribution(sequelize, dt),
    projects: projects(sequelize, dt),
    contributions: contributions(sequelize, dt)
};

//Associations

//User to pictures
models.user.belongsTo(models.pictures, {foreignKey: 'pictures_id'});
models.pictures.hasMany(models.user, {foreignKey: 'pictures_id'});

//User to soft skills
models.user.belongsToMany(models.soft_skills, {through: 'user_soft_skills'});
models.soft_skills.belongsToMany(models.user, {through: 'user_soft_skills'});

//User to technical skills
models.user.belongsToMany(models.technical_skills, {through: 'user_technical_skills'});
models.technical_skills.belongsToMany(models.user, {through: 'user_technical_skills'});

//User to type of contribution
models.user.belongsToMany(models.type_of_contribution, {through: 'user_type_of_contribution'});
models.type_of_contribution.belongsToMany(models.user, {through: 'user_type_of_contribution'});

//User creator of projects
models.user.hasMany(models.projects, {foreignKey: 'creator_id'});
models.projects.belongsTo(models.user, {foreignKey: 'creator_id'});

//User to projects
models.user.belongsToMany(models.projects, {through: 'user_projects'});
models.projects.belongsToMany(models.user, {through: 'user_projects'});

//Pictures to projects
models.pictures.belongsToMany(models.projects, {through: 'pictures_projects'});
models.projects.belongsToMany(models.pictures, {through: 'pictures_projects'});

//Project search type of contribution
models.projects.belongsToMany(models.type_of_contribution, {through: 'project_search_type_of_contribution'});
models.type_of_contribution.belongsToMany(models.projects, {through: 'project_search_type_of_contribution'});

//Project search soft skills
models.projects.belongsToMany(models.soft_skills, {through: 'project_search_soft_skills'});
models.soft_skills.belongsToMany(models.projects, {through: 'project_search_soft_skills'});

//Project search technical skills
models.projects.belongsToMany(models.technical_skills, {through: 'project_search_technical_skills'});
models.technical_skills.belongsToMany(models.projects, {through: 'project_search_technical_skills'});

//Project contributions
models.projects.hasMany(models.contributions, {foreignKey: 'project_id'});
models.contributions.belongsTo(models.projects, {foreignKey: 'project_id'});

//User contributions
models.user.hasMany(models.contributions, {foreignKey: 'user_id'});
models.contributions.belongsTo(models.user, {foreignKey: 'user_id'});

//Type of contribution to contributions
models.type_of_contribution.hasMany(models.contributions, {foreignKey: 'type_of_contribution_id'});
models.contributions.belongsTo(models.type_of_contribution, {foreignKey: 'type_of_contribution_id'});
//End associations

models.sequelize = sequelize;
models.Sequelize = Sequelize;


const force = process.env.FORCE_DB || false;
sequelize.sync({force}).then((e) => {
    console.log(
        force ? "Force synced database." : "Initialized database..(no forced & create)"
    );
});

export default models;